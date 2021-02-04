package it.unitn.sde.rest;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import it.unitn.sde.entity.Person;

public interface PersonRepo extends CrudRepository<Person,UUID> {
    
}
