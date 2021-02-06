package it.unitn.sde.entity;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Shipper {
    @Id
    @Column(name = "shipper_id")
    private UUID shipperId;
    private String currentLocation;

    public Shipper(UUID shipperId, String currentLocation) {
        this.shipperId = shipperId;
        this.currentLocation = currentLocation;
    }

    public Shipper() {
    }
}
