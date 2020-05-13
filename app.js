require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const usersRoute = require('./routes/users');
const roomsRoute = require('./routes/rooms');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/users', usersRoute);
app.use('/api/rooms', roomsRoute);

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => err ? console.log(err) : console.log('Connected to database'));

module.exports = app;