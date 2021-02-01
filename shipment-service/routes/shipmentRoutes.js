const express = require('express');
const router = new express.Router();

const mapsController = require('../controllers/shipmentController');

router.get('/maps/v1/shipment/:id', mapsController.getOne);

module.exports = router;