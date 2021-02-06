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
        console.log(req.body);
        try {
            const resp = await axios.post(process.env.DATA_SERVICE_URL + DELIVERY_REQUEST_API, req.body);
            console.log(resp.data);
            res.send(resp.data);
        } catch (err) {
            console.error(err);
            res.status(500).send()
        }
    },
    /*
    getOne: async (req, res) => {
        const deliveryRequestId = req.params.deliveryRequestId;
        try {
            const resp = await axios.get(process.env.DATA_SERVICE_URL + DELIVERY_REQUEST_API + "/" + id, {

                params: {
                    id: id
                }

            });
            console.log(resp.data);
            res.send(resp.data);
        } catch (err) {
            console.error(err);
            res.status(500).send()
        }
    },
    */
    getOne: async (req, res) => {
        const deliveryRequestId = req.params.deliveryRequestId;

        if (!deliveryRequestId) {
            res.status(400).send();
        }

        try {
            const deliveryResp = await axios.get(process.env.DATA_SERVICE_URL + DELIVERY_REQUEST_API + "/" + deliveryRequestId);

            res.send(deliveryResp.data);
        } catch (err) {
            console.error(err);
            res.status(500).send()
        }
    },
    setShipper: async (req, res) => {
        const deliveryRequestId = req.params.deliveryRequestId;
        const shipperId = req.body.shipperId;

        if (!(deliveryRequestId && shipperId)) {
            res.status(400).send();
        }

        try {
            //must check if shipper is already set!!!
            const deliveryResp = await axios.get(process.env.DATA_SERVICE_URL + DELIVERY_REQUEST_API + "/" + deliveryRequestId);

            if (deliveryResp.data.statusId != statusStrings.DELIVERY_STATUS_CREATED) {
                res.status(409).send();
            }

            const data = {
                assignedShipperId: shipperId,
                statusId: DELIVERY_STATUS_ACCEPTED
            }

            const resp = await axios.patch(process.env.DATA_SERVICE_URL + DELIVERY_REQUEST_API + "/" + deliveryRequestId, data, headers);
            console.log(resp.data);
            res.send(resp.data);
        } catch (err) {
            console.error(err);
            res.status(500).send()
        }
    },
    setPickupStatus: async (req, res) => {
        const deliveryRequestId = req.params.deliveryRequestId;

        if (!deliveryRequestId) {
            res.status(400).send();
        }

        //check correct status
        const data = { "statusId": statusStrings.DELIVERY_STATUS_PROCESSING }

        try {
            const resp = await axios.patch(process.env.DATA_SERVICE_URL + DELIVERY_REQUEST_API + "/" + deliveryRequestId, data, headers);
            console.log(resp.data);
            res.send(resp.data);
        } catch (err) {
            console.error(err);
            res.status(500).send()
        }
    },
    setDeliverStatus: async (req, res) => {
        const deliveryRequestId = req.params.deliveryRequestId;

        if (!deliveryRequestId) {
            res.status(400).send();
        }

        //check correct status
        const body = { "statusId": statusStrings.DELIVERY_STATUS_DELIVERED }

        try {
            const resp = await axios.patch(process.env.DATA_SERVICE_URL + DELIVERY_REQUEST_API + "/" + deliveryRequestId, body);
            console.log(resp.data);
            res.send(resp.data);
        } catch (err) {
            console.error(err);
            res.status(500).send()
        }
    },
    acceptRequest: async (req, res) => {
        // try {
        //     const resp = await axios.patch(process.env.DATA_SERVICE_URL+DELIVERY_REQUEST_API, req.body);
        //     console.log(resp.data);
        //     res.send(resp.data);
        // } catch (err) {
        //     console.error(err);
        //     res.status(500).send()
        // }
    },
    getShipmentsOfShipper: async (req, res) => {

        /*

        const shipperId = req.params.shipperId;

        //check correct status
        const body = { "statusId": DELIVERY_STATUS_DELIVERED }

        try {
            const resp = await axios.patch(process.env.DATA_SERVICE_URL + DELIVERY_REQUEST_API + "/" + deliveryRequestId, body);
            console.log(resp.data);
            res.send(resp.data);
        } catch (err) {
            console.error(err);
            res.status(500).send()
        }
        */
    },
    getShipmentsOfUser: async (req, res) => {

        /*

        const shipperId = req.params.shipperId;

        //check correct status
        const body = { "statusId": DELIVERY_STATUS_DELIVERED }

        try {
            const resp = await axios.patch(process.env.DATA_SERVICE_URL + DELIVERY_REQUEST_API + "/" + deliveryRequestId, body);
            console.log(resp.data);
            res.send(resp.data);
        } catch (err) {
            console.error(err);
            res.status(500).send()
        }
        */
    },
}