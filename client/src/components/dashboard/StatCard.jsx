import React from "react";
import { motion } from "framer-motion";

const StatCard = ({ icon, title, value, color }) => {
  return (
    <motion.div
      className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5 hover:shadow-md transition-shadow"
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex items-center gap-4">
        <div
          className={`h-12 w-12 rounded-lg ${color} flex items-center justify-center`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            {value}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
