package it.unitn.sde.rest;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import it.unitn.sde.entity.Trip;

public interface TripRepo extends CrudRepository<Trip, UUID> {
    Trip findByShipperIdAndStatusId (UUID shipperId, String statusId);
    List<Trip> findByShipperId (UUID shipperId);

}
