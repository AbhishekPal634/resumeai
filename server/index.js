// Import required packages
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Global variable to store resume data
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

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini API with your API key
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY is not set in the .env file. Please add it and restart the server.');
}
const genAI = new GoogleGenerativeAI(apiKey || 'dummy-key');

// Helper function to map skill category names
function mapSkillCategory(questionKey) {
  const categoryMap = {
    languages: "Languages",
    frameworks: "Libraries/Frameworks",
    databases: "Databases",
    tools: "Tools/Platforms",
    apis: "APIs",
  };
  return categoryMap[questionKey] || questionKey;
}

// Helper function to normalize and correct user input
const normalizeUserInput = async (input, category) => {
  try {
    // Get Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Create a prompt to normalize and correct the input
    let prompt = `
      You are an AI assistant helping to normalize and correct user input for a resume.
      The user has provided the following input for their ${category} section:
      
      "${input}"
      
      Please perform the following corrections:
      1. Fix any spelling errors
      2. Correct grammatical mistakes
      3. Standardize capitalization (proper nouns, beginning of sentences, etc.)
      4. Complete or correct any abbreviated terms to their full form where appropriate
      5. Format dates consistently (e.g., "Jan 2020 - Present")
      
      If the input contains usernames or handles for social media or websites:
      - For LinkedIn usernames, convert to full URLs (e.g., "johndoe" → "https://www.linkedin.com/in/johndoe")
      - For GitHub usernames, convert to full URLs (e.g., "jdoe" → "https://github.com/jdoe")
      - For other websites, ensure they have proper URL format with https:// prefix
      
      Return ONLY the corrected text without any explanations or additional comments.
      Preserve the original meaning and information.
    `;
    
    // If this is specifically for personal info, add extra instructions for links
    if (category === 'personal_info') {
      prompt += `
        Pay special attention to LinkedIn and GitHub URLs:
        - If only a username is provided for LinkedIn (e.g., "linkedin: johndoe"), convert to "https://www.linkedin.com/in/johndoe"
        - If only a username is provided for GitHub (e.g., "github: jdoe"), convert to "https://github.com/jdoe"
        - If the URL is already complete and correct, leave it as is
      `;
    }
    
    // Call Gemini API to normalize the input
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const normalizedInput = response.text().trim();
    
    console.log('Original input:', input.substring(0, 50) + '...');
    console.log('Normalized input:', normalizedInput.substring(0, 50) + '...');
    
    return normalizedInput;
  } catch (error) {
    console.error('Error normalizing user input:', error);
    // Return original input if normalization fails
    return input;
  }
};

// Function to process user input with Gemini AI
async function processWithGemini(userInput, stage, question, resumeData) {
  try {
    // Get Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create a prompt based on the current stage and question
    let prompt = "";

    // For personal info, we want strict validation with no auto-correction
    if (stage === "personal_info") {
      if (question === "email") {
        prompt = `
          As a resume validation expert, strictly validate if the following input is a valid email address: "${userInput}".
          Do NOT correct or modify the input - only validate if it's properly formatted.
          A valid email must contain a username, @ symbol, and domain (e.g., username@example.com).
          
          Return your response as a JSON object with this structure:
          {
            "isValid": boolean, // true ONLY if the email is properly formatted
            "formattedValue": string, // the exact input if valid, empty string if invalid
            "message": string // explanation message
          }
        `;
      } else if (question === "linkedin") {
        prompt = `
          As a resume validation expert, strictly validate if the following input is a valid LinkedIn profile URL: "${userInput}".
          Do NOT correct random text or gibberish - only format properly structured URLs.
          A valid LinkedIn URL must contain linkedin.com/in/ followed by a username.
          
          Return your response as a JSON object with this structure:
          {
            "isValid": boolean, // true ONLY if it's a proper LinkedIn URL
            "formattedValue": string, // properly formatted URL if valid, empty string if invalid
            "message": string // explanation message
          }
        `;
      } else if (question === "github") {
        prompt = `
          As a resume validation expert, strictly validate if the following input is a valid GitHub profile URL: "${userInput}".
          Do NOT correct random text or gibberish - only format properly structured URLs.
          A valid GitHub URL must contain github.com/ followed by a username.
          If the input is "none" or "n/a", return an empty string as valid.
          
          Return your response as a JSON object with this structure:
          {
            "isValid": boolean, // true ONLY if it's a proper GitHub URL or none/n/a
            "formattedValue": string, // properly formatted URL if valid, empty string if "none" or invalid
            "message": string // explanation message
          }
        `;
      } else if (question === "phone") {
        prompt = `
          As a resume validation expert, strictly validate if the following input is a valid phone number: "${userInput}".
          Do NOT create a phone number from random text - only format recognizable phone numbers.
          
          Return your response as a JSON object with this structure:
          {
            "isValid": boolean, // true ONLY if it's a recognizable phone number
            "formattedValue": string, // formatted phone number if valid, empty string if invalid
            "message": string // explanation message
          }
        `;
      } else {
        // For other personal info (like name)
        prompt = `
          As a resume validation expert, validate if the following input for "${question}" is properly formatted: "${userInput}".
          Do NOT create content from random text or gibberish.
          Only format it if it's clearly valid input.
          
          Return your response as a JSON object with this structure:
          {
            "isValid": boolean, // true ONLY if the input is valid 
            "formattedValue": string, // properly formatted value if valid, empty string if invalid
            "message": string // explanation message
          }
        `;
      }
    } else if (stage === "projects") {
      // For projects, we can be more helpful with formatting and improvement
      if (question === "github_link" || question === "demo_link") {
        // URLs still need proper validation
        prompt = `
          As an ATS expert, validate if the following input is a valid URL for a project ${
            question === "github_link" ? "GitHub repository" : "demo"
          }: "${userInput}".
          If it's "none", "n/a", or similar, treat it as valid but return an empty string.
          If valid, ensure it has https:// prefix and is properly formatted.
          If invalid, explain why in a helpful way.
          
          Return your response as a JSON object with this structure:
          {
            "isValid": boolean, // true if valid, false if not
            "formattedValue": string, // the validated URL or empty string if none/invalid
            "message": string // explanation or confirmation message
          }
        `;
      } else if (question === "points" || question === "more_points") {
        // For bullet points, we can enhance and improve content
        prompt = `
          As an ATS expert, improve the following project bullet point for a resume: "${userInput}".
          If it's "done", treat this as a signal word (not content) and return it as formatted value with isValid true.
          Otherwise, improve the content to be more professional and ATS-friendly:
          1. Start with a strong action verb in the past tense
          2. Include specific metrics or outcomes where possible 
          3. Use concise, professional language
          4. Focus on accomplishments rather than just responsibilities
          
          Even if the input is poorly phrased, try to create a professional bullet point from it.
          
          Return your response as a JSON object with this structure:
          {
            "isValid": boolean, // true unless completely nonsensical gibberish
            "formattedValue": string, // the improved bullet point or "done" if that was the input
            "message": string // explanation of what was improved
          }
        `;
      } else if (question === "description") {
        // For project descriptions, emphasize tech stacks
        prompt = `
          As an ATS expert, format the following project description to highlight the tech stack: "${userInput}".
          
          Format the tech stack as a simple comma-separated list WITHOUT the "Built with" prefix:
          "[Tech1], [Tech2], [Tech3], etc."
          
          For example:
          - If input mentions "I created a web app using React and Node.js with MongoDB", format as "React.js, Node.js, MongoDB"
          - If input is "Python script for data analysis", format as "Python, Data Analysis"
          
          Guidelines:
          1. Do NOT include "Built with" or any other prefix
          2. If no specific technologies are mentioned, extract the general tech areas (Web Development, Mobile App, etc.)
          3. Use proper capitalization and formatting for tech names (React.js, Node.js, TailwindCSS, etc.)
          4. Separate technologies with commas only
          5. If the input already follows this format, just improve the formatting if needed
          
          Return your response as a JSON object with this structure:
          {
            "isValid": boolean, // true unless completely nonsensical gibberish
            "formattedValue": string, // the formatted tech stack list
            "message": string // explanation of what was improved
          }
        `;
      } else {
        // For other project fields, enhance and improve
        prompt = `
          As an ATS expert, improve the following input for the "${question}" field of a project: "${userInput}".
          Format it to be concise, professional, and ATS-friendly.
          Even if the input is poorly phrased, try to make it professional unless it's complete gibberish.
          
          Return your response as a JSON object with this structure:
          {
            "isValid": boolean, // true unless completely nonsensical gibberish
            "formattedValue": string, // the improved text
            "message": string // explanation of what was improved
          }
        `;
      }
    } else if (stage === "technical_skills") {
      // For technical skills, we can leverage common knowledge
      prompt = `
        As an ATS expert, validate and enhance the following technical skills input for "${question}": "${userInput}".
        Even if the input is poorly formatted, extract any valid technologies and format them professionally:
        1. Ensure proper capitalization of technology names (e.g., JavaScript, Python, AWS)
        2. Separate items with commas
        3. Remove any non-relevant words

        If you can identify any technologies or skills in the input, format them correctly.
        Only mark as invalid if the input contains no recognizable technologies.
        
        Return your response as a JSON object with this structure:
        {
          "isValid": boolean, // true if any valid technologies can be identified
          "formattedValue": string, // the formatted skills list
          "message": string // explanation of what was improved
        }
      `;
    } else if (stage === "education") {
      // For education, help format but preserve user content
      prompt = `
        As an ATS expert, enhance the following education information for "${question}": "${userInput}".
        Format it to be professional and consistent for a resume.
        Even if the input is poorly phrased, try to extract and format the relevant information.
        
        Return your response as a JSON object with this structure:
        {
          "isValid": boolean, // true unless completely nonsensical gibberish
          "formattedValue": string, // the improved education information
          "message": string // explanation of what was improved
        }
      `;
    } else if (stage === "positions") {
      // For positions, help format but ensure accuracy
      if (question === "points" || question === "more_points") {
        prompt = `
          As an ATS expert, improve the following responsibility bullet point for a resume: "${userInput}".
          If it's "done", treat this as a signal word (not content) and return it as formatted value with isValid true.
          Otherwise, transform the input into a professional bullet point:
          1. Start with a strong action verb in the past tense
          2. Include specific metrics or outcomes where possible
          3. Use concise, professional language
          4. Focus on accomplishments rather than just responsibilities
          
          Even if the input is poorly phrased, try to create a professional bullet point from it.
          
          Return your response as a JSON object with this structure:
          {
            "isValid": boolean, // true unless completely nonsensical gibberish
            "formattedValue": string, // the improved bullet point or "done" if that was the input
            "message": string // explanation of what was improved
          }
        `;
      } else {
        prompt = `
          As an ATS expert, enhance the following position information for "${question}": "${userInput}".
          Format it to be professional and consistent for a resume.
          Even if the input is poorly phrased, try to extract and format the relevant information.
          
          Return your response as a JSON object with this structure:
          {
            "isValid": boolean, // true unless completely nonsensical gibberish
            "formattedValue": string, // the improved position information
            "message": string // explanation of what was improved
          }
        `;
      }
    } else if (stage === "achievements") {
      // For achievements, help format and enhance significantly
      prompt = `
        As an ATS expert, enhance the following achievement for a resume: "${userInput}".
        Transform it into a professional, impactful achievement statement:
        1. Start with a strong action verb in the past tense
        2. Add specific metrics or outcomes if possible
        3. Use concise, professional language
        4. Make it specific and quantifiable if possible
        
        Even if the input is basic or poorly phrased, try to create a professional achievement from it.
        
        Return your response as a JSON object with this structure:
        {
          "isValid": boolean, // true unless completely nonsensical gibberish
          "formattedValue": string, // the enhanced achievement
          "message": string // explanation of what was improved
        }
      `;
    } else {
      // General validation for other questions
      prompt = `
        As an ATS expert, improve the following input for a resume: "${userInput}".
        Format it to be concise, professional, and ATS-friendly.
        Even if the input is poorly phrased, try to improve it professionally.
        
        Return your response as a JSON object with this structure:
        {
          "isValid": boolean, // true unless completely nonsensical gibberish
          "formattedValue": string, // the improved text
          "message": string // explanation of what was improved
        }
      `;
    }

    // Generate content with Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text();

    // Parse JSON response
    try {
      const jsonResponse = JSON.parse(
        textResponse.replace(/```json|```/g, "").trim()
      );

      // Ensure we have the expected structure
      if (typeof jsonResponse.isValid !== "boolean") {
        throw new Error("Missing isValid field in response");
      }

      // For all sections except personal_info, provide feedback on improvements
      if (stage !== "personal_info" && jsonResponse.isValid) {
        // Only add enhancement message if not just passing through "done" or yes/no
        const lowerInput = userInput.toLowerCase();
        if (
          lowerInput !== "done" &&
          lowerInput !== "yes" &&
          lowerInput !== "no" &&
          jsonResponse.formattedValue !== userInput
        ) {
          jsonResponse.message = `I've improved this to be more ATS-friendly: ${jsonResponse.formattedValue}`;
        }
      }

      return jsonResponse;
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      console.log("Raw response:", textResponse);

      // Return a conservative response - treat as invalid if we can't parse
      return {
        isValid: false,
        formattedValue: "",
        message:
          "I couldn't validate your input properly. Please try again with clearer information.",
      };
    }
  } catch (error) {
    console.error("Error with Gemini API:", error);
    return {
      isValid: false,
      formattedValue: "",
      message:
        "I'm having trouble validating your input right now. Please try again with a clearly formatted value.",
    };
  }
}

// Function to process entire category with Gemini
async function processCategoryWithGemini(userInput, stage, resumeData) {
  try {
    // Get Gemini model - use gemini-1.5-flash for better processing
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create a prompt based on the current stage
    let prompt = "";

    switch (stage) {
      case "personal_info":
        prompt = `
          As an ATS expert, parse and validate the following personal information for a resume:
          
          "${userInput}"
          
          Extract and validate the following fields:
          1. Full Name (required)
          2. Phone Number (required, must be valid format)
          3. Email (required, must be valid format)
          4. LinkedIn URL (optional, must be valid if provided)
          5. GitHub URL (optional, can be 'none')
          
          Ensure all required fields are present and properly formatted.
          Do NOT create or guess any missing required information.
          
          Return your response as a JSON object with this structure:
          {
            "isValid": boolean, // true only if all required fields are valid
            "formattedData": {
              "name": string, // formatted full name
              "phone": string, // formatted phone number
              "email": string, // validated email
              "linkedin": string, // formatted LinkedIn URL or empty string
              "github": string // formatted GitHub URL or empty string
            },
            "message": string // feedback or error message
          }
        `;
        break;

      case "education":
        prompt = `
          As an ATS expert, parse and structure the following education information for a resume:
          
          "${userInput}"
          
          For each education entry (they may be provided as separate paragraphs or sections):
          1. Extract the institution name
          2. Extract the degree and field of study
          3. Extract the duration (start year - end year)
          4. Extract GPA if provided
          
          Format all entries to be professional and ATS-friendly.
          
          Return your response as a JSON object with this structure:
          {
            "isValid": boolean, // true if at least one valid education entry is found
            "formattedData": [
              {
                "institution": string, // formatted institution name
                "degree": string, // formatted degree
                "duration": string, // formatted duration
                "gpa": string // formatted GPA or empty string if not provided
              },
              // additional education entries...
            ],
            "message": string // feedback or error message
          }
        `;
        break;

      case "technical_skills":
        prompt = `
          As an ATS expert, parse and categorize the following technical skills for a resume:
          
          "${userInput}"
          
          Extract and format skills into these categories:
          1. Programming Languages
          2. Libraries/Frameworks
          3. Databases
          4. Tools/Platforms
          5. APIs
          
          Format each category's skills with proper capitalization and separate with commas.
          
          Return your response as a JSON object with this structure:
          {
            "isValid": boolean, // true if at least some valid skills found
            "formattedData": {
              "Languages": string[], // array of programming languages
              "Libraries/Frameworks": string[], // array of frameworks/libraries
              "Databases": string[], // array of databases
              "Tools/Platforms": string[], // array of tools/platforms
              "APIs": string[] // array of APIs
            },
            "message": string // feedback or error message
          }
        `;
        break;

      case "projects":
        prompt = `
          As an ATS expert, parse and structure the following project information for a resume:
          
          "${userInput}"
          
          For each project (they may be provided as separate paragraphs or sections):
          1. Extract the project name
          2. Extract technologies used (convert to array)
          3. Extract GitHub link (if provided)
          4. Extract demo link (if provided)
          5. Extract key points (convert to array of bullet points)
          
          Format all content to be professional, impactful, and ATS-friendly.
          Key points should start with strong action verbs and highlight accomplishments.
          
          Return your response as a JSON object with this structure:
          {
            "isValid": boolean, // true if at least one valid project is found
            "formattedData": [
              {
                "name": string, // formatted project name
                "technologies": string[], // array of technologies used
                "github_link": string, // formatted GitHub URL or empty string
                "demo_link": string, // formatted demo URL or empty string
                "points": string[] // array of formatted bullet points
              },
              // additional projects...
            ],
            "message": string // feedback or error message
          }
        `;
        break;

      case "positions":
        prompt = `
          As an ATS expert, parse and structure the following work experience information for a resume:
          
          "${userInput}"
          
          For each position (they may be provided as separate paragraphs or sections):
          1. Extract the organization name
          2. Extract the location
          3. Extract the role(s) (this should be a single string, not an array)
          4. Extract the duration
          5. Extract key responsibilities/accomplishments as an array of bullet points
          
          Format all content to be professional, impactful, and ATS-friendly.
          Responsibility points should start with strong action verbs and highlight accomplishments.
          
          IMPORTANT: Ensure "roles" is always returned as a string, not an array.
          
          Return your response as a JSON object with this structure:
          {
            "isValid": boolean, // true if at least one valid position is found
            "formattedData": [
              {
                "organization": string, // formatted organization name
                "location": string, // formatted location
                "roles": string, // formatted role(s) as a STRING, not an array
                "duration": string, // formatted duration
                "points": string[] // array of formatted responsibility bullet points
              },
              // additional positions...
            ],
            "message": string // feedback or error message
          }
        `;
        break;

      case "achievements":
        prompt = `
          As an ATS expert, parse and enhance the following achievements for a resume:
          
          "${userInput}"
          
          For each achievement:
          1. Format it to be professional and impactful
          2. Start with strong action verbs when appropriate
          3. Include metrics or specifics when possible
          4. Make each achievement ATS-friendly
          
          Return your response as a JSON object with this structure:
          {
            "isValid": boolean, // true if at least one valid achievement is found
            "formattedData": string[], // array of formatted achievements
            "message": string // feedback or error message
          }
        `;
        break;

      default:
        prompt = `
          As an ATS expert, parse and structure the following resume information:
          
          "${userInput}"
          
          Format the content to be professional and ATS-friendly.
          
          Return your response as a JSON object with this structure:
          {
            "isValid": boolean, // true if valid content found
            "formattedData": any, // structured and formatted data
            "message": string // feedback or error message
          }
        `;
    }

    // Generate content with Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text();

    // Parse JSON response
    try {
      const jsonResponse = JSON.parse(
        textResponse.replace(/```json|```/g, "").trim()
      );

      // Ensure we have the expected structure
      if (typeof jsonResponse.isValid !== "boolean") {
        throw new Error("Missing isValid field in response");
      }

      // For positions, ensure roles is always a string
      if (
        stage === "positions" &&
        jsonResponse.isValid &&
        Array.isArray(jsonResponse.formattedData)
      ) {
        jsonResponse.formattedData = jsonResponse.formattedData.map(
          (position) => {
            // If roles is an array, join it into a string
            if (Array.isArray(position.roles)) {
              position.roles = position.roles.join(", ");
            }
            return position;
          }
        );
      }

      // Add feedback message on successful parsing
      if (jsonResponse.isValid) {
        switch (stage) {
          case "personal_info":
            jsonResponse.message =
              "Great! I've saved your personal information.";
            break;
          case "education":
            jsonResponse.message = `Successfully added ${
              jsonResponse.formattedData.length
            } education ${
              jsonResponse.formattedData.length === 1 ? "entry" : "entries"
            }.`;
            break;
          case "technical_skills":
            jsonResponse.message =
              "Successfully categorized your technical skills.";
            break;
          case "projects":
            jsonResponse.message = `Successfully added ${
              jsonResponse.formattedData.length
            } ${
              jsonResponse.formattedData.length === 1 ? "project" : "projects"
            }.`;
            break;
          case "positions":
            jsonResponse.message = `Successfully added ${
              jsonResponse.formattedData.length
            } work ${
              jsonResponse.formattedData.length === 1
                ? "experience"
                : "experiences"
            }.`;
            break;
          case "achievements":
            jsonResponse.message = `Successfully added ${
              jsonResponse.formattedData.length
            } ${
              jsonResponse.formattedData.length === 1
                ? "achievement"
                : "achievements"
            }.`;
            break;
          default:
            jsonResponse.message = "Successfully processed your information.";
        }
      }

      return jsonResponse;
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      console.log("Raw response:", textResponse);

      return {
        isValid: false,
        formattedData: {},
        message:
          "I couldn't structure your information properly. Please provide it in the format I suggested.",
      };
    }
  } catch (error) {
    console.error("Error with Gemini API:", error);
    return {
      isValid: false,
      formattedData: {},
      message:
        "I'm having trouble processing your input right now. Please try again with the suggested format.",
    };
  }
}

// Function to normalize project descriptions to tech stack format
async function normalizeProjectDescriptions(resumeData) {
  if (!resumeData || !resumeData.projects || !Array.isArray(resumeData.projects)) {
    return resumeData;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Create a deep copy to avoid modifying the original while iterating
    const updatedResumeData = JSON.parse(JSON.stringify(resumeData));
    
    // Process each project description
    for (let i = 0; i < updatedResumeData.projects.length; i++) {
      const project = updatedResumeData.projects[i];
      
      // Skip if no description or already in tech stack format (no "Built with" prefix anymore)
      if (!project.description || project.description.includes(',')) {
        continue;
      }
      
      const prompt = `
        Convert this project description to a simple comma-separated tech stack format: "${project.description}"
        
        Return ONLY a string in the format "[Tech1], [Tech2], [Tech3], etc." without any additional text or prefixes.
        For example:
        - If input mentions "Created a web app using React and Node.js with MongoDB", return "React.js, Node.js, MongoDB"
        - If input is "Python script for data analysis", return "Python, Data Analysis"
        
        Extract all technologies mentioned and list them with proper capitalization and formatting.
        If no specific technologies are mentioned, extract the general tech areas (Web Development, Mobile App, etc.).
      `;
      
      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const techStackDescription = response.text().trim();
        
        // Only update if we got a valid response
        if (techStackDescription && techStackDescription.length > 3) {
          updatedResumeData.projects[i].description = techStackDescription;
        }
      } catch (error) {
        console.error(`Error normalizing project description for project ${i}:`, error);
        // Keep original description on error
      }
    }
    
    return updatedResumeData;
  } catch (error) {
    console.error('Error in normalizeProjectDescriptions:', error);
    return resumeData; // Return original on error
  }
}

// Backend API endpoint for processing user input
app.post("/collect-resume", async (req, res) => {
  const { userInput, currentStage, currentQuestion, resumeData: clientResumeData } = req.body;
  
  // Update the global resumeData with the client's current data
  if (clientResumeData) {
    resumeData = { ...resumeData, ...clientResumeData };
  }
  
  const updatedResumeData = { ...resumeData };

  try {
    // Process user input with Gemini AI
    const aiResponse = await processWithGemini(
      userInput,
      currentStage,
      currentQuestion,
      resumeData
    );

    // Update the resume data only if the input is valid
    if (aiResponse.isValid) {
      // Handle different stages
      switch (currentStage) {
        case "personal_info":
          updatedResumeData.personalInfo = {
            ...updatedResumeData.personalInfo,
            [currentQuestion]: aiResponse.formattedValue,
          };
          break;

        case "education":
          if (currentQuestion === "more_education") {
            // Just pass through for yes/no questions
            break;
          } else if (currentQuestion === "institution") {
            // Start a new education entry
            updatedResumeData.education.push({
              institution: aiResponse.formattedValue,
            });
          } else {
            // Update the most recent education entry
            const currentEduIndex = updatedResumeData.education.length - 1;
            if (currentEduIndex >= 0) {
              updatedResumeData.education[currentEduIndex][currentQuestion] =
                aiResponse.formattedValue;
            }
          }
          break;

        case "technical_skills":
          // Map to the correct category in technicalSkills
          const category = mapSkillCategory(currentQuestion);
          if (category) {
            // Split by comma, trim whitespace, and filter out empty items
            const skillsArray = aiResponse.formattedValue
              .split(",")
              .map((skill) => skill.trim())
              .filter((skill) => skill.length > 0);

            updatedResumeData.technicalSkills[category] = skillsArray;
          }
          break;

        case "projects":
          if (
            currentQuestion === "more_projects" ||
            currentQuestion === "more_points"
          ) {
            // Just pass through for yes/no questions
            break;
          } else if (currentQuestion === "name") {
            // Start a new project entry
            updatedResumeData.projects.push({
              name: aiResponse.formattedValue,
              points: [],
            });
          } else if (currentQuestion === "points") {
            if (userInput.toLowerCase() !== "done") {
              // Add a new point to the current project
              const currentProjIndex = updatedResumeData.projects.length - 1;
              if (currentProjIndex >= 0) {
                updatedResumeData.projects[currentProjIndex].points.push(
                  aiResponse.formattedValue
                );
              }
            }
          } else {
            // Update other fields of the most recent project
            const currentProjIndex = updatedResumeData.projects.length - 1;
            if (currentProjIndex >= 0) {
              updatedResumeData.projects[currentProjIndex][currentQuestion] =
                aiResponse.formattedValue;
            }
          }
          break;

        case "positions":
          if (
            currentQuestion === "intro" ||
            currentQuestion === "more_positions" ||
            currentQuestion === "more_points"
          ) {
            // Just pass through for yes/no questions
            break;
          } else if (currentQuestion === "organization") {
            // Start a new position entry
            updatedResumeData.positions.push({
              organization: aiResponse.formattedValue,
              points: [],
            });
          } else if (currentQuestion === "points") {
            if (userInput.toLowerCase() !== "done") {
              // Add a new point to the current position
              const currentPosIndex = updatedResumeData.positions.length - 1;
              if (currentPosIndex >= 0) {
                updatedResumeData.positions[currentPosIndex].points.push(
                  aiResponse.formattedValue
                );
              }
            }
          } else {
            // Update other fields of the most recent position
            const currentPosIndex = updatedResumeData.positions.length - 1;
            if (currentPosIndex >= 0) {
              updatedResumeData.positions[currentPosIndex][currentQuestion] =
                aiResponse.formattedValue;
            }
          }
          break;

        case "achievements":
          if (currentQuestion === "more_achievements") {
            // Just pass through for yes/no questions
            break;
          } else if (currentQuestion === "intro") {
            // Add a new achievement
            updatedResumeData.achievements.push(aiResponse.formattedValue);
          }
          break;

        default:
          // No changes for any other stage
          break;
      }

      // Return the updated resume data and any message
      return res.json({
        resumeData: updatedResumeData,
        message: aiResponse.message || "Information saved successfully.",
      });
    } else {
      // If validation failed, return error message
      return res.json({
        resumeData: resumeData, // Return original data
        error: true,
        message:
          aiResponse.message ||
          "That doesn't look right. Please provide valid information.",
      });
    }
  } catch (error) {
    console.error("Error processing resume data:", error);
    return res.status(500).json({
      error: true,
      message:
        "I encountered an error processing your information. Please try again.",
    });
  }
});

// New endpoint for processing entire categories at once
app.post("/collect-category", async (req, res) => {
  const { input, category, resumeData } = req.body;
  const updatedResumeData = { ...resumeData };

  try {
    console.log('Received /collect-category request:', { category, resumeData: JSON.stringify(resumeData).substring(0, 100) + '...' });

    // Process the category with Gemini AI
    const aiResponse = await processCategoryWithGemini(
      input,
      category,
      resumeData
    );

    if (aiResponse.isValid) {
      // Update the resume data with the structured response
      switch (category) {
        case "personal_info":
          updatedResumeData.personalInfo = aiResponse.formattedData;
          break;

        case "education":
          updatedResumeData.education = aiResponse.formattedData;
          break;

        case "technical_skills":
          updatedResumeData.technicalSkills = aiResponse.formattedData;
          break;

        case "projects":
          updatedResumeData.projects = aiResponse.formattedData;
          break;

        case "positions":
          updatedResumeData.positions = aiResponse.formattedData;
          break;

        case "achievements":
          updatedResumeData.achievements = aiResponse.formattedData;
          break;

        default:
          // No changes for other stages
          break;
      }

      console.log('Updated resume data:', JSON.stringify(updatedResumeData).substring(0, 200) + '...');

      // Generate a confirmation message
      let confirmationPrompt = `
        You are a friendly resume assistant. The user has just provided information for the "${category}" section of their resume.
        Generate a brief, friendly confirmation message acknowledging receipt of this information.
        Keep it short and conversational. Do not list the information back to them.
        If appropriate, mention what section comes next in the resume building process.
      `;

      const confirmationResult = await model.generateContent(confirmationPrompt);
      const confirmationResponse = await confirmationResult.response;
      const message = confirmationResponse.text().trim();

      const response_data = {
        message,
        resumeData: updatedResumeData,
        success: true
      };

      console.log('Sending response:', { message, success: true });

      return res.json(response_data);
    } else {
      // If validation failed, return error message
      return res.json({
        resumeData: resumeData, // Return original data
        error: true,
        message:
          aiResponse.message ||
          "Please provide the information in the suggested format.",
      });
    }
  } catch (error) {
    console.error('Error processing category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Process an entire resume section at once
app.post('/api/collect-category', async (req, res) => {
  try {
    const { input, category, resumeData } = req.body;
    
    console.log('Received /api/collect-category request:', { 
      category, 
      input: input.substring(0, 50) + '...',
      resumeData: JSON.stringify(resumeData).substring(0, 100) + '...' 
    });
    
    if (!input || !category || !resumeData) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    // Normalize and correct the user input
    const normalizedInput = await normalizeUserInput(input, category);
    
    // Get Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Create a prompt based on the category
    let prompt = '';
    
    switch (category) {
      case 'personal_info':
        prompt = `
          You are a resume assistant helping to extract personal information from user input.
          Parse the following text and extract the personal information in a structured format.
          The user has provided this information in natural language, so you need to identify the relevant details.
          
          User input: "${normalizedInput}"
          
          Return ONLY a JSON object with the following structure:
          {
            "name": "Full Name",
            "email": "email@example.com",
            "phone": "Phone number",
            "location": "Location",
            "summary": "Professional summary if provided, otherwise empty string",
            "linkedin": "LinkedIn URL or empty string if not provided",
            "github": "GitHub URL or empty string if not provided"
          }
          
          Ensure that:
          - LinkedIn URLs are in the format "https://www.linkedin.com/in/username"
          - GitHub URLs are in the format "https://github.com/username"
          - All URLs include the https:// prefix
          
          Do not include any explanations, just the JSON object.
        `;
        break;
        
      case 'education':
        prompt = `
          You are a resume assistant helping to extract education information from user input.
          Parse the following text and extract the education information in a structured format.
          
          User input: "${normalizedInput}"
          
          Return ONLY a JSON array with the following structure:
          [
            {
              "institution": "University/College Name",
              "area": "Field of Study",
              "studyType": "Degree Type (e.g., Bachelor of Science)",
              "startDate": "Start Year",
              "endDate": "End Year or 'Present'",
              "gpa": "GPA if provided, otherwise empty string"
            },
            // Additional education entries if provided
          ]
          
          Do not include any explanations, just the JSON array.
        `;
        break;
        
      case 'technical_skills':
        prompt = `
          You are a resume assistant helping to categorize technical skills from user input.
          Parse the following text and categorize the skills into appropriate categories.
          
          User input: "${normalizedInput}"
          
          Return ONLY a JSON object with the following structure:
          {
            "programmingLanguages": ["Language1", "Language2", ...],
            "librariesFrameworks": ["Framework1", "Library1", ...],
            "databases": ["Database1", "Database2", ...],
            "toolsPlatforms": ["Tool1", "Platform1", ...],
            "apis": ["API1", "API2", ...]
          }
          
          Ensure that:
          1. You include all relevant skills mentioned by the user
          2. You use industry-standard terminology for all skills (e.g., "JavaScript" not "JS", "Amazon Web Services" not just "AWS")
          3. You categorize each skill appropriately
          4. You list the most important/relevant skills first in each category
          
          Do not include any explanations, just the JSON object.
        `;
        break;
        
      case 'projects':
        prompt = `
          You are a resume assistant helping to extract project information from user input.
          Parse the following text and extract the project information in a structured format.
          
          User input: "${normalizedInput}"
          
          Return ONLY a JSON array with the following structure:
          [
            {
              "name": "Project Name",
              "description": "Detailed project description with ATS-friendly keywords",
              "highlights": ["Achievement or feature 1", "Achievement or feature 2", ...]
            },
            // Additional project entries if provided
          ]
          
          For the project descriptions and highlights:
          1. Use detailed, specific language that includes relevant technical terms and ATS-friendly keywords
          2. Focus on quantifiable achievements and outcomes (e.g., "Increased performance by 40%")
          3. Mention specific technologies, methodologies, and tools used
          4. Use action verbs at the beginning of highlights (e.g., "Implemented", "Developed", "Designed")
          5. Include relevant industry-specific terminology
          6. Make each highlight 1-2 sentences long with specific details
          7. Ensure descriptions are comprehensive but concise (2-3 sentences)
          
          Do not include any explanations, just the JSON array.
        `;
        break;
        
      case 'positions':
        prompt = `
          You are a resume assistant helping to extract work experience information from user input.
          Parse the following text and extract the work experience information in a structured format.
          
          User input: "${normalizedInput}"
          
          Return ONLY a JSON array with the following structure:
          [
            {
              "company": "Company Name",
              "position": "Job Title",
              "startDate": "Start Date (Month Year)",
              "endDate": "End Date (Month Year) or 'Present'",
              "summary": "Brief job summary if provided, otherwise empty string",
              "highlights": ["Responsibility or achievement 1", "Responsibility or achievement 2", ...]
            },
            // Additional work experience entries if provided
          ]
          
          For the job summaries and highlights:
          1. Use detailed, specific language that includes relevant technical terms and ATS-friendly keywords
          2. Focus on quantifiable achievements and outcomes (e.g., "Increased sales by 25%")
          3. Use action verbs at the beginning of highlights (e.g., "Managed", "Led", "Developed")
          4. Include relevant industry-specific terminology
          5. Highlight leadership, teamwork, and problem-solving skills where applicable
          6. Make each highlight 1-2 sentences long with specific details
          7. Ensure summaries are comprehensive but concise (2-3 sentences)
          
          Do not include any explanations, just the JSON array.
        `;
        break;
        
      case 'achievements':
        prompt = `
          You are a resume assistant helping to extract achievements, awards, and certifications from user input.
          Parse the following text and extract the achievements information in a structured format.
          
          User input: "${normalizedInput}"
          
          Return ONLY a JSON array with the following structure:
          [
            {
              "title": "Award/Achievement/Certification Title",
              "date": "Date received (Month Year) if provided, otherwise empty string",
              "awarder": "Organization that gave the award if provided, otherwise empty string",
              "summary": "Detailed description of the achievement with ATS-friendly keywords"
            },
            // Additional achievement entries if provided
          ]
          
          For the achievement summaries:
          1. Use detailed, specific language that includes relevant technical terms and ATS-friendly keywords
          2. Focus on the significance of the achievement and its impact
          3. Include relevant industry-specific terminology
          4. Mention skills or competencies demonstrated by the achievement
          5. Make each summary 1-2 sentences long with specific details
          
          Do not include any explanations, just the JSON array.
        `;
        break;
        
      default:
        return res.status(400).json({ error: 'Invalid category' });
    }

    console.log(`Processing ${category} with Gemini...`);
    
    // Call Gemini API to process the input
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    console.log('Raw Gemini response:', responseText.substring(0, 200) + '...');
    
    // Extract the JSON from the response
    let parsedData;
    try {
      // Find JSON in the response (it might be wrapped in markdown code blocks)
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || 
                        responseText.match(/```\n([\s\S]*?)\n```/) || 
                        responseText.match(/{[\s\S]*?}/) ||
                        responseText.match(/\[([\s\S]*?)\]/);
                        
      const jsonString = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : responseText;
      parsedData = JSON.parse(jsonString.replace(/^```json|```$/g, '').trim());
      
      console.log('Parsed data:', JSON.stringify(parsedData).substring(0, 200) + '...');
    } catch (error) {
      console.error('Error parsing JSON from Gemini response:', error);
      console.log('Raw response:', responseText);
      return res.status(500).json({ error: 'Failed to parse response from AI' });
    }
    
    // Update the resume data based on the category
    const updatedResumeData = { ...resumeData };
    
    switch (category) {
      case 'personal_info':
        updatedResumeData.basics = parsedData;
        break;
        
      case 'education':
        updatedResumeData.education = parsedData;
        break;
        
      case 'technical_skills':
        updatedResumeData.skills = parsedData;
        break;
        
      case 'projects':
        updatedResumeData.projects = parsedData;
        break;
        
      case 'positions':
        updatedResumeData.experience = parsedData;
        break;
        
      case 'achievements':
        updatedResumeData.awards = parsedData;
        break;
    }
    
    console.log('Updated resume data:', JSON.stringify(updatedResumeData).substring(0, 200) + '...');
    
    // Generate a confirmation message
    let confirmationPrompt = `
      You are a friendly resume assistant. The user has just provided information for the "${category}" section of their resume.
      Generate a brief, friendly confirmation message acknowledging receipt of this information.
      Keep it short and conversational. Do not list the information back to them.
      If appropriate, mention what section comes next in the resume building process.
    `;
    
    const confirmationResult = await model.generateContent(confirmationPrompt);
    const confirmationResponse = await confirmationResult.response;
    const message = confirmationResponse.text().trim();
    
    return res.json({
      message,
      resumeData: updatedResumeData,
      success: true
    });
    
  } catch (error) {
    console.error('Error processing category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to get the resume data
app.get('/api/resume-data', async (req, res) => {
  try {
    // Normalize project descriptions to tech stack format
    const normalizedResumeData = await normalizeProjectDescriptions(resumeData);
    
    res.json({
      success: true,
      resumeData: normalizedResumeData
    });
  } catch (error) {
    console.error('Error retrieving resume data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve resume data'
    });
  }
});

// Generate a professional summary based on the entire resume
app.post('/api/generate-summary', async (req, res) => {
  try {
    const { resumeData } = req.body;
    
    console.log('Received request to generate professional summary');
    
    if (!resumeData) {
      return res.status(400).json({ error: 'Missing resume data' });
    }
    
    // Check if API key is available
    if (!apiKey) {
      console.warn('No Gemini API key available - using fallback summary generation');
      
      // Generate a fallback summary based on the resume data
      const name = resumeData.basics?.name || '';
      const skills = resumeData.skills?.programmingLanguages?.slice(0, 3).join(', ') || '';
      const experience = resumeData.experience?.length > 0 ? 
        `${resumeData.experience[0].position} at ${resumeData.experience[0].company}` : '';
      
      const fallbackSummary = `Experienced professional${name ? ' ' + name : ''} with expertise in ${skills || 'various technical skills'}. ${experience ? `Previously worked as ${experience}. ` : ''}Dedicated to delivering high-quality results and continuously improving skills.`;
      
      return res.json({
        summary: fallbackSummary,
        success: true,
        fallback: true
      });
    }
    
    // Get Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Create a prompt to generate a professional summary
    const prompt = `
      You are a professional resume writer tasked with creating a compelling professional summary.
      Based on the following resume information, create a concise, powerful professional summary (3-4 sentences) 
      that highlights the candidate's key skills, experience, and career focus.
      
      The summary should be written in first person and should be attention-grabbing, professional, and tailored 
      to the candidate's experience level and industry.
      
      Make sure to:
      1. Include relevant ATS-friendly keywords from the candidate's industry and role
      2. Highlight quantifiable achievements where possible
      3. Emphasize the candidate's unique value proposition
      4. Use strong action verbs and industry-specific terminology
      5. Ensure the summary is optimized for Applicant Tracking Systems (ATS)
      6. Keep the tone professional yet personable
      
      Resume Information:
      ${JSON.stringify(resumeData, null, 2)}
      
      Return ONLY the professional summary text, without any additional explanations or formatting.
      The summary should be approximately 50-75 words.
    `;
    
    console.log('Generating professional summary with Gemini...');
    
    // Call Gemini API to generate the summary
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text().trim();
    
    console.log('Generated summary:', summary);
    
    return res.json({
      summary,
      success: true
    });
    
  } catch (error) {
    console.error('Error generating professional summary:', error);
    
    // Generate a fallback summary if there's an error
    try {
      const { resumeData } = req.body;
      
      if (resumeData) {
        const name = resumeData.basics?.name || '';
        const skills = resumeData.skills?.programmingLanguages?.slice(0, 3).join(', ') || '';
        const experience = resumeData.experience?.length > 0 ? 
          `${resumeData.experience[0].position} at ${resumeData.experience[0].company}` : '';
        
        const fallbackSummary = `Experienced professional${name ? ' ' + name : ''} with expertise in ${skills || 'various technical skills'}. ${experience ? `Previously worked as ${experience}. ` : ''}Dedicated to delivering high-quality results and continuously improving skills.`;
        
        return res.json({
          summary: fallbackSummary,
          success: true,
          fallback: true
        });
      }
    } catch (fallbackError) {
      console.error('Error generating fallback summary:', fallbackError);
    }
    
    res.status(500).json({ 
      error: 'Failed to generate professional summary',
      message: error.message 
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Make sure to set GEMINI_API_KEY in your .env file`);
});