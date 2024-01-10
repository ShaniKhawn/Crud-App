const express = require('express');
const router = express.Router();
const registerController = require('../controllers/signupcontroller');

// Use the specific function from registerController
router.post('/', registerController.registerUser);

module.exports = router;
