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
  achievements: [],
  publications: [],
  languages: [],
  volunteer: []
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

  // Skip logic: if value is 'skip' (case-insensitive), do not update
  if (typeof value === 'string' && value.trim().toLowerCase() === 'skip') {
    return getResumeData();
  }

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
      // Now expects array of { key, value }
      if (Array.isArray(value)) {
        updatedData.skills = value.filter(
          (item) => item && item.key && item.value && item.value.trim().toLowerCase() !== 'skip'
        );
      }
      break;
    case "languages":
      // Now expects array of { key, value }
      if (Array.isArray(value)) {
        updatedData.languages = value.filter(
          (item) => item && item.key && item.value && item.value.trim().toLowerCase() !== 'skip'
        );
      }
      break;
    case "projects":
      if (!updatedData.projects) updatedData.projects = [];
      // Flexible: expects { title, techStack, link, description, highlights }
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Only add if not skip
        if (!Object.values(value).some(v => typeof v === 'string' && v.trim().toLowerCase() === 'skip')) {
          updatedData.projects.push(value);
        }
      }
      break;
    case "experience":
      if (!updatedData.experience) updatedData.experience = [];
      // Flexible: expects { company, position, startDate, endDate, location, highlights, techStack }
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        if (!Object.values(value).some(v => typeof v === 'string' && v.trim().toLowerCase() === 'skip')) {
          updatedData.experience.push(value);
        }
      }
      break;
    case "achievements":
      if (!updatedData.achievements) updatedData.achievements = [];
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        if (!Object.values(value).some(v => typeof v === 'string' && v.trim().toLowerCase() === 'skip')) {
          updatedData.achievements.push(value);
        }
      }
      break;
    case "publications":
      if (!updatedData.publications) updatedData.publications = [];
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        if (!Object.values(value).some(v => typeof v === 'string' && v.trim().toLowerCase() === 'skip')) {
          updatedData.publications.push(value);
        }
      }
      break;
    case "volunteer":
      if (!updatedData.volunteer) updatedData.volunteer = [];
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        if (!Object.values(value).some(v => typeof v === 'string' && v.trim().toLowerCase() === 'skip')) {
          updatedData.volunteer.push(value);
        }
      }
      break;
    case "summary":
      if (!updatedData.basics) updatedData.basics = {};
      updatedData.basics.summary = value;
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

  // Skip logic: if formattedData is 'skip' (string) or all items are 'skip', do not update
  if ((typeof formattedData === 'string' && formattedData.trim().toLowerCase() === 'skip') ||
      (Array.isArray(formattedData) && formattedData.every(item => {
        if (typeof item === 'string') return item.trim().toLowerCase() === 'skip';
        if (typeof item === 'object' && item !== null) return Object.values(item).some(v => typeof v === 'string' && v.trim().toLowerCase() === 'skip');
        return false;
      }))) {
    return getResumeData();
  }

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
    case "languages":
      updatedData.languages = formattedData;
      break;
    case "projects":
      updatedData.projects = formattedData;
      break;
    case "experience":
      updatedData.experience = formattedData;
      break;
    case "achievements":
      updatedData.achievements = formattedData;
      break;
    case "publications":
      updatedData.publications = formattedData;
      break;
    case "volunteer":
      updatedData.volunteer = formattedData;
      break;
    case "summary":
      if (!updatedData.basics) updatedData.basics = {};
      updatedData.basics.summary = formattedData;
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