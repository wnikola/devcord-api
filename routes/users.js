const express = require('express');
const router = express.Router();

const { register, login, getUsersRooms } = require('../controllers/usersController');

// Registration
router.post('/', register);

// Login
router.put('/', login);

// Get all the rooms the user is in
router.get('/rooms/:username', getUsersRooms);

module.exports = router;