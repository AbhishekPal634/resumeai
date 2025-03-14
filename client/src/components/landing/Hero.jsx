import React from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="max-w-6xl mx-auto relative">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <motion.div
          className="md:col-span-7 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-semibold text-white leading-tight">
            Build your{" "}
            <span className="text-indigo-400 inline-block relative">
              professional resume
            </span>{" "}
            in minutes
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-lg">
            Our AI-powered platform analyzes your experience to create tailored,
            professional resumes that stand out to recruiters.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/signup"
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all flex items-center justify-center group"
              >
                Get Started
                <motion.span
                  className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                  transition={{ duration: 0.2 }}
                >
                  <FaArrowRight />
                </motion.span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="#demo"
                className="px-6 py-3 bg-transparent border border-slate-700 text-white rounded-lg hover:bg-slate-800 transition-all flex items-center justify-center"
              >
                Watch Demo
                <span className="ml-2 w-6 h-6 rounded-full bg-indigo-600/30 flex items-center justify-center">
                  <span className="border-t-2 border-r-2 border-white h-2 w-2 transform rotate-45 translate-x-[-1px]"></span>
                </span>
              </a>
            </motion.div>
          </div>

          <div className="mt-10 md:mt-16 flex items-center justify-center md:justify-start text-sm space-x-8 text-slate-400">
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <FaCheck className="text-indigo-400 mr-2" />
              No credit card required
            </motion.div>
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <FaCheck className="text-indigo-400 mr-2" />
              Free resume templates
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          className="md:col-span-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur-sm opacity-75 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl"></div>

            <motion.div
              className="absolute -right-5 top-0 z-20 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-indigo-500/30 shadow-xl transform -translate-y-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></div>
                  <div
                    className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                </div>
                <p className="text-xs font-medium relative group">
                  <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    AI-Powered Technology
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </p>
              </div>
            </motion.div>

            <div className="relative backdrop-blur-sm bg-slate-900/90 p-1 rounded-3xl border border-indigo-500/20 z-10">
              <img
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800"
                alt="Resume Builder"
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-[url('https://assets.codepen.io/3685267/overlay-noise.gif')] opacity-5 rounded-2xl"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
