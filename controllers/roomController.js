const { roomValidation, joinRoomValidation, deleteRoomValidation } = require('../utils/validation');
const Room = require('../models/Room');
const User = require('../models/User');

const getRooms = (req, res) => {
  Room.find((err, rooms) => {
    if (err) return console.error(err);
    res.status(200).json(rooms);
  });
};

const createRoom = async (req, res) => {
  // Validate the data
  const { error } = roomValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  // Check whether the room already exists
  const roomExists = await Room.findOne({ name: req.body.name });
  if (roomExists) return res.status(400).json({ success: false, message: 'Room already exists' });

  // Check whether the owner exists
  const owner = await User.findOne({ username: req.body.owner });
  if (!owner) return res.status(400).json({ success: false });

  // Get the owner id
  const ownerId = owner._id;

  // Save room to database
  const room = new Room({
    name: req.body.name,
    owner: ownerId,
    members: [ownerId]
  });

  room.save((err, room) => {
    if (err) return console.error(err);
    return res.status(200).json(room);
  });
};

const joinRoom = async (req, res) => {
  // Validate the data
  const { error } = joinRoomValidation(req.body);
  if (error) return status(400).json(error.details[0].message);

  // Check whether the room exists
  const room = await Room.findOne({ name: req.body.room });
  if (!room) return res.status(400).json({ success: false, message: 'Room doesn\'t exist' });

  // Check whether the user exists
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).json({ success: false, message: 'User doesn\'t exist' });

  // Check whether the user is already in the room
  const userInTheRoom = room.members.find(member => member.equals(user._id));
  if (userInTheRoom) return res.status(400).json({ success: false, message: 'User is already in the room' });

  // Add user to room members
  room.members.push(user._id);
  room.save((err, room) => {
    if (err) return console.error(err);
    // return res.status(200).json(room);

    // Add room to user's rooms
    user.rooms.push(room._id);
    user.save((err, user) => {
      if (err) return console.error(err);
      return res.status(200).json({ success: true, message: `${user.username} added to ${room.name}` });
    });
  });
};

const deleteRoom = async (req, res) => {
  // Validate the data
  const { error } = deleteRoomValidation(req.body);
  if (error) return status(400).json(error.details[0].message);

  // Check whether the room exists
  const room = await Room.findOne({ name: req.body.room });
  if (!room) return res.status(400).json({ success: false, message: 'Room doesn\'t exist' });

  // Check whether the user exists and has deletion privileges
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).json({ success: false, message: 'User doesn\'t exist' });
  if (!user._id.equals(room.owner)) return res.status(403).json({ success: false, message: 'User doesn\'t have deletion privileges' });

  // Delete the room
  Room.deleteOne({ _id: room._id }, err => {
    if (err) return console.error(err);
    return res.status(200).json({ success: true, message: 'Room deleted' });
  });
};

const getRoomMembers = async (req, res) => {
  // Check whether the room exists
  const room = await Room.findOne({ name: req.params.room });
  if (!room) return res.status(400).json({ success: false, message: 'Room doesn\'t exist' });

  // Get the members
  let members = room.members;
  for (let i = 0; i < members.length; i++) {
    const member = await User.findOne({ _id: members[i] });
    members[i] = member.username;
  }
  return res.status(200).json({ success: true, members: members });
}

module.exports = {
  getRooms,
  createRoom,
  getRoomMembers,
  joinRoom,
  deleteRoom
};