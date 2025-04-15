const express = require('express');
const resumeController = require('../controllers/resumeController');

const router = express.Router();

// Original field-by-field endpoint
router.post('/collect-resume', resumeController.collectResumeField); // source: [cite: 157]

// Unified category processing endpoint (handles both old /collect-category and new /api/collect-category logic)
router.post('/collect-category', resumeController.collectResumeCategory); // source: [cite: 190]
router.post('/api/collect-category', resumeController.collectResumeCategory); // source: [cite: 205] // Point to the same controller

// Get resume data endpoint
router.get('/api/resume-data', resumeController.getResumeData); // source: [cite: 263]

// Generate summary endpoint
router.post('/api/generate-summary', resumeController.generateSummary); // source: [cite: 264]


module.exports = router;