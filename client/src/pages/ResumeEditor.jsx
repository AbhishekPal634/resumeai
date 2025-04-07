import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
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
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const templateParam = searchParams.get("template");

  const [resume, setResume] = useState(emptyResume);
  const [resumeName, setResumeName] = useState("My Resume");
  const [templateId, setTemplateId] = useState(templateParam || "modern");
  const [showChatbot, setShowChatbot] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState("basics");
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [pdfError, setPdfError] = useState(false);

  // Check if viewport is mobile
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Load resume data
  useEffect(() => {
    const fetchResume = async () => {
      // Example of loading from API
      // For now, we'll just use dummy data
      if (id) {
        // In a real app, we would fetch from the API
        // const response = await axios.get(`/api/resumes/${id}`);
        // setResume(response.data.resume);
        // setResumeName(response.data.name);

        // For demo, set dummy data
        setResume({
          ...emptyResume,
          basics: {
            ...emptyResume.basics,
            name: "John Doe",
            email: "john@example.com",
            phone: "123-456-7890",
            summary:
              "Software engineer with 5+ years of experience in web development.",
          },
        });
        setResumeName(`Resume #${id}`);
      }
    };

    fetchResume();
  }, [id]);

  // Update resume data
  const updateResumeData = (updatedData) => {
    setResume((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);

    // Here you would save to your API
    // const response = await axios.post('/api/resumes', { name: resumeName, data: resume });

    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleExport = () => {
    try {
      setIsDownloading(true);
      setPdfError(false);
      
      // Try to find the download link in the DOM
      const downloadLink = document.getElementById("pdf-download");
      if (downloadLink) {
        downloadLink.click();
        setDownloadSuccess(true);
        setTimeout(() => {
          setDownloadSuccess(false);
          setIsDownloading(false);
        }, 2000);
      } else {
        // Fallback if the download link isn't found
        console.error("PDF download link not found");
        setPdfError(true);
        setIsDownloading(false);
      }
    } catch (error) {
      console.error("Error exporting PDF:", error);
      setPdfError(true);
      setIsDownloading(false);
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
        
        {pdfError && (
          <div className="mt-4 p-4 text-sm text-red-800 bg-red-100 border border-red-200 rounded-md">
            There was an error generating your PDF. Please try a different template or check your browser console for more details.
          </div>
        )}
        
        <div className="hidden">
          <BlobProvider 
            document={<ResumePDF resume={resume} templateId={templateId} />}
            fileName={`${resumeName.replace(/\s+/g, "-").toLowerCase()}.pdf`}
          >
            {({ url, blob, loading, error }) => {
              if (error) {
                console.error("Error generating PDF:", error);
                setPdfError(true);
                return null;
              }
              
              if (loading || !url) {
                return <p>Loading document...</p>;
              }
              
              return (
                <a 
                  id="pdf-download"
                  href={url} 
                  download={`${resumeName.replace(/\s+/g, "-").toLowerCase()}.pdf`}
                >
                  {isDownloading ? "Preparing PDF..." : "Download"}
                </a>
              );
            }}
          </BlobProvider>
        </div>
      </div>
    </ResumeEditorLayout>
  );
};

export default ResumeEditorPage;
