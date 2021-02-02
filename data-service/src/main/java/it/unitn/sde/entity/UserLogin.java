package it.unitn.sde.entity;
import java.util.Date;
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
import javax.persistence.OneToOne;

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
    private String password;

    private String passwordHint;

    private String otpSecret;

    private boolean isSystem;

    private boolean enabled;

    private boolean hasLoggedOut;

    private boolean requirePasswordChange;

    private Integer successiveFailedLogins;

    private String clientToken;

    private int otpResendNumber;


    @JoinColumn(name = "party_id", referencedColumnName = "party_id")
    @OneToOne(fetch = FetchType.EAGER)
    private Party party;


    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_login_security_group",
            joinColumns = @JoinColumn(name = "user_login_id", referencedColumnName = "user_login_id"),
            inverseJoinColumns = @JoinColumn(name = "group_id", referencedColumnName = "group_id"))
    private List<SecurityGroup> roles;

    public UserLogin() {
    }

    public UserLogin(String userLoginId, String password, List<SecurityGroup> roles, boolean enabled) {
        this.userLoginId = userLoginId;
        this.password = PASSWORD_ENCODER.encode(password);
        this.roles = roles;

        this.enabled = enabled;
    }


    private Date disabledDateTime;


   


    public UserLogin(String password, String passwordHint, boolean isSystem,
                     boolean enabled, boolean hasLoggedOut,
                     boolean requirePasswordChange, int successiveFailedLogins,
                     Date disabledDateTime) {
        super();
        this.password = password;
        this.passwordHint = passwordHint;
        this.isSystem = isSystem;
        this.enabled = enabled;
        this.hasLoggedOut = hasLoggedOut;
        this.requirePasswordChange = requirePasswordChange;
        this.successiveFailedLogins = successiveFailedLogins;
        this.disabledDateTime = disabledDateTime;
    }


}
