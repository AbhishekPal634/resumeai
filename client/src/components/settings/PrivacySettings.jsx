import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiLock,
  FiSave,
  FiEye,
  FiUserCheck,
  FiAlertCircle,
} from "react-icons/fi";

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

const PrivacySettings = () => {
  const [privacySettings, setPrivacySettings] = useState({
    // Profile visibility
    profileVisibility: "public",

    // Resume sharing
    allowResumeDownload: true,
    allowResumeSharing: true,

    // Activity tracking
    trackPageViews: true,
    trackResumeEngagement: true,
    allowAnalyticsCookies: true,

    // Data management
    dataRetentionPeriod: "1year",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrivacySettings({
      ...privacySettings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleToggleChange = (id) => {
    setPrivacySettings((prevSettings) => ({
      ...prevSettings,
      [id]: !prevSettings[id],
    }));
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
        <FiLock className="mr-2 text-gray-600 dark:text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Privacy Settings
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
          <p>Your privacy preferences have been saved successfully.</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {/* Profile Visibility */}
          <section>
            <div className="flex items-center mb-4">
              <FiEye className="mr-2 text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Profile Visibility
              </h3>
            </div>

            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Control who can view your profile information and how it appears
              to others.
            </p>

            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  id="public"
                  name="profileVisibility"
                  type="radio"
                  value="public"
                  checked={privacySettings.profileVisibility === "public"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600"
                />
                <label htmlFor="public" className="ml-3">
                  <span className="block text-sm font-medium text-gray-800 dark:text-white">
                    Public
                  </span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    Your profile is visible to everyone, including search
                    engines
                  </span>
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="limited"
                  name="profileVisibility"
                  type="radio"
                  value="limited"
                  checked={privacySettings.profileVisibility === "limited"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600"
                />
                <label htmlFor="limited" className="ml-3">
                  <span className="block text-sm font-medium text-gray-800 dark:text-white">
                    Limited
                  </span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    Only registered users of our platform can view your profile
                  </span>
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="private"
                  name="profileVisibility"
                  type="radio"
                  value="private"
                  checked={privacySettings.profileVisibility === "private"}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600"
                />
                <label htmlFor="private" className="ml-3">
                  <span className="block text-sm font-medium text-gray-800 dark:text-white">
                    Private
                  </span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    Only companies you apply to can see your profile
                  </span>
                </label>
              </div>
            </div>
          </section>

          {/* Resume Access Controls */}
          <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <FiUserCheck className="mr-2 text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Resume Sharing
              </h3>
            </div>

            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Manage how your resume can be accessed and shared by recruiters
              and employers.
            </p>

            <div className="space-y-4">
              <ToggleSwitch
                id="allowResumeDownload"
                label="Allow employers to download my resume as a PDF"
                enabled={privacySettings.allowResumeDownload}
                onChange={() =>
                  handleInputChange({
                    target: {
                      name: "allowResumeDownload",
                      type: "checkbox",
                      checked: !privacySettings.allowResumeDownload,
                    },
                  })
                }
              />
              <ToggleSwitch
                id="allowResumeSharing"
                label="Allow employers to share my profile with hiring managers"
                enabled={privacySettings.allowResumeSharing}
                onChange={() =>
                  handleInputChange({
                    target: {
                      name: "allowResumeSharing",
                      type: "checkbox",
                      checked: !privacySettings.allowResumeSharing,
                    },
                  })
                }
              />
            </div>
          </section>

          {/* Activity Tracking */}
          <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <FiAlertCircle className="mr-2 text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Data & Privacy
              </h3>
            </div>

            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Control how we collect and use your data to improve your
              experience.
            </p>

            <div className="space-y-4">
              <ToggleSwitch
                id="trackPageViews"
                label="Allow usage data collection to improve app functionality"
                enabled={privacySettings.trackPageViews}
                onChange={() =>
                  handleInputChange({
                    target: {
                      name: "trackPageViews",
                      type: "checkbox",
                      checked: !privacySettings.trackPageViews,
                    },
                  })
                }
              />
              <ToggleSwitch
                id="trackResumeEngagement"
                label="Track resume engagement (views, downloads, time spent)"
                enabled={privacySettings.trackResumeEngagement}
                onChange={() =>
                  handleInputChange({
                    target: {
                      name: "trackResumeEngagement",
                      type: "checkbox",
                      checked: !privacySettings.trackResumeEngagement,
                    },
                  })
                }
              />
              <ToggleSwitch
                id="allowAnalyticsCookies"
                label="Allow analytics cookies"
                enabled={privacySettings.allowAnalyticsCookies}
                onChange={() =>
                  handleInputChange({
                    target: {
                      name: "allowAnalyticsCookies",
                      type: "checkbox",
                      checked: !privacySettings.allowAnalyticsCookies,
                    },
                  })
                }
              />
            </div>
          </section>

          {/* Data Retention */}
          <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">
              Data Retention
            </h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Choose how long we keep your data after your account becomes
              inactive.
            </p>

            <select
              name="dataRetentionPeriod"
              value={privacySettings.dataRetentionPeriod}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="90days" className="bg-white dark:bg-gray-800">
                Delete after 90 days of inactivity
              </option>
              <option value="6months" className="bg-white dark:bg-gray-800">
                Delete after 6 months of inactivity
              </option>
              <option value="1year" className="bg-white dark:bg-gray-800">
                Delete after 1 year of inactivity
              </option>
              <option value="never" className="bg-white dark:bg-gray-800">
                Keep indefinitely
              </option>
            </select>
          </section>

          {/* Data Export & Deletion */}
          <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-800 dark:text-white mb-4">
              Download or Delete Your Data
            </h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              You can download a copy of your data or request permanent deletion
              of your account.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-md hover:bg-indigo-100 dark:hover:bg-indigo-900/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Download Your Data
              </button>

              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md hover:bg-red-100 dark:hover:bg-red-900/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete Account
              </button>
            </div>
          </section>
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
                <FiSave className="mr-2" /> Save Privacy Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrivacySettings;
