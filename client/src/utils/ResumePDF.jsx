import React, { useState, useEffect } from "react";
import { getPDFTemplate } from "../components/templates/resume/templateRegistry";
import { Document, Page } from "@react-pdf/renderer";

const ResumePDF = ({ resume, templateId }) => {
  const [hasError, setHasError] = useState(false);
  
  // Use error boundary pattern with useEffect
  useEffect(() => {
    return () => {
      // Clean up any potential issues when component unmounts
      setHasError(false);
    };
  }, []);

  try {
    if (hasError) {
      throw new Error("PDF rendering failed");
    }
    
    const PDFTemplate = getPDFTemplate(templateId);
    
    // Check if the template is a simple React component (like ModernPDF)
    // or a full React-PDF component (like ClassicPDF)
    if (!PDFTemplate.isReactPDFComponent) {
      return (
        <Document>
          <Page size="A4">
            <PDFTemplate resume={resume} />
          </Page>
        </Document>
      );
    }
    
    return <PDFTemplate resume={resume} />;
  } catch (error) {
    console.error("Error rendering PDF:", error);
    setHasError(true);
    
    // Return a simple fallback document
    return (
      <Document>
        <Page size="A4" style={{ fontFamily: 'Helvetica', padding: 30, fontSize: 12 }}>
          <div style={{ color: '#333', marginBottom: 20 }}>
            <h1>{resume.basics?.name || "Resume"}</h1>
            <p>{resume.basics?.email}</p>
          </div>
          <div style={{ color: '#777', marginTop: 40 }}>
            Unable to render the complete PDF. Please try another template.
          </div>
        </Page>
      </Document>
    );
  }
};

export default ResumePDF;
