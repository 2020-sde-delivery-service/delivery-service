package it.unitn.sde.deliveryservice.model;

import lombok.Data;

@Data
public class GeoCodeModel {
    private String address;
    private LocationModel location;
}
