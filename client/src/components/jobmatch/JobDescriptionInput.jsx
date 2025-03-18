import React from "react";

const JobDescriptionInput = ({ value, onChange }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">
          Job Description
        </h2>
        <textarea
          className="w-full h-48 p-3 border rounded-lg bg-white dark:bg-slate-900 
                   text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700"
          placeholder="Paste job description here..."
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default JobDescriptionInput;
