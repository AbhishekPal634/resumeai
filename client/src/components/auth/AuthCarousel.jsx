import React, { useState, useEffect } from "react";

const AuthCarousel = ({ carouselItems }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [carouselItems.length]);

  return (
    <div className="hidden md:block md:w-1/2 relative bg-gray-900 p-3">
      {/* Inner carousel container with rounded corners */}
      <div className="h-full rounded-xl overflow-hidden shadow-inner relative">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(76, 29, 149, 0.8), rgba(91, 33, 182, 0.9)), url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-center text-white px-8 absolute bottom-24 left-0 right-0">
              <div className="mb-8">
                <h2 className="text-4xl font-extrabold mb-2 text-white drop-shadow-md">
                  {item.heading}
                </h2>
                <h2 className="text-3xl font-bold text-purple-200">
                  {item.subheading}
                </h2>
              </div>
            </div>

            {/* Improved slider indicators */}
            <div className="absolute bottom-10 left-0 right-0">
              <div className="flex justify-center space-x-3 mb-2">
                {carouselItems.map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    className={`h-1 rounded-full transition-all duration-300 focus:outline-none ${
                      dotIndex === currentSlide
                        ? "bg-white w-8"
                        : "bg-gray-400 bg-opacity-50 w-6 hover:bg-opacity-75"
                    }`}
                    onClick={() => setCurrentSlide(dotIndex)}
                    aria-label={`Go to slide ${dotIndex + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthCarousel;
