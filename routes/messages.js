const express = require('express');
const router = express.Router();
const passport = require('passport');

const { sendAMessage, getReceivedMessages, getSentMessages, getRoomMessages } = require('../controllers/messagesController');

// Send a message
router.post('/', passport.authenticate('jwt', { session: false }), sendAMessage);

// Get user's received messages
router.get('/received', passport.authenticate('jwt', { session: false }), getReceivedMessages);

// Get user's sent messages
router.get('/sent', passport.authenticate('jwt', { session: false }), getSentMessages);

// Get room messages
router.get('/:room', getRoomMessages);

module.exports = router;