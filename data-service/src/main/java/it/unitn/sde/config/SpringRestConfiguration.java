package it.unitn.sde.config;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.stereotype.Component;

import it.unitn.sde.entity.DeliveryRequest;
import it.unitn.sde.entity.Party;
import it.unitn.sde.entity.Person;
import it.unitn.sde.entity.SecurityGroup;
import it.unitn.sde.entity.Status;
import it.unitn.sde.entity.UserLogin;
@Component
public class SpringRestConfiguration implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration restConfig) {

        restConfig.exposeIdsFor(Status.class);
        restConfig.exposeIdsFor(DeliveryRequest.class);
        restConfig.exposeIdsFor(Party.class);
        restConfig.exposeIdsFor(Person.class);
        restConfig.exposeIdsFor(UserLogin.class);
        restConfig.exposeIdsFor(SecurityGroup.class);
    }
}
