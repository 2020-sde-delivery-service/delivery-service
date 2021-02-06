package it.unitn.sde.entity;

import java.io.Serializable;
import java.util.UUID;

import lombok.Data;

@Data
public class PointId implements Serializable {
    /**
     *
     */
    private static final long serialVersionUID = -6433733296740737268L;
    private UUID tripId;
    private int seqId;
}
