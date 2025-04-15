import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import FormInput from "../components/auth/FormInput";
import PasswordInput from "../components/auth/PasswordInput";
import SocialLogin from "../components/auth/SocialLogin";
import { registerUser } from "../utils/authApi"; // Import the API function
import { useAuth } from "../context/AuthContext"; // Import the Auth context hook

const CAROUSEL_ITEMS = [
  {
    heading: "Capturing Moments,",
    subheading: "Creating Memories",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  },
  {
    heading: "Build Your Profile,",
    subheading: "Land Your Dream Job",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
  },
  {
    heading: "AI-Powered Resume,",
    subheading: "Human-Driven Success",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
  },
];

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { loginAction } = useAuth(); // Get login action from context

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }
    setError(null); // Clear previous errors
    setLoading(true);
    try {
      const { firstName, lastName, email, password } = formData;
      // Ensure all required fields are passed to the API
      const data = await registerUser({ firstName, lastName, email, password });
      loginAction(data); // Update auth context with token and user data after registration
      navigate("/dashboard"); // Redirect to dashboard on successful registration
    } catch (err) {
      // Use error message from backend if available
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout carouselItems={CAROUSEL_ITEMS}>
      <h1 className="text-4xl font-bold text-white mb-4">Create an account</h1>
      <p className="text-gray-300 mb-8">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-indigo-400 hover:text-indigo-300 hover:underline"
        >
          Log in
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FormInput
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              required // Add required attribute
            />
          </div>
          <div>
            <FormInput
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              required // Add required attribute
            />
          </div>
        </div>

        <div>
          <FormInput
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required // Add required attribute
          />
        </div>

        <PasswordInput
          name="password" // Add name prop
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required // Add required attribute
        />

        <div>
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="mr-2 h-5 w-5 accent-indigo-600"
              required // Keep required on the checkbox itself
            />
            <span>
              I agree to the{" "}
              <a
                href="#"
                className="text-indigo-400 hover:text-indigo-300 hover:underline"
              >
                Terms & Conditions
              </a>
            </span>
          </label>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading} // Disable button while loading
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 cursor-pointer transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            "Create account"
          )}
        </button>

        <SocialLogin />
      </form>
    </AuthLayout>
  );
};

export default Signup;
