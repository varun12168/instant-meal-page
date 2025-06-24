
import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-accent to-white py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-accent-foreground mb-4 animate-fade-in">
          Welcome to My Restaurant
        </h1>
        <p className="text-lg md:text-xl text-gray-600 font-opensans animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Scan, Select & Savor – Order your meal right from this page
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
