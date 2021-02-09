package it.unitn.sde.tripservice.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.lang.Object;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

import it.unitn.sde.tripservice.constant.ApiConstant;
import it.unitn.sde.tripservice.constant.DeliveryRequestTypeEnum;
import it.unitn.sde.tripservice.constant.StatusEnum;
import it.unitn.sde.tripservice.model.DeliveryRequestModel;
import it.unitn.sde.tripservice.model.Point;
import it.unitn.sde.tripservice.model.PointInputModel;
import it.unitn.sde.tripservice.model.Trip;
import it.unitn.sde.tripservice.model.TripModelInput;
import it.unitn.sde.tripservice.model.People;
import it.unitn.sde.tripservice.model.DistanceModel;
import it.unitn.sde.tripservice.utils.Utils;

/**
 * TripServiceImpl
 */
@Service
public class TripServiceImpl implements TripService {
    @Autowired
    private RestTemplate restTemplate;
    @Value("${dataservice.url}")
    private String dataServiceUrl;

    @Value("${googlemapservice.url}")
    private String googlemapservice;

    @Value("${locationservice.url}")
    private String locationServiceUrl;

    @Override
    public Trip createTrip(TripModelInput tripModelInput) {

        DeliveryRequestModel deliveryRequest = restTemplate.getForObject(dataServiceUrl + ApiConstant.DELIVERY_REQUEST
                        +"/"+tripModelInput.getDeliveryRequestId(), DeliveryRequestModel.class);

        // if shipper is running a trip, get it here and put the points in
        //suggest only CREATED and FINISHED (2 status)
        double addCost = 0;
        Trip trip = null;
        Point lastPoint = null;
        try {
            //get current trip for shipper
            trip = restTemplate.getForObject(dataServiceUrl + ApiConstant.TRIP_OF_SHIPPER + "?shipperId=" +
                    deliveryRequest.getAssignedShipperId() + "&statusId=" + StatusEnum.TRIP_CREATED, Trip.class);
            lastPoint = restTemplate.getForObject(dataServiceUrl + ApiConstant.LAST_POINT + "?tripId=" +
                    trip.getTripId() + "&suggestionSeqId=" + trip.getSizeOfPoints(), Point.class);
        } catch (HttpClientErrorException.NotFound ex) {
            // shipper has no points
            Map<String, String> tripInput = new HashMap<>();
            tripInput.put("shipperId", deliveryRequest.getAssignedShipperId().toString());
            trip = restTemplate.postForObject(dataServiceUrl + ApiConstant.TRIP, tripInput, Trip.class);
        }

        if(trip != null && lastPoint != null){
            // shipper has trip
            DistanceModel distance = restTemplate.getForObject(googlemapservice + ApiConstant.DISTANCE_API
                    + "?origin=" + lastPoint.getLat() + "," + lastPoint.getLng()
                    + "&destination=" + deliveryRequest.getPickupAddress(), DistanceModel.class);
            addCost = distance.getDuration() + trip.getEstimatedTotalCost() - trip.getEstimatedCoveredCost();
        } else {
            // shipper has no trip
            People people = restTemplate.getForObject(
                    locationServiceUrl + ApiConstant.LOCATION_API_SHIPPER + "/" + deliveryRequest.getAssignedShipperId(), People.class);
            DistanceModel distance = restTemplate.getForObject(googlemapservice + ApiConstant.DISTANCE_API
                    + "?origin=" + people.getCurrentLocation().getPoint().getY()
                    + "," + people.getCurrentLocation().getPoint().getX()
                    + "&destination=" + deliveryRequest.getPickupAddress(), DistanceModel.class);
            addCost = distance.getDuration();
        }

        DistanceModel distance = restTemplate.getForObject(googlemapservice + ApiConstant.DISTANCE_API
                + "?origin=" + deliveryRequest.getPickupAddress()
                + "&destination=" + deliveryRequest.getDeliveryAddress(), DistanceModel.class);

        double deliveryCost = distance.getDuration();

        // create 2 point for pickup and delivery location
        List<PointInputModel> lPI = new ArrayList<>();

        double[] locations = Utils.covertStringLocationToNumber(deliveryRequest.getPickupLocation());
        lPI.add(new PointInputModel(trip.getSizeOfPoints() + 1, deliveryRequest.getDeliveryRequestId().toString(),
                DeliveryRequestTypeEnum.PICKUP.name(), locations[0], locations[1], "/trips/" + trip.getTripId(), addCost));
        locations = Utils.covertStringLocationToNumber(deliveryRequest.getDeliveryLocation());
        lPI.add(new PointInputModel(trip.getSizeOfPoints() + 2, deliveryRequest.getDeliveryRequestId().toString(),
                DeliveryRequestTypeEnum.DELIVERY.name(), locations[0], locations[1], "/trips/" + trip.getTripId(), deliveryCost));
        lPI.stream().forEach(p -> addPoint(p));
        return trip;
    }

    @Override
    public Point addPoint(PointInputModel pointInputModel) {

        Point point = restTemplate.postForObject(dataServiceUrl + ApiConstant.POINT, pointInputModel, Point.class);
        return point;
    }

    @Override
    public Point completePoint(String pointId) {
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        Point point = restTemplate.getForObject(dataServiceUrl + ApiConstant.POINT + "/" + pointId, Point.class);
        Trip trip = restTemplate.getForObject(dataServiceUrl + ApiConstant.TRIP + "/" + point.getTripId(), Trip.class);
        //should check if point can be processed and calculate sequence
        Map<String, Object> body = new HashMap<>();
        body.put("statusId", StatusEnum.POINT_PROCESSED.name());
        body.put("seqId", trip.getCurrentFinishedSeqId() + 1);
        point = restTemplate.patchForObject(dataServiceUrl + ApiConstant.POINT + "/" + pointId, body, Point.class);
        body = new HashMap<>();
        body.put("currentFinishedSeqId", trip.getCurrentFinishedSeqId() + 1);
        // <= to avoid multiple request
        if (trip.getSizeOfPoints() <= trip.getCurrentFinishedSeqId()+1)
            body.put("statusId", StatusEnum.TRIP_FINISHED);
        trip = restTemplate.patchForObject(dataServiceUrl + ApiConstant.TRIP + "/" + trip.getTripId(), body,
                Trip.class);
        return point;
    }

    @Override
    public Map<String, Object> getTrip(String shipperId) {
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        Trip trip = restTemplate.getForObject(dataServiceUrl + ApiConstant.TRIP_OF_SHIPPER + "?shipperId=" +
                shipperId + "&statusId=" + StatusEnum.TRIP_CREATED, Trip.class);
        String body = restTemplate.getForObject(dataServiceUrl + ApiConstant.TRIP + "/" + trip.getTripId() +
                ApiConstant.POINT, String.class);
        Map<String, Object> resp = new HashMap<>();
        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Map<String, Object>> map = mapper.readValue(body, new TypeReference<Map<String, Map<String, Object>>>() {
            });
            resp.put("trip", trip);
            resp.put("points", map.get("_embedded").get("points"));
        } catch (Exception e) {
        e.printStackTrace();
    }
        return resp;
    }

}