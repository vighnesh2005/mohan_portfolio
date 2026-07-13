import React, { forwardRef } from 'react';

const HeroSection = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      id="home"
      ref={ref}
      className="magazine-hero"
      aria-label="Mohan Kadimpalli introduction"
    >
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-left-group">
        <span className="hero-qualifications">FCA, BBM, LLB</span>
        <h1 className="hero-name">CA Mohan</h1>
      </div>
      <h1 className="hero-name hero-name-right">Kadimpalli</h1>
      <div className="hero-mobile-group">
        <span className="hero-qualifications">FCA, BBM, LLB</span>
        <h1 className="hero-name hero-name-mobile">CA Mohan Kadimpalli</h1>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
