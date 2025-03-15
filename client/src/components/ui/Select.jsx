import React from "react";

const Select = ({ value, onChange, options, className = "", ...props }) => (
  <select
    value={value}
    onChange={onChange}
    className={`mt-1 block w-full pl-3 pr-10 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
    {...props}
  >
    {options.map((option) => (
      <option
        key={option.value}
        value={option.value}
        className="bg-white dark:bg-gray-800"
      >
        {option.label}
      </option>
    ))}
  </select>
);

export default Select;
