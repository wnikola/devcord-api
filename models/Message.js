const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  from: mongoose.ObjectId,
  to: mongoose.ObjectId,
  message: String
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;