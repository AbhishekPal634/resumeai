import React from "react";
import "../../../styles/cmu-serif.css";

// Extracted reusable components
const Section = ({ title, children }) => (
  <div className="mb-2">
    <h2 className="text-sm font-bold uppercase border-b border-gray-800 pb-0.5 mb-1.5">
      {title}
    </h2>
    {children}
  </div>
);

const SkillCategory = ({ title, skills }) => (
  <div className="mb-0.5 last:mb-0">
    <span className="font-bold text-xs">{title}: </span>
    <span className="text-xs">{skills.join(", ")}</span>
  </div>
);

const ExperienceItem = ({ position, company, location, startDate, endDate, highlights }) => (
  <div className="mb-3 last:mb-0">
    <div className="flex justify-between items-baseline">
      <h3 className="font-bold text-xs text-gray-900">{position}</h3>
      <div className="text-xs text-gray-800">
        {startDate} – {endDate || "Present"}
      </div>
    </div>
    <div className="flex justify-between items-baseline italic">
      <div className="text-xs text-gray-700">{company}</div>
      <div className="text-xs text-gray-700">{location}</div>
    </div>
    {highlights && (
      <ul className="list-disc list-outside ml-5 mt-1 text-xs text-gray-800">
        {highlights.map((highlight, idx) => (
          <li key={idx} className="mb-1">
            {highlight}
          </li>
        ))}
      </ul>
    )}
  </div>
);

const EducationItem = ({ institution, location, studyType, area, startDate, endDate, gpa }) => (
  <div className="mb-2.5 last:mb-0">
    <div className="flex justify-between items-baseline">
      <h3 className="font-bold text-xs text-gray-900">{institution}</h3>
      <div className="text-xs text-gray-800">{location}</div>
    </div>
    <div className="flex justify-between items-baseline italic">
      <div className="text-xs text-gray-700">
        {studyType && area ? `${studyType} in ${area}` : area}
      </div>
      <div className="text-xs text-gray-700">
        {startDate} – {endDate}
      </div>
    </div>
    {gpa && <div className="text-xs text-gray-700 mt-1">GPA: {gpa}</div>}
  </div>
);

const ProjectItem = ({ name, description, startDate, endDate, highlights }) => (
  <div className="mb-3 last:mb-0">
    <div className="flex justify-between items-baseline">
      <h3 className="font-bold text-xs text-gray-900">{name}</h3>
      <div className="text-xs text-gray-800">
        {startDate && (
          <>
            {startDate}
            {endDate ? ` – ${endDate}` : ""}
          </>
        )}
      </div>
    </div>
    {description && (
      <div className="italic text-xs text-gray-600 mt-1">{description}</div>
    )}
    {highlights && highlights.length > 0 && (
      <ul className="list-disc list-outside ml-5 mt-1 text-xs text-gray-800">
        {highlights.map((highlight, idx) => (
          <li key={idx} className="mb-1">
            {highlight}
          </li>
        ))}
      </ul>
    )}
  </div>
);

const AchievementItem = ({ title, date, awarder, summary }) => (
  <div className="mb-2 last:mb-0">
    <div className="flex justify-between items-baseline">
      <h3 className="font-bold text-xs text-gray-900">{title}</h3>
      <div className="text-xs text-gray-700">{date}</div>
    </div>
    <div className="text-xs text-gray-700 italic">{awarder}</div>
    {summary && <div className="text-xs text-gray-800 mt-1">{summary}</div>}
  </div>
);

const PublicationItem = ({ title, publisher, date, summary }) => (
  <div className="mb-2 last:mb-0">
    <h3 className="font-bold text-xs text-gray-900">{title}</h3>
    <div className="flex justify-between items-baseline italic">
      <div className="text-xs text-gray-700">{publisher}</div>
      <div className="text-xs text-gray-700">{date}</div>
    </div>
    {summary && <div className="text-xs text-gray-800 mt-1">{summary}</div>}
  </div>
);

const VolunteerItem = ({ position, organization, startDate, endDate, summary }) => (
  <div className="mb-3 last:mb-0">
    <div className="flex justify-between items-baseline">
      <h3 className="font-bold text-xs text-gray-900">{position}</h3>
      <div className="text-xs text-gray-800">
        {startDate} – {endDate || "Present"}
      </div>
    </div>
    <div className="text-xs text-gray-700 italic">{organization}</div>
    {summary && <div className="text-xs text-gray-800 mt-1">{summary}</div>}
  </div>
);

const ClassicTemplate = ({ resume }) => {
  const {
    basics = {},
    skills = {},
    experience = [],
    education = [],
    projects = [],
    achievements = [],
    publications = [],
    languages = [],
    volunteer = [],
  } = resume || {};

  // Helper to render skills
  const renderSkills = () => {
    if (Array.isArray(skills)) {
      return skills.map((cat, idx) => (
        <SkillCategory key={idx} title={cat.key} skills={cat.values} />
      ));
    } else if (typeof skills === 'object' && skills !== null) {
      return Object.keys(skills).map((key) => {
        if (Array.isArray(skills[key]) && skills[key].length > 0) {
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

  const hasSkills = 
    (Array.isArray(skills) && skills.length > 0) || 
    (typeof skills === 'object' && 
     skills !== null && 
     Object.values(skills).some(arr => Array.isArray(arr) && arr.length > 0));

  // Determine if this is a recent graduate (education should appear first)
  // This is just a simple implementation - you could enhance this logic based on dates
  const isRecentGraduate = experience.length === 0 || 
    (education.length > 0 && new Date().getFullYear() - parseInt(education[0].endDate?.split(' ')[1] || '0') <= 2);

  return (
    <div className="max-w-4xl mx-auto p-5 bg-white text-xs font-['Computer_Modern']">
      {/* Header */}
      <div className="text-center mb-3">
        <h1 className="text-2xl font-bold text-gray-900 mb-1.5">
          {basics.name}
        </h1>
        <div className="text-xs text-gray-600 flex items-center justify-center space-x-2 flex-wrap">
          {[basics.phone, basics.location, basics.email, basics.linkedin, basics.github]
            .filter(Boolean)
            .map((item, index, arr) => (
              <React.Fragment key={index}>
                <span>{item}</span>
                {index < arr.length - 1 && <span>|</span>}
              </React.Fragment>
            ))}
        </div>
      </div>

      {/* Summary */}
      {basics.summary && (
        <Section title="Professional Summary">
          <p className="text-gray-800 leading-relaxed text-xs">
            {basics.summary}
          </p>
        </Section>
      )}

      {/* Conditionally render education first for recent graduates */}
      {isRecentGraduate && education?.length > 0 && (
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

      {/* Skills */}
      {hasSkills && (
        <Section title="Skills">
          {renderSkills()}
        </Section>
      )}
      
      {/* Experience */}
      {experience?.length > 0 && (
        <Section title="Experience">
          {experience.map((job, index) => (
            <ExperienceItem
              key={index}
              position={job.position}
              company={job.company}
              location={job.location}
              startDate={job.startDate}
              endDate={job.endDate}
              highlights={job.highlights}
            />
          ))}
        </Section>
      )}

      {/* Education (for experienced professionals) */}
      {!isRecentGraduate && education?.length > 0 && (
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

      {/* Projects */}
      {projects?.length > 0 && (
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

      {/* Achievements */}
      {achievements?.length > 0 && (
        <Section title="Awards & Achievements">
          {achievements.map((award, index) => (
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

      {/* Publications */}
      {publications?.length > 0 && (
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

      {/* Languages */}
      {languages?.length > 0 && (
        <Section title="Languages">
          <div className="flex flex-wrap gap-4">
            {languages.map((lang, idx) => (
              <div key={idx} className="text-xs text-gray-800">
                <span className="font-bold">{lang.language || lang.name}</span>
                {lang.fluency && (
                  <span className="italic"> - {lang.fluency}</span>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Volunteer Experience */}
      {volunteer?.length > 0 && (
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
  );
};

export default ClassicTemplate;