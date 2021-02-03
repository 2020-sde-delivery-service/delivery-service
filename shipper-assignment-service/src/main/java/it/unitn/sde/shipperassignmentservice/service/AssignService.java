package it.unitn.sde.shipperassignmentservice.service;

import java.util.List;

import it.unitn.sde.shipperassignmentservice.model.RequestModel;

public interface AssignService {
   public List<String> getListShipper(RequestModel requestModel); 
}
