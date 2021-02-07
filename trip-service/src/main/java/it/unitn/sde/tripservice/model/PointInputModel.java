package it.unitn.sde.tripservice.model;

import lombok.Data;

@Data
public class PointInputModel {
   private int suggestionSeqId;
   private String deliveryRequestId;
   private String requestType;
   private double lat;
   private double lng;
    private String trip;

    public PointInputModel(int suggestionSeqId, String deliveryRequestId, String requestType, double lat, double lng,
            String trip) {
        this.suggestionSeqId= suggestionSeqId;
        this.deliveryRequestId = deliveryRequestId;
        this.requestType = requestType;
        this.lat = lat;
        this.lng = lng;
        this.trip = trip;
    }

}
