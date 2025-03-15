import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiBell, FiSave, FiInfo } from "react-icons/fi";

const ToggleSwitch = ({ id, label, description, enabled, onChange }) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
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

const NotificationSettings = () => {
  const [preferences, setPreferences] = useState({
    // Account Notifications
    securityAlerts: true,
    accountUpdates: false,
    productNews: false,
    tipsTricks: true,

    // Email Frequency
    instant: true,
    daily: false,
    weekly: false,

    // Push Notifications
    pushEnabled: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handlePreferenceChange = (id) => {
    // Special case for email frequency (radio button behavior)
    if (id === "instant" || id === "daily" || id === "weekly") {
      setPreferences({
        ...preferences,
        instant: id === "instant",
        daily: id === "daily",
        weekly: id === "weekly",
      });
    } else {
      setPreferences({
        ...preferences,
        [id]: !preferences[id],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <FiBell className="mr-2 text-gray-600 dark:text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Notification Preferences
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
          <p>Your notification preferences have been saved successfully.</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {/* Account Notifications */}
          <section>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
              Account Notifications
            </h3>
            <div className="space-y-1">
              <ToggleSwitch
                id="securityAlerts"
                label="Security alerts and unusual activity"
                enabled={preferences.securityAlerts}
                onChange={handlePreferenceChange}
              />
              <ToggleSwitch
                id="accountUpdates"
                label="Account updates and changes"
                enabled={preferences.accountUpdates}
                onChange={handlePreferenceChange}
              />
              <ToggleSwitch
                id="productNews"
                label="Product news and feature updates"
                enabled={preferences.productNews}
                onChange={handlePreferenceChange}
              />
              <ToggleSwitch
                id="tipsTricks"
                label="Resume and interview tips & tricks"
                enabled={preferences.tipsTricks}
                onChange={handlePreferenceChange}
              />
            </div>
          </section>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
              Email Frequency
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              How often would you like to receive email notifications?
            </p>

            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  id="instant"
                  name="emailFrequency"
                  type="radio"
                  checked={preferences.instant}
                  onChange={() => handlePreferenceChange("instant")}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600"
                />
                <label
                  htmlFor="instant"
                  className="ml-3 text-sm text-gray-700 dark:text-gray-300"
                >
                  Instant — Send emails as events happen
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="daily"
                  name="emailFrequency"
                  type="radio"
                  checked={preferences.daily}
                  onChange={() => handlePreferenceChange("daily")}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600"
                />
                <label
                  htmlFor="daily"
                  className="ml-3 text-sm text-gray-700 dark:text-gray-300"
                >
                  Daily Digest — One email per day with all updates
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="weekly"
                  name="emailFrequency"
                  type="radio"
                  checked={preferences.weekly}
                  onChange={() => handlePreferenceChange("weekly")}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600"
                />
                <label
                  htmlFor="weekly"
                  className="ml-3 text-sm text-gray-700 dark:text-gray-300"
                >
                  Weekly Digest — One email per week with all updates
                </label>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  Push Notifications
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Enable or disable browser push notifications
                </p>
              </div>

              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  name="pushEnabled"
                  id="push-toggle"
                  checked={preferences.pushEnabled}
                  onChange={() => handlePreferenceChange("pushEnabled")}
                  className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-indigo-500"
                />
                <label
                  htmlFor="push-toggle"
                  className={`block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer ${
                    preferences.pushEnabled
                      ? "bg-indigo-100 dark:bg-indigo-900/30"
                      : ""
                  }`}
                ></label>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md flex">
              <FiInfo className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Push notifications may require additional permissions from your
                browser. If you don't see a permission prompt after enabling
                this option, check your browser settings to ensure notifications
                are allowed.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
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
                Saving...
              </>
            ) : (
              <>
                <FiSave className="mr-2" /> Save Preferences
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotificationSettings;
