import React from "react";
import { FaRobot, FaUser } from "react-icons/fa";

const ChatMessage = ({ message, formatTime }) => (
  <div
    className={`flex items-start gap-3 ${
      message.sender === "user" ? "flex-row-reverse" : ""
    }`}
  >
    {/* Avatar */}
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        message.sender === "user"
          ? "bg-gradient-to-r from-indigo-500 to-violet-500"
          : "bg-gradient-to-r from-pink-500 to-rose-500"
      } shadow-sm`}
    >
      {message.sender === "user" ? (
        <FaUser className="w-3.5 h-3.5 text-white" />
      ) : (
        <FaRobot className="w-3.5 h-3.5 text-white" />
      )}
    </div>

    {/* Message bubble */}
    <div
      className={`group relative max-w-[75%] rounded-2xl px-4 py-2.5 ${
        message.sender === "user"
          ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-tr-none"
          : "bg-white dark:bg-slate-800 shadow-sm rounded-tl-none border border-slate-200 dark:border-slate-700"
      }`}
    >
      <p
        className={`text-sm leading-relaxed ${
          message.sender === "bot" ? "text-slate-700 dark:text-slate-200" : ""
        }`}
      >
        {message.text}
      </p>
      <span
        className={`text-[10px] mt-1 block opacity-60 transition-opacity group-hover:opacity-100 ${
          message.sender === "user"
            ? "text-white"
            : "text-slate-500 dark:text-slate-400"
        }`}
      >
        {formatTime(message.timestamp)}
      </span>
    </div>
  </div>
);

export default ChatMessage;
