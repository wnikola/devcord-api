const { messageValidation } = require('../utils/validation');
const User = require('../models/User');
const Message = require('../models/Message');
const Room = require('../models/Room');

const sendAMessage = async (req, res) => {
  // Validate the data
  const { error } = messageValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  // Check whether the users exist
  const sender = await User.findOne({ username: req.body.from });
  if (!sender) return res.status(400).json({ success: false, message: 'Sender doesn\'t exist' });

  const recipient = await User.findOne({ username: req.body.to }) || await Room.findOne({ name: req.body.to });
  if (!recipient) return res.status(400).json({ success: false, message: 'Recipient doesn\'t exist' });

  // Save message to database
  const message = new Message({
    from: sender._id,
    to: recipient._id,
    message: req.body.message
  });

  message.save((err, message) => {
    if (err) return console.error(err);
    return res.status(200).json({ success: true, message: message });
  });
};

const getReceivedMessages = async (req, res) => {
  // Check whether the user exists
  const user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(400).json({ success: false, message: 'User doesn\'t exist' });

  // Get the messages
  let messages = await Message.find({ to: user._id });
  // messages = messages.map(async message => {
  //   const sender = await User.findOne({ _id: message.from });
  //   const parsed = {
  //     from: sender.username,
  //     message: message.message,
  //     createdAt: message.createdAt
  //   };
  //   return parsed;
  // });
  for (let i = 0; i < messages.length; i++) {
    const sender = await User.findOne({ _id: messages[i].from });
    const message = {
      from: sender.username,
      message: messages[i].message,
      sentAt: messages[i].createdAt
    };
    messages[i] = message;
  }
  return res.status(200).json({ success: true, messages: messages });
};

const getSentMessages = async (req, res) => {
  // Check whether the user exists
  const user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(400).json({ success: false, message: 'User doesn\'t exist' });

  // Get the messages
  let messages = await Message.find({ from: user._id });

  for (let i = 0; i < messages.length; i++) {
    const recipient = await User.findOne({ _id: messages[i].to });
    const message = {
      to: recipient.username,
      message: messages[i].message,
      sentAt: messages[i].createdAt
    };
    messages[i] = message;
  }
  return res.status(200).json({ success: true, messages: messages });
};

const getRoomMessages = async (req, res) => {
  // Check whether the room exists
  const room = await Room.findOne({ name: req.params.room });
  if (!room) return res.status(400).json({ success: false, message: 'Room doesn\'t exist' });

  // Get the messages
  const messages = await Message.find({ to: room._id });

  for (let i = 0; i < (await messages).length; i++) {
    const sender = await User.findOne({ _id: messages[i].from });
    const message = {
      from: sender.username,
      message: messages[i].message,
      sentAt: messages[i].createdAt
    };
    messages[i] = message;
  }
  return res.status(200).json({ success: true, messages: messages });
};

module.exports = {
  sendAMessage,
  getReceivedMessages,
  getSentMessages,
  getRoomMessages
};