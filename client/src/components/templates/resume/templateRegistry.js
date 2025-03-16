import ModernTemplate from "./ModernTemplate";
import ClassicTemplate from "./ClassicTemplate";
import ModernPDF from "../react-pdf/ModernPDF";
import ClassicPDF from "../react-pdf/ClassicPDF";

export const templates = {
  modern: {
    name: "Modern",
    component: ModernTemplate,
    pdfComponent: ModernPDF,
    description: "Clean and professional design with a modern touch",
    thumbnail: "/templates/modern-thumb.png",
  },
  classic: {
    name: "Classic",
    component: ClassicTemplate,
    pdfComponent: ClassicPDF,
    description: "Traditional layout perfect for all industries",
    thumbnail: "/templates/classic-thumb.png",
  },
};

export const getTemplate = (templateId) => {
  return templates[templateId]?.component || ModernTemplate;
};

export const getPDFTemplate = (templateId) => {
  return templates[templateId]?.pdfComponent || ModernPDF;
};
