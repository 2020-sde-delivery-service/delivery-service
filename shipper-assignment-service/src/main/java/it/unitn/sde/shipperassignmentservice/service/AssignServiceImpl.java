package it.unitn.sde.shipperassignmentservice.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import it.unitn.sde.shipperassignmentservice.constant.ApiConstant;
import it.unitn.sde.shipperassignmentservice.model.RequestModel;

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

    @Override
    public List<String> getListShipper(RequestModel requestModel) {
        String locationRequestQuery = "?point=" + requestModel.getPickup().getLat() + ","
                + requestModel.getPickup().getLng() + "&distance=" + radius;
        Map<String, Object> response = restTemplate.getForObject(
                locationServiceUrl + ApiConstant.LOCATION_API_LIST_SHIPPER_NEAR_BY + locationRequestQuery, Map.class);
        List<String> shippers = ((List<Map>) ((Map) response.get("_embedded")).get("peoples")).stream()
                .map(s -> s.get("partyId").toString()).collect(Collectors.toList());
        return shippers;
    }

}