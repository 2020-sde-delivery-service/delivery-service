package it.unitn.sde.rest;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import it.unitn.sde.entity.Point;

public interface PointRepo extends CrudRepository<Point,UUID> {
    Point findByTripIdAndSuggestionSeqId (UUID tripId, int suggestionSeqId);

}
