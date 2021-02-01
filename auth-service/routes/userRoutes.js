const express = require('express');
const router = new express.Router();

const authenticate = require('../middleware/auth');
const userController = require('../controllers/userController');

router.post('/users', userController.create);
router.get('/users/me', authenticate.authUser, userController.getMe);
router.post('/users/login', userController.login);

module.exports = router;