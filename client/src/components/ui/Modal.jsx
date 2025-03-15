import React from "react";
import { FiX } from "react-icons/fi";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              onClick={onClose}
            >
              <FiX size={24} />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
