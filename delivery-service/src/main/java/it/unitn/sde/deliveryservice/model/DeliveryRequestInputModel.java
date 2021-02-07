package it.unitn.sde.deliveryservice.model;

import java.util.UUID;

import lombok.Data;
@Data
public class DeliveryRequestInputModel {
    private String pickupAddress;
    private String deliveryAddress;
    private double quantity;
    private double weight;
    private String unit;
    private String customerPhoneNumber;
    private UUID customerId;

    
}
