package it.unitn.sde.deliveryservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import it.unitn.sde.deliveryservice.model.DeliveryRequestInputModel;
import it.unitn.sde.deliveryservice.service.DeliveryService;
import lombok.extern.log4j.Log4j;
import lombok.extern.log4j.Log4j2;

/**
 * ApiController
 */
@RestController
@Log4j2
public class ApiController {
    @Autowired
    private DeliveryService deliveryService;


    @PostMapping("/create-delivery-request")
    public ResponseEntity<?> createDeliveryRequest(@RequestBody DeliveryRequestInputModel deliveryModel) {
        log.info("Create delivery request -- start");
        deliveryService.createDeliveryRequest(deliveryModel);
        return null;
    }

}