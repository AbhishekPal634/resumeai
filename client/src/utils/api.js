// API service for resume chatbot
const API_BASE_URL = 'http://localhost:5000';

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

/**
 * Process user input for a specific resume section and question
 * @param {string} input - User's input text
 * @param {string} section - Current resume section (e.g., 'personal_info', 'education')
 * @param {string} questionId - Current question ID
 * @param {object} resumeData - Current resume data
 * @returns {Promise<object>} - Response with message and updated resume data
 */
export const processUserInput = async (input, section, questionId, resumeData) => {
  try {
    console.log('Sending to /collect-resume:', { input, section, questionId, resumeData });
    
    const response = await axios.post(`${API_URL}/collect-resume`, {
      userInput: input,
      currentStage: section,
      currentQuestion: questionId,
      resumeData
    });
    
    console.log('Response from /collect-resume:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error processing user input:', error);
    return {
      error: true,
      message: 'Failed to process your input. Please try again.'
    };
  }
};

/**
 * Process an entire resume section at once
 * @param {string} input - User's input text for the entire section
 * @param {string} category - Resume section category (e.g., 'personal_info', 'education')
 * @param {object} resumeData - Current resume data
 * @returns {Promise<object>} - Response with message and updated resume data
 */
export const processCategory = async (input, category, resumeData) => {
  try {
    console.log('Sending to /collect-category:', { input, category, resumeData });
    
    const response = await axios.post(`${API_URL}/collect-category`, {
      input,
      category,
      resumeData
    });
    
    console.log('Response from /collect-category:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error processing category:', error);
    return {
      error: true,
      message: 'Failed to process your input. Please try again.'
    };
  }
};

/**
 * Process an entire resume section at once
 * @param {string} input - User's input text for the entire section
 * @param {string} category - Resume section category (e.g., 'personal_info', 'education')
 * @param {object} resumeData - Current resume data
 * @returns {Promise<object>} - Response with message and updated resume data
 */
export const processCategoryEntireSection = async (input, category, resumeData) => {
  try {
    console.log('Sending to /collect-category:', { input, category, resumeData });
    
    const response = await axios.post(`${API_URL}/collect-category`, {
      input,
      category,
      resumeData
    });
    
    console.log('Response from /collect-category:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error processing category:', error);
    throw error;
  }
};
