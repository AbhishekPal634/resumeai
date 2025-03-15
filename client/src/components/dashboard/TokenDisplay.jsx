import React from "react";
import { FaCoins } from "react-icons/fa6";
import { motion } from "framer-motion";

const TokenDisplay = ({ tokens = 2 }) => {
  return (
    <motion.div
      className="flex items-center bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-full px-4 py-2 shadow-sm border border-indigo-900/30 dark:border-indigo-700/30"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <FaCoins className="h-5 w-5 text-amber-500 mr-2" />
      <span className="text-sm font-medium text-slate-700 dark:text-indigo-300">
        {tokens} Token{tokens !== 1 ? "s" : ""}
      </span>
    </motion.div>
  );
};

export default TokenDisplay;
