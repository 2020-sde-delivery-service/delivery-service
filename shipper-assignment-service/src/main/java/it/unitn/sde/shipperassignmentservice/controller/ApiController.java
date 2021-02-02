package it.unitn.sde.shipperassignmentservice.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import it.unitn.sde.shipperassignmentservice.model.RequestModel;
import it.unitn.sde.shipperassignmentservice.service.AssignService;
import lombok.extern.log4j.Log4j2;

/**
 * ApiController
 */
@RestController
@Log4j2
public class ApiController {
    @Autowired
    private AssignService assignService;

    @PostMapping("/get-ranked-shipper")
    public ResponseEntity<?> createDeliveryRequest(@RequestBody RequestModel requestModel) {
        log.info("start ranking  -- start");
        List<String> shippers=assignService.getListShipper(requestModel);
        Map<String,Object> res= new HashMap<>();
        res.put("status", "SUCCESS");
        res.put("data", shippers);
        return ResponseEntity.ok().body(res);
    }

}