const express = require('express');
const router = new express.Router();

const authenticate = require('../middleware/auth');
const userController = require('../controllers/userController');

//router.get('/users/me', authenticate.authUser, userController.getMe);

router.get('/users/by-user-id/:userId', userController.getByUserId);
router.get('/users/:partyId/', userController.getOne);
router.post('/users/login', userController.login);
router.post('/users/:partyId/shipper', userController.setShipper);
router.get('/users/:partyId/shipper', userController.checkShipper);
router.post('/users/:partyId/location', userController.setLocation);

module.exports = router;