package it.unitn.sde.entity;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Customer {
    @Id
    private UUID customerId;
    private String currentLocation;

}
