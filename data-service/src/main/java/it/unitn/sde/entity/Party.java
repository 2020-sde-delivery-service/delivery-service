package it.unitn.sde.entity;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;

import it.unitn.sde.entity.Status.StatusEnum;
import lombok.Data;

@Entity
@Data
public class Party {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "party_id")
    private UUID partyId;

    private String partyCode;

    private String userId;
    private String partyTypeId;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String statusId;

    private boolean isUnread;

    private Date createdDate;

    private Date lastModifiedDate;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "party_security_group", joinColumns = @JoinColumn(name = "party_id", referencedColumnName = "party_id"), inverseJoinColumns = @JoinColumn(name = "group_id", referencedColumnName = "group_id"))
    private List<SecurityGroup> roles;

    @PrePersist
    public void prePersist() {
        if (statusId == null) {
            statusId = StatusEnum.PARTY_ENABLED.name();
        }
        if (createdDate == null)
            createdDate = new Date();
        else
            lastModifiedDate = new Date();
    }

}
