package it.unitn.sde.rest;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import it.unitn.sde.entity.PartySecurityGroup;
import it.unitn.sde.entity.PartySecurityGroupId;

public interface PartySecurityGroupRepo extends CrudRepository<PartySecurityGroup,PartySecurityGroupId> {
    PartySecurityGroup findByPartyIdAndGroupId(UUID partyId, String groupId);

}
