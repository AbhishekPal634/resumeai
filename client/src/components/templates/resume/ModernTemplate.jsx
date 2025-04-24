import React from "react";

// Add font import at the top of the file
import "@fontsource/open-sans/300.css"; // Light
import "@fontsource/open-sans/400.css"; // Regular
import "@fontsource/open-sans/600.css"; // Semi-bold
import "@fontsource/open-sans/700.css"; // Bold

const Icons = {
  email: "/icons/envelope.svg",
  phone: "/icons/phone.svg",
  location: "/icons/location.svg",
  linkedin: "/icons/linkedin.svg",
  github: "/icons/github.svg",
  website: "/icons/globe.svg",
};

// Create a reusable contact item component
const ContactItem = ({ icon, children }) => (
  <div className="flex items-center">
    <img
      src={icon}
      className="w-4 h-4 mr-2 text-gray-400"
      style={{
        filter:
          "invert(55%) sepia(11%) saturate(341%) hue-rotate(175deg) brightness(87%) contrast(86%)",
      }}
      alt=""
    />
    {children}
  </div>
);

const Section = ({ title, children }) => {
  // Check if children is empty or null
  const hasContent = React.Children.count(children) > 0;
  
  // Only render the section if it has content
  if (!hasContent) return null;
  
  return (
    <div className="mb-4">
      <h2 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2">
        {title}
      </h2>
      {children}
    </div>
  );
};

const SkillCategory = ({ title, skills }) => (
  <div className="mb-2">
    <span className="text-sm font-semibold text-gray-900">{title}: </span>
    <span className="text-sm text-gray-700">{skills.join(", ")}</span>
  </div>
);

const ModernTemplate = ({ resume }) => {
  console.log("ModernTemplate rendering with data:", resume);
  
  // Destructure the resume data with fallbacks for each section
  const {
    basics = {},
    experience = [],
    education = [],
    skills = {
      programmingLanguages: [],
      librariesFrameworks: [],
      databases: [],
      toolsPlatforms: [],
      apis: []
    },
    projects = [],
    awards = []
  } = resume || {};

  // Check if skills has any non-empty arrays
  const hasSkills = Object.values(skills).some(
    skillArray => Array.isArray(skillArray) && skillArray.length > 0
  );

  // Check if personal info has any filled fields
  const hasPersonalInfo = Object.values(basics).some(
    value => value && value.trim && value.trim() !== ''
  );

  // Render the template
  return (
    <div
      id="resume-content"
      className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl overflow-hidden font-['Open_Sans']"
    >
      {/* Header/Contact Info */}
      {hasPersonalInfo && (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            {basics.name || ""}
          </h1>
          <div className="flex flex-wrap gap-3 text-xs text-gray-600">
            {basics.email && (
              <ContactItem icon={Icons.email}>{basics.email}</ContactItem>
            )}
            {basics.phone && (
              <ContactItem icon={Icons.phone}>{basics.phone}</ContactItem>
            )}
            {basics.location && (
              <ContactItem icon={Icons.location}>{basics.location}</ContactItem>
            )}
            {basics.linkedin && (
              <ContactItem icon={Icons.linkedin}>{basics.linkedin}</ContactItem>
            )}
            {basics.github && (
              <ContactItem icon={Icons.github}>{basics.github}</ContactItem>
            )}
            {basics.website && (
              <ContactItem icon={Icons.website}>{basics.website}</ContactItem>
            )}
          </div>
        </div>
      )}

      <div className="p-6 space-y-4">
        {/* Summary Section */}
        {basics.summary && (
          <Section title="Professional Summary">
            <p className="text-sm text-gray-700 leading-relaxed">
              {basics.summary}
            </p>
          </Section>
        )}

        {/* Skills Section */}
        {Object.keys(skills).length > 0 && (
          <Section title="Skills">
            {Object.keys(skills).map((key, idx) => (
              <SkillCategory key={idx} title={key} skills={skills[key]} />
            ))}
          </Section>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <Section title="Professional Experience">
            {experience.map((job, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {job.position}
                    </h3>
                    <div className="text-gray-600 text-sm">
                      {job.company}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {job.startDate} - {job.endDate || "Present"}
                  </div>
                </div>
                {job.summary && (
                  <p className="mt-1 text-sm text-gray-700">
                    {job.summary}
                  </p>
                )}
                {job.highlights && job.highlights.length > 0 && (
                  <ul className="mt-1 text-sm text-gray-700 list-disc list-inside space-y-1">
                    {job.highlights.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <Section title="Projects">
            {projects.map((project, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {project.name}
                </h3>
                {project.description && (
                  <p className="text-xs text-gray-600 mt-0.5">
                    {project.description}
                  </p>
                )}
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="mt-1 text-sm text-gray-700 list-disc list-inside space-y-1">
                    {project.highlights.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <Section title="Education">
            {education.map((edu, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {edu.studyType} in {edu.area}
                    </h3>
                    <div className="text-gray-600 text-sm">
                      {edu.institution}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
                {edu.gpa && (
                  <div className="text-sm text-gray-600 mt-1">
                    GPA: {edu.gpa}
                  </div>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Awards Section */}
        {awards && awards.length > 0 && (
          <Section title="Awards & Achievements">
            {awards.map((award, index) => (
              <div key={index} className="mb-2 last:mb-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {award.title}
                  </h3>
                  <div className="text-sm text-gray-500">{award.date}</div>
                </div>
                <div className="text-gray-600 text-sm">{award.awarder}</div>
                {award.summary && (
                  <p className="text-gray-700 text-sm mt-1">{award.summary}</p>
                )}
              </div>
            ))}
          </Section>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;
