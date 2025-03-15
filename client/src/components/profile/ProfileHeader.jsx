import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiCamera } from "react-icons/fi";

const ProfileHeader = ({ userData, isEditing, onSave }) => {
  const [formData, setFormData] = useState({
    name: userData.name,
    position: userData.position,
    company: userData.company,
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
      className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cover Background */}
      <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600"></div>

      <div className="px-6 pb-6 relative">
        {/* Profile Photo */}
        <div className="relative -mt-12">
          <img
            src={userData.photoUrl}
            alt={userData.name}
            className="h-24 w-24 rounded-full border-4 border-white dark:border-slate-900 object-cover"
          />

          {isEditing && (
            <button className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full text-white hover:bg-indigo-700 transition-colors">
              <FiCamera size={14} />
            </button>
          )}
        </div>

        {/* Name and Position */}
        {isEditing ? (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              placeholder="Your name"
            />
            <div className="flex gap-3">
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="flex-1 p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                placeholder="Position"
              />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="flex-1 p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                placeholder="Company"
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
          <div className="mt-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {userData.name}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {userData.position} at {userData.company}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
