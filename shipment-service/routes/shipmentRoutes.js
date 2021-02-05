const express = require('express');
const router = new express.Router();

const shipmentController = require('../controllers/shipmentController');

router.post('/create', shipmentController.create);
router.get('/getOne/:id', shipmentController.getOne);
router.post('/assign-shipper/:deliveryRequestId', shipmentController.assignShipper);
router.post('/accept-request', shipmentController.acceptRequest);

//---------------------------
router.post('/shipment/v1/new', shipmentController.create);
router.get('/shipment/v1/:deliveryRequestId', shipmentController.getOne);
router.post('/shipment/v1/shipper/:deliveryRequestId', shipmentController.assignShipper);
router.post('/shipment/v1/pickup/:deliveryRequestId', shipmentController.pickupStatus);
router.post('/shipment/v1/deliver/:deliveryRequestId', shipmentController.deliverStatus);

module.exports = router;