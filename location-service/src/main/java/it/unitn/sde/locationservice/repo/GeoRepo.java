package it.unitn.sde.locationservice.repo;

import java.util.List;

import org.springframework.data.geo.Circle;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.data.repository.CrudRepository;

import it.unitn.sde.locationservice.entity.People;

public interface GeoRepo extends CrudRepository<People, String> {
    List<People> findByLocationLocationNear(Point point, Distance distance);

    List<People> findByLocationWithin(Circle circle);
}
