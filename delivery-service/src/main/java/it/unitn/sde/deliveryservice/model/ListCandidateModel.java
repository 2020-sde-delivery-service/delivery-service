package it.unitn.sde.deliveryservice.model;

import java.util.List;

import lombok.Data;
@Data
public class ListCandidateModel {
   private String status;
   private List<String> data; 
}
