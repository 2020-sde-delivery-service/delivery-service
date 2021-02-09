package it.unitn.sde.tripservice.model;

import lombok.Data;

@Data
public class PointInputModel {
    private int suggestionSeqId;
    private double estimatedCost;
    private String deliveryRequestId;
    private String requestType;
    private double lat;
    private double lng;
    private String trip;

    public PointInputModel(int suggestionSeqId, String deliveryRequestId, String requestType, double lat, double lng,
            String trip, double estimatedCost) {
        this.suggestionSeqId= suggestionSeqId;
        this.deliveryRequestId = deliveryRequestId;
        this.requestType = requestType;
        this.lat = lat;
        this.lng = lng;
        this.trip = trip;
        this.estimatedCost = estimatedCost;
    }

}
