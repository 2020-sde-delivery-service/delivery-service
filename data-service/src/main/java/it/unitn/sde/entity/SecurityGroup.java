package it.unitn.sde.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;
@Entity
@Setter
@Getter
public class SecurityGroup {
    @Id
    @Column(name = "group_id")
    private String groupId;

    private String description;


    private Date createdStamp;


    private Date lastUpdatedStamp;

    public SecurityGroup() {
    }
}
