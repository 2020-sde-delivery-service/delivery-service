const express = require('express');
const router = new express.Router();

const shipmentController = require('../controllers/shipmentController');

router.post('/shipments', shipmentController.create);
router.get('/shipments/by-user/:userId', shipmentController.getShipmentsOfUser);
router.get('/shipments/:deliveryRequestId', shipmentController.getOne);
router.post('/shipments/:deliveryRequestId/shipper', shipmentController.setShipper);
router.post('/shipments/:deliveryRequestId/status', shipmentController.setStatus);

module.exports = router;