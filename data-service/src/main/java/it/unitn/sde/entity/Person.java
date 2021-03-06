package it.unitn.sde.entity;
import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;
@Entity
@Getter
@Setter
public class Person {
    @Id
    @Column(name="party_id")
    private UUID partyId;
    private String firstName;
    private String middleName;
    private String lastName;
    private String gender;
    private Date birthDate;
    

    public Person(UUID partyId, String firstName, String middleName,String lastName, String gender, Date birthDate) {
        this.partyId = partyId;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.gender = gender;
        this.birthDate = birthDate;
    }

    public Person() {
    }
}
