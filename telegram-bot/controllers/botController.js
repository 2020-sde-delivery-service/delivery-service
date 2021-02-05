const axios = require('axios');
let dotenv = require('dotenv');
const bot = require('../bot/bot');
const strings = require('../constant/strings');

dotenv.config();

module.exports = {
    sendShippingRequest: async (req, res) => {

        //check if user is shipper maybe

        const shipperId = req.params.shipperId;
        const deliveryRequest = req.body.deliveryRequest;

        const text = strings.BC_ASK_MESSAGE + '\n\n' + strings.BC_RECAP_MESSAGE(deliveryRequest) +
            '\n\nIf you want to accept click that command: /acceptDelivery' + deliveryRequest.id +
            '\n\nIf you want to reject click that command: /rejectDelivery' + deliveryRequest.id;

        try {
            await bot.telegram.sendMessage(shipperId, text);
            res.send();
        } catch (err) {
            console.error(err);
            res.status(400).send()
        }
    },
    sendShippingInfo: async (req, res) => {

        //check if user is shipper maybe

        const userId = req.params.userId;
        const deliveryRequest = req.body.deliveryRequest;

        const text = strings.BC_STATUS_MESSAGE + '\n\n' + strings.S_RECAP_MESSAGE(deliveryRequest);

        try {
            await bot.telegram.sendMessage(userId, text);
            res.send();
        } catch (err) {
            console.error(err);
            res.status(400).send()
        }

    }

}