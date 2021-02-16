const axios = require('axios');
let dotenv = require('dotenv');
const DELIVERY_REQUEST_API = "/delivery-request";
const statusStrings = require('../constants/statusStrings');
dotenv.config();
const headers = {
    "Content-Type": "application/json"
};

module.exports = {
    create: async (req, res) => {

        console.log("create -start");

        try {
            const resp = await axios.post(process.env.DATA_SERVICE_URL + DELIVERY_REQUEST_API, req.body, headers);
            //console.log(resp.data);
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
    getOne: async (req, res) => {

        console.log("get-one -start");

        const deliveryRequestId = req.params.deliveryRequestId;

        try {
            const deliveryResp = await axios.get(process.env.DATA_SERVICE_URL + DELIVERY_REQUEST_API + "/" + deliveryRequestId);

            res.send(deliveryResp.data);
        } catch (error) {
            if (error.response) {
                res.status(error.response.status).send({ error });
            } else {
                res.status(500).send({ error });
            }
            //console.error(error);
        }
    },
    setShipper: async (req, res) => {

        console.log("set-shipper -start");

        const deliveryRequestId = req.params.deliveryRequestId;
        const shipperId = req.body.shipperId;
        //console.log(deliveryRequestId + "-" + shipperId);

        if (!shipperId) {
            return res.status(400).send()
        }

        try {
            //must check if shipper is already set!!!
            const deliveryResp = await axios.get(process.env.DATA_SERVICE_URL + DELIVERY_REQUEST_API + "/" + deliveryRequestId);

            if (deliveryResp.data.statusId != statusStrings.DELIVERY_STATUS_CREATED) {
                res.status(409).send();
            }

            const data = {
                assignedShipperId: shipperId
            }

            const resp = await axios.patch(process.env.DATA_SERVICE_URL + DELIVERY_REQUEST_API + "/" + deliveryRequestId, data, headers);
            //console.log(resp.data);
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
    setStatus: async (req, res) => {

        console.log("set-status -start");

        const deliveryRequestId = req.params.deliveryRequestId;
        const statusId = req.body.statusId;

        if (!statusId) {
            return res.status(400).send()
        }

        //check correct status
        const data = { "statusId": statusId }

        try {
            const resp = await axios.patch(process.env.DATA_SERVICE_URL + DELIVERY_REQUEST_API + "/" + deliveryRequestId, data, headers);
            //console.log(resp.data);
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
    getShipmentsOfUser: async (req, res) => {

        console.log("get-shipments-of-user -start");

        const userId = req.params.userId;

        try {
            const resp = await axios.get(process.env.DATA_SERVICE_URL + DELIVERY_REQUEST_API + '/search/findByCustomerId', {
                params: {
                    customerId: userId
                }
            });

            let data = resp.data._embedded.deliveryRequest;

            //console.log(data);
            res.send(data);
        } catch (error) {
            if (error.response) {
                res.status(error.response.status).send({ error });
            } else {
                res.status(500).send({ error });
            }
            //console.error(error);
        }
    }
}