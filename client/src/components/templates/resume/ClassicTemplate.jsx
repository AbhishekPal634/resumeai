import React from "react";
import "../../../styles/cmu-serif.css";

const Section = ({ title, children }) => (
  <div className="mb-[10px]">
    <h2 className="text-[13px] font-bold uppercase border-b border-gray-800 pb-[2px] mb-[6px]">
      {title}
    </h2>
    {children}
  </div>
);

const SkillCategory = ({ title, skills }) => (
  <div className="mb-[2px] last:mb-0">
    <span className="font-bold text-[11px]">{title}: </span>
    <span className="text-[11px]">{skills.join(" • ")}</span>
  </div>
);

const ClassicTemplate = ({ resume }) => {
  const {
    basics,
    skills,
    work,
    education,
    projects,
    certifications,
    awards,
    publications,
    languages,
    volunteer,
  } = resume;

  return (
    <div className="max-w-[850px] mx-auto p-5 bg-white text-[11px] font-['Computer_Modern']">
      {/* Header */}
      <div className="text-center mb-[12px]">
        <h1 className="text-[22px] font-bold text-gray-900 mb-[6px]">
          {basics.name}
        </h1>
        <div className="text-[11px] text-gray-600 flex items-center justify-center space-x-2 flex-wrap">
          {[basics.phone, basics.email, basics.linkedin, basics.github]
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
          <p className="text-gray-800 leading-relaxed text-[11px]">
            {basics.summary}
          </p>
        </Section>
      )}

      {/* Education */}
      <Section title="Education">
        {education?.map((edu, index) => (
          <div key={index} className="mb-2.5 last:mb-0">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-[11px] text-gray-900">
                {edu.institution}
              </h3>
              <div className="text-[11px] text-gray-800">{edu.location}</div>
            </div>
            <div className="flex justify-between items-baseline italic">
              <div className="text-[11px] text-gray-700">
                {edu.studyType && edu.area
                  ? `${edu.studyType} in ${edu.area}`
                  : edu.area}
              </div>
              <div className="text-[11px] text-gray-700">
                {edu.startDate} – {edu.endDate}
              </div>
            </div>
            {edu.gpa && (
              <div className="text-[11px] text-gray-700 mt-1">
                GPA: {edu.gpa}
              </div>
            )}
          </div>
        ))}
      </Section>

      {/* Experience */}
      <Section title="Experience">
        {work?.map((job, index) => (
          <div key={index} className="mb-3 last:mb-0">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-[11px] text-gray-900">
                {job.position}
              </h3>
              <div className="text-[11px] text-gray-800">
                {job.startDate} – {job.endDate || "Present"}
              </div>
            </div>
            <div className="flex justify-between items-baseline italic">
              <div className="text-[11px] text-gray-700">{job.company}</div>
              <div className="text-[11px] text-gray-700">{job.location}</div>
            </div>
            {job.highlights && (
              <ul className="list-disc list-outside ml-5 mt-1 text-[11px] text-gray-800">
                {job.highlights.map((highlight, idx) => (
                  <li key={idx} className="mb-1">
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </Section>

      {/* Projects */}
      <Section title="Projects">
        {projects?.map((project, index) => (
          <div key={index} className="mb-3 last:mb-0">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-[11px] text-gray-900">
                {project.name}{" "}
                {project.technologies && (
                  <span className="italic font-normal text-[11px] text-gray-700">
                    | {project.technologies}
                  </span>
                )}
              </h3>
              <div className="text-[11px] text-gray-800">
                {project.startDate} – {project.endDate || "Present"}
              </div>
            </div>
            {project.highlights && (
              <ul className="list-disc list-outside ml-5 mt-1 text-[11px] text-gray-800">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="mb-1">
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </Section>

      {/* Technical Skills */}
      <Section title="Technical Skills">
        {[
          { key: "programmingLanguages", title: "Languages" },
          { key: "librariesFrameworks", title: "Frameworks" },
          { key: "devTools", title: "Developer Tools" },
          { key: "databases", title: "Databases" },
          { key: "cloud", title: "Cloud Services" },
        ].map(
          ({ key, title }) =>
            skills[key]?.length > 0 && (
              <SkillCategory key={key} title={title} skills={skills[key]} />
            )
        )}
      </Section>

      {/* Awards */}
      {awards?.length > 0 && (
        <Section title="Awards & Achievements">
          {awards.map((award, index) => (
            <div key={index} className="mb-2 last:mb-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-[11px] text-gray-900">
                  {award.title}
                </h3>
                <div className="text-[11px] text-gray-700">{award.date}</div>
              </div>
              <div className="text-[11px] text-gray-700 italic">
                {award.awarder}
              </div>
              {award.summary && (
                <div className="text-[11px] text-gray-800 mt-1">
                  {award.summary}
                </div>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Publications */}
      {publications?.length > 0 && (
        <Section title="Publications">
          {publications.map((pub, index) => (
            <div key={index} className="mb-2 last:mb-0">
              <h3 className="font-bold text-[11px] text-gray-900">
                {pub.name}
              </h3>
              <div className="flex justify-between items-baseline italic">
                <div className="text-[11px] text-gray-700">{pub.publisher}</div>
                <div className="text-[11px] text-gray-700">
                  {pub.releaseDate}
                </div>
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* Languages */}
      {languages?.length > 0 && (
        <Section title="Languages">
          <div className="flex flex-wrap gap-4">
            {languages.map((lang, index) => (
              <div key={index} className="text-[11px] text-gray-800">
                <span className="font-bold">{lang.language}</span>
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
            <div key={index} className="mb-3 last:mb-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-[11px] text-gray-900">
                  {vol.position}
                </h3>
                <div className="text-[11px] text-gray-800">
                  {vol.startDate} – {vol.endDate || "Present"}
                </div>
              </div>
              <div className="text-[11px] text-gray-700 italic">
                {vol.organization}
              </div>
              {vol.summary && (
                <div className="text-[11px] text-gray-800 mt-1">
                  {vol.summary}
                </div>
              )}
            </div>
          ))}
        </Section>
      )}
    </div>
  );
};

export default ClassicTemplate;
