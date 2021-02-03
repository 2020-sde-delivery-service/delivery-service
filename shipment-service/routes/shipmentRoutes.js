const express = require('express');
const router = new express.Router();

const shipmentController = require('../controllers/shipmentController');

router.post('/create', shipmentController.create);
router.get('/getOne/:id', shipmentController.getOne);
router.post('/assign-shipper/:deliveryRequestId', shipmentController.assignShipper);
router.post('/accept-request', shipmentController.acceptRequest);

module.exports = router;