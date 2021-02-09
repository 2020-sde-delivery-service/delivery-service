package it.unitn.sde.shipperassignmentservice.model;

import java.util.Date;
import java.util.UUID;

import lombok.Data;

@Data
public class Point {
    private UUID pointId;
    private int seqId;
    private double estimatedCost;
    private UUID deliveryRequestId;
    private String requestType;
    private double lat;
    private double lng;
    private Date assignTime;
    private String statusId;
    private String tripId;
}
