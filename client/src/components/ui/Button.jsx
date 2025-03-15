import React from "react";

const variants = {
  primary: "text-white bg-indigo-600 hover:bg-indigo-700 border-transparent",
  secondary:
    "text-gray-700 bg-white dark:bg-transparent dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700",
  danger:
    "text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/40",
  outline:
    "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/40",
};

const Button = ({
  variant = "primary",
  children,
  className = "",
  icon: Icon,
  isLoading,
  disabled,
  ...props
}) => (
  <button
    disabled={disabled || isLoading}
    className={`
      px-4 py-2 text-sm font-medium border rounded-md shadow-sm
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
      disabled:opacity-70 flex items-center
      ${variants[variant]}
      ${className}
    `}
    {...props}
  >
    {isLoading ? (
      <>
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
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
        Loading...
      </>
    ) : (
      <>
        {Icon && <Icon className="mr-2" />}
        {children}
      </>
    )}
  </button>
);

export default Button;
