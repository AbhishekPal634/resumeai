import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import ResumeEditorLayout from "../components/layouts/ResumeEditorLayout";
import ChatbotAssistant from "../components/editor/ChatbotAssistant";
import TemplateRenderer from "../components/editor/TemplateRenderer";
import ResumePDF from "../utils/ResumePDF";
import { getPDFTemplate } from "../components/templates/resume/templateRegistry";

// Empty resume structure to start with instead of dummy data
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
  achievements: [],
};

const ResumeEditorPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get("template") || "modern";

  // Start with empty resume instead of dummy data
  const [resume, setResume] = useState(emptyResume);
  const [resumeName, setResumeName] = useState("My Resume");
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showChatbot, setShowChatbot] = useState(true); // Auto-show chatbot to start building resume
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeSection, setActiveSection] = useState("basics");

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/resume-data');
        if (response.data && response.data.success && response.data.resumeData) {
          setResume(response.data.resumeData);
        }
      } catch (error) {
        console.error('Error fetching resume data:', error);
      }
    };
    fetchResumeData();
  }, []);

  // Function to update resume data from chatbot responses
  const updateResumeData = (newResumeData) => {
    if (!newResumeData) return;
    
    console.log("ResumeEditor received new resume data:", newResumeData);
    
    // Create a deep copy of the current resume
    const updatedResume = JSON.parse(JSON.stringify(resume));
    
    // Update specific sections based on what's in the newResumeData
    if (newResumeData.basics) {
      console.log("Updating basics section with:", newResumeData.basics);
      updatedResume.basics = {
        ...updatedResume.basics,
        ...newResumeData.basics
      };
    } else if (newResumeData.personalInfo) {
      // Backward compatibility for personalInfo
      console.log("Updating basics from personalInfo:", newResumeData.personalInfo);
      updatedResume.basics = {
        ...updatedResume.basics,
        name: newResumeData.personalInfo.name || updatedResume.basics.name,
        email: newResumeData.personalInfo.email || updatedResume.basics.email,
        phone: newResumeData.personalInfo.phone || updatedResume.basics.phone,
        location: newResumeData.personalInfo.location || updatedResume.basics.location,
        summary: newResumeData.personalInfo.summary || updatedResume.basics.summary,
        linkedin: newResumeData.personalInfo.linkedin || updatedResume.basics.linkedin,
        github: newResumeData.personalInfo.github || updatedResume.basics.github,
      };
    }
    
    if (newResumeData.education) {
      console.log("Updating education section with:", newResumeData.education);
      updatedResume.education = newResumeData.education;
    }
    
    if (newResumeData.skills) {
      console.log("Updating skills section with:", newResumeData.skills);
      updatedResume.skills = newResumeData.skills;
    } else if (newResumeData.technicalSkills) {
      // Backward compatibility for technicalSkills
      console.log("Updating skills from technicalSkills:", newResumeData.technicalSkills);
      updatedResume.skills = {
        programmingLanguages: newResumeData.technicalSkills.Languages || [],
        librariesFrameworks: newResumeData.technicalSkills['Libraries/Frameworks'] || [],
        databases: newResumeData.technicalSkills.Databases || [],
        toolsPlatforms: newResumeData.technicalSkills['Tools/Platforms'] || [],
        apis: newResumeData.technicalSkills.APIs || [],
      };
    }
    
    if (newResumeData.projects) {
      console.log("Updating projects section with:", newResumeData.projects);
      updatedResume.projects = newResumeData.projects;
    }
    
    if (newResumeData.experience) {
      console.log("Updating experience section with:", newResumeData.experience);
      updatedResume.experience = newResumeData.experience;
    } else if (newResumeData.positions) {
      // Backward compatibility for positions
      console.log("Updating experience from positions:", newResumeData.positions);
      updatedResume.experience = newResumeData.positions.map(position => ({
        company: position.organization || '',
        position: position.role || '',
        startDate: position.duration ? position.duration.split(' - ')[0] : '',
        endDate: position.duration ? position.duration.split(' - ')[1] : '',
        summary: '',
        highlights: position.points || [],
      }));
    }
    
    if (newResumeData.awards) {
      console.log("Updating awards section with:", newResumeData.awards);
      updatedResume.awards = newResumeData.awards;
    } else if (newResumeData.achievements) {
      // Backward compatibility for achievements
      console.log("Updating awards from achievements:", newResumeData.achievements);
      if (Array.isArray(newResumeData.achievements)) {
        updatedResume.awards = newResumeData.achievements.map(achievement => ({
          title: achievement,
          date: '',
          awarder: '',
          summary: '',
        }));
      }
    }
    
    console.log("Final updated resume:", updatedResume);
    
    // Update the resume state
    setResume(updatedResume);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleExport = () => {
    const downloadLink = document.getElementById("pdf-download");
    if (downloadLink) {
      setIsDownloading(true);
      downloadLink.click();
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
        setIsDownloading(false);
      }, 2000);
    }
  };

  return (
    <ResumeEditorLayout
      onBack={() => navigate("/dashboard")}
      resumeName={resumeName}
      onResumeNameChange={setResumeName}
      onSave={handleSave}
      onExport={handleExport}
      isSaving={isSaving}
      isDownloading={isDownloading}
      saveSuccess={saveSuccess}
      downloadSuccess={downloadSuccess}
      showChatbot={showChatbot}
      setShowChatbot={setShowChatbot}
      isMobile={isMobile}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      chatbotComponent={
        <ChatbotAssistant
          onClose={() => setShowChatbot(false)}
          activeSection={activeSection}
          resumeData={resume}
          updateResumeData={updateResumeData}
        />
      }
    >
      <div>
        <TemplateRenderer resume={resume} templateId={templateId} />
        <div className="hidden">
          <PDFDownloadLink
            id="pdf-download"
            document={<ResumePDF resume={resume} templateId={templateId} />}
            fileName={`${resumeName.replace(/\s+/g, "-").toLowerCase()}.pdf`}
          >
            {({ loading }) => (loading ? "Preparing PDF..." : "Download")}
          </PDFDownloadLink>
        </div>
      </div>
    </ResumeEditorLayout>
  );
};

export default ResumeEditorPage;
