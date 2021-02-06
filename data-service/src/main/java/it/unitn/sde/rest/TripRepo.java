package it.unitn.sde.rest;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import it.unitn.sde.entity.Trip;

public interface TripRepo extends CrudRepository<Trip, UUID> {

}
