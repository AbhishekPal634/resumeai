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

const Section = ({ title, children }) => (
  <div className="mb-4">
    <h2 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-1 mb-2">
      {title}
    </h2>
    {children}
  </div>
);

const SkillCategory = ({ title, skills }) => (
  <div className="mb-2">
    <span className="text-sm font-semibold text-gray-900">{title}: </span>
    <span className="text-sm text-gray-700">{skills.join(", ")}</span>
  </div>
);

const ModernTemplate = ({ resume }) => {
  const basics = resume?.basics || {};
  const work = resume?.work || [];
  const education = resume?.education || [];
  const skills = resume?.skills || {};
  const projects = resume?.projects || [];
  const awards = resume?.awards || [];
  const certifications = resume?.certifications || [];
  const publications = resume?.publications || [];
  const languages = resume?.languages || [];
  const volunteer = resume?.volunteer || [];

  const skillCategories = {
    "Programming Languages": skills.programmingLanguages || [],
    "Libraries & Frameworks": skills.librariesFrameworks || [],
    Databases: skills.databases || [],
    "Tools & Platforms": skills.toolsPlatforms || [],
    APIs: skills.apis || [],
  };

  return (
    <div
      id="resume-content"
      className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl overflow-hidden font-['Open_Sans']"
    >
      {/* Header/Contact Info */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          {basics.name || "Your Name"}
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

      <div className="p-6 space-y-4">
        {/* Summary Section */}
        {basics.summary && (
          <Section title="Professional Summary">
            <p className="text-sm text-gray-700 leading-relaxed">
              {basics.summary}
            </p>
          </Section>
        )}

        {/* Updated Skills Section */}
        {Object.keys(skills).length > 0 && (
          <Section title="Technical Skills">
            {Object.entries(skillCategories).map(
              ([category, skillList]) =>
                skillList.length > 0 && (
                  <SkillCategory
                    key={category}
                    title={category}
                    skills={skillList}
                  />
                )
            )}
          </Section>
        )}

        {/* Work Experience Section */}
        {work.length > 0 && (
          <Section title="Professional Experience">
            {work.map((job, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {job.position}
                    </h3>
                    <div className="text-sm text-gray-600">{job.company}</div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {job.startDate} - {job.endDate || "Present"}
                  </div>
                </div>
                {job.summary && (
                  <p className="text-sm text-gray-700 mb-2">{job.summary}</p>
                )}
                {job.highlights && (
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                    {job.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <Section title="Notable Projects">
            {projects.map((project, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  {project.name}
                </h3>
                {project.description && (
                  <p className="text-sm text-gray-700 mb-2">
                    {project.description}
                  </p>
                )}
                {project.highlights && (
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
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
              <div key={index} className="mb-2 last:mb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {edu.studyType} in {edu.area}
                    </h3>
                    <div className="text-sm text-gray-600">
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

        {/* Certifications Section */}
        {certifications?.length > 0 && (
          <Section title="Certifications">
            {certifications.map((cert, index) => (
              <div key={index} className="mb-2 last:mb-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {cert.name}
                  </h3>
                  <div className="text-sm text-gray-500">{cert.date}</div>
                </div>
                <div className="text-gray-600 text-sm">{cert.issuer}</div>
              </div>
            ))}
          </Section>
        )}

        {/* Awards Section */}
        {awards?.length > 0 && (
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

        {/* Publications Section */}
        {publications?.length > 0 && (
          <Section title="Publications">
            {publications.map((pub, index) => (
              <div key={index} className="mb-2 last:mb-0">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {pub.name}
                </h3>
                <div className="text-gray-600 text-sm">{pub.publisher}</div>
                <div className="text-sm text-gray-500">{pub.releaseDate}</div>
              </div>
            ))}
          </Section>
        )}

        {/* Languages Section */}
        {languages?.length > 0 && (
          <Section title="Languages">
            <div className="flex flex-wrap gap-4">
              {languages.map((lang, index) => (
                <div key={index} className="text-sm text-gray-700">
                  <span className="font-semibold">{lang.language}</span>
                  {lang.fluency && ` - ${lang.fluency}`}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Volunteer Section */}
        {volunteer?.length > 0 && (
          <Section title="Volunteer Experience">
            {volunteer.map((vol, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {vol.position}
                    </h3>
                    <div className="text-gray-600 text-sm">
                      {vol.organization}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {vol.startDate} - {vol.endDate || "Present"}
                  </div>
                </div>
                {vol.summary && (
                  <p className="text-gray-700 text-sm mt-1">{vol.summary}</p>
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
