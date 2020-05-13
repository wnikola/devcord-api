const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: String,
  owner: String,
  users: Array
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;