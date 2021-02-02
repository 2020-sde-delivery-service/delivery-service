package it.unitn.sde.entity;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import it.unitn.sde.entity.Status.StatusEnum;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "trip_id")
    private UUID tripId;
    @JoinColumn(name = "status_id", referencedColumnName = "status_id")
    @ManyToOne(fetch = FetchType.EAGER)
    private Status status;
    @CreatedDate
    private Date createdDate;
    @CreatedDate
    private Date startDate;
    @CreatedDate
    private Date endDate;
    @PrePersist
    public void prePersist() {
       if (status == null) {
           status= new Status(StatusEnum.TRIP_CREATED.name());
       }
    }
    
}
