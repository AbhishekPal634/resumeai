import React, { useState, useEffect } from "react";
import {
  FaRobot,
  FaSpinner,
  FaEdit,
  FaSave,
  FaFileDownload,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "./DashboardLayout";

export default function ResumeEditorLayout({
  children,
  onBack,
  resumeName,
  onResumeNameChange,
  onSave,
  onExport,
  isSaving,
  isDownloading,
  saveSuccess,
  downloadSuccess,
  showChatbot,
  setShowChatbot,
  chatbotComponent,
}) {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsLargeScreen(width >= 1024);
      if (width >= 1024) {
        setShowChatbot(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setShowChatbot]);

  const editorContent = (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-900">
      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-6 flex space-x-4 overflow-hidden">
        {/* Main Editor Area */}
        <div
          className={`relative flex-1 ${isLargeScreen ? "flex space-x-4" : ""}`}
        >
          <motion.div
            layout
            className={`relative ${
              isLargeScreen ? "w-[65%]" : "w-full"
            } bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden 
            border border-slate-200 dark:border-slate-700`}
          >
            {/* Opaque Background for Controls */}
            <div className="absolute top-0 right-0 left-0 h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 z-10" />

            {/* Editor Controls */}
            <div className="absolute right-4 top-4 flex items-center space-x-3 z-20">
              <div className="relative">
                <input
                  type="text"
                  value={resumeName}
                  onChange={(e) => onResumeNameChange(e.target.value)}
                  className="py-1.5 px-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-500 
                           rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           text-slate-800 dark:text-slate-200 transition-all duration-200"
                  placeholder="Resume name"
                />
                <FaEdit className="absolute right-2.5 top-2 w-4 h-4 text-slate-400" />
              </div>

              {/* Save Button */}
              <button
                onClick={onSave}
                disabled={isSaving}
                className={`flex items-center px-4 py-1.5 rounded-lg transition-all duration-200 ${
                  isSaving
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                    : saveSuccess
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "bg-indigo-500 text-white hover:bg-indigo-600"
                }`}
              >
                {isSaving ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    <span>Saving...</span>
                  </>
                ) : saveSuccess ? (
                  <>
                    <FaCheck className="mr-2" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    <span>Save</span>
                  </>
                )}
              </button>

              {/* Export Button */}
              <button
                onClick={onExport}
                disabled={isDownloading}
                className={`flex items-center px-4 py-1.5 rounded-lg transition-all duration-200 ${
                  isDownloading
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                    : downloadSuccess
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "bg-violet-500 text-white hover:bg-violet-600"
                }`}
              >
                {isDownloading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    <span>Exporting...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <FaCheck className="mr-2" />
                    <span>Downloaded!</span>
                  </>
                ) : (
                  <>
                    <FaFileDownload className="mr-2" />
                    <span>Export PDF</span>
                  </>
                )}
              </button>
            </div>

            {/* Editor Content with adjusted padding */}
            <div className="h-full overflow-y-auto scrollbar-hide pt-16">
              {children}
            </div>
          </motion.div>

          {/* Enhanced Chatbot Section */}
          <AnimatePresence>
            {(showChatbot || isLargeScreen) && (
              <motion.div
                initial={
                  isLargeScreen ? { opacity: 1 } : { opacity: 0, y: "100%" }
                }
                animate={
                  isLargeScreen ? { opacity: 1 } : { opacity: 1, y: "0%" }
                }
                exit={
                  isLargeScreen ? { opacity: 0 } : { opacity: 0, y: "100%" }
                }
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className={`${
                  isLargeScreen
                    ? "w-[35%]"
                    : "fixed inset-x-4 top-16 bottom-12 z-50"
                } bg-white dark:bg-slate-800 flex flex-col overflow-hidden
                rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800`}
              >
                {/* Refined Chatbot Header */}
                <div
                  className={`bg-gradient-to-r from-indigo-500 to-violet-500 py-3 px-4 flex justify-between items-center flex-shrink-0
                           ${!isLargeScreen && "border-b border-white/10"}`}
                >
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mr-3 border border-white/20">
                      <FaRobot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="text-white font-medium">
                        Resume Assistant
                      </h2>
                      <p className="text-white text-xs">AI-powered help</p>
                    </div>
                  </div>
                  {!isLargeScreen && (
                    <button
                      onClick={() => setShowChatbot(false)}
                      className="text-white hover:text-white hover:bg-white/10 p-2 rounded-full transition-all duration-200"
                      aria-label="Close assistant"
                    >
                      <FaTimes className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Chatbot Content */}
                <div className="flex-1 overflow-hidden">{chatbotComponent}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Refined Floating Chat Button */}
        {!isLargeScreen && !showChatbot && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
            onClick={() => setShowChatbot(true)}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 
                     text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-50
                     border border-white"
            aria-label="Open assistant"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaRobot className="w-6 h-6" />
          </motion.button>
        )}
      </div>
    </div>
  );

  return <DashboardLayout>{editorContent}</DashboardLayout>;
}
