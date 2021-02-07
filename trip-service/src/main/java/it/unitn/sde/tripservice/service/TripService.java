package it.unitn.sde.tripservice.service;

import it.unitn.sde.tripservice.model.PointInputModel;
import it.unitn.sde.tripservice.model.Trip;
import it.unitn.sde.tripservice.model.TripModelInput;

public interface TripService {
   public Trip createTrip(TripModelInput tripModelInput);
   public Trip addPoint(PointInputModel pointInputModel);
   public Trip completePoint(String pointId);
}
