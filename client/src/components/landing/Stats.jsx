import React from "react";
import { motion } from "framer-motion";

const Stats = () => {
  return (
    <>
      <div className="absolute inset-0 bg-[url('https://assets.codepen.io/3685267/circuit-pattern.svg')] bg-repeat opacity-5"></div>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "10k+", label: "Active users" },
            { value: "85%", label: "Interview success" },
            { value: "50+", label: "Resume templates" },
            { value: "4.9", label: "Customer rating" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.p
                className="text-3xl md:text-4xl font-bold text-white"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.p>
              <p className="text-slate-400 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Stats;
