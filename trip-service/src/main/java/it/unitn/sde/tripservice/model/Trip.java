package it.unitn.sde.tripservice.model;

import java.util.Date;

import lombok.Data;
@Data
public class Trip {

    private String tripId;
    private String statusId;
    private long currentFinishedSeqId;
    private Date createdDate;
    private Date startDate;
    private Date endDate;
    private String shipperId;
    private int sizeOfPoints;


}
