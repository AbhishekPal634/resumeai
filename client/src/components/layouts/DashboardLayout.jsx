import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiGrid, FiSettings, FiArrowLeft } from "react-icons/fi";
import SidebarComponent from "../sidebar/SidebarComponent";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on a mobile device
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint is 768px
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // Get current path to determine active link
  const currentPath = location.pathname;
  //   console.log(currentPath);

  // Navigation links configuration
  const links = [
    {
      label: "Dashboard",
      href: "/user/dashboard",
      icon: <FiGrid className="w-5 h-5" />,
      active: currentPath === "/user/dashboard",
    },
    {
      label: "Profile",
      href: "/user/profile",
      icon: <FiUser className="w-5 h-5" />,
      active: currentPath === "/user/profile",
    },
    {
      label: "Settings",
      href: "/user/settings",
      icon: <FiSettings className="w-5 h-5" />,
      active: currentPath === "/user/settings",
    },
    {
      label: "Logout",
      href: "/",
      icon: <FiArrowLeft className="w-5 h-5" />,
      active: false,
    },
  ];

  // Handler for logout
  const handleLogout = () => {
    // In a real app, you might want to clear auth tokens, etc.
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Fixed Sidebar - Non-scrollable */}
      <div className="fixed h-screen z-10">
        <SidebarComponent
          open={open}
          setOpen={setOpen}
          links={links}
          userInitials="JD"
          userName="John Doe"
          handleLogout={handleLogout}
          sidebarWidth="w-52" // Reduced from w-60 to w-52 (13rem)
          collapsedWidth="w-14"
        />
      </div>

      {/* Main Content Area with dynamic margin/padding to account for sidebar */}
      <motion.div
        className="flex-1 h-screen overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          marginLeft: isMobile ? "0rem" : open ? "17rem" : "3.5rem",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className={`${isMobile ? "px-4" : ""} w-full`}>{children}</div>
      </motion.div>
    </div>
  );
};

export default DashboardLayout;
