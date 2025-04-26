// Prompts and section definitions for all resume sections, unified for chatbot and editor UI

const resumeSections = {
  personal_info: {
    title: "Personal Information",
    prompt: "Please tell me about yourself. I need your full name, email address, phone number, location, and optionally your LinkedIn and GitHub URLs. If you'd like to include a professional summary, please share that as well. Type 'skip' to skip this section."
  },
  education: {
    title: "Education",
    prompt: "Tell me about your educational background. Include details like your university/college name, degree type (e.g., Bachelor of Science), field of study, years of attendance, and GPA if you'd like. If you have multiple degrees, feel free to include them all. Type 'skip' to skip this section."
  },
  skills: {
    title: "Skills",
    prompt: "List your skills, separated by commas or spaces. You can include any skills you have—technical, creative, language, management, or others. Just type them out in any order. I'll organize them into categories for your resume automatically. Type 'skip' to skip this section."
  },
  languages: {
    title: "Languages",
    prompt: "List the languages you know and your proficiency (e.g., English: Fluent, Hindi: Native). Type 'skip' to skip this section."
  },
  projects: {
    title: "Projects",
    prompt: "Tell me about some projects you've worked on. Include the project name, a brief description, and key achievements or features for each project. I'll format these professionally for your resume. Type 'skip' to skip this section."
  },
  experience: {
    title: "Work Experience",
    prompt: "Please share your work experience. Include details like company names, your job titles, dates of employment, and your key responsibilities or achievements in each position. Type 'skip' to skip this section."
  },
  achievements: {
    title: "Achievements & Certifications",
    prompt: "What notable achievements or certifications do you have? Include the title, date received, and the organization that gave the recognition if applicable. Type 'skip' to skip this section."
  },
  publications: {
    title: "Publications",
    prompt: "List any publications you have (e.g., papers, articles, books). Include the title, publisher, and date. Type 'skip' to skip this section."
  },
  volunteer: {
    title: "Volunteer Experience",
    prompt: "Describe any volunteer experience you have, including the organization, your role, dates, and a brief summary. Type 'skip' to skip this section."
  }
};

export default resumeSections;
