package it.unitn.sde.tripservice.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import it.unitn.sde.tripservice.constant.ApiConstant;
import it.unitn.sde.tripservice.constant.StatusEnum;
import it.unitn.sde.tripservice.model.Point;
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
    public Point addPoint(PointInputModel pointInputModel) {
        
        Point point = restTemplate.postForObject(dataServiceUrl + ApiConstant.POINT,
                pointInputModel, Point.class);
        return point;
    }

    @Override
    public Point completePoint(String pointId) {
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        Map<String,String> body= new HashMap<>();
        body.put("statusId", StatusEnum.POINT_PROCESSED.name());
        Point point= restTemplate.patchForObject(dataServiceUrl+ApiConstant.POINT+"/"+pointId,body , Point.class);
        return point;
    }

    
}