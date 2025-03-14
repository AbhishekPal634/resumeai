import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import FormInput from "../components/auth/FormInput";
import PasswordInput from "../components/auth/PasswordInput";
import SocialLogin from "../components/auth/SocialLogin";

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
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

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
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
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

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 cursor-pointer transition duration-300 flex items-center justify-center"
        >
          Sign in
        </button>

        <SocialLogin />
      </form>
    </AuthLayout>
  );
};

export default Login;
