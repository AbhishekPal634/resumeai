import React from "react";

const RadioOption = ({ id, name, label, description, checked, onChange }) => (
  <div className="flex items-center">
    <input
      id={id}
      name={name}
      type="radio"
      value={id}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600"
    />
    <label htmlFor={id} className="ml-3">
      <span className="block text-sm font-medium text-gray-800 dark:text-white">
        {label}
      </span>
      {description && (
        <span className="block text-xs text-gray-500 dark:text-gray-400">
          {description}
        </span>
      )}
    </label>
  </div>
);

export default RadioOption;
