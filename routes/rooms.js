const express = require('express');
const router = express.Router();
const passport = require('passport');

const { getRooms, getRoomMembers, createRoom, joinRoom, deleteRoom } = require('../controllers/roomController');

// Get all the rooms
// Returns an array of room objects
router.get('/', getRooms);

// Get room members
router.get('/:room', getRoomMembers);

// Make a new room
router.post('/', passport.authenticate('jwt', { session: false }), createRoom);

// Add user to a room
router.put('/', passport.authenticate('jwt', { session: false }), joinRoom);

// Delete a room
router.delete('/', passport.authenticate('jwt', { session: false }), deleteRoom);

module.exports = router;