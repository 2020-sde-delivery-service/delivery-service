const express = require('express');
const router = new express.Router();

const shipmentController = require('../controllers/shipmentController');

/*
router.post('/create', shipmentController.create);
router.get('/getOne/:id', shipmentController.getOne);
router.post('/assign-shipper/:deliveryRequestId', shipmentController.setShipper);
router.post('/accept-request', shipmentController.acceptRequest);
*/
//---------------------------
router.post('/shipment/v1/deliveryRequest', shipmentController.create);
router.get('/shipment/v1/deliveryRequest/ofshipper/:shipperId', shipmentController.getShipmentsOfShipper);
router.get('/shipment/v1/deliveryRequest/ofuser/:userId', shipmentController.getShipmentsOfUser);
router.get('/shipment/v1/deliveryRequest/:deliveryRequestId', shipmentController.getOne);
router.post('/shipment/v1/deliveryRequest/:deliveryRequestId/shipper', shipmentController.setShipper);
router.post('/shipment/v1/deliveryRequest/:deliveryRequestId/status', shipmentController.setStatus);

module.exports = router;