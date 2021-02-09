package it.unitn.sde.shipperassignmentservice.service;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;

import it.unitn.sde.shipperassignmentservice.constant.ApiConstant;
import it.unitn.sde.shipperassignmentservice.constant.StatusEnum;
import it.unitn.sde.shipperassignmentservice.model.RequestModel;
import it.unitn.sde.shipperassignmentservice.model.Trip;
import it.unitn.sde.shipperassignmentservice.model.Point;
import it.unitn.sde.shipperassignmentservice.model.People;
import it.unitn.sde.shipperassignmentservice.model.DistanceModel;

/**
 * AssignServiceImpl
 */
@Service
public class AssignServiceImpl implements AssignService {
    @Autowired
    private RestTemplate restTemplate;
    @Value("${locationservice.url}")
    private String locationServiceUrl;

    @Value("${radius.limit}")
    private String radius;

    @Value("${googlemapservice.url}")
    private String googlemapservice;

    @Value("${dataservice.url}")
    private String dataServiceUrl;

    @Override
    public List<String> getListShipper(RequestModel requestModel) {
        String locationRequestQuery = "?point=" + requestModel.getPickup().getLat() + ","
                + requestModel.getPickup().getLng() + "&distance=" + radius;
        Map<String, Object> response = restTemplate.getForObject(
                locationServiceUrl + ApiConstant.LOCATION_API_LIST_SHIPPER_NEAR_BY + locationRequestQuery, Map.class);
        List<String> shippers = ((List<Map>) ((Map) response.get("_embedded")).get("peoples")).stream()
                .map(s -> s.get("partyId").toString()).collect(Collectors.toList());

        //calculate cost
        //assumption that there are a few shippers

        Map<String, Double> costs = new HashMap<>();

        for (String s : shippers) {
            double addCost = 0;
            Trip trip = null;
            Point lastPoint = null;
            try {
                //get current trip for shipper
                trip = restTemplate.getForObject(dataServiceUrl + ApiConstant.TRIP_OF_SHIPPER + "?shipperId=" +
                        s + "&statusId=" + StatusEnum.TRIP_CREATED, Trip.class);
                lastPoint = restTemplate.getForObject(dataServiceUrl + ApiConstant.LAST_POINT + "?tripId=" +
                        trip.getTripId() + "&suggestionSeqId=" + trip.getSizeOfPoints(), Point.class);
            } catch (HttpClientErrorException.NotFound ex) {
                // shipper has no points
            }

            if(trip != null && lastPoint != null){
                // shipper has trip
                DistanceModel distance = restTemplate.getForObject(googlemapservice + ApiConstant.DISTANCE_API
                                + "?origin=" + lastPoint.getLat() + "," + lastPoint.getLng()
                                + "&destination=" + requestModel.getPickup().getLat() + "," + requestModel.getPickup().getLng()
                        , DistanceModel.class);
                addCost = distance.getDuration() + trip.getEstimatedTotalCost() - trip.getEstimatedCoveredCost();
            } else {
                // shipper has no trip
                //we should get from previous request
                People people = restTemplate.getForObject(
                        locationServiceUrl + ApiConstant.LOCATION_API_SHIPPER + "/" + s, People.class);

                DistanceModel distance = restTemplate.getForObject(googlemapservice + ApiConstant.DISTANCE_API
                        + "?origin=" + people.getCurrentLocation().getPoint().getY()
                        + "," + people.getCurrentLocation().getPoint().getX()
                        + "&destination=" + requestModel.getPickup().getLat()
                        + "," + requestModel.getPickup().getLng(), DistanceModel.class);
                addCost = distance.getDuration();
            }

            costs.put(s, addCost);
        }

        Map<String, Double> sorted = costs
                .entrySet()
                .stream()
                .sorted(Map.Entry.comparingByValue())
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (oldValue, newValue) -> oldValue, LinkedHashMap::new));

        List<String> sortedShippers = sorted.keySet().stream()
                .collect(Collectors.toList());

        return sortedShippers;
    }

}