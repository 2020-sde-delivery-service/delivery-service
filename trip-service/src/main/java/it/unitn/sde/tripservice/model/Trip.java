package it.unitn.sde.tripservice.model;

import java.util.Date;
import java.util.List;

import lombok.Data;
@Data
public class Trip {

    private String tripId;
    private String statusId;
    private Date createdDate;
    private Date startDate;
    private Date endDate;
    private String shipperId;
    private List<Point> points;


}
