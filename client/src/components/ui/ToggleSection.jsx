import React from "react";

const ToggleSection = ({
  icon: Icon,
  title,
  description,
  enabled,
  onChange,
  actionButton,
}) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        {Icon && <Icon className="mr-2 text-gray-600 dark:text-gray-400" />}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h2>
      </div>
      <div className="relative inline-block w-12 mr-2 align-middle select-none">
        <input
          type="checkbox"
          name="toggle"
          id={`toggle-${title.toLowerCase().replace(/\s+/g, "-")}`}
          checked={enabled}
          onChange={onChange}
          className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-indigo-500"
        />
        <label
          htmlFor={`toggle-${title.toLowerCase().replace(/\s+/g, "-")}`}
          className={`block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer ${
            enabled ? "bg-indigo-100 dark:bg-indigo-900/30" : ""
          }`}
        ></label>
      </div>
    </div>

    {description && (
      <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-2xl">
        {description}
      </p>
    )}

    {actionButton && <div className="mt-4">{actionButton}</div>}
  </div>
);

export default ToggleSection;
