const express = require('express');
const resumeController = require('../controllers/resumeController');

const router = express.Router();

// Original field-by-field endpoint
router.post('/collect-resume', resumeController.collectResumeField); 

// Unified category processing endpoint (handles both old /collect-category and new /api/collect-category logic)
router.post('/collect-category', resumeController.collectResumeCategory); 
router.post('/collect-category', resumeController.collectResumeCategory); // Point to the same controller

// Get resume data endpoint
router.get('/resume-data', resumeController.getResumeData);

// Generate summary endpoint
router.post('/generate-summary', resumeController.generateSummary);


module.exports = router;