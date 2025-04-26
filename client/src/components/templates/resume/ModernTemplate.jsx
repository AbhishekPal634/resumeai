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

// Improved Section component with better content checking
const Section = ({ title, children }) => {
  // Check if children is empty or null
  const hasContent = React.Children.toArray(children).some(
    child => child !== null && child !== false
  );
  
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

// Extracted reusable components similar to ClassicTemplate
const SkillCategory = ({ title, skills }) => (
  <div className="mb-2">
    <span className="text-sm font-semibold text-gray-900">{title}: </span>
    <span className="text-sm text-gray-700">{skills.join(", ")}</span>
  </div>
);

const ExperienceItem = ({ position, company, location, startDate, endDate, highlights, summary }) => (
  <div className="mb-4 last:mb-0">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-semibold text-gray-900 text-sm">{position}</h3>
        <div className="flex items-baseline text-gray-600 text-sm">
          <span>{company}</span>
          {location && <span className="ml-2 text-gray-500">• {location}</span>}
        </div>
      </div>
      <div className="text-xs text-gray-500">
        {startDate} - {endDate || "Present"}
      </div>
    </div>
    {summary && (
      <p className="mt-1 text-sm text-gray-700">{summary}</p>
    )}
    {highlights && highlights.length > 0 && (
      <ul className="mt-1 text-sm text-gray-700 list-disc list-inside space-y-1">
        {highlights.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    )}
  </div>
);

const EducationItem = ({ institution, location, studyType, area, startDate, endDate, gpa }) => (
  <div className="mb-3 last:mb-0">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-semibold text-gray-900 text-sm">{institution}</h3>
        <div className="text-gray-600 text-sm">
          {studyType && area ? `${studyType} in ${area}` : area}
          {location && <span className="ml-2 text-gray-500">• {location}</span>}
        </div>
      </div>
      <div className="text-xs text-gray-500">
        {startDate} - {endDate}
      </div>
    </div>
    {gpa && (
      <div className="text-sm text-gray-600 mt-1">
        GPA: {gpa}
      </div>
    )}
  </div>
);

const ProjectItem = ({ name, description, startDate, endDate, highlights }) => (
  <div className="mb-3 last:mb-0">
    <div className="flex justify-between items-start">
      <h3 className="font-semibold text-gray-900 text-sm">{name}</h3>
      {(startDate || endDate) && (
        <div className="text-xs text-gray-500">
          {startDate}
          {endDate ? ` - ${endDate}` : ""}
        </div>
      )}
    </div>
    {description && (
      <p className="text-sm text-gray-600 mt-0.5">{description}</p>
    )}
    {highlights && highlights.length > 0 && (
      <ul className="mt-1 text-sm text-gray-700 list-disc list-inside space-y-1">
        {highlights.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    )}
  </div>
);

const AchievementItem = ({ title, date, awarder, summary }) => (
  <div className="mb-2 last:mb-0">
    <div className="flex justify-between items-start">
      <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
      <div className="text-xs text-gray-500">{date}</div>
    </div>
    <div className="text-gray-600 text-sm">{awarder}</div>
    {summary && (
      <p className="text-gray-700 text-sm mt-1">{summary}</p>
    )}
  </div>
);

const PublicationItem = ({ title, publisher, date, summary }) => (
  <div className="mb-2 last:mb-0">
    <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
    <div className="flex justify-between items-baseline">
      <div className="text-gray-600 text-sm">{publisher}</div>
      <div className="text-xs text-gray-500">{date}</div>
    </div>
    {summary && (
      <p className="text-gray-700 text-sm mt-1">{summary}</p>
    )}
  </div>
);

const VolunteerItem = ({ position, organization, startDate, endDate, summary }) => (
  <div className="mb-3 last:mb-0">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-semibold text-gray-900 text-sm">{position}</h3>
        <div className="text-gray-600 text-sm">{organization}</div>
      </div>
      <div className="text-xs text-gray-500">
        {startDate} - {endDate || "Present"}
      </div>
    </div>
    {summary && (
      <p className="text-gray-700 text-sm mt-1">{summary}</p>
    )}
  </div>
);

const ModernTemplate = ({ resume }) => {
  console.log("ModernTemplate rendering with data:", resume);
  
  // Destructure the resume data with fallbacks for each section
  const {
    basics = {},
    experience = [],
    education = [],
    skills = {},
    projects = [],
    awards = [],
    publications = [],
    languages = [],
    volunteer = []
  } = resume || {};

  // Helper function to process skills data
  const renderSkills = () => {
    if (Array.isArray(skills)) {
      return skills.map((cat, idx) => (
        <SkillCategory key={idx} title={cat.key} skills={cat.values} />
      ));
    } else if (typeof skills === 'object' && skills !== null) {
      return Object.keys(skills).map((key) => {
        if (Array.isArray(skills[key]) && skills[key].length > 0) {
          // Convert camelCase to Title Case (e.g., programmingLanguages -> Programming Languages)
          const title = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
          return <SkillCategory key={key} title={title} skills={skills[key]} />;
        }
        return null;
      });
    }
    return null;
  };

  // Check if skills has any non-empty arrays
  const hasSkills = 
    (Array.isArray(skills) && skills.length > 0) || 
    (typeof skills === 'object' && 
     skills !== null && 
     Object.values(skills).some(arr => Array.isArray(arr) && arr.length > 0));

  // Check if personal info has any filled fields
  const hasPersonalInfo = Object.values(basics).some(
    value => value && value.trim && value.trim() !== ''
  );

  // Determine if this is a recent graduate (education should appear first)
  const isRecentGraduate = experience.length === 0 || 
    (education.length > 0 && new Date().getFullYear() - parseInt(education[0].endDate?.split(' ')[1] || '0') <= 2);

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

        {/* Conditionally render education first for recent graduates */}
        {isRecentGraduate && education.length > 0 && (
          <Section title="Education">
            {education.map((edu, index) => (
              <EducationItem
                key={index}
                institution={edu.institution}
                location={edu.location}
                studyType={edu.studyType}
                area={edu.area}
                startDate={edu.startDate}
                endDate={edu.endDate}
                gpa={edu.gpa}
              />
            ))}
          </Section>
        )}

        {/* Skills Section */}
        {hasSkills && (
          <Section title="Skills">
            {renderSkills()}
          </Section>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <Section title="Professional Experience">
            {experience.map((job, index) => (
              <ExperienceItem
                key={index}
                position={job.position}
                company={job.company}
                location={job.location}
                startDate={job.startDate}
                endDate={job.endDate}
                summary={job.summary}
                highlights={job.highlights}
              />
            ))}
          </Section>
        )}

        {/* Education for experienced professionals */}
        {!isRecentGraduate && education.length > 0 && (
          <Section title="Education">
            {education.map((edu, index) => (
              <EducationItem
                key={index}
                institution={edu.institution}
                location={edu.location}
                studyType={edu.studyType}
                area={edu.area}
                startDate={edu.startDate}
                endDate={edu.endDate}
                gpa={edu.gpa}
              />
            ))}
          </Section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <Section title="Projects">
            {projects.map((project, index) => (
              <ProjectItem
                key={index}
                name={project.name}
                description={project.description}
                startDate={project.startDate}
                endDate={project.endDate}
                highlights={project.highlights}
              />
            ))}
          </Section>
        )}

        {/* Awards Section */}
        {awards && awards.length > 0 && (
          <Section title="Awards & Achievements">
            {awards.map((award, index) => (
              <AchievementItem
                key={index}
                title={award.title}
                date={award.date}
                awarder={award.awarder}
                summary={award.summary}
              />
            ))}
          </Section>
        )}

        {/* Publications Section */}
        {publications && publications.length > 0 && (
          <Section title="Publications">
            {publications.map((pub, index) => (
              <PublicationItem
                key={index}
                title={pub.title}
                publisher={pub.publisher}
                date={pub.date}
                summary={pub.summary}
              />
            ))}
          </Section>
        )}

        {/* Languages Section */}
        {languages && languages.length > 0 && (
          <Section title="Languages">
            <div className="flex flex-wrap gap-4">
              {languages.map((lang, idx) => (
                <div key={idx} className="text-sm text-gray-800">
                  <span className="font-semibold">{lang.language || lang.name}</span>
                  {lang.fluency && (
                    <span className="text-gray-600"> - {lang.fluency}</span>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Volunteer Section */}
        {volunteer && volunteer.length > 0 && (
          <Section title="Volunteer Experience">
            {volunteer.map((vol, index) => (
              <VolunteerItem
                key={index}
                position={vol.position}
                organization={vol.organization}
                startDate={vol.startDate}
                endDate={vol.endDate}
                summary={vol.summary}
              />
            ))}
          </Section>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;