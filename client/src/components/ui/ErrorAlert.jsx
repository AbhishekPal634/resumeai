import React from "react";
import { motion } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";

const ErrorAlert = ({ message }) => (
  <motion.div
    className="mb-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-md flex items-start"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <FiAlertTriangle className="mr-2 mt-0.5 flex-shrink-0" />
    <p className="text-sm">{message}</p>
  </motion.div>
);

export default ErrorAlert;
