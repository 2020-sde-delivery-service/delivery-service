package it.unitn.sde.entity;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import it.unitn.sde.entity.Status.StatusEnum;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class DeliveryRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "delivery_request_id")
    private UUID deliveryRquestId;

    private String pickupAddress;
    private String deliveryAddress;
    private String unit;
    private double weight;
    private double quantity;
    private String customerPhoneNumber;
    private String pickupLocation;
    private String deliveryLocation;
    private String statusId;
    private UUID assignedShipperId;
    private UUID customerId;
    @CreatedDate
    private Date createdDate;
    @LastModifiedDate
    private Date lastModifiedDate;

    @PrePersist
    public void prePersist() {
        if (statusId == null) {
            statusId = StatusEnum.DELIVERY_REQUEST_CREATED.name();
        }
        if (createdDate == null)
            createdDate = new Date();
        else
            lastModifiedDate = new Date();
    }

}
