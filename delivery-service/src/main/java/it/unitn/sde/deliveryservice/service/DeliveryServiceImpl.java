package it.unitn.sde.deliveryservice.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import it.unitn.sde.deliveryservice.constant.ApiConstant;
import it.unitn.sde.deliveryservice.constant.DeliveryRequestTypeEnum;
import it.unitn.sde.deliveryservice.constant.StatusEnum;
import it.unitn.sde.deliveryservice.model.DeliveryRequestInputModel;
import it.unitn.sde.deliveryservice.model.DeliveryRequestModel;
import it.unitn.sde.deliveryservice.model.GeoCodeModel;
import it.unitn.sde.deliveryservice.model.ListCandidateModel;
import it.unitn.sde.deliveryservice.model.LocationModel;
import it.unitn.sde.deliveryservice.model.PointInputModel;
import it.unitn.sde.deliveryservice.model.RequestModel;
import it.unitn.sde.deliveryservice.model.Trip;
import it.unitn.sde.deliveryservice.utils.Utils;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class DeliveryServiceImpl implements DeliveryService {
    @Autowired
    private RestTemplate restTemplate;
    @Value("${shipmentservice.url}")
    private String shimentServiceUrl;

    @Value("${googlemapservice.url}")
    private String googlemapservice;
    @Value("${shipperassignmentservice.url}")
    private String shipperAssignmentService;

    @Value("${tripservice.url}")
    private String tripServiceUrl;
    @Override
    public DeliveryRequestModel createDeliveryRequest(DeliveryRequestInputModel deliveryModel) {
        GeoCodeModel geoCodePickup = restTemplate.getForObject(
                googlemapservice + ApiConstant.GEOCODE_API + "?address=" + deliveryModel.getPickupAddress(),
                GeoCodeModel.class);
        GeoCodeModel geoCodeDelivery = restTemplate.getForObject(
                googlemapservice + ApiConstant.GEOCODE_API + "?address=" + deliveryModel.getDeliveryAddress(),
                GeoCodeModel.class);
        deliveryModel
                .setPickupLocation(geoCodePickup.getLocation().getLat() + "," + geoCodePickup.getLocation().getLng());
        deliveryModel.setDeliveryLocation(
                geoCodeDelivery.getLocation().getLat() + "," + geoCodeDelivery.getLocation().getLng());
        log.info(deliveryModel.toString());
        DeliveryRequestModel request = restTemplate.postForObject(shimentServiceUrl + ApiConstant.CREATE_DELIVERY_REQUEST_API,
                deliveryModel, DeliveryRequestModel.class);
        log.info(request.toString());
        return request;
    }

    @Override
    @Async
    public void processDeliveryRequest(DeliveryRequestModel deliveryModel) {
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        RequestModel requestModel = new RequestModel();

        requestModel
                .setPickup(new LocationModel(Utils.covertStringLocationToNumber(deliveryModel.getPickupLocation())));
        requestModel.setDelivery(
                new LocationModel(Utils.covertStringLocationToNumber(deliveryModel.getDeliveryLocation())));
        ListCandidateModel candidates = restTemplate.postForObject(shipperAssignmentService + ApiConstant.GET_CANDIDATE,
                requestModel, ListCandidateModel.class);
        for (int i = 0; i < candidates.getData().size(); i++) {
            log.info("start " + i);
            Map<String, String> body = new HashMap<>();
            body.put("shipperId", candidates.getData().get(i));
            DeliveryRequestModel re = restTemplate.postForObject(
                    shimentServiceUrl + ApiConstant.ASSIGN_SHIPPER_API_0 +"/"+ deliveryModel.getDeliveryRequestId().toString() + ApiConstant.ASSIGN_SHIPPER_API_1,
                    body, DeliveryRequestModel.class);
            try {
                Thread.sleep(50000);
            } catch (InterruptedException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            log.info("end "+i);            
            re = restTemplate.getForObject(shimentServiceUrl + ApiConstant.GET_DELIVERY_REQUEST_API + "/"
                    + deliveryModel.getDeliveryRequestId().toString(), DeliveryRequestModel.class);
            if (StatusEnum.DELIVERY_REQUEST_ACCEPTED.name().equals(re.getStatusId())) {
                log.info("assignment process completed");
            Map<String,String> tripInput= new HashMap<>();
            tripInput.put("shipperId",re.getAssignedShipperId().toString());
            Trip trip = restTemplate.postForObject(tripServiceUrl + ApiConstant.CREATE_TRIP,
               tripInput, Trip.class);
            List<PointInputModel> lPI= new  ArrayList<>();
            lPI.add(new PointInputModel(-1, re.getDeliveryRequestId().toString(), DeliveryRequestTypeEnum.PICKUP.name(),requestModel.getPickup().getLat() , requestModel.getPickup().getLng(), "/trips/"+trip.getTripId()));
            lPI.add(new PointInputModel(-1, re.getDeliveryRequestId().toString(), DeliveryRequestTypeEnum.DELIVERY.name(),requestModel.getDelivery().getLat() , requestModel.getDelivery().getLng(), "/trips/"+trip.getTripId()));
            Map<String,Object> pointInput= new HashMap<>();
            pointInput.put("points", lPI);
            List<String> lP= restTemplate.postForObject(tripServiceUrl+ApiConstant.ADD_POINTS,pointInput , List.class);
                break;
            }
        }
    }
}
