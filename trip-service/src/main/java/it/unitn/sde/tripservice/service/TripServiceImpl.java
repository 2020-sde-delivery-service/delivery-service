package it.unitn.sde.tripservice.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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

        Trip trip = restTemplate.postForObject(dataServiceUrl + ApiConstant.TRIP, tripInput, Trip.class);
        // if shipper is running a trip, get it here and put the points in

        // create 2 point for pickup and delivery location
        List<PointInputModel> lPI = new ArrayList<>();
        double[] locations = Utils.covertStringLocationToNumber(deliveryRequest.getPickupLocation());
        lPI.add(new PointInputModel(1, deliveryRequest.getDeliveryRequestId().toString(),
                DeliveryRequestTypeEnum.PICKUP.name(), locations[0], locations[1], "/trips/" + trip.getTripId()));
        locations = Utils.covertStringLocationToNumber(deliveryRequest.getDeliveryLocation());
        lPI.add(new PointInputModel(2, deliveryRequest.getDeliveryRequestId().toString(),
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

}