const express = require('express');
const router = new express.Router();

const botController = require('../controllers/botController');

router.post('/bot/v1/send/:chatId', botController.send);

module.exports = router;