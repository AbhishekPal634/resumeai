import React, { useState, useEffect } from "react";
import { FiMonitor, FiSun, FiMoon } from "react-icons/fi";
import SectionHeader from "../ui/SectionHeader";
import Section from "../ui/Section";
import ThemeOption from "../ui/ThemeOption";
import SuccessAlert from "../ui/SuccessAlert";
import SaveButton from "../ui/SaveButton";

const AppearanceSettings = () => {
  const [selectedTheme, setSelectedTheme] = useState("system");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Simulate getting current theme from system
  useEffect(() => {
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
      <SectionHeader icon={FiMonitor} title="Appearance Settings" />

      {saveSuccess && (
        <SuccessAlert message="Your appearance settings have been updated." />
      )}

      <form onSubmit={handleSave}>
        <Section title="Theme" noBorder className="mb-8">
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
        </Section>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex justify-end">
            <SaveButton isSaving={isSaving} text="Save Theme Settings" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppearanceSettings;
