package it.unitn.sde.shipperassignmentservice.service;

import java.util.List;
import java.util.stream.Collectors;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import it.unitn.sde.shipperassignmentservice.constant.ApiConstant;
import it.unitn.sde.shipperassignmentservice.model.PeopleModel;
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
        String response = restTemplate.getForObject(
                locationServiceUrl + ApiConstant.LOCATION_API_LIST_SHIPPER_NEAR_BY + locationRequestQuery,
                String.class);
        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(response, JsonObject.class);

        List<PeopleModel> shippers = gson.fromJson(jsonObject.getAsJsonObject("_embedded").getAsJsonArray("peoples"),
                new TypeToken<List<PeopleModel>>() {
                }.getType());
        List<String> lshippers = shippers.stream().map(s -> s.getPartyId().toString()).collect(Collectors.toList());
        return lshippers;
    }

}