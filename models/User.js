const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: {
    type: String,
    select: false
  },
  rooms: Array
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;