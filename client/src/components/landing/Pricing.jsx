import React from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

const Pricing = () => {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_24px,slate-800/10_1px,transparent_0)] bg-[size:25px_100%]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_24px,slate-800/10_1px,transparent_0)] bg-[size:100%_25px]"></div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-white">Simple Pricing</h2>
          <div className="h-1 w-12 bg-indigo-500 mt-4"></div>
          <p className="mt-6 text-slate-400">No hidden fees. Cancel anytime.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Free",
              description: "For getting started",
              price: "$0",
              features: [
                "1 resume template",
                "Basic AI suggestions",
                "Download as PDF",
              ],
              cta: "Get Started",
              highlight: false,
            },
            {
              title: "Pro",
              description: "For job seekers",
              price: "$9",
              features: [
                "All free features",
                "15+ premium templates",
                "Advanced AI recommendations",
                "Cover letter generation",
                "Application tracking",
              ],
              cta: "Start Pro",
              highlight: true,
            },
            {
              title: "Enterprise",
              description: "For teams",
              price: "$29",
              features: [
                "All Pro features",
                "Team collaboration",
                "Branded templates",
                "Analytics dashboard",
                "Priority support",
              ],
              cta: "Contact Sales",
              highlight: false,
            },
          ].map((plan, index) => (
            <motion.div
              key={index}
              className={`p-8 rounded-2xl ${
                plan.highlight
                  ? "bg-gradient-to-b from-indigo-900/20 to-slate-900/80 border border-indigo-500/30"
                  : "bg-slate-800/10 border border-slate-700/20"
              } relative backdrop-blur-sm z-10 flex flex-col h-full`} // Added flex and h-full
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-6 bg-indigo-500 text-white text-xs font-medium px-3 py-1 rounded-b-lg">
                  POPULAR
                </div>
              )}

              {plan.highlight && (
                <div className="absolute -inset-0.5 bg-indigo-500/20 rounded-2xl blur opacity-30 animate-pulse"></div>
              )}

              <div className="flex-none">
                {" "}
                {/* Content container */}
                <h3 className="text-xl font-medium text-white mb-2">
                  {plan.title}
                </h3>
                <p className="text-slate-300 text-sm mb-4">
                  {plan.description}
                </p>
                <div className="text-3xl font-bold text-white mb-6">
                  {plan.price}
                  <span className="text-lg text-slate-400">
                    {plan.price !== "$0" ? "/mo" : ""}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center text-slate-300 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <FaCheck
                        className={`${
                          plan.highlight ? "text-indigo-400" : "text-indigo-500"
                        } mr-3`}
                      />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                {" "}
                {/* Button container pushed to bottom */}
                <Link
                  to={plan.cta === "Contact Sales" ? "/contact" : "/signup"}
                  className={`block w-full py-2 px-4 text-center text-sm 
                    ${
                      plan.highlight
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-transparent border border-slate-600 hover:bg-slate-800"
                    } 
                    text-white font-medium rounded-lg transition-all relative overflow-hidden group z-10`}
                >
                  <span className="relative z-10">{plan.cta}</span>
                  {plan.highlight && (
                    <span className="absolute top-0 left-0 w-full h-full bg-indigo-500 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  )}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Pricing;
