import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Cta = () => {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-orb absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full filter blur-[100px]"></div>
        <div className="floating-orb absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full filter blur-[80px]"></div>
      </div>

      <motion.div
        className="max-w-3xl mx-auto text-center relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="p-8 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-indigo-500/20"
        >
          <motion.h2
            className="text-3xl font-semibold text-white mb-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to build your perfect resume?
          </motion.h2>
          <motion.p
            className="text-slate-400 mb-10"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Join thousands of professionals who've accelerated their careers
            with our platform.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/signup"
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium rounded-lg hover:from-indigo-500 hover:to-indigo-600 transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40"
            >
              Get Started Free
            </Link>
          </motion.div>
          <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Cta;
