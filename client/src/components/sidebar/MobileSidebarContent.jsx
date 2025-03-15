import React from "react";
import { Link } from "react-router-dom";

const MobileSidebarContent = ({
  links,
  userName,
  userInitials,
  handleLogout,
  setOpen,
}) => {
  return (
    <div className="flex flex-col h-full justify-between pt-12">
      <div>
        <div className="flex items-center mb-8">
          <img
            src="/logo.svg"
            alt="ResumeAI Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="ml-3 font-bold text-xl text-white">
            Resume<span className="text-indigo-400">AI</span>
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {links.map((link, idx) => (
            <Link
              key={idx}
              to={link.href}
              onClick={(e) => {
                if (link.label === "Logout" && handleLogout) {
                  e.preventDefault();
                  handleLogout();
                }
                setOpen(false);
              }}
              className="flex items-center gap-4 px-2 py-3 rounded-lg transition-colors text-slate-300 hover:bg-slate-800/50"
            >
              <div className="w-6 h-6">{link.icon}</div>
              <span className="text-base">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 px-2 py-4 rounded-lg bg-slate-800/50">
          <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-base font-medium">
            {userInitials}
          </div>
          <div className="flex flex-col">
            <span className="text-base font-medium text-white">{userName}</span>
            <span className="text-sm text-slate-400">Free Plan</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebarContent;
