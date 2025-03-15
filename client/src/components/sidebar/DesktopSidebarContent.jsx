import React from "react";
import Logo from "./Logo";
import SidebarLink from "./SidebarLink";
import UserProfile from "./UserProfile";

const DesktopSidebarContent = ({
  open,
  links,
  userName,
  userInitials,
  handleLogout,
}) => {
  return (
    <div className="flex flex-col h-full justify-between px-3">
      {/* Sidebar Header & Logo */}
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <div className="px-2 py-2">
          <Logo open={open} />
        </div>

        {/* Navigation Links */}
        <div className="mt-8 flex flex-col gap-1">
          {links.map((link, idx) => (
            <SidebarLink
              key={idx}
              link={link}
              open={open}
              handleLogout={handleLogout}
            />
          ))}
        </div>
      </div>

      {/* User Profile Section */}
      <div className="mt-auto">
        <UserProfile
          open={open}
          userName={userName}
          userInitials={userInitials}
        />
      </div>
    </div>
  );
};

export default DesktopSidebarContent;
