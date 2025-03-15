import React from "react";
import { motion } from "framer-motion";

const Logo = ({ open }) => {
  return (
    <div className="flex items-center">
      <img
        src="/logo.svg"
        alt="ResumeAI Logo"
        className="h-8 w-8 object-contain"
      />
      {open && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="ml-3 font-medium text-white"
        >
          Resume<span className="text-indigo-400">AI</span>
        </motion.span>
      )}
    </div>
  );
};

export default Logo;
