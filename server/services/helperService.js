// source: [cite: 6]
// Helper function to map skill category names used in older endpoints
function mapSkillCategory(questionKey) {
    const categoryMap = {
      languages: "programmingLanguages", // Match resumeData structure
      frameworks: "librariesFrameworks", // Match resumeData structure
      databases: "databases",
      tools: "toolsPlatforms",           // Match resumeData structure
      apis: "apis",
    };
    return categoryMap[questionKey] || questionKey; // source: [cite: 7]
  }
  
  module.exports = {
      mapSkillCategory,
  };