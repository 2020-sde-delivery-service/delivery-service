package it.unitn.sde.tripservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import it.unitn.sde.tripservice.constant.ApiConstant;
import it.unitn.sde.tripservice.model.PointInputModel;
import it.unitn.sde.tripservice.model.Trip;
import it.unitn.sde.tripservice.model.TripModelInput;

/**
 * TripServiceImpl
 */
@Service
public class TripServiceImpl implements TripService {
    @Autowired
    private RestTemplate restTemplate;
    @Value("${dataservice.url}")
    private String dataServiceUrl;
    @Override
    public Trip createTrip(TripModelInput tripModelInput) {
        Trip trip = restTemplate.postForObject(dataServiceUrl + ApiConstant.TRIP,
                tripModelInput, Trip.class);
        return trip;
    }

    @Override
    public Trip addPoint(PointInputModel pointInputModel) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Trip completePoint(String pointId) {
        // TODO Auto-generated method stub
        return null;
    }

    
}