import React from "react";
import { motion } from "framer-motion";
import { FiFileText, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const ResumeActivity = ({ activities }) => {
  return (
    <motion.div
      className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
          <FiFileText className="mr-2 text-indigo-600 dark:text-indigo-400" />
          Resume Activity
        </h2>

        <Link
          to="/dashboard"
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center"
        >
          View all
          <FiArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="divide-y divide-slate-200 dark:divide-slate-800">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="py-3 flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-3">
                <FiFileText size={20} />
              </div>
              <div>
                <h3 className="text-slate-900 dark:text-white font-medium">
                  {activity.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {activity.date}
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
              {activity.status}
            </span>
          </div>
        ))}

        {activities.length === 0 && (
          <div className="py-8 text-center text-slate-500 dark:text-slate-400">
            No resume activity found
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResumeActivity;
