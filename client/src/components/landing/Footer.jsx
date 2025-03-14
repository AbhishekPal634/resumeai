import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_49px,slate-800/5_1px,transparent_0)] bg-[size:50px_100%]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_49px,slate-800/5_1px,transparent_0)] bg-[size:100%_50px]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="pt-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-500 text-sm mb-4 md:mb-0 flex items-center">
            <div className="w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></div>
            © 2025 ResumeAI. All rights reserved.
          </div>
          <div className="flex space-x-6">
            {[
              { icon: <FaTwitter size={18} />, label: "Twitter" },
              { icon: <FaLinkedin size={18} />, label: "LinkedIn" },
              { icon: <FaGithub size={18} />, label: "GitHub" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800/50"
                whileHover={{ y: -3, scale: 1.1 }}
              >
                {social.icon}
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
