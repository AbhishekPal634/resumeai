import React from "react";
import { motion } from "framer-motion";
import TokenDisplay from "./TokenDisplay";

const WelcomeHeader = ({ userName = "John", tokens }) => {
  return (
    <motion.div
      className="flex flex-col md:flex-row md:items-center justify-between"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
          Welcome back, {userName}!
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Let's build your professional resume today
        </p>
      </div>
      <TokenDisplay tokens={tokens} />
    </motion.div>
  );
};

export default WelcomeHeader;
