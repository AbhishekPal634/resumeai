import React from "react";
import { motion } from "framer-motion";

const ActionCard = ({
  title,
  description,
  icon,
  bgGradient,
  onClick,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      onClick={onClick}
      className="group cursor-pointer bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 hover:shadow-md transition-all relative overflow-hidden"
      whileHover={{ y: -5 }}
    >
      <div
        className={`absolute -right-6 -top-6 h-16 w-16 rounded-full ${bgGradient} opacity-10 group-hover:opacity-20 transition-opacity`}
      ></div>
      <div
        className={`h-10 w-10 rounded-lg ${bgGradient} flex items-center justify-center text-white mb-4`}
      >
        {icon}
      </div>
      <h3 className="text-sm font-medium text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
        {description}
      </p>
    </motion.div>
  );
};

export default ActionCard;
