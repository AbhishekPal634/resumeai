import React from "react";

const variants = {
  success:
    "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400",
  warning:
    "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400",
  error: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400",
  info: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400",
};

const StatusBadge = ({ variant = "info", children }) => (
  <span
    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${variants[variant]}`}
  >
    {children}
  </span>
);

export default StatusBadge;
