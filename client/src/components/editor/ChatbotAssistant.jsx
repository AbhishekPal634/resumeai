import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaUser, FaPaperPlane } from "react-icons/fa";
import { processUserInput, processCategory, generateSummary } from "../../utils/api";
import axios from 'axios';

const ChatMessage = ({ message, formatTime }) => (
  <div
    className={`flex items-start gap-3 ${
      message.sender === "user" ? "flex-row-reverse" : ""
    }`}
  >
    {/* Avatar */}
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        message.sender === "user"
          ? "bg-gradient-to-r from-indigo-500 to-violet-500"
          : "bg-gradient-to-r from-pink-500 to-rose-500"
      } shadow-sm`}
    >
      {message.sender === "user" ? (
        <FaUser className="w-3.5 h-3.5 text-white" />
      ) : (
        <FaRobot className="w-3.5 h-3.5 text-white" />
      )}
    </div>

    {/* Message bubble */}
    <div
      className={`group relative max-w-[75%] rounded-2xl px-4 py-2.5 ${
        message.sender === "user"
          ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-tr-none"
          : "bg-white dark:bg-slate-800 shadow-sm rounded-tl-none border border-slate-200 dark:border-slate-700"
      }`}
    >
      <p
        className={`text-sm leading-relaxed ${
          message.sender === "bot" ? "text-slate-700 dark:text-slate-200" : ""
        }`}
      >
        {message.text}
      </p>
      <span
        className={`text-[10px] mt-1 block opacity-60 transition-opacity group-hover:opacity-100 ${
          message.sender === "user"
            ? "text-white"
            : "text-slate-500 dark:text-slate-400"
        }`}
      >
        {formatTime(message.timestamp)}
      </span>
    </div>
  </div>
);

const TypingIndicator = () => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center shadow-sm">
      <FaRobot className="w-3.5 h-3.5 text-white" />
    </div>
    <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  </div>
);

// Define the resume sections and their prompts for entire section input
const resumeSections = {
  personal_info: {
    title: "Personal Information",
    prompt: "Please tell me about yourself. I need your full name, email address, phone number, location, and optionally your LinkedIn and GitHub URLs. If you'd like to include a professional summary, please share that as well."
  },
  education: {
    title: "Education",
    prompt: "Tell me about your educational background. Include details like your university/college name, degree type (e.g., Bachelor of Science), field of study, years of attendance, and GPA if you'd like. If you have multiple degrees, feel free to include them all."
  },
  skills: {
    title: "Skills",
    prompt: "List your skills, separated by commas or spaces. You can include any skills you have—technical, creative, language, management, or others. Just type them out in any order. I'll organize them into categories for your resume automatically."
  },
  projects: {
    title: "Projects",
    prompt: "Tell me about some projects you've worked on. Include the project name, a brief description, and key achievements or features for each project. I'll format these professionally for your resume."
  },
  positions: {
    title: "Work Experience",
    prompt: "Please share your work experience. Include details like company names, your job titles, dates of employment, and your key responsibilities or achievements in each position."
  },
  achievements: {
    title: "Awards & Achievements",
    prompt: "What notable achievements, awards, certifications, or publications do you have? Include the title, date received, and the organization that gave the award or recognition if applicable."
  }
};

// Initial empty resume structure
const emptyResume = {
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

const ChatbotAssistant = ({ onClose, activeSection, resumeData, updateResumeData }) => {
  // Initialize with empty resume if none provided
  const [currentResumeData, setCurrentResumeData] = useState(resumeData || emptyResume);
  
  // Conversation state
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm your AI resume assistant. I'll help you build your resume section by section. Let's start with your personal information.",
      timestamp: new Date(),
    },
    {
      sender: "bot",
      text: resumeSections.personal_info.prompt,
      timestamp: new Date(Date.now() + 100),
    }
  ]);
  
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Section tracking
  const [currentSection, setCurrentSection] = useState("personal_info");
  const [completedSections, setCompletedSections] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Function to check if a section is already completed
  const isSectionCompleted = (section) => {
    // Check if the section is in the completedSections array
    if (completedSections.includes(section)) {
      return true;
    }
    
    // Also check if the section data exists in the resume
    if (currentResumeData) {
      switch (section) {
        case 'personal_info':
          return currentResumeData.basics && 
                 (currentResumeData.basics.name || 
                  currentResumeData.basics.email || 
                  currentResumeData.basics.phone);
        case 'education':
          return currentResumeData.education && 
                 currentResumeData.education.length > 0;
        case 'technical_skills':
          return currentResumeData.skills && 
                 (currentResumeData.skills.programmingLanguages?.length > 0 || 
                  currentResumeData.skills.librariesFrameworks?.length > 0 || 
                  currentResumeData.skills.databases?.length > 0 || 
                  currentResumeData.skills.toolsPlatforms?.length > 0 || 
                  currentResumeData.skills.apis?.length > 0);
        case 'projects':
          return currentResumeData.projects && 
                 currentResumeData.projects.length > 0;
        case 'positions':
          return currentResumeData.experience && 
                 currentResumeData.experience.length > 0;
        case 'achievements':
          return currentResumeData.awards && 
                 currentResumeData.awards.length > 0;
        default:
          return false;
      }
    }
    
    return false;
  };

  // Function to handle initial messages when the component mounts
  useEffect(() => {
    if (messages.length === 0) {
      // Only add welcome message if there are no messages yet
      const welcomeMessage = {
        sender: "bot",
        text: "Welcome to the Resume Builder! I'll help you create a professional resume. Let's start by filling in your information section by section.",
        timestamp: new Date(),
      };
      
      // Check if we should start with a specific section or find the first incomplete section
      let startSection = activeSection || 'personal_info';
      
      // Find the first incomplete section if none is specified
      if (!activeSection) {
        const allSections = Object.keys(resumeSections);
        for (const section of allSections) {
          if (!isSectionCompleted(section)) {
            startSection = section;
            break;
          }
        }
      }
      
      setCurrentSection(startSection);
      
      // Add initial messages with a slight delay
      setTimeout(() => {
        const promptMessage = {
          sender: "bot",
          text: resumeSections[startSection].prompt,
          timestamp: new Date(Date.now() + 100),
        };
        
        setMessages([welcomeMessage, promptMessage]);
      }, 500);
    }
  }, []); // Empty dependency array ensures this only runs once

  // Move to the next section and check if all sections are completed
  const moveToNextSection = () => {
    const allSections = Object.keys(resumeSections);
    
    // Add current section to completed sections if not already there
    if (!completedSections.includes(currentSection)) {
      setCompletedSections(prev => [...prev, currentSection]);
    }
    
    // Find the next uncompleted section
    let nextSection = null;
    for (const section of allSections) {
      if (!isSectionCompleted(section) && section !== currentSection) {
        nextSection = section;
        break;
      }
    }
    
    // If all sections are completed
    if (!nextSection) {
      // All sections completed
      setCompletedSections(allSections);
      
      // Generate professional summary
      setTimeout(() => {
        const completionMessage = {
          sender: "bot",
          text: "Great! We've completed all sections of your resume.",
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, completionMessage]);
        generateProfessionalSummary();
      }, 1000);
      
      return;
    }
    
    // Move to next section
    setCurrentSection(nextSection);
    
    // Add bot message for next section - only add one set of messages
    setTimeout(() => {
      const nextSectionMessage = {
        sender: "bot",
        text: `Now, let's move on to your ${resumeSections[nextSection].title}.`,
        timestamp: new Date(),
      };
      
      const promptMessage = {
        sender: "bot",
        text: resumeSections[nextSection].prompt,
        timestamp: new Date(Date.now() + 100),
      };
      
      setMessages(prev => [...prev, nextSectionMessage, promptMessage]);
    }, 1000);
  };

  // Function to generate professional summary
  const generateProfessionalSummary = async () => {
    if (!currentResumeData) return;
    
    setIsTyping(true);
    
    const loadingMessage = {
      sender: "bot",
      text: "I'm generating a professional summary based on your resume information...",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, loadingMessage]);
    
    try {
      // Use the imported generateSummary function instead of direct axios call
      const response = await generateSummary(currentResumeData);
      
      if (response && response.success && response.summary) {
        const summary = response.summary;
        
        // Update the resume data with the generated summary
        const updatedResumeData = {
          ...currentResumeData,
          basics: {
            ...currentResumeData.basics,
            summary: summary
          }
        };
        
        // Update local state
        setCurrentResumeData(updatedResumeData);
        
        // Update parent component
        if (updateResumeData) {
          updateResumeData(updatedResumeData);
        }
        
        // Determine message based on whether it was a fallback summary or not
        const messageText = response.fallback 
          ? "I've created a basic professional summary for you based on your information. Would you like to refine it further? If so, please tell me what you'd like to emphasize in your summary."
          : "I've generated a professional summary based on your resume information. You can edit it later if needed.";
        
        const successMessage = {
          sender: "bot",
          text: messageText,
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, successMessage]);
        
        // If it was a fallback summary, we might want to offer manual refinement
        if (response.fallback) {
          setAwaitingManualSummary(true);
        }
      } else {
        throw new Error("No summary returned from the API");
      }
    } catch (error) {
      console.error("Error generating summary:", error);
      
      // Handle manual summary creation
      const errorMessage = {
        sender: "bot",
        text: "I couldn't generate a summary automatically. Let me help you create one manually. What would you like to highlight in your professional summary? Consider your key skills, experience level, and career goals.",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      // Set a flag to handle the next user input as a manual summary
      setAwaitingManualSummary(true);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle manual summary input
  const [awaitingManualSummary, setAwaitingManualSummary] = useState(false);
  
  // Function to process manual summary input
  const processManualSummary = (userInput) => {
    if (!currentResumeData) return;
    
    // Update the resume data with the user's manual summary
    const updatedResumeData = {
      ...currentResumeData,
      basics: {
        ...currentResumeData.basics,
        summary: userInput
      }
    };
    
    console.log("Updating resume with manual summary:", userInput);
    
    // Update local state
    setCurrentResumeData(updatedResumeData);
    
    // Update parent component
    if (updateResumeData) {
      updateResumeData(updatedResumeData);
    }
    
    // Add a confirmation message
    const confirmationMessage = {
      sender: "bot",
      text: "I've added your professional summary to the resume. Feel free to ask if you'd like to make any other changes!",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, confirmationMessage]);
    
    // Reset the flag
    setAwaitingManualSummary(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "" || isTyping) return;

    // Add user message
    const userMessage = {
      sender: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Check if all sections are completed
      const allSectionsCompleted = 
        isSectionCompleted("personal_info") && 
        isSectionCompleted("education") && 
        isSectionCompleted("technical_skills") && 
        isSectionCompleted("projects") && 
        isSectionCompleted("positions") && 
        isSectionCompleted("achievements");
        
      if (allSectionsCompleted) {
        // All sections are complete, handle free-form conversation
        if (awaitingManualSummary) {
          processManualSummary(input);
        } else {
          const response = await processUserInput(
            input,
            "general",
            "general",
            currentResumeData
          );
          
          const botMessage = {
            sender: "bot",
            text: response.message || "I've processed your request.",
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, botMessage]);
          
          if (response.resumeData && !response.error) {
            console.log("Updating resume data from free-form input:", response.resumeData);
            setCurrentResumeData(response.resumeData);
            if (updateResumeData) {
              updateResumeData(response.resumeData);
            }
          }
        }
      } else {
        // Process the entire section at once
        console.log("Processing category:", currentSection, "with input:", input);
        const response = await processCategory(
          input,
          currentSection,
          currentResumeData
        );
        
        // Add bot response
        const botMessage = {
          sender: "bot",
          text: response.message || "Information saved successfully.",
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, botMessage]);
        
        // Update the resume data
        if (response.resumeData && !response.error) {
          console.log("Received updated resume data:", response.resumeData);
          setCurrentResumeData(response.resumeData);
          if (updateResumeData) {
            console.log("Updating parent component with new resume data");
            updateResumeData(response.resumeData);
          }
          
          // Move to next section - don't add any messages here, they'll be added in moveToNextSection
          moveToNextSection();
        } else {
          // If there was an error, ask for the section input again
          console.error("Error in response:", response.error);
          setTimeout(() => {
            const retryMessage = {
              sender: "bot",
              text: "I couldn't process that information correctly. Please try again following the format:",
              timestamp: new Date(),
            };
            
            const promptMessage = {
              sender: "bot",
              text: resumeSections[currentSection].prompt,
              timestamp: new Date(Date.now() + 100),
            };
            
            setMessages(prev => [...prev, retryMessage, promptMessage]);
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Error processing message:", error);
      // Add error message
      const errorMessage = {
        sender: "bot",
        text: "Sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      
      // Ask for the section input again
      setTimeout(() => {
        const promptMessage = {
          sender: "bot",
          text: resumeSections[currentSection].prompt,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, promptMessage]);
      }, 1000);
    } finally {
      setIsTyping(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} formatTime={formatTime} />
        ))}

        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 backdrop-blur-sm">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer here..."
            className="flex-1 px-4 py-2.5 text-sm border border-slate-200 dark:border-slate-700 rounded-lg
                     bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-violet-500 focus:border-transparent
                     placeholder:text-slate-400 dark:placeholder:text-slate-500 min-h-[80px] resize-y"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={isTyping || input.trim() === ""}
            className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-full
                     flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed
                     hover:shadow-md transition-all duration-200 border border-white/10 h-10 self-end"
          >
            <FaPaperPlane className="w-3.5 h-3.5" />
            <span className="sr-only">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotAssistant;
