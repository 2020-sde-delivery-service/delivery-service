package it.unitn.sde.rest;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import it.unitn.sde.entity.Shipper;

public interface ShipperRepo extends CrudRepository<Shipper,UUID> {

}
