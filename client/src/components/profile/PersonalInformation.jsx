import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiInfo } from "react-icons/fi";

const PersonalInformation = ({ userData, isEditing, onSave }) => {
  const [formData, setFormData] = useState({
    email: userData.email,
    phone: userData.phone,
    location: userData.location,
    about: userData.about,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
        <FiInfo className="mr-2 text-indigo-600 dark:text-indigo-400" />
        About Me
      </h2>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              About
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <FiMail className="mt-1 text-indigo-500 w-5 h-5 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Email
                </h4>
                <p className="text-slate-900 dark:text-white">
                  {userData.email}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <FiPhone className="mt-1 text-indigo-500 w-5 h-5 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Phone
                </h4>
                <p className="text-slate-900 dark:text-white">
                  {userData.phone}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <FiMapPin className="mt-1 text-indigo-500 w-5 h-5 mr-3" />
            <div>
              <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Location
              </h4>
              <p className="text-slate-900 dark:text-white">
                {userData.location}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
              Bio
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {userData.about}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PersonalInformation;
