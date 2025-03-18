import React from "react";
import { FiFileText, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const MatchResults = ({ results }) => {
  if (!results) {
    return (
      <div className="text-center py-12">
        <FiFileText className="mx-auto h-12 w-12 text-slate-400" />
        <h3 className="mt-2 text-slate-800 dark:text-white font-medium">
          No Analysis Yet
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Upload your resume and job description to start the analysis
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Score */}
      <div className="text-center p-6 bg-slate-50 dark:bg-slate-900 rounded-lg">
        <div className="text-6xl font-bold text-blue-500 mb-2">
          {results.score}%
        </div>
        <div className="text-slate-600 dark:text-slate-400">
          ATS Match Score
        </div>
      </div>

      {/* Suggestions */}
      <div>
        <h3 className="font-medium mb-3 flex items-center text-slate-800 dark:text-white">
          <FiAlertCircle className="mr-2 text-amber-500" />
          Improvement Suggestions
        </h3>
        <ul className="space-y-2">
          {results.suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="text-slate-600 dark:text-slate-400 flex items-start"
            >
              <span className="mr-2">•</span> {suggestion}
            </li>
          ))}
        </ul>
      </div>

      {/* Keywords */}
      <div>
        <h3 className="font-medium mb-3 flex items-center text-slate-800 dark:text-white">
          <FiCheckCircle className="mr-2 text-green-500" />
          Keyword Analysis
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-green-500 mb-2">
              Matched Keywords
            </h4>
            <ul className="space-y-1">
              {results.keywordMatch.matched.map((keyword, index) => (
                <li
                  key={index}
                  className="text-sm text-slate-600 dark:text-slate-400"
                >
                  {keyword}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-red-500 mb-2">
              Missing Keywords
            </h4>
            <ul className="space-y-1">
              {results.keywordMatch.missing.map((keyword, index) => (
                <li
                  key={index}
                  className="text-sm text-slate-600 dark:text-slate-400"
                >
                  {keyword}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchResults;
