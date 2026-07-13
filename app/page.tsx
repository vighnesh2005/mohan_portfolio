'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

import Nav from './components/Nav';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ExpertiseSection from './components/sections/ExpertiseSection';
import ServicesSection from './components/sections/ServicesSection';
import CredentialsRolesSection from './components/sections/CredentialsRolesSection';
import GenericContentSection from './components/sections/GenericContentSection';
import ContactSection from './components/sections/ContactSection';
import { sections } from './data/constants';

const SmoothScroll = dynamic(() => import('./components/SmoothScroll'), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Only the global intro animation goes here
    const ctx = gsap.context(() => {
      // Set initial states to prevent flash before GSAP loads
      gsap.set(['.hero-left-group', '.hero-name-right', '.hero-mobile-group', '.nav-logo', '.nav-cta'], { opacity: 0 });

      // 1. Initial Load Intro Timeline
      const introTimeline = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      introTimeline
        .fromTo(
          '.hero-bg',
          { scale: 1.15 },
          { scale: 1, duration: 1.8, ease: 'power3.out' }
        )
        .fromTo(
          '.hero-left-group',
          { opacity: 0, x: -60 },
          { opacity: 1, x: 0, duration: 1.4, ease: 'power4.out' },
          0.15
        )
        .fromTo(
          '.hero-name-right',
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 1.4, ease: 'power4.out' },
          0.2
        )
        .fromTo(
          '.hero-mobile-group',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.4, ease: 'power4.out' },
          0.18
        )
        .fromTo(
          ['.nav-logo', '.nav-cta'],
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08 },
          0.6
        );

      // Parallax Scroll Effect for Hero Background
      if (heroRef.current) {
        gsap.fromTo(
          '.hero-bg',
          { y: 0 },
          {
            y: '12%',
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Filter out sections handled by bespoke components
  const genericSections = sections.filter(s => s.id !== 'about' && s.id !== 'expertise' && s.id !== 'credentials-roles');

  return (
    <main className="page-shell">
      <SmoothScroll />
      <Nav />

      <HeroSection ref={heroRef} />

      <div className="content-sections">
        <AboutSection />
        <ExpertiseSection />
        <ServicesSection />
        <CredentialsRolesSection />
        
        {genericSections.map((section) => (
          <GenericContentSection 
            key={section.id}
            id={section.id}
            title={section.title}
            body={section.body}
          />
        ))}
        
        <ContactSection />
      </div>
    </main>
  );
}
