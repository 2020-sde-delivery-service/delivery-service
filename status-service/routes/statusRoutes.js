const express = require('express');
const router = new express.Router();

const statusController = require('../controllers/statusController');

router.post('/status/v1/point/:pointId', statusController.setStatus);
router.get('/status/v1/trip/:shipperId', statusController.getTripInfo);

module.exports = router;