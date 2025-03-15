import React from "react";

const ThemeOption = ({ id, label, icon, description, selected, onChange }) => (
  <div
    className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
      selected
        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
        : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
    }`}
    onClick={() => onChange(id)}
  >
    <div className="flex items-center">
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full ${
          selected
            ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400"
            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
        }`}
      >
        {icon}
      </div>
      <div className="ml-4">
        <h3 className="font-medium text-gray-900 dark:text-white">{label}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  </div>
);

export default ThemeOption;
