import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import FormInput from "../components/auth/FormInput";
import PasswordInput from "../components/auth/PasswordInput";
import SocialLogin from "../components/auth/SocialLogin";

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
            />
          </div>
          <div>
            <FormInput
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
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
          />
        </div>

        <PasswordInput
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        <div>
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="mr-2 h-5 w-5 accent-indigo-600"
              required
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

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 cursor-pointer transition duration-300 flex items-center justify-center"
        >
          Create account
        </button>

        <SocialLogin />
      </form>
    </AuthLayout>
  );
};

export default Signup;
