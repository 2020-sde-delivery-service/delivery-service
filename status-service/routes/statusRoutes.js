const express = require('express');
const router = new express.Router();

const statusController = require('../controllers/statusController');

router.post('/status/v1/deliveryRequest/:deliveryRequestId/pickup', statusController.setPickupStatus);
router.post('/status/v1/deliveryRequest/:deliveryRequestId/deliver', statusController.setDeliverStatus);

module.exports = router;