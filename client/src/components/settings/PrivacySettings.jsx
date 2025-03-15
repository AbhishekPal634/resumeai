import React, { useState } from "react";
import {
  FiLock,
  FiEye,
  FiUserCheck,
  FiAlertCircle,
  FiDownload,
  FiTrash2,
} from "react-icons/fi";
import SectionHeader from "../ui/SectionHeader";
import Section from "../ui/Section";
import ToggleSwitch from "../ui/ToggleSwitch";
import RadioGroup from "../ui/RadioGroup";
import Select from "../ui/Select";
import SuccessAlert from "../ui/SuccessAlert";
import SaveButton from "../ui/SaveButton";
import Button from "../ui/Button";

const PrivacySettings = () => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    allowResumeDownload: true,
    allowResumeSharing: true,
    trackPageViews: true,
    trackResumeEngagement: true,
    allowAnalyticsCookies: true,
    dataRetentionPeriod: "1year",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrivacySettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const visibilityOptions = [
    {
      value: "public",
      label: "Public",
      description:
        "Your profile is visible to everyone, including search engines",
    },
    {
      value: "limited",
      label: "Limited",
      description:
        "Only registered users of our platform can view your profile",
    },
    {
      value: "private",
      label: "Private",
      description: "Only companies you apply to can see your profile",
    },
  ];

  const retentionOptions = [
    { value: "90days", label: "Delete after 90 days of inactivity" },
    { value: "6months", label: "Delete after 6 months of inactivity" },
    { value: "1year", label: "Delete after 1 year of inactivity" },
    { value: "never", label: "Keep indefinitely" },
  ];

  return (
    <div>
      <SectionHeader icon={FiLock} title="Privacy Settings" />

      {saveSuccess && (
        <SuccessAlert message="Your privacy preferences have been saved successfully." />
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          <Section
            title="Profile Visibility"
            icon={FiEye}
            description="Control who can view your profile information and how it appears to others."
            noBorder
          >
            <RadioGroup
              name="profileVisibility"
              options={visibilityOptions}
              value={privacySettings.profileVisibility}
              onChange={handleInputChange}
            />
          </Section>

          <Section
            title="Resume Sharing"
            icon={FiUserCheck}
            description="Manage how your resume can be accessed and shared by recruiters and employers."
          >
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
          </Section>

          <Section
            title="Data & Privacy"
            icon={FiAlertCircle}
            description="Control how we collect and use your data to improve your experience."
          >
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
          </Section>

          <Section
            title="Data Retention"
            description="Choose how long we keep your data after your account becomes inactive."
          >
            <Select
              name="dataRetentionPeriod"
              value={privacySettings.dataRetentionPeriod}
              onChange={handleInputChange}
              options={retentionOptions}
            />
          </Section>

          <Section
            title="Download or Delete Your Data"
            description="You can download a copy of your data or request permanent deletion of your account."
          >
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                icon={FiDownload}
                onClick={() => console.log("Download data")}
              >
                Download Your Data
              </Button>
              <Button
                variant="danger"
                icon={FiTrash2}
                onClick={() => console.log("Delete account")}
              >
                Delete Account
              </Button>
            </div>
          </Section>
        </div>

        <div className="mt-8 flex justify-end">
          <SaveButton isSaving={isSaving} text="Save Privacy Settings" />
        </div>
      </form>
    </div>
  );
};

export default PrivacySettings;
