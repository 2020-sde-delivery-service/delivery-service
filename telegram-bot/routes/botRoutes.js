const express = require('express');
const router = new express.Router();

const botController = require('../controllers/botController');

router.post('/bot/v1/shippingrequest/:shipperId', botController.sendShippingRequest);
router.post('/bot/v1/shippinginfo/:userId', botController.sendShippingInfo);

module.exports = router;