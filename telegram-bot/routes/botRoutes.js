const express = require('express');
const router = new express.Router();

const botController = require('../controllers/botController');

router.post('/message/shipping-request', botController.sendShippingRequest);
router.post('/message/no-delivery', botController.sendNoDelivery);
router.post('/message/status', botController.sendStatus);

module.exports = router;