const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => err ? console.log(err) : console.log('Connected to database'));

module.exports = app;