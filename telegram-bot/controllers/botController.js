const axios = require('axios');
let dotenv = require('dotenv');
const bot = require('../bot/bot');

dotenv.config();

module.exports = {
    sendShippingRequest: async (req, res) => {

        //check if user is shipper

        const shipperId = req.params.shipperId;
        const shipmentInfo = req.body.shipmentInfo;

        bot.telegram.sendMessage(shipperId, text);
    },
    sendShippingInfo: async (req, res) => {

        //check if user is shipper

        const shipperId = req.params.shipperId;
        const shipmentInfo = req.body.shipmentInfo;

        bot.telegram.sendMessage(shipperId, text);
    }

}