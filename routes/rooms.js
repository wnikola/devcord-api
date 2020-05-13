const express = require('express');
const router = express.Router();

const { getRooms, createRoom } = require('../controllers/roomController');

// Get all the rooms
router.get('/', getRooms);

// Make a new room
router.post('/', createRoom);

module.exports = router;