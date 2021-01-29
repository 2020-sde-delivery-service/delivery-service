const express = require('express');
const router = new express.Router();

const mapsController = require('../controllers/mapsController');

router.get('/maps/v1/one/:id', mapsController.getOne);
router.get('/maps/v1/distance', mapsController.getSingularDistance);
router.get('/maps/v1/matrix', mapsController.getMatrix);

module.exports = router;