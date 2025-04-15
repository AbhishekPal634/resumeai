require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust path if necessary

// Local Strategy (Email/Password)
passport.use(new LocalStrategy(
  { usernameField: 'email' }, // Use email as the username field
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      // Check if user signed up with Google only
      if (!user.password) {
          return done(null, false, { message: 'Please log in using Google.' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Google OAuth 2.0 Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback' // Match the route we'll define
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find user by googleId
      let user = await User.findOne({ googleId: profile.id });

      if (user) {
        return done(null, user); // User found, log them in
      }

      // If user not found, check if email exists (maybe they registered locally first)
      user = await User.findOne({ email: profile.emails[0].value });
      if (user) {
        // Link Google ID to existing local account
        user.googleId = profile.id;
        // Potentially update name if needed
        if (!user.firstName) user.firstName = profile.name.givenName;
        if (!user.lastName) user.lastName = profile.name.familyName;
        await user.save();
        return done(null, user);
      }

      // If no user found by googleId or email, create a new user
      const newUser = new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        // No password needed for Google OAuth users
      });
      await newUser.save();
      return done(null, newUser);
    } catch (err) {
      return done(err, null);
    }
  }
));

// Serialize user ID to the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session using the ID
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
