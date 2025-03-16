import ModernPDF from "./ModernPDF";

export const pdfTemplates = {
  modern: ModernPDF,
  // Add more templates here as they're created
};

export const getPDFTemplate = (templateId) => {
  return pdfTemplates[templateId] || ModernPDF;
};
