package it.unitn.sde.entity;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Transient;

import it.unitn.sde.entity.Status.StatusEnum;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "trip_id")
    private UUID tripId;
    private String statusId;
    private Date createdDate;
    private long currentFinishedSeqId;
    private Date startDate;
    private Date endDate;
    private UUID shipperId;
    @OneToMany(mappedBy = "trip")
    private List<Point> points;

    @Transient
    public int getSizeOfPoints() {
        if (points == null)
            return 0;
        return points.size();
    }

    @Transient
    public int getCompletedNumber() {
        if (points == null)
            return 0;
        int s = 0;
        for (Point p : points){
            if (StatusEnum.POINT_PROCESSED.name().equals(p.getStatusId())){
                s++;
            }
        }
        return s;
    }

    @Transient
    public double getEstimatedTotalCost() {
        if (points == null)
            return 0;
        double c = 0;
        for (Point p : points){
            c += p.getEstimatedCost();
        }
        return c;
    }

    @Transient
    public double getEstimatedCoveredCost() {
        if (points == null)
            return 0;
        double c = 0;
        for (Point p : points){
            if (StatusEnum.POINT_PROCESSED.name().equals(p.getStatusId())) {
                c += p.getEstimatedCost();
            }
        }
        return c;
    }

    @PrePersist
    public void prePersist() {
        if (statusId == null) {
            statusId = StatusEnum.TRIP_STARTED.name();
        }
        if (createdDate == null)
            createdDate = new Date();
        if (startDate == null)
            startDate = new Date();
        if (endDate == null && StatusEnum.TRIP_FINISHED.name().equals(statusId))
            endDate = new Date();
    }

}
