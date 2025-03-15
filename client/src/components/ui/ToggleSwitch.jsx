import React from "react";

const ToggleSwitch = ({ id, label, description, enabled, onChange }) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <label
          htmlFor={id}
          className="text-sm text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {description}
          </p>
        )}
      </div>
      <div className="relative inline-block w-12 align-middle select-none">
        <input
          type="checkbox"
          name={id}
          id={id}
          checked={enabled}
          onChange={() => onChange(id)}
          className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-indigo-500"
        />
        <label
          htmlFor={id}
          className={`block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer ${
            enabled ? "bg-indigo-100 dark:bg-indigo-900/30" : ""
          }`}
        ></label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
