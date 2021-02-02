package it.unitn.sde.deliveryservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import it.unitn.sde.deliveryservice.constant.ApiConstant;
import it.unitn.sde.deliveryservice.model.DeliveryRequestInputModel;
import it.unitn.sde.deliveryservice.model.DeliveryRequestModel;
import it.unitn.sde.deliveryservice.model.GeoCodeModel;

@Service
public class DeliveryServiceImpl implements DeliveryService {
    @Autowired
    private RestTemplate restTemplate;
    @Value("${dataservice.url}")
    private String dataServiceUrl;

    @Value("${googlemapservice.url}")
    private String googlemapservice;
    @Override
    public String createDeliveryRequest(DeliveryRequestInputModel deliveryModel) {
        GeoCodeModel geoCodePickup=restTemplate.getForObject(googlemapservice+ApiConstant.GEOCODE_API+"?address="+deliveryModel.getPickupAddress() , GeoCodeModel.class);
        GeoCodeModel geoCodeDelivery=restTemplate.getForObject(googlemapservice+ApiConstant.GEOCODE_API+"?address="+deliveryModel.getDeliveryAddress() , GeoCodeModel.class);
        deliveryModel.setPickupLocation(geoCodePickup.getLocation().getLat()+","+geoCodePickup.getLocation().getLng());
        deliveryModel.setDeliveryLocation(geoCodeDelivery.getLocation().getLat()+","+geoCodeDelivery.getLocation().getLng());
        DeliveryRequestModel request = restTemplate.postForObject(
                dataServiceUrl + ApiConstant.CREATE_DELIVERY_REQUEST_API, deliveryModel, DeliveryRequestModel.class);
        return request.getDeliveryRquestId().toString();
    }
}
