package it.unitn.sde.locationservice.entity;

import org.springframework.data.geo.Point;
import org.springframework.data.redis.core.index.GeoIndexed;

import lombok.Data;
@Data
public class Location {
    @GeoIndexed
    Point location;
}
