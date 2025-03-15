import React, { useState } from "react";
import { FiCreditCard, FiX } from "react-icons/fi";
import Button from "./Button";

const AddPaymentMethodModal = ({ isOpen, onClose, onAdd }) => {
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Basic validation
    if (!cardDetails.number.replace(/\s/g, "").match(/^\d{16}$/)) {
      newErrors.number = "Please enter a valid 16-digit card number";
    }
    if (!cardDetails.expiry.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiry = "Please enter a valid expiry date (MM/YY)";
    }
    if (!cardDetails.cvc.match(/^\d{3,4}$/)) {
      newErrors.cvc = "Please enter a valid CVC";
    }
    if (!cardDetails.name.trim()) {
      newErrors.name = "Please enter the cardholder's name";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAdd(cardDetails);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center pt-16 px-4 z-50">
      <div
        className="fixed inset-0 bg-black/5 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <FiCreditCard className="text-gray-600 dark:text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add Payment Method
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Card Number
            </label>
            <input
              type="text"
              name="number"
              value={cardDetails.number}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                       text-gray-900 dark:text-white bg-white dark:bg-gray-800
                       focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.number && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.number}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiry"
                value={cardDetails.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                         text-gray-900 dark:text-white bg-white dark:bg-gray-800
                         focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.expiry && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.expiry}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                CVC
              </label>
              <input
                type="text"
                name="cvc"
                value={cardDetails.cvc}
                onChange={handleChange}
                placeholder="123"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                         text-gray-900 dark:text-white bg-white dark:bg-gray-800
                         focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.cvc && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.cvc}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              name="name"
              value={cardDetails.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                       text-gray-900 dark:text-white bg-white dark:bg-gray-800
                       focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Payment Method</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentMethodModal;
