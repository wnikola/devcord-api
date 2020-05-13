const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/usersController');

// Registration
router.post('/', register);

// Login
router.put('/', login);

module.exports = router;