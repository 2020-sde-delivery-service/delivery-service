package it.unitn.sde.deliveryservice.service;

import it.unitn.sde.deliveryservice.model.DeliveryRequestInputModel;
import it.unitn.sde.deliveryservice.model.DeliveryRequestModel;

public interface DeliveryService {
    public DeliveryRequestModel createDeliveryRequest(DeliveryRequestInputModel deliveryModel);
    public void processDeliveryRequest(DeliveryRequestModel deliveryModel);
    
}
