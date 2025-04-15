// source: [cite: 1]
const express = require('express');
const cors = require('cors');
const config = require('./config'); // Load config first
const resumeRoutes = require('./routes/resumeRoutes');

const app = express(); // source: [cite: 3]
const PORT = config.port; // source: [cite: 3]

// Middleware
app.use(cors()); // source: [cite: 4]
app.use(express.json()); // source: [cite: 4]

// Routes
app.use('/', resumeRoutes); // Mount resume routes at the base path or '/api'

// Basic root route (optional)
app.get('/', (req, res) => {
    res.send('Resume Builder API is running!');
});

// Start the server
app.listen(PORT, () => { // source: [cite: 301]
  console.log(`Server running on port ${PORT}`); // source: [cite: 301]
  if (!config.geminiApiKey) {
      console.warn('Warning: GEMINI_API_KEY is not set. Some features may not work.'); // source: [cite: 301]
  } else {
       console.log('Gemini API Key loaded.');
  }
});