const express = require('express');
const router = new express.Router();

const mapsController = require('../controllers/mapsController');

router.get('/maps/:id', mapsController.getOne);


module.exports = router;