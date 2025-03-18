import React from "react";
import { FiUploadCloud } from "react-icons/fi";

const ResumeUpload = ({ resumeFile, onUpload }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">
          Upload Resume
        </h2>
        <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-6">
          <input
            type="file"
            accept=".pdf"
            onChange={onUpload}
            className="hidden"
            id="resumeUpload"
          />
          <label
            htmlFor="resumeUpload"
            className="cursor-pointer flex flex-col items-center"
          >
            <FiUploadCloud className="text-4xl mb-2 text-blue-500" />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {resumeFile ? resumeFile.name : "Drop your PDF resume here"}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;
