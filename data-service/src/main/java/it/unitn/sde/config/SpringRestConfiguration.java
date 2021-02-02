package it.unitn.sde.config;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.stereotype.Component;

import ch.qos.logback.core.status.Status;
import it.unitn.sde.entity.DeliveryRequest;
@Component
public class SpringRestConfiguration implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration restConfig) {

        restConfig.exposeIdsFor(Status.class);
        restConfig.exposeIdsFor(DeliveryRequest.class);
    }
}
