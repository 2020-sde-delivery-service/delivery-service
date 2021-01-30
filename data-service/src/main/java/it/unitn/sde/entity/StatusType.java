package it.unitn.sde.entity;
import java.util.Date;
import java.util.UUID;

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
public class StatusType {
    @Id
    @Column(name = "status_type_id")
    private String id;

    @JoinColumn(name = "parent_type_id", referencedColumnName = "status_type_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private StatusType parentType;

    private String description;

    private Date createdStamp;
    private Date lastUpdatedStamp;

    public StatusType(String id, StatusType parentType, String description) {
        this.id = id;
        this.parentType = parentType;
        this.description = description;
    }

    public StatusType() {
    }
}
