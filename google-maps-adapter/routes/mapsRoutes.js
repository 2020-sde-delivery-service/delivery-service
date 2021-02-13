const express = require('express');
const router = new express.Router();

const mapsController = require('../controllers/mapsController');

//router.get('/one/:id', mapsController.getOne);
router.get('/distance', mapsController.getSingularDistance);
router.get('/matrix', mapsController.getMatrix);
router.get('/geocode', mapsController.getCoordinates);

module.exports = router;