import React from "react";
import { motion } from "framer-motion";
import { FiStar, FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const AccountPlan = ({ plan, memberSince }) => {
  const isPro = plan === "Pro";
  const isEnterprise = plan === "Enterprise";

  return (
    <motion.div
      className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
        <FiStar className="mr-2 text-indigo-600 dark:text-indigo-400" />
        Account
      </h2>

      <div
        className={`py-4 px-5 rounded-lg mb-4 ${
          isEnterprise
            ? "bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20"
            : isPro
            ? "bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 border border-indigo-500/20"
            : "bg-slate-100 dark:bg-slate-800/50"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3
              className={`font-medium ${
                isEnterprise
                  ? "text-purple-600 dark:text-purple-400"
                  : isPro
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-slate-900 dark:text-white"
              }`}
            >
              {plan} Plan
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Member since {memberSince}
            </p>
          </div>

          {isEnterprise && (
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <span className="text-purple-600 dark:text-purple-400 text-sm font-bold">
                E
              </span>
            </div>
          )}

          {isPro && (
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <span className="text-indigo-600 dark:text-indigo-400 text-sm font-bold">
                P
              </span>
            </div>
          )}

          {!isPro && !isEnterprise && (
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
              <span className="text-slate-600 dark:text-slate-300 text-sm font-bold">
                F
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-400">
            Resume Credits
          </span>
          <span className="font-medium text-slate-900 dark:text-white">
            {isEnterprise ? "Unlimited" : isPro ? "10 / month" : "3 / month"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-400">Templates</span>
          <span className="font-medium text-slate-900 dark:text-white">
            {isEnterprise ? "All + Custom" : isPro ? "All" : "Basic"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-400">
            AI Features
          </span>
          <span className="font-medium text-slate-900 dark:text-white">
            {isEnterprise ? "Advanced" : isPro ? "Standard" : "Limited"}
          </span>
        </div>
      </div>

      {!isEnterprise && (
        <Link
          to="/pricing"
          className="mt-5 flex items-center justify-center p-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50 rounded-lg transition-colors"
        >
          {isPro ? "Upgrade to Enterprise" : "Upgrade to Pro"}
          <FiArrowUpRight className="ml-2" />
        </Link>
      )}
    </motion.div>
  );
};

export default AccountPlan;
