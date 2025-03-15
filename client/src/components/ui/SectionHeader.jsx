import React from "react";

const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center mb-6">
    <Icon className="mr-2 text-gray-600 dark:text-gray-400" />
    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
      {title}
    </h2>
  </div>
);

export default SectionHeader;
