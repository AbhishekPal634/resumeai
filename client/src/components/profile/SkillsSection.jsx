import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiAward, FiX, FiPlus } from "react-icons/fi";

const SkillsSection = ({ skills, isEditing, onSave }) => {
  const [skillsList, setSkillsList] = useState(skills);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() !== "" && !skillsList.includes(newSkill.trim())) {
      const updatedSkills = [...skillsList, newSkill.trim()];
      setSkillsList(updatedSkills);
      setNewSkill("");

      if (!isEditing) {
        onSave(updatedSkills);
      }
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = skillsList.filter((skill) => skill !== skillToRemove);
    setSkillsList(updatedSkills);

    if (!isEditing) {
      onSave(updatedSkills);
    }
  };

  const handleSaveSkills = () => {
    onSave(skillsList);
  };

  return (
    <motion.div
      className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
        <FiAward className="mr-2 text-indigo-600 dark:text-indigo-400" />
        Skills
      </h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {skillsList.map((skill, index) => (
          <div
            key={index}
            className={`px-3 py-1.5 rounded-full text-sm 
              ${
                isEditing
                  ? "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                  : "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400"
              } flex items-center`}
          >
            {skill}
            {isEditing && (
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="ml-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                <FiX size={14} />
              </button>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="space-y-3">
          <div className="flex">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 p-2 border border-slate-300 dark:border-slate-700 rounded-l-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              placeholder="Add a skill"
              onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
            />
            <button
              onClick={handleAddSkill}
              className="px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-lg transition-colors"
            >
              <FiPlus size={20} />
            </button>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSaveSkills}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SkillsSection;
