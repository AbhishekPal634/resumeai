// source: [cite: 3]
// Simple in-memory store for resume data
let resumeData = {
    basics: {
      name: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
      linkedin: "",
      github: "",
    },
    experience: [],
    education: [],
    skills: {
      programmingLanguages: [],
      librariesFrameworks: [],
      databases: [],
      toolsPlatforms: [],
      apis: [],
    },
    projects: [],
    awards: [],
  };
  
  // Function to get the current resume data
  const getResumeData = () => {
    return JSON.parse(JSON.stringify(resumeData)); // Return a copy
  };
  
  // Function to update the resume data
  const updateResumeData = (newData) => {
    resumeData = { ...resumeData, ...newData };
    return getResumeData();
  };
  
  // Function to update specific parts based on stage and question
  const updateField = (stage, question, value, currentData) => {
    let updatedData = JSON.parse(JSON.stringify(currentData)); // Work on a copy
  
    switch (stage) {
      case "personal_info":
        if (!updatedData.basics) updatedData.basics = {};
        updatedData.basics[question] = value;
        break; // source: [cite: 158, 159]
      case "education": // source: [cite: 160]
        if (question === "more_education") break;
        if (!updatedData.education) updatedData.education = [];
        if (question === "institution") { // source: [cite: 161]
          updatedData.education.push({ institution: value });
        } else {
          const currentEduIndex = updatedData.education.length - 1; // source: [cite: 162]
          if (currentEduIndex >= 0) { // source: [cite: 163]
            updatedData.education[currentEduIndex][question] = value;
          }
        }
        break;
      case "technical_skills": // source: [cite: 165]
         // The mapping and splitting logic is handled in the controller/gemini service now
         // This case might be simplified or handled differently based on geminiService output
         // Assuming geminiService provides the structured skills object
         if (!updatedData.skills) updatedData.skills = {};
         updatedData.skills = { ...updatedData.skills, ...value }; // value is the structured skills object
        break;
      case "projects": // source: [cite: 168]
        if (question === "more_projects" || question === "more_points") break;
         if (!updatedData.projects) updatedData.projects = [];
        if (question === "name") { // source: [cite: 169]
          updatedData.projects.push({ name: value, points: [] });
        } else if (question === "points") { // source: [cite: 170]
          if (value.toLowerCase() !== "done") {
             const currentProjIndex = updatedData.projects.length - 1; // source: [cite: 170]
             if (currentProjIndex >= 0) { // source: [cite: 171]
               updatedData.projects[currentProjIndex].points.push(value);
             }
          }
        } else {
           const currentProjIndex = updatedData.projects.length - 1; // source: [cite: 172]
           if (currentProjIndex >= 0) { // source: [cite: 173]
             updatedData.projects[currentProjIndex][question] = value;
           }
        }
        break;
      case "positions": // source: [cite: 175]
         if (question === "intro" || question === "more_positions" || question === "more_points") break;
         if (!updatedData.experience) updatedData.experience = [];
         if (question === "organization") { // source: [cite: 176]
           updatedData.experience.push({ organization: value, points: [] });
         } else if (question === "points") { // source: [cite: 177]
           if (value.toLowerCase() !== "done") {
             const currentPosIndex = updatedData.experience.length - 1; // source: [cite: 177]
             if (currentPosIndex >= 0) { // source: [cite: 178]
               updatedData.experience[currentPosIndex].points.push(value);
             }
           }
         } else {
            const currentPosIndex = updatedData.experience.length - 1; // source: [cite: 179]
            if (currentPosIndex >= 0) { // source: [cite: 180]
              // Map 'company' to 'organization' if needed, or adjust structure
              const key = question === 'company' ? 'organization' : question;
              updatedData.experience[currentPosIndex][key] = value;
            }
         }
        break;
      case "achievements": // source: [cite: 182]
        if (question === "more_achievements") break;
         if (!updatedData.awards) updatedData.awards = [];
        if (question === "intro" || question === 'achievement') { // source: [cite: 183] // Assuming 'intro' means add new
          updatedData.awards.push(value); // Assuming value is the achievement string or object
        }
        break;
      default: // source: [cite: 185]
        // Handle other cases or log an error if needed
        break;
    }
  
    // Persist the changes
    resumeData = updatedData;
    return getResumeData();
  };
  
  // Function to update resume data based on structured category data from Gemini
  const updateCategoryData = (category, formattedData, currentData) => {
      let updatedData = JSON.parse(JSON.stringify(currentData)); // Work on a copy
  
      switch (category) {
          case "personal_info": // source: [cite: 191, 249]
              updatedData.basics = formattedData;
              break;
          case "education": // source: [cite: 191, 250]
              updatedData.education = formattedData;
              break;
          case "technical_skills": // source: [cite: 191, 251]
              updatedData.skills = formattedData;
              break;
          case "projects": // source: [cite: 192, 252]
              updatedData.projects = formattedData;
              break;
          case "positions": // source: [cite: 193, 253]
              updatedData.experience = formattedData; // Map to 'experience'
              break;
          case "achievements": // source: [cite: 194, 254]
              updatedData.awards = formattedData; // Map to 'awards'
              break;
          default: // source: [cite: 195]
              console.warn(`Unhandled category in updateCategoryData: ${category}`);
              break;
      }
  
      // Persist the changes
      resumeData = updatedData;
      return getResumeData();
  };
  
  
  module.exports = {
    getResumeData,
    updateResumeData,
    updateField,
    updateCategoryData
  };