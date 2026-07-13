import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP animation removed as per request

  return (
    <section id="about" ref={sectionRef} className="content-section about-section-huge">
      <div className="about-graphic-anchor" aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="currentColor" strokeWidth="0.5" opacity="0.5">
            <line x1="0" y1="20" x2="200" y2="20"/>
            <line x1="0" y1="40" x2="200" y2="40"/>
            <line x1="0" y1="60" x2="200" y2="60"/>
            <line x1="0" y1="80" x2="200" y2="80"/>
            <line x1="0" y1="100" x2="200" y2="100"/>
            <line x1="0" y1="120" x2="200" y2="120"/>
            <line x1="0" y1="140" x2="200" y2="140"/>
            <line x1="0" y1="160" x2="200" y2="160"/>
            <line x1="0" y1="180" x2="200" y2="180"/>
            <line x1="20" y1="0" x2="20" y2="200"/>
            <line x1="40" y1="0" x2="40" y2="200"/>
            <line x1="60" y1="0" x2="60" y2="200"/>
            <line x1="80" y1="0" x2="80" y2="200"/>
            <line x1="100" y1="0" x2="100" y2="200"/>
            <line x1="120" y1="0" x2="120" y2="200"/>
            <line x1="140" y1="0" x2="140" y2="200"/>
            <line x1="160" y1="0" x2="160" y2="200"/>
            <line x1="180" y1="0" x2="180" y2="200"/>
          </g>
          <path d="M20 180 L180 180" stroke="currentColor" strokeWidth="2"/>
          <path d="M30 170 L170 170" stroke="currentColor" strokeWidth="2"/>
          <rect x="40" y="60" width="15" height="110" stroke="currentColor" strokeWidth="2"/>
          <rect x="80" y="60" width="15" height="110" stroke="currentColor" strokeWidth="2"/>
          <rect x="120" y="60" width="15" height="110" stroke="currentColor" strokeWidth="2"/>
          <path d="M30 60 L170 60" stroke="currentColor" strokeWidth="2"/>
          <polygon points="100,20 20,60 180,60" stroke="currentColor" strokeWidth="2"/>
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"/>
        </svg>
      </div>
      <div className="about-content-wrapper">
        <p className="section-kicker">Mohan Kadimpalli</p>
        <div className="about-huge-text">
          Mohan Kadimpalli is a <span className="highlight-keyword">Chartered Accountant</span> and <span className="highlight-keyword">legal advisor</span> working at the intersection of <span className="highlight-keyword">compliance</span>, <span className="highlight-keyword">governance</span>, and <span className="highlight-keyword">operational strategy</span>. He helps <span className="highlight-keyword">MSMEs</span>, <span className="highlight-keyword">agribusinesses</span>, and <span className="highlight-keyword">nonprofits</span> build compliant, <span className="highlight-keyword">investment-ready structures</span>.
        </div>
      </div>
    </section>
  );
}
