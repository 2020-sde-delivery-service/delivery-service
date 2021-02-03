package it.unitn.sde.deliveryservice.model;

import lombok.Data;

@Data
public class LocationModel {
   private double lat;
   private double lng;

   public LocationModel(double lat, double lng) {
      this.lat = lat;
      this.lng = lng;
   }
    
   public LocationModel(double []location) {
      this.lat = location[0];
      this.lng =location[1];
   }

   public LocationModel() {
   }
}
