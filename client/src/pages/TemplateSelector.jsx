import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { templates } from "../components/templates/resume/templateRegistry";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { FiArrowRight, FiPlus, FiDownload, FiEdit } from "react-icons/fi";

const TemplateSelector = () => {
  const userResumes = [
    { id: 1, name: "Software Developer Resume", lastModified: "2024-03-16" },
    { id: 2, name: "Product Manager Resume", lastModified: "2024-03-15" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 mt-8">
        {/* Templates Section - Now Above */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
                Resume Templates
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Choose a template to get started with your new resume
              </p>
            </div>
            {Object.keys(templates).length > 4 && (
              <Link
                to="/templates"
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium inline-flex items-center"
              >
                View All Templates
                <FiArrowRight className="ml-2" />
              </Link>
            )}
          </div>

          {/* Modified grid with A4 ratio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(templates)
              .slice(0, 3)
              .map(([id, template]) => (
                <motion.div
                  key={id}
                  className="group relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className="relative w-full"
                    style={{ paddingBottom: "141.4%" }}
                  >
                    <img
                      src={template.thumbnail || "/templates/default-thumb.png"}
                      alt={template.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/templates/default-thumb.png";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 p-6 w-full">
                        <h3 className="text-white font-medium text-base mb-3">
                          {template.name}
                        </h3>
                        <Link
                          to={`/resume/new?template=${id}`}
                          className="inline-flex items-center text-sm text-indigo-400 hover:text-indigo-300"
                        >
                          Use Template
                          <FiArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                      </div>
                      {template.premium && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm px-3 py-1 rounded-full">
                          PRO
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* My Resumes Section - Now Below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
                My Resumes
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Manage and edit your existing resumes
              </p>
            </div>
            {/* <button className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
              <FiPlus className="mr-2" />
              Create New
            </button> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userResumes.map((resume) => (
              <div
                key={resume.id}
                className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                  {resume.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Last modified: {resume.lastModified}
                </p>
                <div className="flex space-x-4">
                  <Link
                    to={`/resume/edit/${resume.id}`}
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    <FiEdit className="mr-1" /> Edit
                  </Link>
                  <button className="inline-flex items-center text-slate-600 hover:text-slate-700 text-sm font-medium">
                    <FiDownload className="mr-1" /> PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default TemplateSelector;
