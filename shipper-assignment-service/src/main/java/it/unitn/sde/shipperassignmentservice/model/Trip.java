package it.unitn.sde.shipperassignmentservice.model;

import java.util.Date;

import lombok.Data;
@Data
public class Trip {

    private String tripId;
    private String statusId;
    private long currentFinishedSeqId;
    private long completedNumber;
    private double estimatedCoveredCost;
    private double estimatedTotalCost;
    private Date createdDate;
    private Date startDate;
    private Date endDate;
    private String shipperId;
    private int sizeOfPoints;


}
