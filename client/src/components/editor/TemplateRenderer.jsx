import React from "react";
import { getTemplate } from "../templates/resume/templateRegistry";

const TemplateRenderer = ({ resume, templateId = "modern" }) => {
  const Template = getTemplate(templateId);

  return (
    <div className="h-full overflow-auto scrollbar-hide">
      <Template resume={resume} />
    </div>
  );
};

export default TemplateRenderer;
