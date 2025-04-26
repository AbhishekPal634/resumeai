import React from "react";
import { FaRobot } from "react-icons/fa";

const TypingIndicator = () => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center shadow-sm">
      <FaRobot className="w-3.5 h-3.5 text-white" />
    </div>
    <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  </div>
);

export default TypingIndicator;
