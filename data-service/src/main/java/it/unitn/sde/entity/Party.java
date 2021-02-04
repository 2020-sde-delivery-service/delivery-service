package it.unitn.sde.entity;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;

import com.fasterxml.jackson.annotation.JsonIgnore;

import it.unitn.sde.entity.Status.StatusEnum;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Party {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "party_id")
    private UUID partyId;

    private String partyCode;

    private String partyTypeId;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String statusId;

    // @JoinColumn(name = "party_id", referencedColumnName = "party_id")
    // @OneToOne(fetch = FetchType.EAGER, mappedBy = "party")
    // private UserLogin userLogin;

    private boolean isUnread;
    @JsonIgnore
    private String createdByUserLogin;
    @JsonIgnore
    private String lastModifiedByUserLogin;

    private Date createdDate;

    private Date lastModifiedDate;

    public Party() {
        super();
        // TODO Auto-generated constructor stub
    }

    public Party(String partyTypeId, String statusId, String createdByUserLogin, String lastModifiedByUserLogin) {
        this.partyTypeId = partyTypeId;
        this.statusId = statusId;
        this.createdByUserLogin = createdByUserLogin;
        this.lastModifiedByUserLogin = lastModifiedByUserLogin;
    }

    public Party(String partyCode, String partyTypeId, String statusId, UserLogin userLogin, boolean isUnread,
            String createdByUserLogin, String lastModifiedByUserLogin) {
        this.partyCode = partyCode;
        this.partyTypeId = partyTypeId;
        this.statusId = statusId;
        this.userLogin = userLogin;
        this.isUnread = isUnread;
        this.createdByUserLogin = createdByUserLogin;
        this.lastModifiedByUserLogin = lastModifiedByUserLogin;
    }

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
