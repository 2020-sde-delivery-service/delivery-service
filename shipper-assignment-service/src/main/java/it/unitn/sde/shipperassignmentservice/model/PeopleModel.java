package it.unitn.sde.shipperassignmentservice.model;

import lombok.Data;

@Data
public class PeopleModel {
   private String partyId;
   private PeopleCurrentLocationModel currentLocation;
}
