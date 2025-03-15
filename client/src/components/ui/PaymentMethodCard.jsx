import React from "react";
import { FiCreditCard, FiMoreVertical } from "react-icons/fi";

const PaymentMethodCard = ({ method, isDefault, onSetDefault, onRemove }) => (
  <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0">
        <FiCreditCard className="w-6 h-6 text-gray-400" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          •••• •••• •••• {method.last4}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Expires {method.expiryMonth}/{method.expiryYear}
        </p>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      {isDefault ? (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Default
        </span>
      ) : (
        <button
          onClick={() => onSetDefault(method.id)}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800"
        >
          Set as default
        </button>
      )}
      <button
        onClick={() => onRemove(method.id)}
        className="text-gray-400 hover:text-gray-500"
      >
        <FiMoreVertical className="w-5 h-5" />
      </button>
    </div>
  </div>
);

export default PaymentMethodCard;
