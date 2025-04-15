import React, { useState, useEffect } from "react"; // Import useEffect
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import FormInput from "../components/auth/FormInput";
import PasswordInput from "../components/auth/PasswordInput";
import SocialLogin from "../components/auth/SocialLogin";
import { loginUser } from "../utils/authApi";
import { useAuth } from "../context/AuthContext";

const CAROUSEL_ITEMS = [
  {
    heading: "Welcome Back,",
    subheading: "Continue Your Journey",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  },
  {
    heading: "Resume Builder,",
    subheading: "Career Accelerator",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
  },
  {
    heading: "AI-Powered Tools,",
    subheading: "Professional Results",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
  },
];

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false, // Keep if needed, but not used in login API
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { loginAction, token, loading: authLoading } = useAuth(); // Get token and loading state

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && token) {
      navigate("/user/dashboard");
    }
  }, [token, authLoading, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setLoading(true);
    try {
      const { email, password } = formData;
      const data = await loginUser({ email, password });
      loginAction(data); // Update auth context with token and user data
      navigate("/dashboard"); // Redirect to dashboard on successful login
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading indicator or null while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-200">Loading...</p>
      </div>
    );
  }

  // If not loading and no token, render the login form
  return (
    <AuthLayout carouselItems={CAROUSEL_ITEMS}>
      <h1 className="text-4xl font-bold text-white mb-4">Welcome back</h1>
      <p className="text-gray-300 mb-8">
        New to our platform?{" "}
        <Link
          to="/signup"
          className="text-indigo-400 hover:text-indigo-300 hover:underline"
        >
          Create an account
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <FormInput
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <PasswordInput
          name="password" // Add name prop
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required // Add required attribute
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="mr-2 h-5 w-5 accent-indigo-600"
            />
            <span>Remember me</span>
          </label>
          <a
            href="#"
            className="text-indigo-400 hover:text-indigo-300 hover:underline text-sm"
          >
            Forgot password?
          </a>
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
            "Sign in"
          )}
        </button>

        <SocialLogin />
      </form>
    </AuthLayout>
  );
};

export default Login;
