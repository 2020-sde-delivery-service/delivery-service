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

    @Override
    public Trip createTrip(TripModelInput tripModelInput) {
        DeliveryRequestModel deliveryRequest = restTemplate.getForObject(dataServiceUrl + ApiConstant.DELIVERY_REQUEST+"/"+tripModelInput.getDeliveryRequestId(),
                DeliveryRequestModel.class);
        Map<String, String> tripInput = new HashMap<>();
        tripInput.put("shipperId", deliveryRequest.getAssignedShipperId().toString());

        // if shipper is running a trip, get it here and put the points in
        //suggest only CREATED and FINISHED (2 status)
        Trip trip = null;

        try {
            //get current trip for shipper
            trip = restTemplate.getForObject(dataServiceUrl + ApiConstant.TRIP_OF_SHIPPER + "?shipperId=" +
                    deliveryRequest.getAssignedShipperId() + "&statusId=" + StatusEnum.TRIP_CREATED, Trip.class);
        } catch (HttpClientErrorException.NotFound ex)   {
            //else create trip
            trip = restTemplate.postForObject(dataServiceUrl + ApiConstant.TRIP, tripInput, Trip.class);
        }

        // create 2 point for pickup and delivery location
        List<PointInputModel> lPI = new ArrayList<>();
        double[] locations = Utils.covertStringLocationToNumber(deliveryRequest.getPickupLocation());
        lPI.add(new PointInputModel(trip.getSizeOfPoints() + 1, deliveryRequest.getDeliveryRequestId().toString(),
                DeliveryRequestTypeEnum.PICKUP.name(), locations[0], locations[1], "/trips/" + trip.getTripId()));
        locations = Utils.covertStringLocationToNumber(deliveryRequest.getDeliveryLocation());
        lPI.add(new PointInputModel(trip.getSizeOfPoints() + 2, deliveryRequest.getDeliveryRequestId().toString(),
                DeliveryRequestTypeEnum.DELIVERY.name(), locations[0], locations[1], "/trips/" + trip.getTripId()));
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
        if (trip.getSizeOfPoints() == trip.getCurrentFinishedSeqId()+1)
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