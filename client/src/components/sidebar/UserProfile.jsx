import React from "react";
import { motion } from "framer-motion";

const UserProfile = ({ open, userName, userInitials }) => {
  return (
    <div className="flex items-center gap-3 px-2 py-3 rounded-lg hover:bg-slate-800/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
      <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
        {userInitials}
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col"
        >
          <span className="text-sm font-medium text-white">{userName}</span>
          <span className="text-xs text-slate-400">Free Plan</span>
        </motion.div>
      )}
    </div>
  );
};

export default UserProfile;
