package it.unitn.sde.entity;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.data.annotation.CreatedDate;

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
    private String statusId;
    @CreatedDate
    private Date createdDate;
    @CreatedDate
    private Date startDate;
    @CreatedDate
    private Date endDate;
    
    @OneToMany(mappedBy = "trip")
    private List<Point> points;

    @PrePersist
    public void prePersist() {
        if (statusId == null) {
            statusId = StatusEnum.TRIP_CREATED.name();
        }
    }

}
