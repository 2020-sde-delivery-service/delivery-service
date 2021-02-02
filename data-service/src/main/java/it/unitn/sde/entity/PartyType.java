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
@Getter
@Setter
public class PartyType {
    public static enum PartyTypeEnum {
        AUTOMATED_AGENT, PERSON
    }

    @Id
    @Column(name = "party_type_id")
    private String id;

    @JoinColumn(name = "parent_type_id", referencedColumnName = "party_type_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private PartyType parentType;

    private boolean hasTable;

    private String description;

    private Date createdStamp;

    private Date lastUpdatedStamp;

    public PartyType(String id, PartyType parentType, boolean hasTable, String description) {
        this.id = id;
        this.parentType = parentType;
        this.hasTable = hasTable;
        this.description = description;
    }

    public PartyType() {
    }
}
