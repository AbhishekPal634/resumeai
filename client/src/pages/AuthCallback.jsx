import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode'; // Changed to named import

const AuthCallback = () => {
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { loginAction } = useAuth();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (token) {
      try {
        // Decode the token using the named import
        const decodedUser = jwtDecode(token); // Changed usage

        // Prepare the data structure expected by loginAction
        const authData = {
          token: token,
          user: {
            id: decodedUser.id, // Ensure these fields match your JWT payload
            email: decodedUser.email,
            // Add firstName, lastName if they are in the token, otherwise fetch separately if needed
            // firstName: decodedUser.firstName, 
            // lastName: decodedUser.lastName,
          }
        };

        loginAction(authData);
        navigate('/user/dashboard'); // Corrected dashboard path
      } catch (err) {
        console.error("Error processing token:", err);
        setError('Failed to process authentication token. Please try logging in again.');
        // Optionally redirect to login page after a delay
        // setTimeout(() => navigate('/login'), 3000);
      }
    } else {
      setError('Authentication token not found. Please try logging in again.');
      // Optionally redirect to login page
      // navigate('/login');
    }
  }, [location, navigate, loginAction]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        {error ? (
          <>
            <h1 className="text-2xl font-bold text-red-500 mb-4">Authentication Failed</h1>
            <p>{error}</p>
            <button 
              onClick={() => navigate('/login')}
              className="mt-4 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700 transition duration-300"
            >
              Go to Login
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Processing Authentication...</h1>
            {/* Optional: Add a loading spinner */}
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
