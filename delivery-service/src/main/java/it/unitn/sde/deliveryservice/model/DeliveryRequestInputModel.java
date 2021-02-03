package it.unitn.sde.deliveryservice.model;

import lombok.Data;
@Data
public class DeliveryRequestInputModel {
    private String pickupAddress;
    private String deliveryAddress;
    private float quantity;
    private String unit;
    private String pickupLocation;
    private String deliveryLocation;
    private String phoneNumber;

    
}
