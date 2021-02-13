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
router.post('/shipments', shipmentController.create);
//router.get('/shipments/deliveryRequest/ofshipper/:shipperId', shipmentController.getShipmentsOfShipper);
router.get('/shipments/by-user/:userId', shipmentController.getShipmentsOfUser);
router.get('/shipments/:deliveryRequestId', shipmentController.getOne);
router.post('/shipments/:deliveryRequestId/shipper', shipmentController.setShipper);
router.post('/shipments/:deliveryRequestId/status', shipmentController.setStatus);

module.exports = router;