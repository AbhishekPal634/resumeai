const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('./config/passport');
const resumeRoutes = require('./routes/resumeRoutes');
const dbConnect = require('./config/dbConnect');
const authRoutes = require('./routes/authRoutes'); 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000; 
dbConnect(); // Connect to MongoDB

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize()); 

// Routes
app.use('/api/resume', resumeRoutes);
app.use('/api/auth', authRoutes);

// Basic Error Handling Middleware 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (!process.env.GEMINI_API_KEY) {
      console.warn('Warning: GEMINI_API_KEY is not set. Some features may not work.');
  }
  if (!process.env.JWT_SECRET) {
      console.warn('Warning: JWT_SECRET is not set. Authentication will fail.');
  }
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      console.warn('Warning: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is not set. Google OAuth will fail.');
  }
});