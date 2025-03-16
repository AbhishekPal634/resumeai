import React from "react";
import { getPDFTemplate } from "../components/templates/react-pdf";

const ResumePDF = ({ resume, templateId = "modern" }) => {
  const Template = getPDFTemplate(templateId);
  return <Template resume={resume} />;
};

export default ResumePDF;
