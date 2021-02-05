const express = require('express');
const router = new express.Router();

const statusController = require('../controllers/statusController');

router.get('/maps/v1/one/:id', statusController.getOne);
router.get('/maps/v1/distance', statusController.getSingularDistance);
router.get('/maps/v1/matrix', statusController.getMatrix);
router.get('/maps/v1/geocode', statusController.getCoordinates);

module.exports = router;