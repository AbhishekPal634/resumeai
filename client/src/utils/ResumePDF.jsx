import React from "react";
import { getPDFTemplate } from "../components/templates/resume/templateRegistry";

const ResumePDF = ({ resume, templateId }) => {
  const PDFTemplate = getPDFTemplate(templateId);
  return <PDFTemplate resume={resume} />;
};

export default ResumePDF;
