package it.unitn.sde.tripservice.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import it.unitn.sde.tripservice.model.Point;
import it.unitn.sde.tripservice.model.PointInputModel;
import it.unitn.sde.tripservice.model.PointsInputModel;
import it.unitn.sde.tripservice.model.Trip;
import it.unitn.sde.tripservice.model.TripModelInput;
import it.unitn.sde.tripservice.service.TripService;

@RestController
public class ApiController {
    @Autowired
    private TripService tripService;

    @PostMapping("/create-trip")
    public ResponseEntity<?> createTrip(@RequestBody TripModelInput tripModelInput) {
        Trip trip = tripService.createTrip(tripModelInput);
        return ResponseEntity.ok().body(trip);
    }

    @PostMapping("/add-points")
    public ResponseEntity<?> addPoints(@RequestBody PointsInputModel pointsInputModel) {
        List<PointInputModel> lP = pointsInputModel.getPoints();
        List<String> lPID = lP.stream().map(p -> tripService.addPoint(p).getPointId().toString())
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(lPID);
    }

    @PostMapping("/complete-point/{pointId}")
    public ResponseEntity<?> addPoints(@PathVariable String pointId) {
        Point point = tripService.completePoint(pointId);
        return ResponseEntity.ok().body(point);
    }

}