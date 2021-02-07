package it.unitn.sde.entity;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.IdClass;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@IdClass(PartySecurityGroupId.class)
public class PartySecurityGroup {
    @Id
    @Column(name = "party_id")
    private UUID partyId;

    @Id
    @Column(name = "group_id")
    private String groupId;

    public PartySecurityGroup(UUID partyId, String groupId) {
        this.partyId = partyId;
        this.groupId = groupId;
    }

    public PartySecurityGroup() {
    }
}
