import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({
  value,
  onChange,
  placeholder = "Password",
  name = "password",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 pr-10 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:outline-none"
        required
      />
      <button
        type="button"
        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200"
        aria-label="Toggle password visibility"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
      </button>
    </div>
  );
};

export default PasswordInput;
