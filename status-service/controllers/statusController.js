const axios = require('axios');
let dotenv = require('dotenv');
const statusStrings = require('../constants/statusStrings');
const headers = {
    "Content-Type": "application/json"
};

dotenv.config();

module.exports = {
    setPickupStatus: async (req, res) => {
        const deliveryRequestId = req.params.deliveryRequestId;

        const data = { "statusId": statusStrings.DELIVERY_STATUS_PROCESSING }


        //***REQUEST ACCEPTED
        // SET STATUS IN DELIVERY REQUEST (DELIVERYREQUESTID, PICKUP) - SHIPMENT-SERVICE
        //CREATE TRIP (SHIPPERID) OR (USE) PRESENT FOR ONLINE UPDATE) - TRIP-SERVICE
        //CREATE RELATION SHIPPER TRIP OR (USE PRESENT FOR ONLINE UPDATE) - TRIP-SERVICE
        //CREATE POINTS (DELIVERYREQUESTID, PICKUP, TRIPID, TRIPSEQUENCE + 1) - TRIP-SERVICE
        //CREATE POINTS (DELIVERYREQUESTID, DELIVER, TRIPID, TRIPSEQUENCE + 2) - TRIP-SERVICE

        //***PICKUP
        // SET STATUS IN DELIVERY REQUEST (DELIVERYREQUESTID, PICKUP) - SHIPMENT-SERVICE
        // SET STATUS IN POINT (DELIVERYREQUESTID, PICKUP, DONE) - TRIP-SERVICE
        // SET STATUS IN TRIP (TRIPSEQUENCE++) - TRIP-SERVICE

        //***DELIVERY
        // SET STATUS IN DELIVERY REQUEST (DELIVERYREQUESTID, DELIVER) - SHIPMENT-SERVICE
        // SET STATUS IN POINT (DELIVERYREQUESTID, DELIVER, DONE) - TRIP-SERVICE
        // SET STATUS IN TRIP (TRIPSEQUENCE++, IF(NO_OTHER_POINTS_IN_TRIP): TRIP_DONE) - TRIP-SERVICE


        try {
            const resp = await axios.patch(process.env.SHIPMENT_SERVICE_URL + "/deliveryRequest/" + deliveryRequestId + "/status", data, headers);
            console.log(resp.data);
            res.send(resp.data);
        } catch (err) {
            console.error(err);
            res.status(500).send()
        }
    },
    setDeliverStatus: async (req, res) => {
        const deliveryRequestId = req.params.deliveryRequestId;

        const data = { "statusId": statusStrings.DELIVERY_STATUS_DELIVERED }

        try {
            const resp = await axios.post(process.env.SHIPMENT_SERVICE_URL + "/deliveryRequest/" + deliveryRequestId + "/status", data, headers);
            console.log(resp.data);
            res.send(resp.data);
        } catch (err) {
            console.error(err);
            res.status(500).send()
        }
    },
}