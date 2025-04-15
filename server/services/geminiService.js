// source: [cite: 2, 4]
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const apiKey = process.env.GEMINI_API_KEY; 
if (!apiKey) {
  console.error('GEMINI_API_KEY is not set. Please check your .env file or environment variables.');
}
// Initialize Gemini API safely
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null; 
const modelName = "gemini-1.5-flash"; 

// Helper to get model, handles missing API key
const getModel = () => {
    if (!genAI) {
        console.error("Gemini API key not configured. Cannot get model.");
        return null;
    }
    try {
        return genAI.getGenerativeModel({ model: modelName }); // source: [cite: 7, 17, 89, 145, 206, 275]
    } catch (error) {
        console.error("Error getting Gemini model:", error);
        return null;
    }
};

// Helper function to safely call Gemini API and parse JSON response
const generateAndParseJson = async (prompt) => {
    const model = getModel();
    if (!model) {
         return {
            success: false,
            data: null,
            message: "Gemini API not configured or model unavailable.",
            rawResponse: null
        };
    }

    try {
        const result = await model.generateContent(prompt); // source: [cite: 13, 79, 123, 152, 201, 241, 260, 282]
        const response = await result.response; // source: [cite: 14, 80, 124, 152, 201, 242, 260, 283]
        const textResponse = response.text(); // source: [cite: 14, 80, 124, 153, 201, 242, 260, 283]

        // Try parsing JSON response (can be wrapped in markdown)
        let parsedData;
        try {
            const jsonMatch = textResponse.match(/```json\n([\s\S]*?)\n```/) || // source: [cite: 244]
                              textResponse.match(/```\n([\s\S]*?)\n```/) || // source: [cite: 245]
                              textResponse.match(/{[\s\S]*?}/) || // source: [cite: 245]
                              textResponse.match(/\[([\s\S]*?)\]/); // source: [cite: 245]

            const jsonString = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : textResponse; // source: [cite: 245]
            parsedData = JSON.parse(jsonString.replace(/^```json|```$/g, '').trim()); // source: [cite: 80, 124, 245]
            return { success: true, data: parsedData, message: "Success", rawResponse: textResponse }; // source: [cite: 246]
        } catch (parseError) { // source: [cite: 85, 140, 246]
            console.error("Error parsing Gemini JSON response:", parseError); // source: [cite: 85, 140, 247]
            console.log("Raw Gemini response:", textResponse); // source: [cite: 85, 140, 247]
            return {
                 success: false,
                 data: null,
                 message: "Failed to parse response from AI. Raw response logged.",
                 rawResponse: textResponse
            };
        }
    } catch (error) { 
        console.error("Error generating content with Gemini:", error);
        return {
            success: false,
            data: null,
            message: `Error interacting with Gemini API: ${error.message}`,
            rawResponse: null
        };
    }
};


// Helper function to normalize user input (Original logic)
// source: [cite: 7]
const normalizeUserInput = async (input, category) => {
    const model = getModel();
    if (!model) return input; // Return original if model unavailable

    try {
        // source: [cite: 8, 11]
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
          6. For LinkedIn usernames, convert to full URLs (e.g., "johndoe" → "https://www.linkedin.com/in/johndoe")
          7. For GitHub usernames, convert to full URLs (e.g., "jdoe" → "https://github.com/jdoe")
          8. For other websites, ensure they have proper URL format with https:// prefix
          Return ONLY the corrected text without any explanations or additional comments.
          Preserve the original meaning and information.
        `;

        if (category === 'personal_info') { // source: [cite: 11]
          prompt += `
            Pay special attention to LinkedIn and GitHub URLs:
            - If only a username is provided for LinkedIn (e.g., "linkedin: johndoe"), convert to "https://www.linkedin.com/in/johndoe"
            - If only a username is provided for GitHub (e.g., "github: jdoe"), convert to "https://github.com/jdoe"
            - If the URL is already complete and correct, leave it as is
          `; // source: [cite: 12]
        }

        const result = await model.generateContent(prompt); // source: [cite: 13]
        const response = await result.response; // source: [cite: 14]
        const normalizedInput = response.text().trim(); // source: [cite: 14]

        console.log('Original input:', input.substring(0, 50) + '...'); // source: [cite: 14]
        console.log('Normalized input:', normalizedInput.substring(0, 50) + '...'); // source: [cite: 15]
        return normalizedInput; // source: [cite: 15]
    } catch (error) { // source: [cite: 15]
        console.error('Error normalizing user input:', error);
        return input; // Return original input if normalization fails // source: [cite: 16]
    }
};


// Function to process individual user input field (Original logic from /collect-resume)
// source: [cite: 17]
async function processFieldWithGemini(userInput, stage, question) {
    // Construct the prompt based on the original processWithGemini logic
    // This involves a large switch/case structure based on stage and question
    // Referencing lines
    let prompt = "";
     // --- Reconstruct the prompt based on lines---
     // Example for personal_info -> email:
     if (stage === "personal_info" && question === "email") { // source: [cite: 19]
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
          `; // source:
     }
      // ... add all other cases from the original function ...
      else if (stage === "personal_info" && question === "linkedin") { // source: [cite: 23]
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
            `; // source:
        } else if (stage === "personal_info" && question === "github") { // source: [cite: 27]
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
            `; // source:
        } else if (stage === "personal_info" && question === "phone") { // source: [cite: 32]
            prompt = `
              As a resume validation expert, strictly validate if the following input is a valid phone number: "${userInput}".
              Do NOT create a phone number from random text - only format recognizable phone numbers.
              Return your response as a JSON object with this structure:
              {
                "isValid": boolean, // true ONLY if it's a recognizable phone number
                "formattedValue": string, // formatted phone number if valid, empty string if invalid
                "message": string // explanation message
              }
            `; // source:
        } else if (stage === "personal_info") { // source: [cite: 35]
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
            `; // source:
        } else if (stage === "projects") { // source: [cite: 38]
           if (question === "github_link" || question === "demo_link") { // source: [cite: 38]
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
               `; // source:
           } else if (question === "points" || question === "more_points") { // source: [cite: 43]
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
               `; // source:
           } else if (question === "description") { // source: [cite: 48]
               prompt = `
                 As an ATS expert, extract the technology stack from the following project description: "${userInput}".
                 Format the tech stack as a simple comma-separated list WITHOUT any explanatory text or prefix:
                 "[Tech1], [Tech2], [Tech3], etc."
                 For example:
                 - Input: "I created a web app using React and Node.js with MongoDB" -> Output: "React.js, Node.js, MongoDB"
                 - Input: "Python script for data analysis" -> Output: "Python, Data Analysis"
                 Guidelines:
                 1. Do NOT include any explanatory text, prefixes like "Built with:", or JSON formatting.
                 2. If no specific technologies are mentioned, extract the general tech areas (e.g., "Web Development, Data Analysis").
                 3. Use proper capitalization and formatting for tech names (e.g., React.js, Node.js, Tailwind CSS).
                 4. Separate technologies with commas only (e.g., "Tech1, Tech2, Tech3").
                 5. If the input already follows this format, just improve the formatting if needed
                 Return your response as a JSON object with this structure:
                 {
                   "isValid": boolean, // true unless completely nonsensical gibberish
                   "formattedValue": string, // the formatted tech stack list
                   "message": string // explanation of what was improved
                 }
               `; // source:
           } else { // source: [cite: 53]
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
               `; // source:
           }
        } else if (stage === "technical_skills") { // source: [cite: 56]
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
            `; // source:
        } else if (stage === "education") { // source: [cite: 60]
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
            `; // source:
        } else if (stage === "positions") { // source: [cite: 64]
            if (question === "points" || question === "more_points") { // source: [cite: 64]
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
                `; // source:
            } else { // source: [cite: 69]
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
                `; // source:
            }
        } else if (stage === "achievements") { // source: [cite: 73]
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
            `; // source:
        } else { // source: [cite: 76]
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
            `; // source:
        }


    const result = await generateAndParseJson(prompt);

    if (result.success && result.data) {
        // Replicate the post-processing logic for messages
        if (stage !== "personal_info" && result.data.isValid) {
            const lowerInput = userInput.toLowerCase();
            if (lowerInput !== "done" && lowerInput !== "yes" && lowerInput !== "no" && result.data.formattedValue !== userInput) {
                result.data.message = `I've improved this to be more ATS-friendly: ${result.data.formattedValue}`; // source: [cite: 83]
            }
        }
         // Ensure the structure matches what the controller expects {isValid, formattedValue, message}
        return {
            isValid: result.data.isValid !== undefined ? result.data.isValid : false,
            formattedValue: result.data.formattedValue || "",
            message: result.data.message || "Processing complete.",
        };
    } else {
        // Return a default error structure if Gemini call failed or parsing failed
        return {
            isValid: false, // source: [cite: 86, 88]
            formattedValue: "", // source: [cite: 86, 88]
            message: result.message || "I couldn't validate your input properly. Please try again.", // source: [cite: 86, 88]
        };
    }
}


// Function to process entire category (Original logic from /collect-category and /api/collect-category)
// source: [cite: 89, 205]
async function processCategoryWithGemini(userInput, category) {
     // Normalize the input first (using the logic from /api/collect-category)
    const normalizedInput = await normalizeUserInput(userInput, category); // source: [cite: 206]

    // Construct prompt based on category, referencing linesand
    // Choose the more detailed prompts from /api/collect-category where available
    let prompt = "";
    switch (category) {
        case 'personal_info': // source: [cite: 91, 206]
            prompt = `
               You are a resume assistant helping to extract personal information from user input.
               Parse the following text and extract the personal information in a structured format.
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
             `; // source:
            break;
         case 'education': // source: [cite: 96, 212]
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
                }
                // Additional education entries if provided
              ]
              Do not include any explanations, just the JSON array.
            `; // source:
            break;
         case 'technical_skills': // source: [cite: 101, 217]
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
            `; // source:
            break;
        case 'projects': // source: [cite: 105, 222]
        prompt = `
            You are a resume assistant helping to extract project information from user input.
            Parse the following text, which may contain details for one or more projects, and extract the information into a structured format.
            User input: "${normalizedInput}"

            Return ONLY a JSON array where each object represents a project and has the following structure:
            [
            {
                "name": "Project Name",
                "description": "Comma-separated list of technologies used", // MODIFIED FIELD
                "highlights": ["Achievement or feature 1", "Achievement or feature 2", ...]
            }
            // Additional project entries if provided
            ]

            Instructions for specific fields:
            - "name": Extract the project's name accurately.
            - "description": Extract ONLY the technologies mentioned for the project. Format them as a single comma-separated string (e.g., "React.js, Node.js, MongoDB"). Use proper capitalization (e.g., Tailwind CSS). Do NOT include any natural language description or prefixes like "Built with:". If no specific tech is mentioned, list general areas (e.g., "Web Development, API Integration"). // MODIFIED INSTRUCTIONS
            - "highlights": Extract key achievements or features as an array of strings. Improve them for ATS:
                1. Focus on quantifiable achievements and outcomes (e.g., "Increased performance by 40%")
                2. Mention specific methodologies or impact where possible.
                3. Use action verbs at the beginning (e.g., "Implemented", "Developed", "Designed")
                4. Make each highlight concise (1-2 sentences) with specific details.

            Do not include any explanations outside the JSON array. Just return the valid JSON array.
        `; // source:with modifications
        break;
        case 'positions': // source: [cite: 111, 228]
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
                }
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
            `; // source:
            break;
         case 'achievements': // source: [cite: 118, 234]
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
                }
                // Additional achievement entries if provided
              ]
              For the achievement summaries:
              1. Use detailed, specific language that includes relevant technical terms and ATS-friendly keywords
              2. Focus on the significance of the achievement and its impact
              3. Include relevant industry-specific terminology
              4. Mention skills or competencies demonstrated by the achievement
              5. Make each summary 1-2 sentences long with specific details
              Do not include any explanations, just the JSON array.
            `; // source:
            break;
        default: // source: [cite: 121, 240]
            console.warn(`Unknown category for Gemini processing: ${category}`);
             return {
                isValid: false,
                formattedData: null,
                message: `Invalid category provided: ${category}`,
            };
    }

    const result = await generateAndParseJson(prompt);

    if (result.success && result.data) {
         // Post-processing for specific categories if needed (like ensuring 'roles' is a string in 'positions')
        let finalData = result.data;
        if (category === "positions" && Array.isArray(finalData)) { // source: [cite: 126]
             finalData = finalData.map(position => {
                 // Original logic expected 'roles' field, new logic uses 'position'
                 // Adjust if necessary based on how resumeService consumes this
                 if (Array.isArray(position.position)) { // Adapt if needed
                     position.position = position.position.join(", ");
                 }
                 return position;
             });
         }

        // Generate confirmation message
        const confirmationMessage = await generateConfirmationMessage(category); // source: [cite: 197, 256]

        return {
            isValid: true, // Assume valid if parsing succeeded
            formattedData: finalData,
            message: confirmationMessage || "Information processed successfully.", // Use generated or default message // source: [cite: 201, 261]
        };
    } else {
         // If Gemini failed or parsing failed
        return {
            isValid: false, // source: [cite: 141, 143, 247]
            formattedData: null, // source: [cite: 141, 143]
            message: result.message || "I couldn't structure your information properly. Please provide it in the suggested format.", // source: [cite: 141, 143, 247]
        };
    }
}

// Function to generate a professional summary (Original logic from /api/generate-summary)
// source: [cite: 264]
async function generateProfessionalSummary(resumeData) {
    const model = getModel();
    if (!model) {
        console.warn('No Gemini API key available - using fallback summary generation'); // source: [cite: 264]
        return generateFallbackSummary(resumeData, true); // Generate fallback
    }

    // Construct prompt based on lines
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
     `; // source:

    try {
        console.log('Generating professional summary with Gemini...'); // source: [cite: 281]
        const result = await model.generateContent(prompt); // source: [cite: 282]
        const response = await result.response; // source: [cite: 283]
        const summary = response.text().trim(); // source: [cite: 283]
        console.log('Generated summary:', summary); // source: [cite: 283]
        return { summary, success: true, fallback: false }; // source: [cite: 284]
    } catch (error) { // source: [cite: 285]
        console.error('Error generating professional summary with Gemini:', error);
        return generateFallbackSummary(resumeData, true); // Generate fallback on error // source: [cite: 286, 300]
    }
}

// Helper to generate fallback summary
// source: [cite: 265, 286]
function generateFallbackSummary(resumeData, isFallback = false) {
     try {
        const name = resumeData?.basics?.name || ''; // source: [cite: 265, 287]
        let allSkills = []; // source: [cite: 265, 288]
        if (resumeData?.skills) { // source: [cite: 265, 289]
            Object.values(resumeData.skills).forEach(categorySkills => {
                if (Array.isArray(categorySkills)) { // source: [cite: 265, 289]
                    allSkills = [...allSkills, ...categorySkills]; // source: [cite: 266, 289]
                }
            });
        }
        const skills = allSkills.slice(0, 3).join(', '); // source: [cite: 266, 290]
        const experience = resumeData?.experience?.length > 0 ? // source: [cite: 267, 291]
            `${resumeData.experience[0].position} at ${resumeData.experience[0].company || resumeData.experience[0].organization}` : ''; // source: [cite: 268, 292]
        const education = resumeData?.education?.length > 0 ? // source: [cite: 268, 292]
            `${resumeData.education[0].studyType || ''} in ${resumeData.education[0].area || ''} from ${resumeData.education[0].institution || ''}`.trim() : ''; // source: [cite: 269, 293]

        const fallbackSummary = `Experienced ${skills ? `${skills} ` : ''}professional${name ? ' ' + name : ''} with expertise in ${skills || 'various technical skills'}. ${experience ? `Previously worked as ${experience}. ` : ''}${education ? `Educated with ${education}. ` : ''}Dedicated to delivering high-quality results and continuously improving skills.`; // source: [cite: 270-273, 294-297]

        return { summary: fallbackSummary, success: true, fallback: isFallback }; // source: [cite: 274, 298]
     } catch (error) { // source: [cite: 299]
         console.error("Error generating fallback summary:", error);
          return { summary: "Dedicated professional seeking new opportunities.", success: true, fallback: true };
     }
}


// Helper to generate confirmation message
// source: [cite: 197, 256]
async function generateConfirmationMessage(category) {
    const model = getModel();
    if (!model) return `Got it! Information for ${category} has been processed.`; // Fallback if model unavailable

    const confirmationPrompt = `
      You are a friendly resume assistant.
      The user has just provided information for the "${category}" section of their resume.
      Generate a brief, friendly confirmation message acknowledging receipt of this information.
      Keep it short and conversational (1-2 sentences).
      Do not list the information back to them.
      Example: "Great, I've added your project details! What's next?"
      Example: "Okay, got your skills listed. Ready for the next section?"
    `; // source: [cite: 197-201, 256-260]

    try {
        const result = await model.generateContent(confirmationPrompt); // source: [cite: 201, 260]
        const response = await result.response; // source: [cite: 201, 260]
        return response.text().trim(); // source: [cite: 201, 260]
    } catch (error) {
        console.error("Error generating confirmation message:", error);
        return `Got it! Information for ${category} has been processed.`; // Fallback on error
    }
}


// Function to normalize project descriptions (can be triggered before sending final data)
// source: [cite: 144]
async function normalizeProjectDescriptions(resumeData) {
    if (!resumeData || !resumeData.projects || !Array.isArray(resumeData.projects)) { // source: [cite: 144]
        return resumeData;
    }

    const model = getModel();
     if (!model) {
         console.warn("Cannot normalize project descriptions: Gemini model unavailable.");
         return resumeData; // Return original if model unavailable
     }

    try {
        const updatedResumeData = JSON.parse(JSON.stringify(resumeData)); // source: [cite: 146]
        for (let i = 0; i < updatedResumeData.projects.length; i++) { // source: [cite: 147]
            const project = updatedResumeData.projects[i];
            // Check if description exists and looks like a description (not comma-separated list)
            // Adjust condition based on the expected output of processCategoryWithGemini
            if (!project.description || project.description.includes(',')) { // source: [cite: 148] // Maybe check length or keywords instead
                continue;
            }

            const prompt = `
              Convert this project description to a simple comma-separated tech stack format: "${project.description}"
              Return ONLY a string in the format "[Tech1], [Tech2], [Tech3], etc." without any additional text or prefixes.
              Example: "React.js, Node.js, MongoDB"
              Extract all technologies mentioned and list them with proper capitalization and formatting.
              If no specific technologies are mentioned, extract the general tech areas (Web Development, Mobile App, etc.).
            `; // source:

            try {
                const result = await model.generateContent(prompt); // source: [cite: 152]
                const response = await result.response; // source: [cite: 152]
                const techStackDescription = response.text().trim(); // source: [cite: 153]

                if (techStackDescription && techStackDescription.length > 3) { // source: [cite: 153]
                    // Replace the 'description' field with the tech stack
                    // Or, add a new field like 'techStack' if you want to keep the original desc
                    updatedResumeData.projects[i].description = techStackDescription;
                }
            } catch (error) { // source: [cite: 154]
                console.error(`Error normalizing project description for project ${i}:`, error);
                // Keep original description on error // source: [cite: 155]
            }
        }
        return updatedResumeData; // source: [cite: 155]
    } catch (error) { // source: [cite: 156]
        console.error('Error in normalizeProjectDescriptions:', error);
        return resumeData; // Return original on error // source: [cite: 157]
    }
}


module.exports = {
    processFieldWithGemini,
    processCategoryWithGemini,
    generateProfessionalSummary,
    normalizeProjectDescriptions,
    normalizeUserInput // Export if needed directly by controller
};