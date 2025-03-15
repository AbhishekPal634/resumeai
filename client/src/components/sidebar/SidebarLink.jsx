import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Utility function for className concatenation
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const SidebarLink = ({ link, open, handleLogout }) => {
  // Check if this link is for logout
  const isLogout = link.label === "Logout";

  // Determine if this is the Dashboard link (active)
  const isActive = link.label === "Dashboard";

  const linkClasses = cn(
    "flex items-center gap-3 px-2 py-2.5 rounded-lg transition-colors",
    "text-gray-300 group/sidebar",
    "hover:bg-gray-800 dark:hover:bg-gray-800",
    isActive && "bg-gray-800 font-medium text-white" // Less blue, more white for active
  );

  if (isLogout) {
    return (
      <a
        href={link.href}
        onClick={(e) => {
          e.preventDefault();
          if (handleLogout) handleLogout();
        }}
        className={linkClasses}
      >
        <div className="w-5 h-5 shrink-0">{link.icon}</div>
        {open && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="whitespace-nowrap group-hover/sidebar:translate-x-1 transition-transform duration-150"
          >
            {link.label}
          </motion.span>
        )}
      </a>
    );
  }

  return (
    <Link to={link.href} className={linkClasses}>
      <div className="w-5 h-5 shrink-0">{link.icon}</div>
      {open && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="whitespace-nowrap group-hover/sidebar:translate-x-1 transition-transform duration-150"
        >
          {link.label}
        </motion.span>
      )}
    </Link>
  );
};

export default SidebarLink;
