package it.unitn.sde.deliveryservice.model;


import lombok.Data;

/**
 * RequestModel
 */
@Data
public class RequestModel {
    private LocationModel pickup;
    private LocationModel delivery;
}