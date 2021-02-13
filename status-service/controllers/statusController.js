const axios = require('axios');
let dotenv = require('dotenv');
const statusStrings = require('../constants/statusStrings');
const requestTypes = require('../constants/requestTypes');
const headers = {
    "Content-Type": "application/json"
};

dotenv.config();

module.exports = {
    setStatus: async (req, res) => {

        console.log("set-status -start");

        const pointId = req.params.pointId;

        try {
            const tripResp = await axios.post(process.env.TRIP_SERVICE_URL + "/complete-point/" + pointId);
            const point = tripResp.data;

            let status;

            if (point.requestType == requestTypes.PICKUP_REQUEST) {
                status = statusStrings.DELIVERY_STATUS_PROCESSING
            } else if (point.requestType == requestTypes.DELIVERY_REQUEST) {
                status = statusStrings.DELIVERY_STATUS_DELIVERED
            }

            const data = { "statusId": status };

            const resp = await axios.post(process.env.SHIPMENT_SERVICE_URL + "/api/v1/shipments/" + point.deliveryRequestId + "/status", data, headers);

            await axios.post(process.env.TELEGRAM_BOT_URL + "/api/v1/message/status", resp.data, headers);

            res.send(resp.data);
        } catch (error) {
            if (error.response) {
                res.status(error.response.status).send({ error });
            } else {
                res.status(500).send({ error });
            }
            //console.error(error);
        }
    },
    getTripInfo: async (req, res) => {

        console.log("get-trip-info -start");

        const shipperId = req.params.shipperId;

        try {
            const resp = await axios.get(process.env.TRIP_SERVICE_URL + "/get-current-trip-by-shipper/" + shipperId);

            const points = resp.data.points;

            let deliveries = {};
            let promises = [];

            points.forEach((point) => {
                deliveries[point.deliveryRequestId] = {};
            });

            for (let key in deliveries) {
                promises.push(new Promise(async (resolve, reject) => {
                    let res = await axios.get(process.env.SHIPMENT_SERVICE_URL + "/api/v1/shipments/" + key);
                    deliveries[key][requestTypes.PICKUP_REQUEST] = res.data.pickupAddress;
                    deliveries[key][requestTypes.DELIVERY_REQUEST] = res.data.deliveryAddress;
                    resolve();
                }));
            }

            await Promise.all(promises);

            points.forEach((point) => {
                point.address = deliveries[point.deliveryRequestId][point.requestType];
            });

            data = {
                trip: resp.data.trip,
                points: points
            };


            res.send(data);
        } catch (error) {
            if (error.response) {
                res.status(error.response.status).send({ error });
            } else {
                res.status(500).send({ error });
            }
            //console.error(error);
        }
    },
}