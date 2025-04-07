import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register Computer Modern font with local files
try {
  Font.register({
    family: "Computer Modern",
    fonts: [
      {
        src: "/fonts/cmunrm.otf",
        fontWeight: "normal",
      },
      {
        src: "/fonts/cmunbx.otf",
        fontWeight: "bold",
      },
      {
        src: "/fonts/cmunti.otf",
        fontStyle: "italic",
      },
    ],
  });
} catch (error) {
  console.error("Error registering fonts:", error);
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Computer Modern",
    fontSize: 9,
    color: "#111827",
  },
  header: {
    marginBottom: 12,
    textAlign: "center",
  },
  headerName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    color: "#4B5563",
  },
  divider: {
    marginHorizontal: 4,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottom: 1,
    borderColor: "#1F2937",
    paddingBottom: 2,
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 1,
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  listItem: {
    marginLeft: 12,
    marginBottom: 2,
    flexDirection: "row",
  },
  bullet: {
    marginRight: 6,
  },
  skillCategory: {
    flexDirection: "row",
    marginBottom: 2,
  },
  skillTitle: {
    fontWeight: "bold",
    marginRight: 4,
  },
  itemContainer: {
    marginBottom: 10,
  },
  summary: {
    fontSize: 8,
    color: "#374151",
    lineHeight: 1.4,
  },
  techStack: {
    fontSize: 8,
    fontStyle: "italic",
    color: "#4B5563",
    marginTop: 2,
    marginBottom: 4,
  },
  dates: {
    fontSize: 7,
    color: "#6B7280",
  },
});

const ClassicPDF = ({ resume }) => {
  const {
    basics,
    skills,
    experience,
    education,
    projects,
    awards,
    publications,
    languages,
    volunteer,
    certifications,
  } = resume;

  try {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* 1. Header */}
          <View style={styles.header}>
            <Text style={styles.headerName}>{basics.name}</Text>
            <View style={styles.contactInfo}>
              {[
                basics.email,
                basics.phone,
                basics.location,
                basics.linkedin,
                basics.github
              ]
                .filter(Boolean)
                .map((item, index, arr) => (
                  <React.Fragment key={index}>
                    <Text>{item}</Text>
                    {index < arr.length - 1 && (
                      <Text style={styles.divider}>|</Text>
                    )}
                  </React.Fragment>
                ))}
            </View>
          </View>

          {/* 2. Summary */}
          {basics?.summary && basics.summary.trim() !== "" && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.summary}>{basics.summary}</Text>
            </View>
          )}

          {/* 3. Skills */}
          {skills && Object.values(skills).some(skill => Array.isArray(skill) && skill.length > 0) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Technical Skills</Text>
              {[
                { key: "programmingLanguages", title: "Languages" },
                { key: "librariesFrameworks", title: "Frameworks" },
                { key: "databases", title: "Databases" },
                { key: "toolsPlatforms", title: "Tools & Platforms" },
                { key: "apis", title: "APIs" },
                { key: "devTools", title: "Developer Tools" },
                { key: "cloud", title: "Cloud Services" },
              ].map(
                ({ key, title }) =>
                  skills[key]?.length > 0 && (
                    <View key={key} style={styles.skillCategory}>
                      <Text style={styles.skillTitle}>{title}: </Text>
                      <Text>{skills[key].join(", ")}</Text>
                    </View>
                  )
              )}
            </View>
          )}

          {/* 4. Experience */}
          {Array.isArray(experience) && experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              {experience.map((job, index) => (
                <View key={index} style={styles.itemContainer}>
                  <View style={styles.row}>
                    <Text style={styles.bold}>{job.position}</Text>
                    <Text style={styles.dates}>
                      {job.startDate} – {job.endDate || "Present"}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.italic}>{job.company}</Text>
                    <Text style={styles.italic}>{job.location}</Text>
                  </View>
                  {job.highlights && job.highlights.length > 0 && (
                    <View style={{ marginTop: 4 }}>
                      {job.highlights.map((highlight, idx) => (
                        <View key={idx} style={styles.listItem}>
                          <Text style={styles.bullet}>•</Text>
                          <Text>{highlight}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* 5. Projects */}
          {Array.isArray(projects) && projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {projects.map((project, index) => (
                <View key={index} style={styles.itemContainer}>
                  <View style={styles.row}>
                    <Text style={styles.bold}>{project.name}</Text>
                    {project.startDate && (
                      <Text style={styles.dates}>
                        {project.startDate}{project.endDate ? ` – ${project.endDate}` : ""}
                      </Text>
                    )}
                  </View>
                  {project.description && (
                    <Text style={styles.techStack}>{project.description}</Text>
                  )}
                  {project.highlights && project.highlights.length > 0 && (
                    <View style={{ marginTop: 4 }}>
                      {project.highlights.map((highlight, idx) => (
                        <View key={idx} style={styles.listItem}>
                          <Text style={styles.bullet}>•</Text>
                          <Text>{highlight}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* 6. Education */}
          {Array.isArray(education) && education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu, index) => (
                <View key={index} style={styles.itemContainer}>
                  <View style={styles.row}>
                    <Text style={styles.bold}>{edu.institution}</Text>
                    <Text style={styles.dates}>
                      {edu.startDate} – {edu.endDate}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.italic}>
                      {edu.studyType && edu.area
                        ? `${edu.studyType} in ${edu.area}`
                        : edu.area}
                    </Text>
                    {edu.location && <Text style={styles.italic}>{edu.location}</Text>}
                  </View>
                  {edu.gpa && <Text style={{ marginTop: 2 }}>GPA: {edu.gpa}</Text>}
                </View>
              ))}
            </View>
          )}

          {/* 7. Certifications */}
          {Array.isArray(certifications) && certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {certifications.map((cert, index) => (
                <View key={index} style={styles.itemContainer}>
                  <View style={styles.row}>
                    <Text style={styles.bold}>{cert.name}</Text>
                    <Text style={styles.dates}>{cert.date}</Text>
                  </View>
                  {cert.issuer && <Text style={styles.italic}>{cert.issuer}</Text>}
                </View>
              ))}
            </View>
          )}

          {/* 8. Awards */}
          {Array.isArray(awards) && awards.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Awards & Achievements</Text>
              {awards.map((award, index) => (
                <View key={index} style={styles.itemContainer}>
                  <View style={styles.row}>
                    <Text style={styles.bold}>{award.title}</Text>
                    <Text style={styles.dates}>{award.date}</Text>
                  </View>
                  {award.awarder && <Text style={styles.italic}>{award.awarder}</Text>}
                  {award.summary && (
                    <Text style={styles.summary}>{award.summary}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* 9. Publications */}
          {publications?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Publications</Text>
              {publications.map((pub, index) => (
                <View key={index} style={styles.itemContainer}>
                  <View style={styles.row}>
                    <Text style={styles.bold}>{pub.name}</Text>
                    <Text style={styles.dates}>{pub.releaseDate}</Text>
                  </View>
                  {pub.publisher && <Text style={styles.italic}>{pub.publisher}</Text>}
                </View>
              ))}
            </View>
          )}

          {/* 10. Languages */}
          {languages?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Languages</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {languages.map((lang, index) => (
                  <Text key={index}>
                    <Text style={styles.bold}>{lang.language}</Text>
                    {lang.fluency && (
                      <Text style={styles.italic}> - {lang.fluency}</Text>
                    )}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* 11. Volunteer Experience */}
          {volunteer?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Volunteer Experience</Text>
              {volunteer.map((vol, index) => (
                <View key={index} style={styles.itemContainer}>
                  <View style={styles.row}>
                    <Text style={styles.bold}>{vol.position}</Text>
                    <Text style={styles.dates}>
                      {vol.startDate} - {vol.endDate || "Present"}
                    </Text>
                  </View>
                  <Text style={styles.italic}>{vol.organization}</Text>
                  {vol.summary && (
                    <Text style={styles.summary}>{vol.summary}</Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </Page>
      </Document>
    );
  } catch (error) {
    console.error("Error rendering ClassicPDF:", error);
    return (
      <Document>
        <Page size="A4" style={{ padding: 30, fontFamily: "Helvetica" }}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 10 }}>{basics?.name || "Resume"}</Text>
            <Text>{basics?.email}</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text>There was an error generating your PDF. Please try another template.</Text>
          </View>
        </Page>
      </Document>
    );
  }
};

// Mark this component as a React-PDF component for proper handling
ClassicPDF.isReactPDFComponent = true;

export default ClassicPDF;
