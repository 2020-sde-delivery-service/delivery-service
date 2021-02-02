const axios = require('axios');
let dotenv = require('dotenv');
const bot = require('../bot/bot');

dotenv.config();

module.exports = {
    send: async (req, res) => {
        const chatId = req.params.chatId;
        const text = req.query.text;

        bot.telegram.sendMessage();
    }

}