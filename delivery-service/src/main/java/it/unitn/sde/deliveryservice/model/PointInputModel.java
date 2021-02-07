package it.unitn.sde.deliveryservice.model;

import lombok.Data;

@Data
public class PointInputModel {
    private int seqId;
    private String deliveryRequestId;
    private String requestType;
    private double lat;
    private double lng;
    private String trip;

    public PointInputModel(int seqId, String deliveryRequestId, String requestType, double lat, double lng,
            String trip) {
        this.seqId = seqId;
        this.deliveryRequestId = deliveryRequestId;
        this.requestType = requestType;
        this.lat = lat;
        this.lng = lng;
        this.trip = trip;
    }

}
