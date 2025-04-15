import axios from 'axios';

const AUTH_API_BASE_URL = 'http://localhost:5000/api/auth';

/**
 * Register a new user.
 * @param {object} userData - { firstName, lastName, email, password }
 * @returns {Promise<object>} - API response { token, user }
 */
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${AUTH_API_BASE_URL}/register`, userData);
    return response.data; // Should contain { token, user }
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error.response?.data || new Error('Registration failed');
  }
};

/**
 * Log in a user.
 * @param {object} credentials - { email, password }
 * @returns {Promise<object>} - API response { token, user }
 */
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${AUTH_API_BASE_URL}/login`, credentials);
    return response.data; // Should contain { token, user }
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error.response?.data || new Error('Login failed');
  }
};

/**
 * Get the URL to initiate Google OAuth flow.
 * Note: This simply returns the backend route. The actual redirect happens via window.location.
 * @returns {string}
 */
export const getGoogleLoginUrl = () => {
  return `${AUTH_API_BASE_URL}/google`;
};

// Add other auth-related API calls here if needed (e.g., logout, forgot password)
