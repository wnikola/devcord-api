require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

const passportConfig = require('./config/passport');
const usersRoute = require('./routes/users');
const roomsRoute = require('./routes/rooms');
const messagesRoute = require('./routes/messages');

const app = express();

passportConfig(passport);

app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/users', usersRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/messages', messagesRoute);


mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => err ? console.log(err) : console.log('Connected to database'));

module.exports = app;