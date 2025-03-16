import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumeEditorLayout from "../components/layouts/ResumeEditorLayout";
import ChatbotAssistant from "../components/editor/ChatbotAssistant";
import TemplateRenderer from "../components/editor/TemplateRenderer";
import ResumePDF from "../utils/ResumePDF";
import { dummyResume } from "../data/dummyResume";

const ResumeEditorPage = () => {
  const navigate = useNavigate();
  const [resume, setResume] = useState(dummyResume);
  const [resumeName, setResumeName] = useState("My Resume");
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeSection, setActiveSection] = useState("basics");

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
        />
      }
    >
      <div>
        <TemplateRenderer resume={resume} templateId="modern" />
        <div className="hidden">
          <PDFDownloadLink
            id="pdf-download"
            document={<ResumePDF resume={resume} templateId="modern" />}
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
