const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/usersController');

router.post('/', register);

router.put('/', login);

module.exports = router;