const express = require('express');
const passport = require('passport'); // Import passport
const { register, login, googleCallback } = require('../controllers/authController');

const router = express.Router();

// Local Authentication
router.post("/register", register);
router.post("/login", login);

// Google OAuth Authentication
// Route to start the Google OAuth flow
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route for Google to redirect to after authentication
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }), // Use session: false as we are using JWT
  googleCallback // Use the controller function
);

module.exports = router;