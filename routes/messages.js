const express = require('express');
const router = express.Router();

const { sendAMessage, getReceivedMessages, getSentMessages, getRoomMessages } = require('../controllers/messagesController');

// Send a message
router.post('/', sendAMessage);

// Get user's received messages
router.get('/received/:username', getReceivedMessages);

// Get user's sent messages
router.get('/sent/:username', getSentMessages);

// Get room messages
router.get('/:room', getRoomMessages);

module.exports = router;