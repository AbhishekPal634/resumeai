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
        return genAI.getGenerativeModel({ model: modelName });
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
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const textResponse = response.text();

        // Try parsing JSON response (can be wrapped in markdown)
        let parsedData;
        try {
            const jsonMatch = textResponse.match(/```json\n([\s\S]*?)\n```/) ||
                              textResponse.match(/```\n([\s\S]*?)\n```/) ||
                              textResponse.match(/{[\s\S]*?}/) ||
                              textResponse.match(/\[([\s\S]*?)\]/);

            const jsonString = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : textResponse;
            parsedData = JSON.parse(jsonString.replace(/^```json|```$/g, '').trim());
            return { success: true, data: parsedData, message: "Success", rawResponse: textResponse };
        } catch (parseError) {
            console.error("Error parsing Gemini JSON response:", parseError);
            console.log("Raw Gemini response:", textResponse);
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


// Helper function to normalize user input
const normalizeUserInput = async (input, category) => {
    const model = getModel();
    if (!model) return input; // Return original if model unavailable

    try {
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

        if (category === 'personal_info') {
          prompt += `
            Pay special attention to LinkedIn and GitHub URLs:
            - If only a username is provided for LinkedIn (e.g., "linkedin: johndoe"), convert to "https://www.linkedin.com/in/johndoe"
            - If only a username is provided for GitHub (e.g., "github: jdoe"), convert to "https://github.com/jdoe"
            - If the URL is already complete and correct, leave it as is
          `;
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const normalizedInput = response.text().trim();

        console.log('Original input:', input.substring(0, 50) + '...');
        console.log('Normalized input:', normalizedInput.substring(0, 50) + '...');
        return normalizedInput;
    } catch (error) {
        console.error('Error normalizing user input:', error);
        return input; // Return original input if normalization fails
    }
};


// Function to process individual user input field
async function processFieldWithGemini(userInput, stage, question) {
    // Construct prompt based on the stage and question
    let prompt = "";
     
     if (stage === "personal_info" && question === "email") {
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
     }
      else if (stage === "personal_info" && question === "linkedin") {
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
        } else if (stage === "personal_info" && question === "github") {
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
        } else if (stage === "personal_info" && question === "phone") {
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
        } else if (stage === "personal_info") {
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
        } else if (stage === "projects") {
           if (question === "github_link" || question === "demo_link") {
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
               `;
           } else {
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


    const result = await generateAndParseJson(prompt);

    if (result.success && result.data) {
        // Replicate the post-processing logic for messages
        if (stage !== "personal_info" && result.data.isValid) {
            const lowerInput = userInput.toLowerCase();
            if (lowerInput !== "done" && lowerInput !== "yes" && lowerInput !== "no" && result.data.formattedValue !== userInput) {
                result.data.message = `I've improved this to be more ATS-friendly: ${result.data.formattedValue}`;
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
            isValid: false,
            formattedValue: "",
            message: result.message || "I couldn't validate your input properly. Please try again.",
        };
    }
}


// Function to process entire category
async function processCategoryWithGemini(userInput, category) {
     // Normalize the input first
    const normalizedInput = await normalizeUserInput(userInput, category);

    // Construct prompt based on category
    let prompt = "";
    switch (category) {
        case 'personal_info':
            prompt = `
               You are a resume assistant helping to extract personal information from user input.
               Parse the following text and extract the personal information in a structured format.
               If you do not know a value, just write exactly whatever information is given. Do NOT ask for missing information, invent data, or add placeholders like [if known from context, otherwise leave as is], or mention anything irrelevant.
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
                }
                // Additional education entries if provided
              ]
              Do not include any explanations, just the JSON array.
            `;
            break;
         case 'skills':
            prompt = `
              You are a resume assistant. The user will provide a free-form list of their skills (technical, soft, creative, language, management, etc.), separated by commas or spaces. Your job is to group these skills into as FEW broad, logical categories as possible.
              If you do not know a value, just write exactly whatever information is given. Do NOT ask for missing information, invent data, or add placeholders like [if known from context, otherwise leave as is], or mention anything irrelevant.
              User input: "${normalizedInput}"
              Return ONLY a JSON array of objects, each with a 'key' (category name, e.g., 'Programming', 'Tools', 'Soft Skills', 'Languages') and a 'values' array (the skills in that category). Example:
              [
                { "key": "Programming", "values": ["Python", "JavaScript"] },
                { "key": "Tools", "values": ["Figma", "Photoshop"] },
                { "key": "Soft Skills", "values": ["Teamwork", "Leadership"] }
              ]
              - Use industry-standard terminology for all skills (e.g., "JavaScript" not "JS").
              - Only create a new category if a skill truly does not fit in an existing broad group.
              - Your goal is to keep the number of categories to a minimum and avoid over-categorization.
              - Do not include any explanations, just the JSON array.
            `;
            break;
        case 'projects':
        prompt = `
            You are a resume assistant helping to extract project information from user input.
            Parse the following text, which may contain details for one or more projects, and extract the information into a structured format.
            If you do not know a value, just write exactly whatever information is given. Do NOT ask for missing information, invent data, or add placeholders like [if known from context, otherwise leave as is], or mention anything irrelevant.
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
            - "description": Extract ONLY the technologies mentioned for the project. Format them as a single comma-separated string (e.g., "React.js, Node.js, MongoDB"). Use proper capitalization (e.g., Tailwind CSS). Do NOT include any natural language description or prefixes like "Built with:". If no specific tech is mentioned, list general areas (e.g., "Web Development, API Integration").
            - "highlights": Extract key achievements or features as an array of strings. Improve them for ATS:
                1. Focus on quantifiable achievements and outcomes (e.g., "Increased performance by 40%")
                2. Mention specific methodologies or impact where possible.
                3. Use action verbs at the beginning (e.g., "Implemented", "Developed", "Designed")
                4. Make each highlight concise (1-2 sentences) with specific details.

            Do not include any explanations outside the JSON array. Just return the valid JSON array.
        `;
        break;
        case 'experience':
            prompt = `
              You are a resume assistant helping to extract work experience information from user input.
              Parse the following text and extract the work experience information in a structured format.
              If you do not know a value, just write exactly whatever information is given. Do NOT ask for missing information, invent data, or add placeholders like [if known from context, otherwise leave as is], or mention anything irrelevant.
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
            `;
            break;
         case 'achievements':
            prompt = `
              You are a resume assistant helping to extract achievements from user input.
              Parse the following text and extract the achievements information in a structured format.
              If you do not know a value, just write exactly whatever information is given. Do NOT ask for missing information, invent data, or add placeholders like [if known from context, otherwise leave as is], or mention anything irrelevant.
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
            `;
            break;
        case 'languages':
            prompt = `
              You are a resume assistant helping to extract language proficiency information from user input.
              Parse the following text and extract the languages and proficiency levels in a structured format.
              If you do not know a value, just write exactly whatever information is given. Do NOT ask for missing information, invent data, or add placeholders like [if known from context, otherwise leave as is], or mention anything irrelevant.
              User input: "${normalizedInput}"
              Return ONLY a JSON array with the following structure:
              [
                { "language": "Language Name", "fluency": "Fluency Level (e.g., Native, Fluent, Intermediate, Beginner)" }
                // Additional entries if provided
              ]
              Do not include any explanations, just the JSON array.
            `;
            break;
        case 'volunteer':
            prompt = `
              You are a resume assistant helping to extract volunteer experience information from user input.
              Parse the following text and extract the volunteer experience in a structured format.
              If you do not know a value, just write exactly whatever information is given. Do NOT ask for missing information, invent data, or add placeholders like [if known from context, otherwise leave as is], or mention anything irrelevant.
              User input: "${normalizedInput}"
              Return ONLY a JSON array with the following structure:
              [
                {
                  "organization": "Organization Name",
                  "position": "Role Title",
                  "startDate": "Start Date (Month Year)",
                  "endDate": "End Date (Month Year) or 'Present'",
                  "summary": "Brief summary of the role or key responsibilities"
                }
                // Additional entries if provided
              ]
              Do not include any explanations, just the JSON array.
            `;
            break;
        case 'publications':
            prompt = `
              You are a resume assistant helping to extract publication information from user input.
              Parse the following text and extract the publication details in a structured format.
              If you do not know a value, just write exactly whatever information is given. Do NOT ask for missing information, invent data, or add placeholders like [if known from context, otherwise leave as is], or mention anything irrelevant.
              User input: "${normalizedInput}"
              Return ONLY a JSON array with the following structure:
              [
                {
                  "title": "Publication Title",
                  "publisher": "Publisher/Journal Name",
                  "date": "Date published (Month Year)",
                  "summary": "Brief summary or description of the publication"
                }
                // Additional entries if provided
              ]
              Do not include any explanations, just the JSON array.
            `;
            break;
        default:
            console.warn(`Unknown category for Gemini processing: ${category}`);
             return {
                isValid: false,
                formattedData: null,
                message: `Invalid category provided: ${category}`,
            };
    }

    const result = await generateAndParseJson(prompt);

    if (result.success && result.data) {
         // Post-processing for specific categories if needed
        let finalData = result.data;
        if (category === "positions" && Array.isArray(finalData)) {
             finalData = finalData.map(position => {
                 // Convert position array to string if needed
                 if (Array.isArray(position.position)) {
                     position.position = position.position.join(", ");
                 }
                 return position;
             });
         }

        // Generate confirmation message
        const confirmationMessage = await generateConfirmationMessage(category);

        return {
            isValid: true, // Assume valid if parsing succeeded
            formattedData: finalData,
            message: confirmationMessage || "Information processed successfully.",
        };
    } else {
         // If Gemini failed or parsing failed
        return {
            isValid: false,
            formattedData: null,
            message: result.message || "I couldn't structure your information properly. Please provide it in the suggested format.",
        };
    }
}

// Function to generate a professional summary
async function generateProfessionalSummary(resumeData) {
    const model = getModel();
    if (!model) {
        console.warn('No Gemini API key available - using fallback summary generation');
        return generateFallbackSummary(resumeData, true); // Generate fallback
    }

    // Construct prompt based on resume data
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

    try {
        console.log('Generating professional summary with Gemini...');
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const summary = response.text().trim();
        console.log('Generated summary:', summary);
        return { summary, success: true, fallback: false };
    } catch (error) {
        console.error('Error generating professional summary with Gemini:', error);
        return generateFallbackSummary(resumeData, true); // Generate fallback on error
    }
}

// Helper to generate fallback summary when Gemini is unavailable
function generateFallbackSummary(resumeData, isFallback = false) {
     try {
        const name = resumeData?.basics?.name || '';
        let allSkills = [];
        if (resumeData?.skills) {
            Object.values(resumeData.skills).forEach(categorySkills => {
                if (Array.isArray(categorySkills)) {
                    allSkills = [...allSkills, ...categorySkills];
                }
            });
        }
        const skills = allSkills.slice(0, 3).join(', ');
        const experience = resumeData?.experience?.length > 0 ?
            `${resumeData.experience[0].position} at ${resumeData.experience[0].company || resumeData.experience[0].organization}` : '';
        const education = resumeData?.education?.length > 0 ?
            `${resumeData.education[0].studyType || ''} in ${resumeData.education[0].area || ''} from ${resumeData.education[0].institution || ''}`.trim() : '';

        const fallbackSummary = `Experienced ${skills ? `${skills} ` : ''}professional${name ? ' ' + name : ''} with expertise in ${skills || 'various technical skills'}. ${experience ? `Previously worked as ${experience}. ` : ''}${education ? `Educated with ${education}. ` : ''}Dedicated to delivering high-quality results and continuously improving skills.`;

        return { summary: fallbackSummary, success: true, fallback: isFallback };
     } catch (error) {
         console.error("Error generating fallback summary:", error);
          return { summary: "Dedicated professional seeking new opportunities.", success: true, fallback: true };
     }
}


// Helper to generate confirmation message
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
    `;

    try {
        const result = await model.generateContent(confirmationPrompt);
        const response = await result.response;
        return response.text().trim();
    } catch (error) {
        console.error("Error generating confirmation message:", error);
        return `Got it! Information for ${category} has been processed.`; // Fallback on error
    }
}


// Function to normalize project descriptions to tech stack format
async function normalizeProjectDescriptions(resumeData) {
    if (!resumeData || !resumeData.projects || !Array.isArray(resumeData.projects)) {
        return resumeData;
    }

    const model = getModel();
     if (!model) {
         console.warn("Cannot normalize project descriptions: Gemini model unavailable.");
         return resumeData; // Return original if model unavailable
     }

    try {
        const updatedResumeData = JSON.parse(JSON.stringify(resumeData));
        for (let i = 0; i < updatedResumeData.projects.length; i++) {
            const project = updatedResumeData.projects[i];
            // Skip if description is already in tech stack format
            if (!project.description || project.description.includes(',')) {
                continue;
            }

            const prompt = `
              Convert this project description to a simple comma-separated tech stack format: "${project.description}"
              Return ONLY a string in the format "[Tech1], [Tech2], [Tech3], etc." without any additional text or prefixes.
              Example: "React.js, Node.js, MongoDB"
              Extract all technologies mentioned and list them with proper capitalization and formatting.
              If no specific technologies are mentioned, extract the general tech areas (Web Development, Mobile App, etc.).
            `;

            try {
                const result = await model.generateContent(prompt);
                const response = await result.response;
                const techStackDescription = response.text().trim();

                if (techStackDescription && techStackDescription.length > 3) {
                    // Replace the 'description' field with the tech stack
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


module.exports = {
    processFieldWithGemini,
    processCategoryWithGemini,
    generateProfessionalSummary,
    normalizeProjectDescriptions,
    normalizeUserInput
};