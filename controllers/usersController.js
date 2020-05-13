require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { registrationValidation } = require('../utils/validation');
const User = require('../models/User');

const saltRounds = 10;

// Registration
const register = async (req, res) => {
  // Validate the data
  const { error } = registrationValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  // Check whether the email already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).json({ success: false, message: 'Email already registered' });

  // Check whether the username already exists
  const usernameExists = await User.findOne({ username: req.body.username });
  if (usernameExists) return res.status(400).json({ success: false, message: 'Username already taken' });

  // Generate a salt and hash
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) return console.error(err);

    // Save user to database
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash
    });

    user.save((err, user) => {
      if (err) return console.error(err);

      user = user.toObject();
      delete user.password;
      return res.status(200).json(user);
    });
  });
};

// Login
const login = async (req, res) => {
  // Find user
  const user = await User.findOne({ $or: [{ email: req.body.login }, { username: req.body.login }] }).select('+password');
  if (!user) return res.status(400).json({ success: false, message: 'User not found' });

  // Check the password
  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (err) return console.log(err);

    if (!result) return res.status(400).json({ success: false, message: 'Wrong password' });

    // Generate a token
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);
    return res.status(200).json({ message: 'Logged in', accessToken: accessToken });
  });
};

module.exports = {
  register,
  login
};