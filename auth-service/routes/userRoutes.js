const express = require('express');
const router = new express.Router();

const authenticate = require('../middleware/auth');
const userController = require('../controllers/userController');

//router.get('/users/me', authenticate.authUser, userController.getMe);
router.post('/users/v1/login', userController.login);
router.post('/users/v1/:id/shipper', userController.setShipper);
router.get('/users/v1/:id/shipper', userController.checkShipper);

module.exports = router;