package it.unitn.sde.rest;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import it.unitn.sde.entity.Trip;

@RepositoryRestResource(collectionResourceRel = "trip", path = "trip")
public interface TripRepo extends CrudRepository<Trip, UUID> {

}
