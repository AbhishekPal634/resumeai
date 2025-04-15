import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate
import { motion } from "framer-motion";
import { FiUser, FiGrid, FiSettings, FiArrowLeft } from "react-icons/fi";
import SidebarComponent from "../sidebar/SidebarComponent";
import { useAuth } from "../../context/AuthContext"; // Import useAuth

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate(); // Initialize navigate
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { logOut, user } = useAuth(); // Get logOut function and user from context

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
      href: "#", // Use # or similar for non-navigating actions
      icon: <FiArrowLeft className="w-5 h-5" />,
      active: false,
      action: () => handleLogout() // Add action property for logout
    },
  ];

  // Handler for logout - calls logOut from context and then navigates
  const handleLogout = () => {
    logOut();
    navigate("/"); // Redirect to landing page after logout
    // Or navigate("/login"); // Redirect to login page
  };

  // Determine user initials and name
  const userInitials = user?.firstName && user?.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() 
    : user?.email 
    ? user.email[0].toUpperCase() 
    : '??';
  const userName = user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : user?.email 
    ? user.email 
    : 'User';


  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Fixed Sidebar - Non-scrollable */}
      <div className="fixed h-screen z-10">
        <SidebarComponent
          open={open}
          setOpen={setOpen}
          links={links} // Pass the updated links array
          userInitials={userInitials}
          userName={userName}
          // handleLogout prop might no longer be needed if SidebarComponent uses link.action
          sidebarWidth="w-52"
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
