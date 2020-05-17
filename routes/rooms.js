const express = require('express');
const router = express.Router();

const { getRooms, getRoomMembers, createRoom, joinRoom, deleteRoom } = require('../controllers/roomController');

// Get all the rooms
// Returns an array of room objects
router.get('/', getRooms);

// Get room members
router.get('/:room', getRoomMembers);

// Make a new room
router.post('/', createRoom);

// Add user to a room
router.put('/', joinRoom);

// Delete a room
router.delete('/', deleteRoom);

module.exports = router;