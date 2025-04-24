import React from "react"; 
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Stats from "../components/landing/Stats";
import Pricing from "../components/landing/Pricing";
import Cta from "../components/landing/Cta";
import Footer from "../components/landing/Footer";
import Background from "../components/landing/Background";

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 overflow-hidden">
      <Background />
      <Navbar />

      <header className="py-20 md:py-32 px-6 md:px-12 lg:px-20 relative">
        <Hero />
      </header>

      <section id="features" className="py-24 px-6 md:px-12 lg:px-20 relative">
        <Features />
      </section>

      <section className="py-16 px-6 md:px-12 lg:px-20 bg-slate-900/50 relative overflow-hidden">
        <Stats />
      </section>

      <section
        id="pricing"
        className="py-24 px-6 md:px-12 lg:px-20 bg-slate-950 relative"
      >
        <Pricing />
      </section>

      <section className="py-24 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <Cta />
      </section>

      <footer className="py-12 px-6 md:px-12 lg:px-20 border-t border-slate-800/50 relative overflow-hidden">
        <Footer />
      </footer>
    </div>
  );
};

export default Landing;
