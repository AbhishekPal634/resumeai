import React from "react";
import { FiCheck } from "react-icons/fi";

const PricingCard = ({ plan, isActive, onSelect }) => (
  <div
    className={`p-6 rounded-lg border-2 transition-all flex flex-col h-full ${
      isActive
        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
        : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
    }`}
  >
    <div className="flex-1">      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {plan.name}
      </h3>
      <div className="mt-2">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          ₹{plan.price}
        </span>
        <span className="text-gray-500 dark:text-gray-400">/month</span>
      </div>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        {plan.description}
      </p>
      <ul className="mt-6 space-y-4">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <FiCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
    <button
      onClick={() => onSelect(plan.id)}
      className={`mt-8 w-full px-4 py-2 text-sm font-medium rounded-md ${
        isActive
          ? "bg-indigo-600 text-white hover:bg-indigo-700"
          : "border border-indigo-500 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
      }`}
    >
      {isActive ? "Current Plan" : "Select Plan"}
    </button>
  </div>
);

export default PricingCard;
