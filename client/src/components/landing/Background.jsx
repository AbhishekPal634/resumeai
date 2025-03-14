import React, { useEffect } from "react";

const Background = () => {
  // Floating animation for gradient orbs
  useEffect(() => {
    const orbs = document.querySelectorAll(".floating-orb");

    orbs.forEach((orb) => {
      const randomX = Math.random() * 10 - 5;
      const randomY = Math.random() * 10 - 5;

      setInterval(() => {
        orb.style.transform = `translate(${randomX}px, ${randomY}px)`;
      }, 2000);
    });
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>
      <div className="fixed inset-0 bg-[url('https://assets.codepen.io/3685267/grid-light.svg')] bg-repeat opacity-5 pointer-events-none animate-pulse"></div>
      <div className="floating-orb fixed top-20 left-1/4 w-80 h-80 bg-indigo-600/10 rounded-full filter blur-[80px] transition-transform duration-5000 ease-in-out"></div>
      <div className="floating-orb fixed bottom-20 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-[100px] transition-transform duration-5000 ease-in-out"></div>
      <div className="floating-orb fixed top-1/2 left-1/3 w-64 h-64 bg-blue-600/10 rounded-full filter blur-[80px] transition-transform duration-5000 ease-in-out"></div>
    </>
  );
};

export default Background;
