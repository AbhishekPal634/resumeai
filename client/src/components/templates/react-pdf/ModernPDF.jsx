import React from "react";

// This component doesn't use @react-pdf/renderer directly but is a fallback HTML component
const ModernPDF = ({ resume }) => {
  const {
    basics,
    skills,
    experience,
    education,
    projects,
    awards,
  } = resume;

  const skillCategories = {
    "Programming Languages": skills?.programmingLanguages || [],
    "Libraries & Frameworks": skills?.librariesFrameworks || [],
    "Databases": skills?.databases || [],
    "Tools & Platforms": skills?.toolsPlatforms || [],
    "APIs": skills?.apis || [],
  };

  return (
    <div className="max-w-[850px] mx-auto p-5 bg-white text-gray-800 font-sans shadow-lg">
      {/* Header */}
      <div className="mb-6 bg-gray-50 p-4 rounded-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{basics?.name || "Your Name"}</h1>
        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
          {basics?.email && <div className="flex items-center gap-1"><span>📧</span> {basics.email}</div>}
          {basics?.phone && <div className="flex items-center gap-1"><span>📱</span> {basics.phone}</div>}
          {basics?.location && <div className="flex items-center gap-1"><span>📍</span> {basics.location}</div>}
          {basics?.linkedin && <div className="flex items-center gap-1"><span>🔗</span> {basics.linkedin}</div>}
          {basics?.github && <div className="flex items-center gap-1"><span>💻</span> {basics.github}</div>}
        </div>
      </div>

      {/* Summary */}
      {basics?.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">Summary</h2>
          <p className="text-sm">{basics.summary}</p>
        </div>
      )}

      {/* Skills */}
      {skills && Object.values(skills).some(skill => Array.isArray(skill) && skill.length > 0) && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">Technical Skills</h2>
          {Object.entries(skillCategories).map(
            ([category, skillList]) =>
              skillList.length > 0 && (
                <div key={category} className="mb-2">
                  <span className="text-sm font-semibold">{category}: </span>
                  <span className="text-sm">{skillList.join(", ")}</span>
                </div>
              )
          )}
        </div>
      )}

      {/* Experience */}
      {Array.isArray(experience) && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">Experience</h2>
          {experience.map((job, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-semibold">{job.position}</h3>
                <span className="text-sm text-gray-600">{job.startDate} - {job.endDate || "Present"}</span>
              </div>
              <div className="text-sm font-medium text-gray-700">{job.company}</div>
              {job.highlights && (
                <ul className="list-disc list-inside mt-1 text-sm">
                  {job.highlights.map((highlight, idx) => (
                    <li key={idx} className="ml-4 mt-1">{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {Array.isArray(projects) && projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-base font-semibold">{project.name}</h3>
              {project.description && (
                <div className="text-sm italic text-gray-600 mt-1">{project.description}</div>
              )}
              {project.highlights && project.highlights.length > 0 && (
                <ul className="list-disc list-inside mt-1 text-sm">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="ml-4 mt-1">{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {Array.isArray(education) && education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-semibold">
                  {edu.studyType} in {edu.area}
                </h3>
                <span className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</span>
              </div>
              <div className="text-sm font-medium text-gray-700">{edu.institution}</div>
              {edu.gpa && <div className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Awards */}
      {Array.isArray(awards) && awards.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">Awards & Achievements</h2>
          {awards.map((award, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-semibold">{award.title}</h3>
                <span className="text-sm text-gray-600">{award.date}</span>
              </div>
              {award.awarder && <div className="text-sm font-medium text-gray-700">{award.awarder}</div>}
              {award.summary && <div className="text-sm text-gray-600 mt-1">{award.summary}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Note that this is a preview */}
      <div className="text-xs text-gray-500 text-center mt-8">
        This is a preview view of your resume. Download as PDF for the final formatted document.
      </div>
    </div>
  );
};

// Mark this explicitly as not a React-PDF component
ModernPDF.isReactPDFComponent = false;

export default ModernPDF;