import React from "react";

const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  description,
  ...props
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100 dark:bg-slate-800 focus:ring-indigo-500 focus:border-indigo-500"
      {...props}
    />
    {description && (
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {description}
      </p>
    )}
  </div>
);

export default FormInput;
