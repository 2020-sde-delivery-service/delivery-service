package it.unitn.sde.tripservice.service;

import java.util.Map;

import it.unitn.sde.tripservice.model.Point;
import it.unitn.sde.tripservice.model.PointInputModel;
import it.unitn.sde.tripservice.model.Trip;
import it.unitn.sde.tripservice.model.TripModelInput;

public interface TripService {
   public Trip createTrip(TripModelInput tripModelInput);
   public Point addPoint(PointInputModel pointInputModel);
   public Point completePoint(String pointId);
   public Map<String, Object> getTrip(String shipperId);
   public Map<String, Object> getTripInfo(String shipperId);

}
