package it.unitn.sde.rest;

import org.springframework.data.repository.CrudRepository;

import it.unitn.sde.entity.UserLogin;

public interface UserLoginRepo extends CrudRepository<UserLogin,String>{
    
}
