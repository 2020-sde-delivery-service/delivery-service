const express = require('express');
const router = new express.Router();

const botController = require('../controllers/botController');

router.post('/bot/v1/shippingRequest', botController.sendShippingRequest);
router.post('/bot/v1/noDelivery', botController.sendNoDelivery);
router.post('/bot/v1/status', botController.sendStatus);

module.exports = router;