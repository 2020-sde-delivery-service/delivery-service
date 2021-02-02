package it.unitn.sde.deliveryservice.service;

import it.unitn.sde.deliveryservice.model.DeliveryRequestInputModel;

public interface DeliveryService {
    public String createDeliveryRequest(DeliveryRequestInputModel deliveryModel);
    
}
