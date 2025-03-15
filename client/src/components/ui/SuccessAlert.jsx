import React from "react";
import { motion } from "framer-motion";

const SuccessAlert = ({ message }) => (
  <motion.div
    className="mb-6 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-md flex items-start"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <svg
      className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
    <p>{message}</p>
  </motion.div>
);

export default SuccessAlert;
