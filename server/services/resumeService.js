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
    skills: [],
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
        break;
      case "education":
        if (question === "more_education") break;
        if (!updatedData.education) updatedData.education = [];
        if (question === "institution") {
          updatedData.education.push({ institution: value });
        } else {
          const currentEduIndex = updatedData.education.length - 1;
          if (currentEduIndex >= 0) {
            updatedData.education[currentEduIndex][question] = value;
          }
        }
        break;
      case "skills":
         // Gemini now provides an array of { key, values } objects for skills
         updatedData.skills = Array.isArray(value) ? value : [];
         break;
      case "projects":
        if (question === "more_projects" || question === "more_points") break;
         if (!updatedData.projects) updatedData.projects = [];
        if (question === "name") {
          updatedData.projects.push({ name: value, points: [] });
        } else if (question === "points") {
          if (value.toLowerCase() !== "done") {
             const currentProjIndex = updatedData.projects.length - 1;
             if (currentProjIndex >= 0) {
               updatedData.projects[currentProjIndex].points.push(value);
             }
          }
        } else {
           const currentProjIndex = updatedData.projects.length - 1;
           if (currentProjIndex >= 0) {
             updatedData.projects[currentProjIndex][question] = value;
           }
        }
        break;
      case "positions":
         if (question === "intro" || question === "more_positions" || question === "more_points") break;
         if (!updatedData.experience) updatedData.experience = [];
         if (question === "organization") {
           updatedData.experience.push({ organization: value, points: [] });
         } else if (question === "points") {
           if (value.toLowerCase() !== "done") {
             const currentPosIndex = updatedData.experience.length - 1;
             if (currentPosIndex >= 0) {
               updatedData.experience[currentPosIndex].points.push(value);
             }
           }
         } else {
            const currentPosIndex = updatedData.experience.length - 1;
            if (currentPosIndex >= 0) {
              // Map 'company' to 'organization' if needed, or adjust structure
              const key = question === 'company' ? 'organization' : question;
              updatedData.experience[currentPosIndex][key] = value;
            }
         }
        break;
      case "achievements":
        if (question === "more_achievements") break;
         if (!updatedData.awards) updatedData.awards = [];
        if (question === "intro" || question === 'achievement') { // Assuming 'intro' means add new
          updatedData.awards.push(value); // Assuming value is the achievement string or object
        }
        break;
      default:
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
          case "personal_info":
              updatedData.basics = formattedData;
              break;
          case "education":
              updatedData.education = formattedData;
              break;
          case "skills":
              updatedData.skills = formattedData;
              break;
          case "projects":
              updatedData.projects = formattedData;
              break;
          case "positions":
              updatedData.experience = formattedData; // Map to 'experience'
              break;
          case "achievements":
              updatedData.awards = formattedData; // Map to 'awards'
              break;
          default:
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