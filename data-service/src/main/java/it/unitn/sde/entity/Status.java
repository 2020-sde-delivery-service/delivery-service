package it.unitn.sde.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Status {
    public static enum StatusEnum {
        PARTY_ENABLED, PARTY_DISABLED, DELIVERY_REQUEST_CREATED, DELIVERY_REQUEST_ACCEPTED, DELIVERY_REQUEST_PROCESSING,
        DELIVERY_REQUEST_DELIVERIED, TRIP_CREATED, TRIP_ACCEPTED, TRIP_PROCESSING, TRIP_DELIVERIED

    }

    @Id
    @Column(name = "status_id")
    private String id;

    @JoinColumn(name = "status_type_id", referencedColumnName = "status_type_id")
    @ManyToOne(fetch = FetchType.EAGER)
    private StatusType type;

    private String statusCode;

    private String sequenceId;

    private String description;

    private Date createdStamp;

    private Date lastUpdatedStamp;

    public Status(String id, StatusType type, String statusCode, String sequenceId, String description) {
        this.id = id;
        this.type = type;
        this.statusCode = statusCode;
        this.sequenceId = sequenceId;
        this.description = description;
    }

    public Status() {
    }

    public Status(String id) {
        this.id = id;
    }
}
