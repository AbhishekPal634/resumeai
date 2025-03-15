import React from "react";
import { FiInfo } from "react-icons/fi";

const InfoAlert = ({ message }) => (
  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md flex">
    <FiInfo className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
    <p className="text-sm text-blue-700 dark:text-blue-400">{message}</p>
  </div>
);

export default InfoAlert;
