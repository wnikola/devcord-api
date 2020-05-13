const { roomValidation } = require('../utils/validation');
const Room = require('../models/Room');

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

  // Save room to database
  const room = new Room({
    name: req.body.name,
    owner: req.body.owner,
    users: [req.body.owner]
  });

  room.save((err, room) => {
    if (err) return console.error(err);
    return res.status(200).json(room);
  });
};

module.exports = {
  getRooms,
  createRoom
};