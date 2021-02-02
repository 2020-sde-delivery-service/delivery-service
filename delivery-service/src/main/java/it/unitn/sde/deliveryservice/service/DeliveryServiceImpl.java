package it.unitn.sde.deliveryservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import it.unitn.sde.deliveryservice.constant.ApiConstant;
import it.unitn.sde.deliveryservice.model.DeliveryRequestInputModel;
import it.unitn.sde.deliveryservice.model.DeliveryRequestModel;

@Service
public class DeliveryServiceImpl implements DeliveryService {
    @Autowired
    private RestTemplate restTemplate;
    @Value("${dataservice.url}")
    private String dataServiceUrl;

    @Override
    public String createDeliveryRequest(DeliveryRequestInputModel deliveryModel) {

        DeliveryRequestModel request = restTemplate.postForObject(
                dataServiceUrl + ApiConstant.CREATE_DELIVERY_REQUEST_API, deliveryModel, DeliveryRequestModel.class);
        return request.getDeliveryRquestId().toString();
    }
}
