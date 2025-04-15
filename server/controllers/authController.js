const User = require('../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // To access JWT_SECRET

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1d', // Token expires in 1 day
  });
};

const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    const newUser = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password, // Password will be hashed by the pre-save hook in the model
    });

    await newUser.save();

    // Generate JWT
    const token = generateToken(newUser);

    // Send response (excluding password)
    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

const login = (req, res, next) => {
  // Passport local strategy handles authentication
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Use the message from the passport strategy
      return res.status(401).json({ message: info.message || 'Login failed. Please check your credentials.' });
    }

    // Generate JWT
    const token = generateToken(user);

    // Send response (excluding password)
    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  })(req, res, next); // Make sure to call the middleware function
};

// Controller for Google OAuth callback
const googleCallback = (req, res) => {
  // Successful authentication, Passport adds user to req.user.
  // Generate JWT for the user
  const token = generateToken(req.user);

  // Option 1: Redirect with token in query param (Chosen for frontend handling)
  // Make sure your frontend URL is correct (using Vite's default port 5173 here)
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  res.redirect(`${frontendUrl}/auth/callback?token=${token}`);

  // Option 2: Send token in response body (Requires different frontend handling)
  /*
  res.json({
      token,
      user: {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
      },
  });
  */

  // Option 3: Set cookie (More secure if using httpOnly cookies)
  /*
  res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  res.redirect('http://localhost:5173/dashboard'); // Redirect to dashboard or desired page
  */
};

module.exports = {
  register,
  login,
  googleCallback,
};