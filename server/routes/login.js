const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/', loginController.loginUser);

router.post('/forgot-password', loginController.forgotPassword);
router.post('/reset-password', loginController.resetPassword);

module.exports = router;
