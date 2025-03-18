import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSettings } from "react-icons/fi";
import DashboardLayout from "../components/layouts/DashboardLayout";
import SecuritySettings from "../components/settings/SecuritySettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import AppearanceSettings from "../components/settings/AppearanceSettings";
import PrivacySettings from "../components/settings/PrivacySettings";
import PlanSettings from "../components/settings/PlanSettings";

const Settings = () => {
  // Change default state to "security" since it's the default tab
  const [activeTab, setActiveTab] = useState("security");

  const tabs = [
    { id: "security", label: "Security" },
    { id: "notifications", label: "Notifications" },
    { id: "appearance", label: "Appearance" },
    { id: "privacy", label: "Privacy" },
    { id: "plan", label: "Subscription" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "security":
        return <SecuritySettings />;
      case "notifications":
        return <NotificationSettings />;
      case "appearance":
        return <AppearanceSettings />;
      case "privacy":
        return <PrivacySettings />;
      case "plan":
        return <PlanSettings />;
      default:
        return <SecuritySettings />;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-center w-full mt-12 md:mt-0">
        <div className="w-full max-w-6xl px-3 sm:px-6 py-6 md:py-10">
          {/* Page Header */}
          <motion.h1
            className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FiSettings className="inline-block mr-2 mb-1" />
            Settings
          </motion.h1>

          {/* Tabs Navigation */}
          <div className="mb-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`mr-4 py-2 px-1 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                      : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Settings Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6"
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
