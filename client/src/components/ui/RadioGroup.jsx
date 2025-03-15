import React from "react";

const RadioGroup = ({ name, options, value, onChange }) => (
  <div className="space-y-3">
    {options.map((option) => (
      <div key={option.value} className="flex items-center">
        <input
          id={option.value}
          name={name}
          type="radio"
          checked={value === option.value}
          onChange={() => onChange(option.value)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600"
        />
        <label
          htmlFor={option.value}
          className="ml-3 text-sm text-gray-700 dark:text-gray-300"
        >
          {option.label}
        </label>
      </div>
    ))}
  </div>
);

export default RadioGroup;
