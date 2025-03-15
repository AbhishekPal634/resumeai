import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMonitor, FiSun, FiMoon, FiSave } from "react-icons/fi";

const ThemeOption = ({ id, label, icon, description, selected, onChange }) => {
  return (
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
};

const AppearanceSettings = () => {
  const [selectedTheme, setSelectedTheme] = useState("system");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Simulate getting current theme from system
  useEffect(() => {
    // This would typically come from your theme context or state management
    const userPreferences = {
      theme: "system",
    };

    setSelectedTheme(userPreferences.theme);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    // Simulate API call or state update
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);

      // Real app would update the theme here
      document.documentElement.classList.toggle(
        "dark",
        selectedTheme === "dark"
      );

      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };

  // Theme options
  const themeOptions = [
    {
      id: "light",
      label: "Light",
      icon: <FiSun size={20} />,
      description: "Use light mode for a bright, clean interface.",
    },
    {
      id: "dark",
      label: "Dark",
      icon: <FiMoon size={20} />,
      description:
        "Switch to dark mode to reduce eye strain in low-light environments.",
    },
    {
      id: "system",
      label: "System",
      icon: <FiMonitor size={20} />,
      description:
        "Automatically adjust theme based on your system preferences.",
    },
  ];

  return (
    <div>
      <div className="flex items-center mb-6">
        <FiMonitor className="mr-2 text-gray-600 dark:text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Appearance Settings
        </h2>
      </div>

      {saveSuccess && (
        <motion.div
          className="mb-6 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-md flex items-start"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <svg
            className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <p>Your appearance settings have been updated.</p>
        </motion.div>
      )}

      <form onSubmit={handleSave}>
        {/* Theme Selection */}
        <section className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            Theme
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themeOptions.map((option) => (
              <ThemeOption
                key={option.id}
                id={option.id}
                label={option.label}
                icon={option.icon}
                description={option.description}
                selected={selectedTheme === option.id}
                onChange={setSelectedTheme}
              />
            ))}
          </div>
        </section>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center disabled:opacity-70"
            >
              {isSaving ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Applying...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" /> Save Theme Settings
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppearanceSettings;
