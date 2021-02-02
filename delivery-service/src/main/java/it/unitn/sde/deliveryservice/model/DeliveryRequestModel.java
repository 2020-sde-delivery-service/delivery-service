package it.unitn.sde.deliveryservice.model;

import java.util.Date;
import java.util.Map;
import java.util.UUID;

import lombok.Data;
@Data
public class DeliveryRequestModel {
    private UUID deliveryRquestId;
    private String pickupAddress;
    private String deliveryAddress;
    private String unit;
    private String customerPhoneNumber;
    private String pickupLocation;
    private String deliveryLocation;
    private String statusId;
    private Date createdDate;
    private Date lastModifiedDate;
}
