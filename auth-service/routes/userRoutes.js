const express = require('express');
const router = new express.Router();

const authenticate = require('../middleware/auth');
const userController = require('../controllers/userController');

//router.get('/users/me', authenticate.authUser, userController.getMe);

router.get('/users/v1/byUserId/:userId', userController.getByUserId);
router.get('/users/v1/:partyId/', userController.getOne);
router.post('/users/v1/login', userController.login);
router.post('/users/v1/:partyId/shipper', userController.setShipper);
router.get('/users/v1/:partyId/shipper', userController.checkShipper);
router.post('/users/v1/:partyId/location', userController.setLocation);

module.exports = router;