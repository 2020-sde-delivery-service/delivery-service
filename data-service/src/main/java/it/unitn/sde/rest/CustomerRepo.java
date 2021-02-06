package it.unitn.sde.rest;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import it.unitn.sde.entity.Customer;

public interface CustomerRepo extends CrudRepository<Customer,UUID> {
    
}
