const geminiService = require('../services/geminiService');
const resumeService = require('../services/resumeService');
const helperService = require('../services/helperService'); // If mapSkillCategory is still needed

// Controller for the original /collect-resume endpoint (field-by-field)
// source: [cite: 157]
const collectResumeField = async (req, res) => {
    const { userInput, currentStage, currentQuestion, resumeData: clientResumeData } = req.body;

    // Use the client's data as the base for this request
    let currentData = clientResumeData || resumeService.getResumeData();

    try {
        // Process the single field using Gemini
        const aiResponse = await geminiService.processFieldWithGemini(
            userInput,
            currentStage,
            currentQuestion
        ); // source:

        let finalResumeData;
        if (aiResponse.isValid) { // source: [cite: 158]
            // Update the resume data using the service
            finalResumeData = resumeService.updateField(
                currentStage,
                currentQuestion,
                aiResponse.formattedValue, // Pass the validated value
                currentData // Pass the current data state for this request
            );
             res.json({ // source: [cite: 186]
                 resumeData: finalResumeData,
                 message: aiResponse.message || "Information saved successfully.",
             });
        } else {
             // If validation failed, return error message and original data
             res.json({ // source: [cite: 187]
                 resumeData: currentData, // Return the data state before the failed update
                 error: true,
                 message: aiResponse.message || "That doesn't look right. Please provide valid information.",
             });
        }
    } catch (error) { // source: [cite: 188]
        console.error("Error in collectResumeField controller:", error);
        res.status(500).json({ // source: [cite: 189]
            error: true,
            message: "I encountered an error processing your information. Please try again.",
            resumeData: currentData // Return current data state on server error
        });
    }
};

// Controller for the /collect-category and /api/collect-category endpoints
// source: [cite: 190, 205]
const collectResumeCategory = async (req, res) => {
    const { input, category, resumeData: clientResumeData } = req.body; // source: [cite: 190, 205]

     // Use the client's data as the base
    let currentData = clientResumeData || resumeService.getResumeData();

    if (!input || !category) { // source: [cite: 205]
        return res.status(400).json({ error: 'Missing input or category' });
    }

    console.log(`Processing category '${category}'...`); // source: [cite: 190, 205, 241]

    try {
        // Process the entire category input using Gemini
        const aiResponse = await geminiService.processCategoryWithGemini(
            input,
            category
        ); // source: [cite: 190] // Note: resumeData is not passed to Gemini here, it parses the 'input' string

        let finalResumeData;
        if (aiResponse.isValid) { // source: [cite: 190]
            // Update the main resume data store with the structured data
            finalResumeData = resumeService.updateCategoryData(
                category,
                aiResponse.formattedData, // Pass the structured data from Gemini
                currentData // Pass the current data state
            );
             console.log('Updated resume data after category update:', JSON.stringify(finalResumeData).substring(0, 100) + '...'); // source: [cite: 196, 255]
            res.json({ // source: [cite: 202, 261]
                message: aiResponse.message, // Use the message from Gemini service
                resumeData: finalResumeData,
                success: true
            });
        } else {
            // If processing/validation failed in Gemini service
            res.json({ // source: [cite: 203]
                resumeData: currentData, // Return original data state
                error: true,
                message: aiResponse.message || `Failed to process the ${category} information. Please check the format.`,
            });
        }
    } catch (error) { // source: [cite: 204, 262]
        console.error(`Error in collectResumeCategory controller for category ${category}:`, error);
        res.status(500).json({ // source: [cite: 204, 262]
            error: true,
            message: "Internal server error while processing category.",
            resumeData: currentData
        });
    }
};


// Controller for /api/resume-data endpoint
// source: [cite: 263]
const getResumeData = async (req, res) => {
    try {
        let currentData = resumeService.getResumeData();
        // Optionally normalize descriptions before sending
        // Decide if normalization should happen on GET or after specific updates
        // currentData = await geminiService.normalizeProjectDescriptions(currentData);

        res.json({ // source: [cite: 263]
            success: true,
            resumeData: currentData
        });
    } catch (error) { // source: [cite: 263]
        console.error('Error retrieving resume data:', error);
        res.status(500).json({ // source: [cite: 263]
            success: false,
            error: 'Failed to retrieve resume data'
        });
    }
};

// Controller for /api/generate-summary endpoint
// source: [cite: 264]
const generateSummary = async (req, res) => {
     // Use the latest data from the service, or allow client to send specific version
     const { resumeData: clientResumeData } = req.body; // source: [cite: 264]
     const currentData = clientResumeData || resumeService.getResumeData();

    if (!currentData || Object.keys(currentData).length === 0) { // source: [cite: 264]
         return res.status(400).json({ error: 'Resume data is missing or empty' });
     }

    try {
        console.log('Request received for generateSummary controller'); // source: [cite: 264]
        const result = await geminiService.generateProfessionalSummary(currentData); // source: [cite: 281]

        // Update the summary in the resume data store if generated successfully (optional)
        // if(result.success && !result.fallback) {
        //      resumeService.updateField('basics', 'summary', result.summary, currentData);
        // }

        res.json({ // source: [cite: 284, 298]
            summary: result.summary,
            success: result.success,
            fallback: result.fallback // Indicate if it was a fallback
        });
    } catch (error) { // source: [cite: 285, 300]
        console.error('Error in generateSummary controller:', error);
        // Attempt fallback generation directly in controller in case service fails completely
         const fallbackResult = geminiService.generateFallbackSummary(currentData, true);
         res.status(500).json({ // source: [cite: 300]
             summary: fallbackResult.summary,
             success: false, // Indicate overall operation failed despite fallback
             fallback: true,
             error: `Failed to generate summary: ${error.message}`
         });
    }
};


module.exports = {
    collectResumeField,
    collectResumeCategory,
    getResumeData,
    generateSummary
};