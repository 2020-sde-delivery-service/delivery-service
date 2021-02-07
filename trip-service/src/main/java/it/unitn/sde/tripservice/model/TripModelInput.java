package it.unitn.sde.tripservice.model;

import java.util.UUID;

import lombok.Data;

@Data
public class TripModelInput {
    private UUID shipperId;
}
