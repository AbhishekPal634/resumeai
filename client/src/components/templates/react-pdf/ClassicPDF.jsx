// import React from "react";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   Font,
// } from "@react-pdf/renderer";

// // Register Computer Modern font with local files
// try {
//   Font.register({
//     family: "Computer Modern",
//     fonts: [
//       {
//         src: "/fonts/cmunrm.otf",
//         fontWeight: "normal",
//       },
//       {
//         src: "/fonts/cmunbx.otf",
//         fontWeight: "bold",
//       },
//       {
//         src: "/fonts/cmunti.otf",
//         fontStyle: "italic",
//       },
//     ],
//   });
// } catch (error) {
//   console.error("Error registering fonts:", error);
// }

// const styles = StyleSheet.create({
//   page: {
//     padding: 20,
//     fontFamily: "Computer Modern",
//     fontSize: 9,
//     color: "#111827",
//   },
//   header: {
//     marginBottom: 12,
//     textAlign: "center",
//   },
//   headerName: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 6,
//   },
//   contactInfo: {
//     flexDirection: "row",
//     justifyContent: "center",
//     flexWrap: "wrap",
//     color: "#4B5563",
//     wordBreak: 'break-all',
//   },
//   divider: {
//     marginHorizontal: 4,
//   },
//   section: {
//     marginBottom: 10,
//     wordBreak: 'break-all',
//   },
//   sectionTitle: {
//     fontSize: 11,
//     fontWeight: "bold",
//     textTransform: "uppercase",
//     borderBottom: 1,
//     borderColor: "#1F2937",
//     paddingBottom: 2,
//     marginBottom: 6,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "baseline",
//     marginBottom: 1,
//   },
//   bold: {
//     fontWeight: "bold",
//   },
//   italic: {
//     fontStyle: "italic",
//   },
//   listItem: {
//     marginLeft: 0,
//     marginBottom: 2,
//     flexDirection: "row",
//     wordBreak: 'break-all',
//   },
//   bullet: {
//     marginRight: 6,
//   },
//   skillCategoryRow: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     alignItems: "flex-start",
//     marginBottom: 2,
//   },
//   skillTitle: {
//     fontWeight: "bold",
//     marginRight: 4,
//     maxWidth: 160,
//     fontSize: 9,
//   },
//   skillValues: {
//     fontSize: 9,
//     flexShrink: 1,
//     flexGrow: 1,
//     minWidth: 0,
//   },
//   itemContainer: {
//     marginBottom: 10,
//   },
//   summary: {
//     fontSize: 8,
//     color: "#374151",
//     lineHeight: 1.4,
//     wordBreak: 'break-all',
//   },
//   techStack: {
//     fontSize: 8,
//     fontStyle: "italic",
//     color: "#4B5563",
//     marginTop: 2,
//     marginBottom: 4,
//     wordBreak: 'break-all',
//   },
//   dates: {
//     fontSize: 7,
//     color: "#6B7280",
//   },
// });

// const ClassicPDF = ({ resume }) => {
//   const {
//     basics = {},
//     skills = {},
//     experience = [],
//     education = [],
//     projects = [],
//     achievements = [],
//     awards = [],
//     publications = [],
//     languages = [],
//     volunteer = [],
//     certifications = [],
//   } = resume || {};

//   // Helper to render skills
//   const renderSkills = () => {
//     if (Array.isArray(skills)) {
//       return skills.map((cat, idx) => (
//         <View key={idx} style={styles.skillCategoryRow}>
//           <Text style={styles.skillTitle}>{cat.key}: </Text>
//           <Text style={styles.skillValues}>{cat.values.join(", ")}</Text>
//         </View>
//       ));
//     } else if (typeof skills === 'object' && skills !== null) {
//       return Object.keys(skills).map((key) => {
//         if (Array.isArray(skills[key]) && skills[key].length > 0) {
//           const title = key
//             .replace(/([A-Z])/g, ' $1')
//             .replace(/^./, str => str.toUpperCase());
//           return (
//             <View key={key} style={styles.skillCategoryRow}>
//               <Text style={styles.skillTitle}>{title}: </Text>
//               <Text style={styles.skillValues}>{skills[key].join(", ")}</Text>
//             </View>
//           );
//         }
//         return null;
//       });
//     }
//     return null;
//   };

//   // Helper to render languages
//   const renderLanguages = () => {
//     if (Array.isArray(languages) && languages.length > 0) {
//       return (
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Languages</Text>
//           <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
//             {languages.map((lang, idx) => (
//               <Text key={idx}>
//                 <Text style={styles.bold}>{lang.language || lang.name}</Text>
//                 {lang.fluency && (
//                   <Text style={styles.italic}> - {lang.fluency}</Text>
//                 )}
//               </Text>
//             ))}
//           </View>
//         </View>
//       );
//     }
//     return null;
//   };

//   // Helper to render publications
//   const renderPublications = () => {
//     if (Array.isArray(publications) && publications.length > 0) {
//       return (
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Publications</Text>
//           {publications.map((pub, idx) => (
//             <View key={idx} style={styles.itemContainer}>
//               <View style={styles.row}>
//                 <Text style={styles.bold}>{pub.title || pub.name}</Text>
//                 <Text style={styles.dates}>{pub.date || pub.releaseDate}</Text>
//               </View>
//               {pub.publisher && <Text style={styles.italic}>{pub.publisher}</Text>}
//               {pub.summary && <Text style={styles.summary}>{pub.summary}</Text>}
//             </View>
//           ))}
//         </View>
//       );
//     }
//     return null;
//   };

//   // Helper to render volunteer experience
//   const renderVolunteer = () => {
//     if (Array.isArray(volunteer) && volunteer.length > 0) {
//       return (
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Volunteer Experience</Text>
//           {volunteer.map((vol, idx) => (
//             <View key={idx} style={styles.itemContainer}>
//               <View style={styles.row}>
//                 <Text style={styles.bold}>{vol.position}</Text>
//                 <Text style={styles.dates}>{vol.startDate} - {vol.endDate || "Present"}</Text>
//               </View>
//               <Text style={styles.italic}>{vol.organization}</Text>
//               {vol.summary && (
//                 <Text style={styles.summary}>{vol.summary}</Text>
//               )}
//             </View>
//           ))}
//         </View>
//       );
//     }
//     return null;
//   };

//   // Helper to render achievements and awards
//   const renderAchievements = () => {
//     // Combine achievements and awards arrays
//     const allAchievements = [
//       ...(Array.isArray(achievements) ? achievements : []),
//       ...(Array.isArray(awards) ? awards : [])
//     ];
    
//     if (allAchievements.length > 0) {
//       return (
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Awards & Achievements</Text>
//           {allAchievements.map((item, idx) => (
//             <View key={idx} style={styles.itemContainer}>
//               <View style={styles.row}>
//                 <Text style={styles.bold}>{item.title || item.award}</Text>
//                 <Text style={styles.dates}>{item.date}</Text>
//               </View>
//               <Text style={styles.italic}>{item.awarder || item.issuer}</Text>
//               {item.summary && <Text style={styles.summary}>{item.summary}</Text>}
//             </View>
//           ))}
//         </View>
//       );
//     }
//     return null;
//   };

//   // Check if skills exist
//   const hasSkills = 
//     (Array.isArray(skills) && skills.length > 0) || 
//     (typeof skills === 'object' && 
//      skills !== null && 
//      Object.values(skills).some(arr => Array.isArray(arr) && arr.length > 0));

//   // Determine if the user is a recent graduate (logic from ClassicTemplate.jsx)
//   const isRecentGraduate = (() => {
//     if (!education || !Array.isArray(education) || education.length === 0) return false;
//     const gradYear = (edu) => {
//       if (!edu.endDate) return null;
//       const match = edu.endDate.match(/\d{4}/);
//       return match ? parseInt(match[0], 10) : null;
//     };
//     const currentYear = new Date().getFullYear();
//     return education.some(edu => {
//       const year = gradYear(edu);
//       return year && currentYear - year <= 2;
//     });
//   })();

//   try {
//     return (
//       <Document>
//         <Page size="A4" style={styles.page}>
//           {/* 1. Header */}
//           <View style={styles.header}>
//             <Text style={styles.headerName}>{basics.name}</Text>
//             <View style={styles.contactInfo}>
//               {[
//                 basics.phone,
//                 basics.location,
//                 basics.email,
//                 basics.linkedin,
//                 basics.github
//               ]
//                 .filter(Boolean)
//                 .map((item, index, arr) => (
//                   <React.Fragment key={index}>
//                     <Text>{item}</Text>
//                     {index < arr.length - 1 && (
//                       <Text style={styles.divider}>|</Text>
//                     )}
//                   </React.Fragment>
//                 ))}
//             </View>
//           </View>

//           {/* 2. Professional Summary */}
//           {basics?.summary && basics.summary.trim() !== "" && (
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Professional Summary</Text>
//               <Text style={styles.summary}>{basics.summary}</Text>
//             </View>
//           )}

//           {/* 3. Education (first if recent graduate) */}
//           {isRecentGraduate && Array.isArray(education) && education.length > 0 && (
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Education</Text>
//               {education.map((edu, index) => (
//                 <View key={index} style={styles.itemContainer}>
//                   <View style={styles.row}>
//                     <Text style={styles.bold}>{edu.institution}</Text>
//                     <Text style={styles.italic}>{edu.location}</Text>
//                   </View>
//                   <View style={styles.row}>
//                     <Text style={styles.italic}>
//                       {edu.studyType && edu.area
//                         ? `${edu.studyType} in ${edu.area}`
//                         : edu.area}
//                     </Text>
//                     <Text style={styles.dates}>
//                       {edu.startDate} – {edu.endDate}
//                     </Text>
//                   </View>
//                   {edu.gpa && <Text style={{ marginTop: 2 }}>GPA: {edu.gpa}</Text>}
//                 </View>
//               ))}
//             </View>
//           )}

//           {/* 4. Skills */}
//           {hasSkills && (
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Skills</Text>
//               {renderSkills()}
//             </View>
//           )}

//           {/* 5. Experience */}
//           {Array.isArray(experience) && experience.length > 0 && (
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Experience</Text>
//               {experience.map((job, index) => (
//                 <View key={index} style={styles.itemContainer}>
//                   <View style={styles.row}>
//                     <Text style={styles.bold}>{job.position}</Text>
//                     <Text style={styles.dates}>
//                       {job.startDate} – {job.endDate || "Present"}
//                     </Text>
//                   </View>
//                   <View style={styles.row}>
//                     <Text style={styles.italic}>{job.company}</Text>
//                     <Text style={styles.italic}>{job.location}</Text>
//                   </View>
//                   {job.highlights && job.highlights.length > 0 && (
//                     <View style={{ marginTop: 4 }}>
//                       {job.highlights.map((highlight, idx) => (
//                         <View key={idx} style={styles.listItem}>
//                           <Text style={styles.bullet}>•</Text>
//                           <Text>{highlight}</Text>
//                         </View>
//                       ))}
//                     </View>
//                   )}
//                 </View>
//               ))}
//             </View>
//           )}

//           {/* 6. Education (for experienced professionals) */}
//           {!isRecentGraduate && Array.isArray(education) && education.length > 0 && (
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Education</Text>
//               {education.map((edu, index) => (
//                 <View key={index} style={styles.itemContainer}>
//                   <View style={styles.row}>
//                     <Text style={styles.bold}>{edu.institution}</Text>
//                     <Text style={styles.italic}>{edu.location}</Text>
//                   </View>
//                   <View style={styles.row}>
//                     <Text style={styles.italic}>
//                       {edu.studyType && edu.area
//                         ? `${edu.studyType} in ${edu.area}`
//                         : edu.area}
//                     </Text>
//                     <Text style={styles.dates}>
//                       {edu.startDate} – {edu.endDate}
//                     </Text>
//                   </View>
//                   {edu.gpa && <Text style={{ marginTop: 2 }}>GPA: {edu.gpa}</Text>}
//                 </View>
//               ))}
//             </View>
//           )}

//           {/* 7. Projects */}
//           {Array.isArray(projects) && projects.length > 0 && (
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Projects</Text>
//               {projects.map((project, index) => (
//                 <View key={index} style={styles.itemContainer}>
//                   <View style={styles.row}>
//                     <Text style={styles.bold}>{project.name}</Text>
//                     {project.startDate && (
//                       <Text style={styles.dates}>
//                         {project.startDate}{project.endDate ? ` – ${project.endDate}` : ""}
//                       </Text>
//                     )}
//                   </View>
//                   {project.description && (
//                     <Text style={styles.techStack}>{project.description}</Text>
//                   )}
//                   {project.highlights && project.highlights.length > 0 && (
//                     <View style={{ marginTop: 4 }}>
//                       {project.highlights.map((highlight, idx) => (
//                         <View key={idx} style={styles.listItem}>
//                           <Text style={styles.bullet}>•</Text>
//                           <Text>{highlight}</Text>
//                         </View>
//                       ))}
//                     </View>
//                   )}
//                 </View>
//               ))}
//             </View>
//           )}

//           {/* 8. Achievements & Awards */}
//           {renderAchievements()}

//           {/* 9. Publications */}
//           {renderPublications()}

//           {/* 10. Languages */}
//           {renderLanguages()}

//           {/* 11. Volunteer Experience */}
//           {renderVolunteer()}

//           {/* 12. Certifications (optional) */}
//           {Array.isArray(certifications) && certifications.length > 0 && (
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Certifications</Text>
//               {certifications.map((cert, index) => (
//                 <View key={index} style={styles.itemContainer}>
//                   <View style={styles.row}>
//                     <Text style={styles.bold}>{cert.name}</Text>
//                     <Text style={styles.dates}>{cert.date}</Text>
//                   </View>
//                   {cert.issuer && <Text style={styles.italic}>{cert.issuer}</Text>}
//                 </View>
//               ))}
//             </View>
//           )}
//         </Page>
//       </Document>
//     );
//   } catch (error) {
//     console.error("Error rendering ClassicPDF:", error);
//     return (
//       <Document>
//         <Page size="A4" style={{ padding: 30, fontFamily: "Helvetica" }}>
//           <View style={{ marginBottom: 20 }}>
//             <Text style={{ fontSize: 24, marginBottom: 10 }}>{basics?.name || "Resume"}</Text>
//             <Text>{basics?.email}</Text>
//           </View>
//           <View style={{ marginTop: 20 }}>
//             <Text>There was an error generating your PDF. Please try another template.</Text>
//           </View>
//         </Page>
//       </Document>
//     );
//   }
// };

// // Mark this component as a React-PDF component for proper handling
// ClassicPDF.isReactPDFComponent = true;

// export default ClassicPDF;

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
    marginBottom: 10,  // Reduced from 12
    textAlign: "center",
  },
  headerName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,  // Reduced from 6
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
    marginBottom: 6,  // Reduced from 10
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottom: 1,
    borderColor: "#1F2937",
    paddingBottom: 2,
    marginBottom: 4,  // Reduced from 6
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
    marginLeft: 0,
    marginBottom: 1,  // Reduced from 2
    flexDirection: "row",
  },
  bullet: {
    marginRight: 4,  // Reduced from 6
    width: 6,  // Reduced from 8
  },
  listContent: {
    flex: 1,
  },
  skillRow: {
    flexDirection: "row",
    marginBottom: 2,  // Reduced from 4
  },
  skillTitle: {
    fontWeight: "bold",
  },
  skillValues: {
    flexShrink: 1,
  },
  itemContainer: {
    marginBottom: 6,  // Reduced from 10
  },
  summary: {
    fontSize: 8,
    color: "#374151",
    lineHeight: 1.3,  // Reduced from 1.4
  },
  techStack: {
    fontSize: 8,
    fontStyle: "italic",
    color: "#4B5563",
    marginTop: 1,  // Reduced from 2
    marginBottom: 2,  // Reduced from 4
  },
  dates: {
    fontSize: 7,
    color: "#6B7280",
  },
});

const ClassicPDF = ({ resume }) => {
  const {
    basics = {},
    skills = {},
    experience = [],
    education = [],
    projects = [],
    achievements = [],
    awards = [],
    publications = [],
    languages = [],
    volunteer = [],
    certifications = [],
  } = resume || {};

  // Helper to render skills with values starting right after key
  const renderSkills = () => {
    // Convert skills object to a consistent format
    let skillsArray = [];
    
    if (Array.isArray(skills)) {
      skillsArray = skills;
    } else if (typeof skills === 'object' && skills !== null) {
      skillsArray = Object.keys(skills).map(key => {
        if (Array.isArray(skills[key]) && skills[key].length > 0) {
          return {
            key: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
            values: skills[key]
          };
        }
        return null;
      }).filter(Boolean);
    }
    
    return (
      <View>
        {skillsArray.map((skill, idx) => (
          <View key={idx} style={styles.skillRow}>
            <Text>
              <Text style={styles.skillTitle}>{skill.key}: </Text>
              <Text>{skill.values.join(", ")}</Text>
            </Text>
          </View>
        ))}
      </View>
    );
  };

  // Helper to render languages
  const renderLanguages = () => {
    if (Array.isArray(languages) && languages.length > 0) {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>  {/* Reduced from 8 */}
            {languages.map((lang, idx) => (
              <Text key={idx}>
                <Text style={styles.bold}>{lang.language || lang.name}</Text>
                {lang.fluency && (
                  <Text style={styles.italic}> - {lang.fluency}</Text>
                )}
              </Text>
            ))}
          </View>
        </View>
      );
    }
    return null;
  };

  // Helper to render publications
  const renderPublications = () => {
    if (Array.isArray(publications) && publications.length > 0) {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Publications</Text>
          {publications.map((pub, idx) => (
            <View key={idx} style={styles.itemContainer}>
              <View style={styles.row}>
                <Text style={styles.bold}>{pub.title || pub.name}</Text>
                <Text style={styles.dates}>{pub.date || pub.releaseDate}</Text>
              </View>
              {pub.publisher && <Text style={styles.italic}>{pub.publisher}</Text>}
              {pub.summary && <Text style={styles.summary}>{pub.summary}</Text>}
            </View>
          ))}
        </View>
      );
    }
    return null;
  };

  // Helper to render volunteer experience
  const renderVolunteer = () => {
    if (Array.isArray(volunteer) && volunteer.length > 0) {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Volunteer Experience</Text>
          {volunteer.map((vol, idx) => (
            <View key={idx} style={styles.itemContainer}>
              <View style={styles.row}>
                <Text style={styles.bold}>{vol.position}</Text>
                <Text style={styles.dates}>{vol.startDate} - {vol.endDate || "Present"}</Text>
              </View>
              <Text style={styles.italic}>{vol.organization}</Text>
              {vol.summary && (
                <Text style={styles.summary}>{vol.summary}</Text>
              )}
            </View>
          ))}
        </View>
      );
    }
    return null;
  };

  // Helper to render achievements and awards
  const renderAchievements = () => {
    // Combine achievements and awards arrays
    const allAchievements = [
      ...(Array.isArray(achievements) ? achievements : []),
      ...(Array.isArray(awards) ? awards : [])
    ];
    
    if (allAchievements.length > 0) {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Awards & Achievements</Text>
          {allAchievements.map((item, idx) => (
            <View key={idx} style={styles.itemContainer}>
              <View style={styles.row}>
                <Text style={styles.bold}>{item.title || item.award}</Text>
                <Text style={styles.dates}>{item.date}</Text>
              </View>
              <Text style={styles.italic}>{item.awarder || item.issuer}</Text>
              {item.summary && <Text style={styles.summary}>{item.summary}</Text>}
            </View>
          ))}
        </View>
      );
    }
    return null;
  };

  // Check if skills exist
  const hasSkills = 
    (Array.isArray(skills) && skills.length > 0) || 
    (typeof skills === 'object' && 
     skills !== null && 
     Object.values(skills).some(arr => Array.isArray(arr) && arr.length > 0));

  // Determine if the user is a recent graduate (logic from ClassicTemplate.jsx)
  const isRecentGraduate = (() => {
    if (!education || !Array.isArray(education) || education.length === 0) return false;
    const gradYear = (edu) => {
      if (!edu.endDate) return null;
      const match = edu.endDate.match(/\d{4}/);
      return match ? parseInt(match[0], 10) : null;
    };
    const currentYear = new Date().getFullYear();
    return education.some(edu => {
      const year = gradYear(edu);
      return year && currentYear - year <= 2;
    });
  })();

  try {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* 1. Header */}
          <View style={styles.header}>
            <Text style={styles.headerName}>{basics.name}</Text>
            <View style={styles.contactInfo}>
              {[
                basics.phone,
                basics.location,
                basics.email,
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

          {/* 2. Professional Summary */}
          {basics?.summary && basics.summary.trim() !== "" && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.summary}>{basics.summary}</Text>
            </View>
          )}

          {/* 3. Education (first if recent graduate) */}
          {isRecentGraduate && Array.isArray(education) && education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu, index) => (
                <View key={index} style={styles.itemContainer}>
                  <View style={styles.row}>
                    <Text style={styles.bold}>{edu.institution}</Text>
                    <Text style={styles.italic}>{edu.location}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.italic}>
                      {edu.studyType && edu.area
                        ? `${edu.studyType} in ${edu.area}`
                        : edu.area}
                    </Text>
                    <Text style={styles.dates}>
                      {edu.startDate} – {edu.endDate}
                    </Text>
                  </View>
                  {edu.gpa && <Text style={{ marginTop: 1 }}>GPA: {edu.gpa}</Text>}
                </View>
              ))}
            </View>
          )}

          {/* 4. Skills */}
          {hasSkills && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              {renderSkills()}
            </View>
          )}

          {/* 5. Experience */}
          {Array.isArray(experience) && experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
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
                    <View style={{ marginTop: 2 }}>  {/* Reduced from 4 */}
                      {job.highlights.map((highlight, idx) => (
                        <View key={idx} style={styles.listItem}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.listContent}>{highlight}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* 6. Education (for experienced professionals) */}
          {!isRecentGraduate && Array.isArray(education) && education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu, index) => (
                <View key={index} style={styles.itemContainer}>
                  <View style={styles.row}>
                    <Text style={styles.bold}>{edu.institution}</Text>
                    <Text style={styles.italic}>{edu.location}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.italic}>
                      {edu.studyType && edu.area
                        ? `${edu.studyType} in ${edu.area}`
                        : edu.area}
                    </Text>
                    <Text style={styles.dates}>
                      {edu.startDate} – {edu.endDate}
                    </Text>
                  </View>
                  {edu.gpa && <Text style={{ marginTop: 1 }}>GPA: {edu.gpa}</Text>}
                </View>
              ))}
            </View>
          )}

          {/* 7. Projects */}
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
                    <View style={{ marginTop: 2 }}>  {/* Reduced from 4 */}
                      {project.highlights.map((highlight, idx) => (
                        <View key={idx} style={styles.listItem}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.listContent}>{highlight}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* 8. Achievements & Awards */}
          {renderAchievements()}

          {/* 9. Publications */}
          {renderPublications()}

          {/* 10. Languages */}
          {renderLanguages()}

          {/* 11. Volunteer Experience */}
          {renderVolunteer()}

          {/* 12. Certifications (optional) */}
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