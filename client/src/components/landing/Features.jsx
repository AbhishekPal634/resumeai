import React from "react";
import { AiOutlineFileText } from "react-icons/ai";
import { FaRegLightbulb, FaRegChartBar } from "react-icons/fa";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <motion.div
      className="max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold text-white">Powerful Features</h2>
        <div className="h-1 w-12 bg-indigo-500 mt-4"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <AiOutlineFileText size={24} />,
            title: "AI Resume Generator",
            description:
              "Our AI analyzes your experience and creates tailored, professional resumes optimized for applicant tracking systems.",
          },
          {
            icon: <FaRegLightbulb size={24} />,
            title: "Smart Content Suggestions",
            description:
              "Get intelligent recommendations for skills, achievements, and keywords based on your target industry.",
          },
          {
            icon: <FaRegChartBar size={24} />,
            title: "Application Tracking",
            description:
              "Track your job applications, interview status, and get insights on improving your application success rate.",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-2xl hover:bg-slate-800/30 transition-all border border-slate-800/50 backdrop-blur-sm group relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ y: -5 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>

            <div className="w-12 h-12 rounded-xl bg-indigo-900/30 flex items-center justify-center text-indigo-400 mb-6 relative z-10">
              {feature.icon}
            </div>
            <h3 className="text-xl font-medium text-white mb-3 relative z-10">
              {feature.title}
            </h3>
            <p className="text-slate-400 relative z-10">
              {feature.description}
            </p>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-indigo-600/5 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Features;
