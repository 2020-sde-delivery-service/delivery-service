package it.unitn.sde.rest;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import it.unitn.sde.entity.Party;

public interface PartyRepo extends CrudRepository<Party, UUID>  {
    Party findByUserId(String userId);
}
