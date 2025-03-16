import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaUser, FaPaperPlane } from "react-icons/fa";

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

const ChatbotAssistant = ({ onClose, activeSection }) => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm your AI resume assistant. I'll help you improve your resume. What would you like help with?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === "" || isTyping) return;

    // Add user message
    const userMessage = {
      sender: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        sender: "bot",
        text: "I'm analyzing your request. I'll help you improve this section of your resume.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} formatTime={formatTime} />
        ))}

        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 backdrop-blur-sm">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your resume..."
            className="flex-1 px-4 py-2.5 text-sm border border-slate-200 dark:border-slate-700 rounded-full 
                     bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-violet-500 focus:border-transparent
                     placeholder:text-slate-400 dark:placeholder:text-slate-500"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={isTyping || input.trim() === ""}
            className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-full
                     flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed
                     hover:shadow-md transition-all duration-200 border border-white/10"
          >
            <FaPaperPlane className="w-3.5 h-3.5" />
            <span className="sr-only">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotAssistant;
