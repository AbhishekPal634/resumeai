import React from "react";

const FormInput = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = true,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-indigo-500 focus:outline-none"
      required={required}
    />
  );
};

export default FormInput;
