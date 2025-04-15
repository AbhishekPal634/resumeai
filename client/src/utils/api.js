import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/resume'; // Updated base URL

/**
 * Process user input for a specific resume field
 * @param {string} input - User's input text
 * @param {string} section - Current resume section
 * @param {string} questionId - Current question ID
 * @param {object} resumeData - Current resume data
 * @returns {Promise<object>} - API response
 */
export const processUserInput = async (input, section, questionId, resumeData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/collect-resume`, { // Updated endpoint
      userInput: input,
      currentStage: section,
      currentQuestion: questionId,
      resumeData
    });
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
 * Process an entire resume section category at once
 * @param {string} input - User's input text for the entire section
 * @param {string} category - Resume section category
 * @param {object} resumeData - Current resume data
 * @returns {Promise<object>} - API response
 */
export const processCategory = async (input, category, resumeData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/collect-category`, { // Updated endpoint
      input,
      category,
      resumeData
    });
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
 * Generate a professional summary based on resume data
 * @param {object} resumeData - Current resume data
 * @returns {Promise<object>} - API response with generated summary
 */
export const generateSummary = async (resumeData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate-summary`, { // Updated endpoint
      resumeData
    });
    return response.data;
  } catch (error) {
    console.error('Error generating summary:', error);
    // Re-throw the error so the calling component can handle it (e.g., show a specific error message)
    throw error; 
  }
};

/**
 * Fetch resume data
 * @returns {Promise<object>} - API response with resume data
 */
export const getResumeData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/resume-data`); // Added endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching resume data:', error);
    throw error;
  }
};
