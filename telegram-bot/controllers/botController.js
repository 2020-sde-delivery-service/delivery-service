const axios = require('axios');
let dotenv = require('dotenv');
const bot = require('../bot/bot');
const strings = require('../constant/strings');
const { Composer, Markup, Scenes, session, Telegraf } = require('telegraf');
const statusStrings = require('../constant/statusStrings');

dotenv.config();

module.exports = {
    sendShippingRequest: async (req, res) => {

        console.log("send-shipping-request -start");

        const deliveryRequest = req.body;

        if (!deliveryRequest.deliveryRequestId) {
            return res.status(400).send()
        }

        let userId;
        try {
            const resp = await axios.get(process.env.USER_SERVICE_URL + '/api/v1/users/' + deliveryRequest.assignedShipperId);
            userId = resp.data.userId;
        } catch (err) {
            //console.error(err);
        }

        const text = strings.BC_ASK_MESSAGE + '\n\n' + strings.BC_RECAP_MESSAGE(deliveryRequest);

        try {
            await bot.telegram.sendMessage(userId, text,
                Markup.inlineKeyboard([
                    Markup.button.callback(strings.CANCEL_BUTTON, 'rejectDelivery' + deliveryRequest.deliveryRequestId),
                    Markup.button.callback(strings.ACCEPT_BUTTON, 'acceptDelivery' + deliveryRequest.deliveryRequestId),
                ]));

            res.send({ "success": true });
        } catch (error) {
            if (error.response) {
                res.status(error.response.status).send({ error });
            } else {
                res.status(500).send({ error });
            }
            //console.error(error);
        }

    },
    sendNoDelivery: async (req, res) => {

        console.log("send-no-delivery -start");

        const deliveryRequest = req.body;

        if (!deliveryRequest.deliveryRequestId) {
            return res.status(400).send()
        }

        let userId;
        try {
            const resp = await axios.get(process.env.USER_SERVICE_URL + '/api/v1/users/' + deliveryRequest.customerId);
            userId = resp.data.userId;
        } catch (err) {
            //console.error(err);
        }

        const text = strings.BC_STATUS_MESSAGE + '\n\n' + strings.S_RECAP_MESSAGE(deliveryRequest) + '\n\n' + strings.REJECTED_MESSAGE;

        try {
            await bot.telegram.sendMessage(userId, text);
            res.send({ "success": true });
        } catch (error) {
            if (error.response) {
                res.status(error.response.status).send({ error });
            } else {
                res.status(500).send({ error });
            }
            //console.error(error);
        }
    },
    sendStatus: async (req, res) => {

        console.log("send-status -start");

        const deliveryRequest = req.body;

        if (!deliveryRequest.deliveryRequestId) {
            return res.status(400).send()
        }

        let userId;
        try {
            const resp = await axios.get(process.env.USER_SERVICE_URL + '/api/v1/users/' + deliveryRequest.customerId);
            userId = resp.data.userId;
        } catch (err) {
            //console.error(err);
        }

        let status;

        if (deliveryRequest.statusId == statusStrings.DELIVERY_STATUS_ACCEPTED) {
            status = strings.BC_ACCEPTED_MESSAGE;
        } else if (deliveryRequest.statusId == statusStrings.DELIVERY_STATUS_PROCESSING) {
            status = strings.BC_PROCESSING_MESSAGE;
        } else {
            status = strings.BC_DELIVERED_MESSAGE;
        }

        const text = strings.BC_STATUS_MESSAGE + '\n\n' + strings.S_RECAP_MESSAGE(deliveryRequest) + '\n\n' + status;

        try {
            await bot.telegram.sendMessage(userId, text);
            res.send({ "success": true });
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
