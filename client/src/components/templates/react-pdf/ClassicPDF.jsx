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

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Computer Modern",
    fontSize: 10, // Reduced from 11
    color: "#111827",
  },
  header: {
    marginBottom: 12, // Reduced from 20
    textAlign: "center",
  },
  headerName: {
    fontSize: 20, // Reduced from 24
    fontWeight: "bold",
    marginBottom: 6, // Reduced from 8
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
    marginBottom: 10, // Consistent margin for all sections
  },
  sectionTitle: {
    fontSize: 12, // Reduced from 13
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottom: 1,
    borderColor: "#1F2937",
    paddingBottom: 2, // Reduced from 4
    marginBottom: 6, // Reduced from 8
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 1, // Reduced from 2
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  listItem: {
    marginLeft: 12,
    marginBottom: 2, // Reduced from 4
    flexDirection: "row",
  },
  bullet: {
    marginRight: 6,
  },
  skillCategory: {
    flexDirection: "row",
    marginBottom: 2, // Reduced from 4
  },
  skillTitle: {
    fontWeight: "bold",
    marginRight: 4,
  },
  itemContainer: {
    marginBottom: 6, // Consistent spacing between items within sections
  },
});

const ClassicPDF = ({ resume }) => {
  const {
    basics,
    skills,
    work,
    education,
    projects,
    awards,
    publications,
    languages,
    volunteer,
  } = resume;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* 1. Header */}
        <View style={styles.header}>
          <Text style={styles.headerName}>{basics.name}</Text>
          <View style={styles.contactInfo}>
            {[basics.phone, basics.email, basics.linkedin, basics.github]
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
        {basics.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text>{basics.summary}</Text>
          </View>
        )}

        {/* 3. Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education?.map((edu, index) => (
            <View key={index} style={styles.itemContainer}>
              <View style={styles.row}>
                <Text style={styles.bold}>{edu.institution}</Text>
                <Text>{edu.location}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.italic}>
                  {edu.studyType && edu.area
                    ? `${edu.studyType} in ${edu.area}`
                    : edu.area}
                </Text>
                <Text style={styles.italic}>
                  {edu.startDate} – {edu.endDate}
                </Text>
              </View>
              {edu.gpa && <Text style={{ marginTop: 2 }}>GPA: {edu.gpa}</Text>}
            </View>
          ))}
        </View>

        {/* 4. Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {work?.map((job, index) => (
            <View key={index} style={styles.itemContainer}>
              <View style={styles.row}>
                <Text style={styles.bold}>{job.position}</Text>
                <Text>
                  {job.startDate} – {job.endDate || "Present"}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.italic}>{job.company}</Text>
                <Text style={styles.italic}>{job.location}</Text>
              </View>
              {job.highlights && (
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

        {/* 5. Projects */}
        {projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((project, index) => (
              <View key={index} style={styles.itemContainer}>
                <View style={styles.row}>
                  <Text style={styles.bold}>
                    {project.name}
                    {project.technologies && (
                      <Text style={styles.italic}>
                        {" "}
                        | {project.technologies}
                      </Text>
                    )}
                  </Text>
                  <Text>
                    {project.startDate} – {project.endDate || "Present"}
                  </Text>
                </View>
                {project.highlights && (
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

        {/* 6. Technical Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          {[
            { key: "programmingLanguages", title: "Languages" },
            { key: "librariesFrameworks", title: "Frameworks" },
            { key: "devTools", title: "Developer Tools" },
            { key: "databases", title: "Databases" },
            { key: "cloud", title: "Cloud Services" },
          ].map(
            ({ key, title }) =>
              skills[key]?.length > 0 && (
                <View key={key} style={styles.skillCategory}>
                  <Text style={styles.skillTitle}>{title}: </Text>
                  <Text>{skills[key].join(" • ")}</Text>
                </View>
              )
          )}
        </View>

        {/* 7. Awards */}
        {awards?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Awards & Achievements</Text>
            {awards.map((award, index) => (
              <View key={index} style={styles.itemContainer}>
                {/* ...award content... */}
              </View>
            ))}
          </View>
        )}

        {/* 8. Publications */}
        {publications?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Publications</Text>
            {publications.map((pub, index) => (
              <View key={index} style={styles.itemContainer}>
                {/* ...publication content... */}
              </View>
            ))}
          </View>
        )}

        {/* 9. Languages */}
        {languages?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.flexWrap}>
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

        {/* 10. Volunteer Experience */}
        {volunteer?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Volunteer Experience</Text>
            {volunteer.map((vol, index) => (
              <View key={index} style={styles.itemContainer}>
                {/* ...volunteer content... */}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ClassicPDF;
