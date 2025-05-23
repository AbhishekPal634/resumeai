import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiPlus,
  FiRefreshCw,
  FiFileText,
  FiBarChart2,
  FiBriefcase,
  FiAward,
  FiDollarSign,
  FiArrowRight,
  FiSettings,
  FiGift,
  FiTarget,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext"; // Import useAuth

// Import Dashboard Components
import DashboardLayout from "../components/layouts/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import ActionCard from "../components/dashboard/ActionCard";
import ResumeTable from "../components/dashboard/ResumeTable";
import WelcomeHeader from "../components/dashboard/WelcomeHeader";

// Main Dashboard Component
const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from AuthContext

  // Determine the user's display name
  const displayName = user?.firstName ? user.firstName : user?.email ? user.email.split('@')[0] : 'User';

  const handleCreateResume = () => {
    navigate("/resume/templates");
  };

  // const handleUpdateResume = () => {
  //   navigate("/resume-editor");
  // };

  const handleEditResume = (resume) => {
    console.log("Editing resume:", resume);
    navigate(`/resume-editor/${resume.id}`);
  };

  const handleDownloadResume = (resume) => {
    console.log("Downloading resume:", resume);
    // Implement download functionality here
  };

  // Mock resume data
  const resumes = [
    // {
    //   id: 1,
    //   name: "Software Developer Resume",
    //   date: "Mar 12, 2025",
    //   status: "Active",
    // },
    // {
    //   id: 2,
    //   name: "Product Manager Resume",
    //   date: "Feb 28, 2025",
    //   status: "Draft",
    // },
  ];
  // Empty state component for document table
  const emptyStateComponent = (
    <div className="text-center py-12">
      <FiFileText className="mx-auto h-12 w-12 text-slate-400" />
      <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
        No documents yet
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Get started by creating a new resume or cover letter.
      </p>      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={handleCreateResume}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <FiFileText className="mr-2 h-4 w-4" />
          New Resume
        </button>
        <button
          onClick={() => navigate("/cover-letter/new")}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700"
        >
          <FiFileText className="mr-2 h-4 w-4" />
          New Cover Letter
        </button>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 mt-12 md:mt-0 max-w-7xl mx-auto">
        {/* Welcome Header - Pass dynamic displayName */}
        <div className="mb-8">
          <WelcomeHeader userName={displayName} tokens={2} /> {/* Use displayName */}
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >          <StatCard
            icon={
              <FiFileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            }
            title="Resumes Created"
            value="1"
            color="bg-indigo-100 dark:bg-indigo-900/30"
          />

          <StatCard
            icon={
              <FiFileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            }
            title="Cover Letters Created"
            value="1"
            color="bg-indigo-100 dark:bg-indigo-900/30"
          />

          <StatCard
            icon={
              <FiAward className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            }
            title="Current Plan"
            value="Free Tier"
            color="bg-indigo-100 dark:bg-indigo-900/30"
          />
        </motion.div>

        {/* Quick Actions Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center">
              <FiSettings className="mr-2 h-5 w-5 text-indigo-500" />
              Quick Actions
            </h2>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">            <Link to="/resume/templates">
              <ActionCard
                title="Create New Resume"
                description="Build your resume with AI"
                bgGradient="bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600"
                icon={<FiFileText className="h-6 w-6" />}
                onClick={() => {}}
                delay={0}
              />
            </Link>

            <ActionCard
              title="Create New Cover Letter"
              description="Craft a compelling cover letter"
              bgGradient="bg-gradient-to-br from-indigo-500 to-purple-600"
              icon={<FiFileText className="h-6 w-6" />}
              onClick={() => {}}
              delay={0.1}
            />

            <Link to="/resume/jobmatch">
              <ActionCard
                title="Job Match Score"
                description="See how you match with jobs"
                bgGradient="bg-gradient-to-br from-indigo-500 to-purple-600"
                icon={<FiTarget className="h-6 w-6" />}
                onClick={() => {}}
                delay={0.3}
              />
            </Link>

            <ActionCard
              title="Request Credits"
              description="Get more resume builds"
              bgGradient="bg-gradient-to-br from-indigo-500 to-purple-600"
              icon={<FiGift className="h-6 w-6" />}
              onClick={() => {}}
              delay={0.2}
            />
          </div>
        </motion.div>        {/* Document Activity Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center">
              <FiFileText className="mr-2 h-5 w-5 text-indigo-500" />
              Recent Documents
            </h2>            <Link
              to="/documents"
              className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
            >
              View all
              <FiArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>          {/* Documents Table */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <ResumeTable
              resumes={resumes}
              onEdit={handleEditResume}
              onDownload={handleDownloadResume}
              emptyState={emptyStateComponent}
            />
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
