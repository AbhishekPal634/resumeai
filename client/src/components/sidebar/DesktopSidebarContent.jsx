import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const DesktopSidebarContent = ({
  open,
  links,
  userName,
  userInitials,
}) => {
  // Separate regular links and logout link
  const navigationLinks = links.filter((link) => link.action === undefined); // Filter by checking if action exists
  const logoutLink = links.find((link) => link.action !== undefined); // Find the link with an action

  return (
    <>
      {/* Logo and header */}
      <div className="flex justify-center items-center mb-8">
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-2xl font-bold text-white"
          >
            Resume<span className="text-indigo-400">AI</span>
          </motion.div>
        ) : (
          <span className="text-2xl font-bold text-indigo-400">AI</span>
        )}
      </div>

      {/* Navigation Links - excluding logout */}
      <div className="flex-1 px-3">
        <ul className="space-y-1">
          {navigationLinks.map((link, idx) => (
            <li key={idx}>
              <Link
                to={link.href}
                className={`flex items-center rounded-lg transition-colors ${
                  link.active
                    ? "bg-indigo-900/50 text-white" // Active state styling
                    : "hover:bg-gray-800 text-gray-300"
                } ${
                  open ? "px-3 py-2.5 justify-start" : "p-2.5 justify-center"
                }`}
              >
                <div className={link.active ? "text-indigo-400" : ""}>
                  {link.icon}
                </div>

                <AnimatePresence>
                  {open && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`ml-3 whitespace-nowrap ${
                        link.active ? "font-medium" : ""
                      }`}
                    >
                      {link.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout Button */}
      <div className="px-3 mb-3">
        {logoutLink && (
          <button
            type="button"
            className={`flex items-center w-full rounded-lg transition-colors
              hover:bg-red-900/20 text-red-400
              ${open ? "px-3 py-2.5 justify-start" : "p-2.5 justify-center"}`}
            onClick={logoutLink.action} // Use action from the link object
          >
            {logoutLink.icon}
            <AnimatePresence>
              {open && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-3 whitespace-nowrap"
                >
                  {logoutLink.label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        )}
      </div>

      {/* User Profile Section */}
      <div className="px-3 pt-3 border-t border-gray-700/30">
        <div
          className={`flex items-center ${
            open ? "justify-start" : "justify-center"
          } text-gray-300`}
        >
          <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-medium">
            {userInitials}
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                className="ml-3 overflow-hidden"
              >
                <p className="text-sm font-medium">{userName}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default DesktopSidebarContent;
