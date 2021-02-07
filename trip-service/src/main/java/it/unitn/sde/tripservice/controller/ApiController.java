package it.unitn.sde.tripservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import it.unitn.sde.tripservice.model.Trip;
import it.unitn.sde.tripservice.model.TripModelInput;
import it.unitn.sde.tripservice.service.TripService;

@RestController
public class ApiController {
    @Autowired
    private TripService tripService;
    @PostMapping("/create-trip")
    public ResponseEntity<?> createTrip(@RequestBody TripModelInput tripModelInput){
        Trip trip= tripService.createTrip(tripModelInput);
        return ResponseEntity.ok().body(trip);
    }
    
}
