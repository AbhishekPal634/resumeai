import React, { useState } from "react";
import { FiCreditCard, FiDownload, FiPlus } from "react-icons/fi";
import SectionHeader from "../ui/SectionHeader";
import PricingCard from "../ui/PricingCard";
import Section from "../ui/Section";
import DataTable from "../ui/DataTable";
import StatusBadge from "../ui/StatusBadge";
import PaymentMethodCard from "../ui/PaymentMethodCard";
import Button from "../ui/Button";
import AddPaymentMethodModal from "../ui/AddPaymentMethodModal";

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "month",
    description: "For getting started",
    features: [
      "1 active resume",
      "Basic AI suggestions (5/day)",
      "2 resume templates",
      "Auto-generated professional summary",
      "Download as PDF (with watermark)",
    ],
    recommended: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    period: "month",
    description: "For job seekers",
    features: [
      "All Free features",
      "Up to 5 resumes",
      "Up to 2 cover letters",
      "Premium resume templates",
      "Advanced AI content optimization",
      "Cover letter generation using AI",
      "Download PDF without watermark",
      "Priority feature access",
    ],
    recommended: true,
  },
];

const BillingHistory = ({ invoices }) => {
  const headers = [
    { label: "Date", align: "left" },
    { label: "Amount", align: "left" },
    { label: "Status", align: "left" },
    { label: "Invoice", align: "right" },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Billing History
      </h3>

      <DataTable headers={headers}>
        {invoices.map((invoice) => (
          <tr key={invoice.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
              {invoice.date}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
              ₹{invoice.amount}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <StatusBadge variant="success">{invoice.status}</StatusBadge>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
              <button
                onClick={() => console.log(`Download invoice ${invoice.id}`)}
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 inline-flex items-center"
              >
                <FiDownload className="mr-1" />
                PDF
              </button>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
};

const CurrentPlanSection = ({ currentPlan, onChangePlan }) => (
  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
          {currentPlan.name}
        </h4>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          ₹{currentPlan.price}/month
        </p>
        <div className="mt-2">
          <StatusBadge variant="success">Active</StatusBadge>
        </div>
      </div>
      <Button variant="outline" onClick={onChangePlan}>
        Change Plan
      </Button>
    </div>
    <div className="mt-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Next billing date: April 1, 2024
      </p>
    </div>
  </div>
);

const PaymentMethods = ({
  methods,
  defaultMethod,
  onSetDefault,
  onRemove,
  onAddNew,
}) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Payment Methods
      </h3>
      <Button variant="outline" icon={FiPlus} onClick={onAddNew}>
        Add Payment Method
      </Button>
    </div>
    <div className="space-y-3">
      {methods.map((method) => (
        <PaymentMethodCard
          key={method.id}
          method={method}
          isDefault={method.id === defaultMethod}
          onSetDefault={onSetDefault}
          onRemove={onRemove}
        />
      ))}
    </div>
  </div>
);

const PlanSettings = () => {
  const [currentPlan, setCurrentPlan] = useState("free");
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      last4: "4242",
      expiryMonth: "12",
      expiryYear: "2024",
      type: "visa",
    },
    {
      id: 2,
      last4: "5555",
      expiryMonth: "08",
      expiryYear: "2025",
      type: "mastercard",
    },
  ]);
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState(1);
  const [invoices] = useState([
    {
      id: 1,
      date: "2024-03-01",
      amount: "29.00",
      status: "Paid",
    },
    {
      id: 2,
      date: "2024-02-01",
      amount: "29.00",
      status: "Paid",
    },
  ]);
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);

  const handlePlanSelect = (planId) => {
    setCurrentPlan(planId);
  };

  const handleSetDefaultPaymentMethod = (methodId) => {
    setDefaultPaymentMethod(methodId);
  };

  const handleRemovePaymentMethod = (methodId) => {
    console.log(`Remove payment method ${methodId}`);
  };

  const handleAddPaymentMethod = (cardDetails) => {
    // In a real app, you would send this to your backend
    const newMethod = {
      id: paymentMethods.length + 1,
      last4: cardDetails.number.slice(-4),
      expiryMonth: cardDetails.expiry.split("/")[0],
      expiryYear: `20${cardDetails.expiry.split("/")[1]}`,
      type: "visa", // You would determine this from the card number
    };

    // Add the new method to the list
    setPaymentMethods((prev) => [...prev, newMethod]);
  };

  const selectedPlan = plans.find((plan) => plan.id === currentPlan);

  return (
    <div className="space-y-8">
      <SectionHeader icon={FiCreditCard} title="Subscription Plan" />

      <Section title="Current Plan" noBorder>
        <CurrentPlanSection
          currentPlan={selectedPlan}
          onChangePlan={() => console.log("Open plan selection")}
        />
      </Section>

      <Section title="Available Plans">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isActive={currentPlan === plan.id}
              onSelect={handlePlanSelect}
            />
          ))}
        </div>
      </Section>

      <Section>
        <PaymentMethods
          methods={paymentMethods}
          defaultMethod={defaultPaymentMethod}
          onSetDefault={handleSetDefaultPaymentMethod}
          onRemove={handleRemovePaymentMethod}
          onAddNew={() => setIsAddPaymentModalOpen(true)}
        />
      </Section>

      <AddPaymentMethodModal
        isOpen={isAddPaymentModalOpen}
        onClose={() => setIsAddPaymentModalOpen(false)}
        onAdd={handleAddPaymentMethod}
      />

      <Section>
        <BillingHistory invoices={invoices} />
      </Section>
    </div>
  );
};

export default PlanSettings;
