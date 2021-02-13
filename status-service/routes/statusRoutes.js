const express = require('express');
const router = new express.Router();

const statusController = require('../controllers/statusController');

router.post('/status/point/:pointId', statusController.setStatus);
router.get('/status/trip/by-shipper/:shipperId', statusController.getTripInfo);

module.exports = router;