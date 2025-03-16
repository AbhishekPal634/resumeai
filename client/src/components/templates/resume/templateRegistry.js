import { ModernTemplate } from "./index";

export const templates = {
  modern: {
    name: "Modern",
    component: ModernTemplate,
    description: "A clean, professional template with a modern design",
    thumbnail: "/templates/modern-thumb.png", // Add thumbnail later
  },
  // Add more templates here
};

export const getTemplate = (templateId) => {
  return templates[templateId]?.component || ModernTemplate;
};
