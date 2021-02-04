package it.unitn.sde.entity;

import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class UserLogin {
    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    @Id
    @Column(name = "user_login_id", updatable = false, nullable = false)
    private String userLoginId;

    @Column(name = "current_password")
    @JsonIgnore
    private String password;

    private boolean isSystem;

    private boolean enabled;

    // @JoinColumn(name = "party_id", referencedColumnName = "party_id")
    // @OneToOne(fetch = FetchType.EAGER)
    // private Party party;
    private UUID partyId;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "user_login_security_group", joinColumns = @JoinColumn(name = "user_login_id", referencedColumnName = "user_login_id"), inverseJoinColumns = @JoinColumn(name = "group_id", referencedColumnName = "group_id"))
    private List<SecurityGroup> roles;

    public UserLogin() {
    }

    public UserLogin(String userLoginId, String password, List<SecurityGroup> roles, boolean enabled) {
        this.userLoginId = userLoginId;
        this.password = PASSWORD_ENCODER.encode(password);
        this.roles = roles;

        this.enabled = enabled;
    }

    public UserLogin(String password, boolean isSystem, boolean enabled) {
        super();
        this.password = password;
        this.isSystem = isSystem;
        this.enabled = enabled;
    }

}
