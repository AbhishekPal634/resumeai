import React from "react";
import AuthCarousel from "./AuthCarousel";

const AuthLayout = ({ carouselItems, children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 p-4">
      <div className="flex w-full max-w-6xl mx-auto rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Left side with carousel */}
        <AuthCarousel carouselItems={carouselItems} />

        {/* Right side with form */}
        <div className="w-full md:w-1/2 bg-gray-900 p-6 md:p-10">
          <div className="max-w-md mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
