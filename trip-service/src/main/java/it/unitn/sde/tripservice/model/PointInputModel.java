package it.unitn.sde.tripservice.model;

import lombok.Data;

@Data
public class PointInputModel {
   private String seqId;
   private String deliveryRequestId;
   private String requestType;
   private double lat;
   private double lng;
    private String trip;

}