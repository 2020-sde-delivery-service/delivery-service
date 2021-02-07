package it.unitn.sde.entity;

import java.util.Date;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;

import it.unitn.sde.entity.Status.StatusEnum;
import lombok.Data;

@Data
@Entity
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID pointId;
    private int seqId;
    private int suggestionSeqId;
    private UUID deliveryRequestId;
    private String requestType;
    private double lat;
    private double lng;
    private Date assignTime;
    private String statusId;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "trip_id")
    private Trip trip;
    @Column(name = "trip_id", updatable = false, insertable = false)
    private String tripId;

    @PrePersist
    public void prePersist() {
        if (statusId == null) {
            statusId = StatusEnum.POINT_ASSIGNED.name();
        }
        if (assignTime == null)
            assignTime = new Date();
    }
}
