import React from "react";
import { motion } from "framer-motion";

const ResumeTable = ({
  resumes = [],
  onEdit,
  onDownload,
  emptyState,
  handleCreateResume,
}) => {
  if (resumes.length === 0 && emptyState) {
    return emptyState;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <th className="py-3 px-6 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Name
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Date Created
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Status
            </th>
            <th className="py-3 px-6 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {resumes.map((resume) => (
            <motion.tr
              key={resume.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * resume.id, duration: 0.3 }}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                {resume.name}
              </td>
              <td className="py-4 px-6 whitespace-nowrap text-sm text-slate-500 dark:text-slate-300">
                {resume.date}
              </td>
              <td className="py-4 px-6 whitespace-nowrap">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    resume.status === "Active"
                      ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}
                >
                  {resume.status}
                </span>
              </td>
              <td className="py-4 px-6 whitespace-nowrap text-sm text-right">
                <button
                  onClick={() => onEdit(resume)}
                  className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDownload(resume)}
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
                >
                  Download
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResumeTable;
