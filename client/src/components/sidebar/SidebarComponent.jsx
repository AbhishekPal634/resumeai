import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { cn } from "./utils";
import DesktopSidebarContent from "./DesktopSidebarContent";
import MobileSidebarContent from "./MobileSidebarContent";
import { useLocation } from "react-router-dom";

const SidebarComponent = ({
  open,
  setOpen,
  links,
  userInitials = "JS",
  userName = "John Smith",
  handleLogout,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Check if viewport is mobile
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Update links with active state based on current path
  const linksWithActive = links.map((link) => ({
    ...link,
    active: currentPath === link.href,
  }));

  return (
    <>
      {/* Mobile toggle button */}
      <div
        className={cn(
          "h-12 px-4 py-4 flex md:hidden items-center bg-gray-900 w-full fixed top-0 left-0 z-30"
        )}
      >
        <div className="flex justify-start z-20 w-full">
          <FiMenu
            className="text-gray-200 ml-1 cursor-pointer h-6 w-6"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-medium text-white">
          Resume<span className="text-indigo-400">AI</span>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobile && open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="fixed h-full w-full inset-0 bg-gray-900 p-6 z-[100] flex flex-col"
          >
            <div
              className="absolute right-6 top-6 z-50 text-gray-200 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <FiX className="h-6 w-6" />
            </div>
            <MobileSidebarContent
              links={linksWithActive}
              userName={userName}
              userInitials={userInitials}
              handleLogout={handleLogout}
              setOpen={setOpen}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: open ? 280 : 70 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "h-screen shrink-0 border-r border-gray-700/30",
          "bg-gray-900 z-10 py-5 overflow-hidden", // Changed from slate-950 to gray-900
          "hidden md:flex md:flex-col"
        )}
        onMouseEnter={() => !isMobile && setOpen(true)}
        onMouseLeave={() => !isMobile && setOpen(false)}
      >
        <DesktopSidebarContent
          open={open}
          links={linksWithActive}
          userName={userName}
          userInitials={userInitials}
          handleLogout={handleLogout}
        />
      </motion.div>
    </>
  );
};

export default SidebarComponent;
