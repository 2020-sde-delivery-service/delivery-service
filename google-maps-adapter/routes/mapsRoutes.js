const express = require('express');
const router = new express.Router();

const mapsController = require('../controllers/mapsController');

//router.get('/one/:id', mapsController.getOne);
router.get('/distance', mapsController.getSingularDistance);
router.get('/geocode', mapsController.getCoordinates);
//router.get('/matrix', mapsController.getMatrix);

module.exports = router;