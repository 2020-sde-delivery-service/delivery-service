package it.unitn.sde.shipperassignmentservice.model;

import lombok.Data;

@Data
public class ShipperModel {
   private String partyId;
   private LocationRedisModel currentLocation;

}
