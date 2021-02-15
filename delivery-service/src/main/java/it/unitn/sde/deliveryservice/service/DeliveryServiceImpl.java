package it.unitn.sde.deliveryservice.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import it.unitn.sde.deliveryservice.constant.ApiConstant;
import it.unitn.sde.deliveryservice.constant.StatusEnum;
import it.unitn.sde.deliveryservice.model.DeliveryRequestInputModel;
import it.unitn.sde.deliveryservice.model.DeliveryRequestModel;
import it.unitn.sde.deliveryservice.model.GeoCodeModel;
import it.unitn.sde.deliveryservice.model.ListCandidateModel;
import it.unitn.sde.deliveryservice.model.LocationModel;
import it.unitn.sde.deliveryservice.model.RequestModel;
import it.unitn.sde.deliveryservice.model.Trip;
import it.unitn.sde.deliveryservice.utils.Utils;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class DeliveryServiceImpl implements DeliveryService {
        @Autowired
        private RestTemplate restTemplate;
        @Value("${shipmentservice.url}")
        private String shimentServiceUrl;

        @Value("${googlemapservice.url}")
        private String googlemapservice;
        @Value("${shipperassignmentservice.url}")
        private String shipperAssignmentService;

        @Value("${tripservice.url}")
        private String tripServiceUrl;
        @Value("${maximumwaittime}")
        private long maximumWaitTime;

        @Value("${telegrambot.url}")
        private String telegramBotUrl;

        @Override
        public DeliveryRequestModel createDeliveryRequest(DeliveryRequestInputModel deliveryModel) {
                GeoCodeModel geoCodePickup = restTemplate.getForObject(googlemapservice + ApiConstant.GEOCODE_API
                                + "?address=" + deliveryModel.getPickupAddress(), GeoCodeModel.class);
                GeoCodeModel geoCodeDelivery = restTemplate.getForObject(googlemapservice + ApiConstant.GEOCODE_API
                                + "?address=" + deliveryModel.getDeliveryAddress(), GeoCodeModel.class);
                deliveryModel.setPickupLocation(
                                geoCodePickup.getLocation().getLat() + "," + geoCodePickup.getLocation().getLng());
                deliveryModel.setDeliveryLocation(
                                geoCodeDelivery.getLocation().getLat() + "," + geoCodeDelivery.getLocation().getLng());
                log.info(deliveryModel.toString());
                DeliveryRequestModel request = restTemplate.postForObject(
                                shimentServiceUrl + ApiConstant.CREATE_DELIVERY_REQUEST_API, deliveryModel,
                                DeliveryRequestModel.class);
                log.info(request.toString());
                return request;
        }

        @Override
        @Async
        public void processDeliveryRequest(DeliveryRequestModel deliveryModel) {
                restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
                RequestModel requestModel = new RequestModel();
                requestModel.setPickup(new LocationModel(
                                Utils.covertStringLocationToNumber(deliveryModel.getPickupLocation())));
                requestModel.setDelivery(new LocationModel(
                                Utils.covertStringLocationToNumber(deliveryModel.getDeliveryLocation())));
                ListCandidateModel candidates = restTemplate.postForObject(
                                shipperAssignmentService + ApiConstant.GET_CANDIDATE, requestModel,
                                ListCandidateModel.class);
                AtomicBoolean accepted = new AtomicBoolean(false);
                AtomicInteger i = new AtomicInteger(0);
                Timer timer = new Timer();
                timer.schedule(new TimerTask() {

                        @Override
                        public void run() {

                                DeliveryRequestModel re = restTemplate.getForObject(
                                                shimentServiceUrl + ApiConstant.GET_DELIVERY_REQUEST_API + "/"
                                                                + deliveryModel.getDeliveryRequestId().toString(),
                                                DeliveryRequestModel.class);
                                if (StatusEnum.DELIVERY_REQUEST_ACCEPTED.name().equals(re.getStatusId())) {
                                        log.info("shipper accepted - assignment process completed");
                                        accepted.set(true);
                                        restTemplate.postForObject(telegramBotUrl + ApiConstant.SEND_STATUS, re,
                                                        Object.class);
                                        Map<String, String> tripInput = new HashMap<>();
                                        tripInput.put("deliveryRequestId", re.getDeliveryRequestId().toString());
                                        Trip trip = restTemplate.postForObject(tripServiceUrl + ApiConstant.CREATE_TRIP,
                                                        tripInput, Trip.class);
                                        timer.cancel();
                                } else {
                                        if (i.get() >= candidates.getData().size())
                                                timer.cancel();
                                        else {

                                                log.info("Shipper " + i + " " + candidates.getData().get(i.get()));
                                                Map<String, String> body = new HashMap<>();
                                                body.put("shipperId", candidates.getData().get(i.get()));
                                                re = restTemplate.postForObject(
                                                                shimentServiceUrl + ApiConstant.ASSIGN_SHIPPER_API_0
                                                                                + "/"
                                                                                + deliveryModel.getDeliveryRequestId()
                                                                                                .toString()
                                                                                + ApiConstant.ASSIGN_SHIPPER_API_1,
                                                                body, DeliveryRequestModel.class);
                                                restTemplate.postForObject(telegramBotUrl + ApiConstant.SEND_REQUEST,
                                                                re, Object.class);
                                                i.addAndGet(1);
                                        }
                                }
                        }

                }, 0, maximumWaitTime);
                if (!accepted.get()) {

                        log.info("No shipper accepted");
                        Map<String, String> body = new HashMap<>();
                        body.put("statusId", StatusEnum.DELIVERY_REQUEST_REJECTED.name());
                        DeliveryRequestModel deliveryRequestModel = restTemplate.postForObject(
                                        shimentServiceUrl + ApiConstant.REJECT_DELIVERY_API_0 + "/"
                                                        + deliveryModel.getDeliveryRequestId().toString()
                                                        + ApiConstant.REJECT_DELIVERY_API_1,
                                        body, DeliveryRequestModel.class);
                        restTemplate.postForObject(telegramBotUrl + ApiConstant.SEND_NODELIVERY, deliveryRequestModel,
                                        Object.class);
                }
        }
}
