import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../components/layouts/DashboardLayout";
import ResumeUpload from "../components/jobmatch/ResumeUpload";
import JobDescriptionInput from "../components/jobmatch/JobDescriptionInput";
import MatchResults from "../components/jobmatch/MatchResults";

const JobMatch = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
    } else {
      alert("Please upload a PDF file");
    }
  };

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription) {
      alert("Please upload both resume and job description");
      return;
    }
    setLoading(true);
    // TODO: Implement API call to backend for analysis
    setTimeout(() => {
      setResults({
        score: 85,
        suggestions: [
          "Add more keywords related to project management",
          "Include specific technical skills mentioned in the job description",
          "Quantify your achievements with metrics",
        ],
        briefResume: "3 years of experience in web development...",
        keywordMatch: {
          matched: ["React", "JavaScript", "Node.js"],
          missing: ["Python", "AWS"],
        },
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
            ATS Resume Checker
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Optimize your resume for Applicant Tracking Systems
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <ResumeUpload
              resumeFile={resumeFile}
              onUpload={handleResumeUpload}
            />
            <JobDescriptionInput
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 
                       transition font-medium disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Analyze Match"}
            </button>
          </motion.div>

          {/* Right Column - Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-slate-800 rounded-lg shadow p-6"
          >
            <MatchResults results={results} />
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobMatch;
