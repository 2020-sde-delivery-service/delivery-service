package it.unitn.sde.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Status {
    public static enum StatusEnum {
        PARTY_ENABLED, PARTY_DISABLED, DELIVERY_REQUEST_CREATED, DELIVERY_REQUEST_ACCEPTED, DELIVERY_REQUEST_PROCESSING,
        DELIVERY_REQUEST_DELIVERIED, TRIP_STARTED, TRIP_FINISHED,POINT_ASSIGNED,POINT_PROCESSED

    }

    @Id
    @Column(name = "status_id")
    private String id;
    @JsonIgnore
    @JoinColumn(name = "status_type_id", referencedColumnName = "status_type_id")
    @ManyToOne(fetch = FetchType.EAGER)
    private StatusType type;

    private String statusCode;
    @JsonIgnore
    private String sequenceId;

    private String description;

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
