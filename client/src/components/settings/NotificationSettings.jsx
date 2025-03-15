import React, { useState } from "react";
import { FiBell, FiInfo } from "react-icons/fi";
import SectionHeader from "../ui/SectionHeader";
import ToggleSwitch from "../ui/ToggleSwitch";
import SuccessAlert from "../ui/SuccessAlert";
import SaveButton from "../ui/SaveButton";
import Card from "../ui/Card";
import RadioGroup from "../ui/RadioGroup";
import InfoAlert from "../ui/InfoAlert";

const NotificationSettings = () => {
  const [preferences, setPreferences] = useState({
    securityAlerts: true,
    accountUpdates: false,
    productNews: false,
    tipsTricks: true,
    instant: true,
    daily: false,
    weekly: false,
    pushEnabled: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handlePreferenceChange = (id) => {
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

      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };

  const emailFrequencyOptions = [
    {
      value: "instant",
      label: "Instant — Send emails as events happen",
    },
    {
      value: "daily",
      label: "Daily Digest — One email per day with all updates",
    },
    {
      value: "weekly",
      label: "Weekly Digest — One email per week with all updates",
    },
  ];

  return (
    <div>
      <SectionHeader icon={FiBell} title="Notification Preferences" />

      {saveSuccess && (
        <SuccessAlert message="Your notification preferences have been saved successfully." />
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {/* Account Notifications */}
          <section>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
              Account Notifications
            </h3>
            <div className="space-y-4">
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

          {/* Email Frequency */}
          <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
              Email Frequency
            </h3>
            <RadioGroup
              name="emailFrequency"
              options={emailFrequencyOptions}
              value={
                preferences.instant
                  ? "instant"
                  : preferences.daily
                  ? "daily"
                  : "weekly"
              }
              onChange={handlePreferenceChange}
            />
          </section>

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

              <ToggleSwitch
                id="pushEnabled"
                enabled={preferences.pushEnabled}
                onChange={handlePreferenceChange}
              />
            </div>

            <div className="mt-4">
              <InfoAlert message="Push notifications may require additional permissions from your browser. If you don't see a permission prompt after enabling this option, check your browser settings to ensure notifications are allowed." />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <SaveButton
            isSaving={isSaving}
            text="Save Notification Preferences"
          />
        </div>
      </form>
    </div>
  );
};

export default NotificationSettings;
