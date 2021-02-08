package it.unitn.sde.rest;

import java.util.UUID;
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import it.unitn.sde.entity.DeliveryRequest;

@RepositoryRestResource(collectionResourceRel = "deliveryRequest", path = "delivery-request")
public interface DeliveryRequestRepo extends CrudRepository<DeliveryRequest, UUID> {
    List<DeliveryRequest> findByCustomerId(UUID customerId);

}
