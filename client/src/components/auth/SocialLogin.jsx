import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedinIn } from "react-icons/fa";
import { getGoogleLoginUrl } from "../../utils/authApi"; // Import the function

const SocialLogin = () => {

  const handleGoogleLogin = () => {
    const googleLoginUrl = getGoogleLoginUrl();
    // Redirect the user to the backend Google OAuth route
    window.location.href = googleLoginUrl;
  };

  return (
    <>
      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-gray-700"></div>
        <span className="px-4 text-sm text-gray-500">Or continue with</span>
        <div className="flex-grow border-t border-gray-700"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={handleGoogleLogin} // Add onClick handler
          className="flex items-center justify-center cursor-pointer p-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition duration-300"
        >
          <div className="flex items-center">
            <FcGoogle />
            <span className="ml-2 text-white">Google</span>
          </div>
        </button>
        <button
          type="button"
          // Add LinkedIn handler later if needed
          className="flex items-center cursor-pointer justify-center p-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition duration-300 opacity-50 cursor-not-allowed" // Example: Disable LinkedIn for now
        >
          <div className="flex items-center">
            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-white">
              <FaLinkedinIn size={12} />
            </span>
            <span className="ml-2 text-white">LinkedIn</span>
          </div>
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
