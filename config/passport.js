require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
  algorithms: ['HS256']
};

const passportConfig = (passport) => {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload.sub }, (err, user) => {
      // Error
      if (err) return done(err, false);

      // User found
      if (user) return done(null, user);

      // User not found
      return done(null, false);
    });
  }));
};

module.exports = passportConfig;