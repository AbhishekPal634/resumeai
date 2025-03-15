import React from "react";

const Section = ({
  title,
  icon: Icon,
  description,
  className = "",
  children,
  noBorder = false,
}) => (
  <section
    className={`${
      !noBorder && "pt-6 border-t border-gray-200 dark:border-gray-700"
    } ${className}`}
  >
    {(title || Icon) && (
      <div className="flex items-center mb-4">
        {Icon && <Icon className="mr-2 text-gray-600 dark:text-gray-400" />}
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
          {title}
        </h3>
      </div>
    )}
    {description && (
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>
    )}
    {children}
  </section>
);

export default Section;
