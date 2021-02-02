package it.unitn.sde.locationservice.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.Data;

@RedisHash("people")
@Data
public class People {
    @Id
    String partyId;
    Location currentLocation;

}
