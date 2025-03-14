import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 py-5 px-6 md:px-12 lg:px-20 flex justify-between items-center z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-slate-900/90 backdrop-blur-md shadow-lg shadow-slate-900/20 border-b border-indigo-900/30"
            : "bg-transparent border-b border-indigo-900/10"
        }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
        <Link to="/">
          <span className="font-bold text-xl text-white">
            Resume<span className="text-indigo-400">AI</span>
          </span>
        </Link>
      </motion.div>
      <div className="hidden md:flex space-x-8 text-sm">
        {["Features", "Testimonials", "Pricing"].map((item, index) => (
          <motion.a
            key={index}
            href={`#${item.toLowerCase()}`}
            className="relative hover:text-white transition-colors group"
            whileHover={{ scale: 1.05 }}
          >
            {item}
            <motion.span
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"
              whileHover={{ width: "100%" }}
            ></motion.span>
          </motion.a>
        ))}
      </div>
      <div className="flex space-x-4">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/login"
            className="px-4 py-2 text-sm rounded-lg text-white hover:bg-slate-800 transition-colors"
          >
            Login
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/signup"
            className="px-4 py-2 text-sm bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 transition-all relative overflow-hidden group"
          >
            <span className="relative z-10">Sign Up</span>
            <span className="absolute top-0 left-0 w-full h-full bg-indigo-500 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
