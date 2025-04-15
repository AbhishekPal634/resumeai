import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MobileSidebarContent = ({
  links,
  userName,
  userInitials,
  setOpen,
}) => {
  // Separate regular links and logout link
  const navigationLinks = links.filter((link) => link.action === undefined);
  const logoutLink = links.find((link) => link.action !== undefined);

  return (
    <div className="flex flex-col h-full pt-12">
      {/* User Profile */}
      <div className="flex items-center mt-4 mb-8">
        <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg font-medium">
          {userInitials}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-white">{userName}</h3>
          {logoutLink && (
            <button
              className="text-red-400 text-sm"
              onClick={() => {
                logoutLink.action(); // Call the action from the link
                setOpen(false); // Close the sidebar after action
              }}
            >
              Sign out
            </button>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="mt-4 flex-1">
        <ul className="space-y-3">
          {navigationLinks.map((link, idx) => (
            <motion.li key={idx} whileTap={{ scale: 0.97 }}>
              <Link
                to={link.href}
                className={`flex items-center px-3 py-3 text-base rounded-lg ${
                  link.active
                    ? "bg-indigo-900/50 text-white font-medium"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
                onClick={() => setOpen(false)}
              >
                <div className={link.active ? "text-indigo-400" : ""}>
                  {link.icon}
                </div>
                <span className="ml-3">{link.label}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* App Info */}
      <div className="mt-auto pt-6 pb-4">
        <p className="text-gray-500 text-sm">ResumeAI v1.0.0</p>
      </div>
    </div>
  );
};

export default MobileSidebarContent;
