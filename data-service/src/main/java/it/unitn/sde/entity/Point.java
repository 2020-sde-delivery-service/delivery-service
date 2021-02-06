package it.unitn.sde.entity;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;

import com.fasterxml.jackson.annotation.JsonIgnore;

import it.unitn.sde.entity.Status.StatusEnum;
import lombok.Data;

@Data
@Entity
@IdClass(PointId.class)
public class Point {
    @Id
    private UUID tripId;
    @Id
    private int seqId;
    private UUID requestId;
    private String type;

    private double lat;
    private double lng;
    private Date assignTime;
    private String statusId;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "tripId", insertable = false, updatable = false)
    private Trip trip;
    @PrePersist
    public void prePersist() {
        if (statusId == null) {
            statusId = StatusEnum.POINT_ASSIGNED.name();
        }
        if (assignTime == null)
            assignTime = new Date();
    }
}
