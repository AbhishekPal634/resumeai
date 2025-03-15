import React from "react";

const DataTable = ({ headers, children }) => (
  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className={`px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${
                header.align === "right" ? "text-right" : "text-left"
              }`}
            >
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
        {children}
      </tbody>
    </table>
  </div>
);

export default DataTable;
