import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiCreditCard,
  FiCheck,
  FiX,
  FiDownload,
  FiAlertTriangle,
} from "react-icons/fi";

const PlanFeature = ({ included, text }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center">
      {included ? (
        <FiCheck className="h-4 w-4 text-green-500" />
      ) : (
        <FiX className="h-4 w-4 text-gray-400" />
      )}
    </div>
    <p className="ml-3 text-sm text-gray-700 dark:text-gray-300">{text}</p>
  </div>
);

const PaymentMethodCard = ({
  method,
  isDefault,
  onEditClick,
  onRemoveClick,
}) => (
  <div className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg mb-3">
    <div className="flex items-center">
      <div className="mr-3">
        {method.type === "visa" ? (
          <svg
            className="h-8 w-8"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect fill="#1A1F71" width="32" height="32" rx="4"></rect>
            <path
              d="M13.3 13.4l-2.2 5.3H9.2l-1.1-4.1c-.1-.3-.1-.4-.3-.5-.5-.3-1.2-.5-1.9-.6l.1-.1h3.3c.4 0 .8.3.9.8l.8 3.5 2-4.3h1.3zm5.7 3.6c0-1.4-1.9-1.5-1.9-2.1 0-.2.2-.4.6-.4.5-.1 1 0 1.5.1l.3-1.2c-.4-.1-.8-.2-1.3-.2-1.4 0-2.4.7-2.4 1.8 0 .8.7 1.2 1.2 1.4.5.3.7.4.7.7 0 .4-.4.5-.8.5-.7 0-1.3-.2-1.7-.3l-.3 1.2c.4.2 1 .3 1.6.3 1.5 0 2.5-.7 2.5-1.8zm3.8 1.7h1.3l-1.2-5.3h-1.2c-.3 0-.5.2-.6.4l-2.1 4.9h1.4l.3-.8h1.8l.3.8zm-1.5-2l.7-2 .4 2h-1.1zm-8.4-3.3l-1.1 5.3h-1.4l1.1-5.3h1.4z"
              fill="white"
            ></path>
          </svg>
        ) : method.type === "mastercard" ? (
          <svg
            className="h-8 w-8"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect fill="#16366F" width="32" height="32" rx="4"></rect>
            <circle fill="#D9222A" cx="12" cy="16" r="6"></circle>
            <circle fill="#EE9F2D" cx="20" cy="16" r="6"></circle>
            <path
              fill="#16366F"
              d="M16,10.12A5.94,5.94,0,0,1,16,22a5.94,5.94,0,0,1,0-11.88Z"
            ></path>
            <path
              fill="#fff"
              d="M16,10.12A5.94,5.94,0,0,0,16,22,5.94,5.94,0,0,0,16,10.12Z"
              fillOpacity="0.5"
            ></path>
          </svg>
        ) : (
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-gray-500">
            <FiCreditCard />
          </div>
        )}
      </div>
      <div>
        <p className="font-medium text-gray-900 dark:text-white">
          {method.type.charAt(0).toUpperCase() + method.type.slice(1)} ending in{" "}
          {method.last4}
          {isDefault && (
            <span className="ml-2 text-xs font-normal text-green-600 dark:text-green-500">
              Default
            </span>
          )}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Expires {method.expiry}
        </p>
      </div>
    </div>
    <div className="flex space-x-2">
      <button
        type="button"
        onClick={() => onEditClick(method)}
        className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
      >
        Edit
      </button>
      <button
        type="button"
        onClick={() => onRemoveClick(method)}
        className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
      >
        Remove
      </button>
    </div>
  </div>
);

// Update the InvoiceItem component
const InvoiceItem = ({ invoice }) => (
  <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
    <td className="px-6 py-4 whitespace-nowrap">
      <time
        dateTime={invoice.date}
        className="text-sm text-gray-900 dark:text-white"
      >
        {invoice.formattedDate}
      </time>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {invoice.id}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className="text-sm font-semibold text-gray-900 dark:text-white">
        {invoice.amount}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right">
      <button
        className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 group"
        onClick={() => console.log(`Download invoice ${invoice.id}`)}
      >
        <FiDownload className="mr-2 transition-transform group-hover:-translate-y-0.5" />
        PDF
      </button>
    </td>
  </tr>
);

// Update the BillingHistory component
const BillingHistory = ({ invoices }) => (
  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
      Billing History
    </h3>

    {invoices.length > 0 ? (
      <div className="mt-4 overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </span>
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Invoice
                  </span>
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </span>
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Download
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {invoices.map((invoice) => (
                <InvoiceItem key={invoice.id} invoice={invoice} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        No billing history available.
      </p>
    )}
  </div>
);

const PlanSettings = () => {
  const [currentPlan, setCurrentPlan] = useState("professional");
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "pm_123",
      type: "visa",
      last4: "4242",
      expiry: "04/25",
      isDefault: true,
    },
    {
      id: "pm_456",
      type: "mastercard",
      last4: "5678",
      expiry: "09/24",
      isDefault: false,
    },
  ]);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelFeedback, setCancelFeedback] = useState("");
  const [isSubmittingCancel, setIsSubmittingCancel] = useState(false);

  const [invoices, setInvoices] = useState([
    {
      id: "INV-2023-001",
      date: "2023-02-15",
      formattedDate: "Feb 15, 2023",
      amount: "$49.00",
      status: "paid",
    },
    {
      id: "INV-2023-002",
      date: "2023-03-15",
      formattedDate: "Mar 15, 2023",
      amount: "$49.00",
      status: "paid",
    },
    {
      id: "INV-2023-003",
      date: "2023-04-15",
      formattedDate: "Apr 15, 2023",
      amount: "$49.00",
      status: "paid",
    },
  ]);

  const plans = [
    {
      id: "basic",
      name: "Basic",
      description: "Free for basic resume review",
      price: "$0",
      interval: "",
      features: [
        { included: true, text: "Resume scanning and basic analysis" },
        { included: true, text: "Limited AI suggestions" },
        { included: true, text: "Up to 1 resume per month" },
        { included: false, text: "LinkedIn profile optimization" },
        { included: false, text: "Advanced keyword matching for job listings" },
        { included: false, text: "Custom cover letter generation" },
        { included: false, text: "Priority support" },
      ],
    },
    {
      id: "professional",
      name: "Professional",
      description: "Unlock all essential features",
      price: "$19",
      interval: "/month",
      features: [
        { included: true, text: "Everything in Basic" },
        { included: true, text: "Unlimited resume scans and analysis" },
        { included: true, text: "Advanced AI suggestions & rewrites" },
        { included: true, text: "LinkedIn profile optimization" },
        { included: true, text: "Keyword matching for job listings" },
        { included: false, text: "Custom cover letter generation" },
        { included: false, text: "Priority support" },
      ],
    },
    {
      id: "premium",
      name: "Premium",
      description: "Full access to all premium features",
      price: "$49",
      interval: "/month",
      features: [
        { included: true, text: "Everything in Professional" },
        { included: true, text: "Custom cover letter generation" },
        { included: true, text: "Interview preparation assistance" },
        { included: true, text: "Priority support" },
        { included: true, text: "Multiple profile management" },
        { included: true, text: "Career coaching insights" },
        { included: true, text: "Early access to new features" },
      ],
    },
  ];

  const handlePlanChange = (planId) => {
    if (planId === currentPlan) return;

    // This would open a confirmation dialog in a real app
    if (
      window.confirm(`Are you sure you want to switch to the ${planId} plan?`)
    ) {
      setCurrentPlan(planId);
    }
  };

  const handleEditPaymentMethod = (method) => {
    console.log("Edit payment method:", method);
    // This would open a payment method edit modal in a real app
  };

  const handleRemovePaymentMethod = (method) => {
    if (window.confirm(`Remove card ending in ${method.last4}?`)) {
      setPaymentMethods(paymentMethods.filter((m) => m.id !== method.id));
    }
  };

  const handleCancelSubscription = () => {
    setIsSubmittingCancel(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmittingCancel(false);
      setShowCancelModal(false);
      setCurrentPlan("basic");

      // Show success message
      alert(
        "Your subscription has been canceled. You will have access until the end of your billing cycle."
      );
    }, 1500);
  };

  const nextBillingDate = "April 15, 2023";

  return (
    <div>
      <div className="flex items-center mb-6">
        <FiCreditCard className="mr-2 text-gray-600 dark:text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Subscription Plan
        </h2>
      </div>

      {/* Current Plan */}
      <div className="mb-8">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Your current plan:{" "}
                <span className="text-indigo-600 dark:text-indigo-400">
                  {plans.find((p) => p.id === currentPlan)?.name || "Basic"}
                </span>
              </h3>
              {currentPlan !== "basic" && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Your next billing date is {nextBillingDate}
                </p>
              )}
            </div>
            {currentPlan !== "basic" && (
              <button
                onClick={() => setShowCancelModal(true)}
                className="mt-3 sm:mt-0 px-4 py-2 text-sm font-medium text-red-600 bg-white dark:bg-gray-800 dark:text-red-400 border border-red-300 dark:border-red-500/30 rounded-md shadow-sm hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Cancel Subscription
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Plan Options */}
      <div className="mb-12">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Available Plans
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-lg border ${
                currentPlan === plan.id
                  ? "border-indigo-500 ring-1 ring-indigo-500"
                  : "border-gray-200 dark:border-gray-700"
              } p-6 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {plan.price}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {plan.interval}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <PlanFeature
                    key={index}
                    included={feature.included}
                    text={feature.text}
                  />
                ))}
              </div>

              <button
                onClick={() => handlePlanChange(plan.id)}
                disabled={currentPlan === plan.id}
                className={`w-full py-2 px-4 rounded-md text-sm font-medium ${
                  currentPlan === plan.id
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400 cursor-default"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                }`}
              >
                {currentPlan === plan.id ? "Current Plan" : "Select Plan"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mb-12">
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Payment Methods
          </h3>

          <div className="mb-4">
            {paymentMethods.map((method) => (
              <PaymentMethodCard
                key={method.id}
                method={method}
                isDefault={method.isDefault}
                onEditClick={handleEditPaymentMethod}
                onRemoveClick={handleRemovePaymentMethod}
              />
            ))}
          </div>

          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
            <svg
              className="-ml-1 mr-2 h-5 w-5 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Payment Method
          </button>
        </div>
      </div>

      {/* Billing History */}
      <BillingHistory invoices={invoices} />

      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Cancel Subscription
                </h3>
                <button
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  onClick={() => setShowCancelModal(false)}
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="mb-5">
                <div className="flex items-center mb-4 text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
                  <FiAlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p className="text-sm">
                    You will lose access to all premium features at the end of
                    your current billing cycle on{" "}
                    <span className="font-medium">{nextBillingDate}</span>.
                  </p>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  We're sorry to see you go. Please let us know why you're
                  cancelling so we can improve our service:
                </p>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Reason for cancellation
                  </label>
                  <select
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-gray-100 dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select a reason</option>
                    <option value="too_expensive">Too expensive</option>
                    <option value="missing_features">
                      Missing features I need
                    </option>
                    <option value="not_using">Not using it enough</option>
                    <option value="found_alternative">
                      Found an alternative
                    </option>
                    <option value="difficult">Too difficult to use</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Additional feedback (optional)
                  </label>
                  <textarea
                    value={cancelFeedback}
                    onChange={(e) => setCancelFeedback(e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-gray-100 dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Please tell us how we could improve..."
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCancelModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-transparent dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Keep Subscription
                </button>
                <button
                  type="button"
                  onClick={handleCancelSubscription}
                  disabled={isSubmittingCancel}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-70 flex items-center"
                >
                  {isSubmittingCancel ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Cancel Subscription"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanSettings;
