const geminiService = require('../services/geminiService');
const resumeService = require('../services/resumeService');
const helperService = require('../services/helperService'); // If mapSkillCategory is still needed

// Controller for the original /collect-resume endpoint (field-by-field)
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
        );

        let finalResumeData;
        if (aiResponse.isValid) {
            // Update the resume data using the service
            finalResumeData = resumeService.updateField(
                currentStage,
                currentQuestion,
                aiResponse.formattedValue, // Pass the validated value
                currentData // Pass the current data state for this request
            );
             res.json({
                 resumeData: finalResumeData,
                 message: aiResponse.message || "Information saved successfully.",
             });
        } else {
             // If validation failed, return error message and original data
             res.json({
                 resumeData: currentData, // Return the data state before the failed update
                 error: true,
                 message: aiResponse.message || "That doesn't look right. Please provide valid information.",
             });
        }
    } catch (error) {
        console.error("Error in collectResumeField controller:", error);
        res.status(500).json({
            error: true,
            message: "I encountered an error processing your information. Please try again.",
            resumeData: currentData // Return current data state on server error
        });
    }
};

// Controller for the /collect-category and /api/collect-category endpoints
const collectResumeCategory = async (req, res) => {
    const { input, category, resumeData: clientResumeData } = req.body;

     // Use the client's data as the base
    let currentData = clientResumeData || resumeService.getResumeData();

    if (!input || !category) {
        return res.status(400).json({ error: 'Missing input or category' });
    }

    console.log(`Processing category '${category}'...`);

    try {
        // Process the entire category input using Gemini
        const aiResponse = await geminiService.processCategoryWithGemini(
            input,
            category
        ); // Note: resumeData is not passed to Gemini here, it parses the 'input' string

        let finalResumeData;
        if (aiResponse.isValid) {
            // Update the main resume data store with the structured data
            finalResumeData = resumeService.updateCategoryData(
                category,
                aiResponse.formattedData, // Pass the structured data from Gemini
                currentData // Pass the current data state
            );
             console.log('Updated resume data after category update:', JSON.stringify(finalResumeData).substring(0, 100) + '...');
            res.json({
                message: aiResponse.message, // Use the message from Gemini service
                resumeData: finalResumeData,
                success: true
            });
        } else {
            // If processing/validation failed in Gemini service
            res.json({
                resumeData: currentData, // Return original data state
                error: true,
                message: aiResponse.message || `Failed to process the ${category} information. Please check the format.`,
            });
        }
    } catch (error) {
        console.error(`Error in collectResumeCategory controller for category ${category}:`, error);
        res.status(500).json({
            error: true,
            message: "Internal server error while processing category.",
            resumeData: currentData
        });
    }
};


// Controller for /api/resume-data endpoint
const getResumeData = async (req, res) => {
    try {
        let currentData = resumeService.getResumeData();
        // Optionally normalize descriptions before sending
        // Decide if normalization should happen on GET or after specific updates
        // currentData = await geminiService.normalizeProjectDescriptions(currentData);

        res.json({
            success: true,
            resumeData: currentData
        });
    } catch (error) {
        console.error('Error retrieving resume data:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve resume data'
        });
    }
};

// Controller for /api/generate-summary endpoint
const generateSummary = async (req, res) => {
     // Use the latest data from the service, or allow client to send specific version
     const { resumeData: clientResumeData } = req.body;
     const currentData = clientResumeData || resumeService.getResumeData();

    if (!currentData || Object.keys(currentData).length === 0) {
         return res.status(400).json({ error: 'Resume data is missing or empty' });
     }

    try {
        console.log('Request received for generateSummary controller');
        const result = await geminiService.generateProfessionalSummary(currentData);

        // Update the summary in the resume data store if generated successfully (optional)
        // if(result.success && !result.fallback) {
        //      resumeService.updateField('basics', 'summary', result.summary, currentData);
        // }

        res.json({
            summary: result.summary,
            success: result.success,
            fallback: result.fallback // Indicate if it was a fallback
        });
    } catch (error) {
        console.error('Error in generateSummary controller:', error);
        // Attempt fallback generation directly in controller in case service fails completely
         const fallbackResult = geminiService.generateFallbackSummary(currentData, true);
         res.status(500).json({
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