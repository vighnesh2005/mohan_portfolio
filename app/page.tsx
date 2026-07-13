'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

const SmoothScroll = dynamic(() => import('./components/SmoothScroll'), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#services', label: 'Services' },
  { href: '#credentials', label: 'Credentials' },
  { href: '#roles', label: 'Roles' },
  { href: '#ecosystem', label: 'Ecosystem' },
];

const expertiseSectors = [
  {
    title: 'MSME & Agribusiness',
    description: 'Engineering institutional compliance and financial architecture for rural supply chains, manufacturing entities, and agribusiness trading networks. We bridge the gap between agrarian fields and modern markets through audit-ready financial frameworks.',
    bgColor: '#094f29',
    bgClass: 'texture-agri',
  },
  {
    title: 'Retail & D2C Brands',
    description: 'Structuring statutory compliance, tax advisory, and scaling architectures for high-growth consumer-facing retail and D2C personal care lines. Ensuring seamless accounting structures that support rapid commercial expansion.',
    bgColor: '#9e2a2b',
    bgClass: 'texture-retail',
  },
  {
    title: 'Food, F&B & FMCG',
    description: 'Fostering financial integrity and navigating regulatory frameworks for food processing units, restaurants, and fast-moving consumer goods. We help brands manage complex cost margins and achieve sustainable scale.',
    bgColor: '#5f0f40',
    bgClass: 'texture-food',
  },
  {
    title: 'E-Commerce',
    description: 'Managing complex multi-GSTIN frameworks, digital marketplace reporting, and transaction reconciliation for online sellers. We resolve the operational complexities of digital retail so you can focus on scale.',
    bgColor: '#0f4c5c',
    bgClass: 'texture-ecommerce',
  },
  {
    title: 'Farmer Producer Companies',
    description: 'Shaping the operational blueprint for 100+ Farmer Producer Companies (FPCs) across Andhra Pradesh. Leading formation, governance design, board setup, and ROC compliance to build institutional trust.',
    bgColor: '#d65a31',
    bgClass: 'texture-fpc',
  },
  {
    title: 'Nonprofits & Foundations',
    description: 'Upholding structural governance, compliance audits, and tax registrations for social impact ventures and foundations. We keep your mission legally secure, financially transparent, and fully optimized.',
    bgColor: '#3f37c9',
    bgClass: 'texture-nonprofit',
  },
];

const detailedServices = [
  {
    title: 'Statutory Compliance',
    description: 'Ensuring your business meets all legal and regulatory obligations across multiple frameworks seamlessly.',
    bgColor: '#1a1014', // Very dark pinkish
    titleColor: '#FF3366', // Vibrant Pink
    bgClass: 'texture-building'
  },
  {
    title: 'Financial Reporting',
    description: 'Building audit-ready financial frameworks and transparent accounting structures that inspire investor confidence.',
    bgColor: '#0d1a18', // Very dark teal
    titleColor: '#00C49A', // Vibrant Teal
    bgClass: 'texture-chart'
  },
  {
    title: 'Corporate Governance',
    description: 'Establishing robust board setups, transparent institutional trust mechanisms, and sustainable governance practices.',
    bgColor: '#1a160d', // Very dark orange
    titleColor: '#FF9F1C', // Vibrant Orange
    bgClass: 'texture-pillars'
  },
  {
    title: 'Business Advisory',
    description: 'Providing strategic guidance, structural optimization, and financial planning for sustainable long-term scale.',
    bgColor: '#140c1c', // Very dark purple
    titleColor: '#C77DFF', // Vibrant Purple
    bgClass: 'texture-nodes'
  },
  {
    title: 'Legal Strategy',
    description: 'Navigating complex regulatory landscapes and mitigating legal risks for MSMEs, agribusinesses, and nonprofits.',
    bgColor: '#0b101c', // Very dark blue
    titleColor: '#4CC9F0', // Vibrant Blue
    bgClass: 'texture-shield'
  }
];

const sections = [
  {
    id: 'about',
    title: 'About',
    body: [
      'Mohan Kadimpalli is a Chartered Accountant and legal advisor working at the intersection of compliance, governance, and operational strategy. His practice spans statutory compliance, financial reporting, and advisory for MSMEs, agribusinesses, farmer producer companies, and nonprofit organizations, helping them build compliant, investment-ready structures.',
    ],
  },
  {
    id: 'expertise',
    title: 'Sector Expertise',
    body: [
      'MSME and agribusiness, retail, beauty and personal care, food and F&B, e-commerce, farmer producer companies, and nonprofit foundations.',
    ],
  },
  {
    id: 'credentials',
    title: 'Credentials',
    body: [
      'Fellow Chartered Accountant (FCA), Bachelor of Business Management (BBM), and Bachelor of Legislative Law (LLB).',
    ],
  },
  {
    id: 'roles',
    title: 'Professional Roles',
    body: [
      'Vice President, Viksit Management Consultancy Private Limited. Director, Adithi Millets Private Limited. Founder, Artha Dharma Financial Literacy Foundation.',
    ],
  },
  {
    id: 'ecosystem',
    title: 'Ecosystem Involvement',
    body: [
      "Active in Kurnool's MSME, agri, and startup incubation ecosystem, including RTIIH Kurnool and regional Atal Innovation Centres.",
    ],
  },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const expertiseSectionRef = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handleMouseEnterBtn: ((e: MouseEvent) => void) | null = null;
    let handleMouseMoveBtn: ((e: MouseEvent) => void) | null = null;
    let handleMouseLeaveBtn: ((e: MouseEvent) => void) | null = null;
    let ctaBtnElement: HTMLElement | null = null;

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

      // 2. Parallax Scroll Effect for Hero Background
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



      // 4. Staggered reveals for all content sections (excluding about section for custom animation)
      const contentSections = gsap.utils.toArray('.content-section:not(.about-section-huge)');
      contentSections.forEach((section: any) => {
        const contentElements = section.querySelectorAll('p, h2');
        if (contentElements.length > 0) {
          gsap.fromTo(
            contentElements,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 1.0,
              ease: 'power3.out',
              stagger: 0.08,
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }
      });

      // 4.5 Custom On-View Animation for About Section
      const aboutTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.about-section-huge',
          start: 'top 75%',
          once: true,
        }
      });

      // Initially hide the highlight keywords so they can pop in
      gsap.set('.about-huge-text .highlight-keyword', { opacity: 0, color: 'var(--navy)' });

      aboutTimeline
        .fromTo(
          '.about-graphic-anchor svg',
          { opacity: 0, scale: 0.8, x: 40, rotation: -5 },
          { opacity: 1, scale: 1, x: 0, rotation: 0, duration: 1.8, ease: 'power3.out' }
        )
        .fromTo(
          '.about-content-wrapper .section-kicker',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
          '-=1.4'
        )
        .fromTo(
          '.about-huge-text',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
          '-=0.8'
        )
        .to(
          '.about-huge-text .highlight-keyword',
          { opacity: 1, color: 'var(--hero-text)', duration: 0.8, stagger: 0.06, ease: 'power2.out' },
          '-=0.4'
        );

      // 5. Direction-aware hover background bubble for Contact Button
      ctaBtnElement = navRef.current?.querySelector('.nav-cta') as HTMLElement | null;
      const ctaBg = ctaBtnElement?.querySelector('.nav-cta-bg') as HTMLElement | null;

      if (ctaBtnElement && ctaBg) {
        // Direction-aware background bubble fill
        const calculateTargetSize = () => {
          const rect = ctaBtnElement!.getBoundingClientRect();
          return Math.hypot(rect.width, rect.height) * 2.0;
        };

        handleMouseEnterBtn = (e: MouseEvent) => {
          const rect = ctaBtnElement!.getBoundingClientRect();
          const relX = e.clientX - rect.left;
          const relY = e.clientY - rect.top;

          gsap.set(ctaBg, {
            left: relX,
            top: relY,
            width: 0,
            height: 0,
          });

          const targetSize = calculateTargetSize();
          gsap.to(ctaBg, {
            width: targetSize,
            height: targetSize,
            duration: 0.65,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        };

        handleMouseMoveBtn = (e: MouseEvent) => {
          const rect = ctaBtnElement!.getBoundingClientRect();
          const relX = e.clientX - rect.left;
          const relY = e.clientY - rect.top;

          gsap.to(ctaBg, {
            left: relX,
            top: relY,
            duration: 0.45,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        };

        handleMouseLeaveBtn = (e: MouseEvent) => {
          const rect = ctaBtnElement!.getBoundingClientRect();
          const relX = e.clientX - rect.left;
          const relY = e.clientY - rect.top;

          gsap.to(ctaBg, {
            width: 0,
            height: 0,
            left: relX,
            top: relY,
            duration: 0.55,
            ease: 'power3.inOut',
            overwrite: 'auto',
          });
        };

        ctaBtnElement.addEventListener('mouseenter', handleMouseEnterBtn);
        ctaBtnElement.addEventListener('mousemove', handleMouseMoveBtn);
        ctaBtnElement.addEventListener('mouseleave', handleMouseLeaveBtn);
      }

      // 6. Parallax text shift for About section inside the sticky frame
      gsap.fromTo(
        '.about-huge-text',
        { y: 0, opacity: 1 },
        {
          y: -60,
          opacity: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-section-huge',
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // 7. Horizontal Scroll trigger for Sector Expertise
      const expertiseTrack = horizontalRef.current;
      const expertiseContainer = expertiseSectionRef.current;

      if (expertiseTrack && expertiseContainer) {
        let mm = gsap.matchMedia();

        // 7. Horizontal Scroll trigger for Sector Expertise (Desktop Only)
        mm.add('(min-width: 701px)', () => {
          // Calculate the exact distance to translate the track to reach the end
          const getScrollDistance = () => expertiseTrack.scrollWidth - window.innerWidth;
          
          // Slow down scroll scrub based on the total width we need to traverse
          const scrubDuration = () => getScrollDistance() * 1.2;

          gsap.to(expertiseTrack, {
            x: () => -getScrollDistance(),
            ease: 'none',
            scrollTrigger: {
              trigger: expertiseContainer,
              pin: true,
              start: 'top top',
              end: () => `+=${scrubDuration()}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          ScrollTrigger.create({
            trigger: expertiseContainer,
            start: 'top top',
            end: () => `+=${scrubDuration()}`,
            toggleClass: {
              targets: navRef.current,
              className: 'site-nav--light-text',
            },
            invalidateOnRefresh: true,
          });
        });
      }
    }, heroRef);

    return () => {
      ctx.revert();
      if (ctaBtnElement) {
        if (handleMouseEnterBtn) ctaBtnElement.removeEventListener('mouseenter', handleMouseEnterBtn);
        if (handleMouseMoveBtn) ctaBtnElement.removeEventListener('mousemove', handleMouseMoveBtn);
        if (handleMouseLeaveBtn) ctaBtnElement.removeEventListener('mouseleave', handleMouseLeaveBtn);
      }
    };
  }, []);

  // 8. Macbook GSAP Sequence (independent useEffect)
  useEffect(() => {
    const macbookWrapper = document.querySelector('.macbook-section-wrapper');
    const macbookImageWrapper = document.querySelector('.macbook-image-wrapper');
    const macbookScreenContent = document.querySelector('.macbook-screen-content');
    const macbookSectionHeading = document.querySelector('.macbook-section-heading');

    if (!macbookWrapper || !macbookImageWrapper || !macbookScreenContent) return;

    const ctx = gsap.context(() => {
      const macbookStickyEl = macbookWrapper.querySelector('.macbook-sticky-container');
      const slides = macbookWrapper.querySelectorAll('.macbook-service-slide');
      if (!macbookStickyEl || slides.length === 0) return;

      // Hide all slides initially except the first, push them down for the slide-up effect
      gsap.set(slides, { opacity: 0, yPercent: 100 });
      gsap.set(slides[0], { opacity: 1, yPercent: 0 });

      const macbookTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: macbookWrapper,
          start: 'top top',
          end: '+=400%',
          pin: macbookStickyEl,
          scrub: 1,
          invalidateOnRefresh: true,
          pinSpacing: true,
        }
      });

      // Phase 1: Scale up the Macbook (0 → 1 in timeline)
      macbookTimeline.fromTo(
        macbookImageWrapper,
        { scale: 0.6 },
        { scale: 1.15, duration: 1, ease: 'power2.inOut' }
      );

      // Handle heading animation depending on screen size
      if (macbookSectionHeading) {
        let mm = gsap.matchMedia();

        mm.add("(min-width: 1025px)", () => {
          // Large screens: make it a huge faded background text behind the macbook
          macbookTimeline.to(
            macbookSectionHeading,
            { 
              scale: 6, 
              opacity: 0.06, 
              y: '25vh', 
              duration: 1, 
              ease: 'power2.inOut' 
            },
            0
          );
        });

        mm.add("(max-width: 1024px)", () => {
          // Mobile/Tablets: just fade out completely
          macbookTimeline.to(
            macbookSectionHeading,
            { opacity: 0, y: -30, duration: 0.6 },
            0
          );
        });
      }

      // Phase 2: Cycle through slides (1 → 3.5 in timeline)
      const cycleDuration = 2.5 / (slides.length - 1);
      const animDuration = cycleDuration * 0.7; // 70% of the cycle is animating, 30% is a pause
      
      for (let i = 0; i < slides.length - 1; i++) {
        // Start time for the transition (adds a pause so the user can read the slide)
        const startTime = 1 + (i * cycleDuration) + (cycleDuration * 0.15);
        
        // Old slide moves up and fades out
        macbookTimeline.to(
          slides[i], 
          { yPercent: -100, opacity: 0, duration: animDuration, ease: 'power2.inOut' }, 
          startTime
        );
        
        // New slide moves up from the bottom and fades in
        macbookTimeline.fromTo(
          slides[i + 1], 
          { yPercent: 100, opacity: 0 }, 
          { yPercent: 0, opacity: 1, duration: animDuration, ease: 'power2.inOut' }, 
          startTime
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Mobile Auto-Scroll Carousel Logic
  useEffect(() => {
    const track = horizontalRef.current;
    if (!track) return;

    let isUserInteracting = false;
    let autoScrollInterval: NodeJS.Timeout;

    const startAutoScroll = () => {
      autoScrollInterval = setInterval(() => {
        if (window.innerWidth <= 700 && !isUserInteracting && track) {
          const slideWidth = track.clientWidth;
          const maxScroll = track.scrollWidth - track.clientWidth;
          
          if (track.scrollLeft >= maxScroll - 10) {
            // Smoothly scroll back to start
            track.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            // Scroll to next slide
            track.scrollBy({ left: slideWidth, behavior: 'smooth' });
          }
        }
      }, 2500); // Advance every 2.5 seconds
    };

    startAutoScroll();

    // Pause on user interaction
    const handleInteractionStart = () => {
      isUserInteracting = true;
    };

    let resumeTimeout: NodeJS.Timeout;
    const handleInteractionEnd = () => {
      clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        isUserInteracting = false;
      }, 4000); // Wait 4 seconds after interaction to resume
    };

    track.addEventListener('touchstart', handleInteractionStart, { passive: true });
    track.addEventListener('touchend', handleInteractionEnd, { passive: true });
    track.addEventListener('scroll', handleInteractionStart, { passive: true });
    
    let scrollTimeout: NodeJS.Timeout;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        handleInteractionEnd();
        if (window.innerWidth <= 700 && track.clientWidth > 0) {
          const index = Math.round(track.scrollLeft / track.clientWidth);
          setActiveSlide(index);
        }
      }, 150);
    }, { passive: true });

    return () => {
      clearInterval(autoScrollInterval);
      clearTimeout(resumeTimeout);
      clearTimeout(scrollTimeout);
      track.removeEventListener('touchstart', handleInteractionStart);
      track.removeEventListener('touchend', handleInteractionEnd);
      track.removeEventListener('scroll', handleInteractionStart);
    };
  }, []);

  return (
    <main className="page-shell">
      <SmoothScroll />
      <nav ref={navRef} className="site-nav" aria-label="Primary navigation">
        <a className="nav-logo" href="#home" aria-label="Mohan Kadimpalli home">
          MK
        </a>
        <a className="nav-cta" href="#contact">
          <span className="nav-cta-bg"></span>
          <span className="nav-cta-text">Contact</span>
        </a>
      </nav>

      <section
        id="home"
        ref={heroRef}
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

      <div className="content-sections">
        {sections.map((section) => {
          if (section.id === 'about') {
            return (
              <section key={section.id} id={section.id} className="content-section about-section-huge">
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
           if (section.id === 'expertise') {
            return (
              <React.Fragment key={section.id}>
              <section
                id={section.id}
                ref={expertiseSectionRef}
                className="expertise-horizontal-container"
              >
                <div className="expertise-sticky-wrapper">
                  <div ref={horizontalRef} className="expertise-slides-track">
                    {expertiseSectors.map((sector, idx) => (
                      <div
                        key={idx}
                        className={`expertise-slide ${sector.bgClass}`}
                        style={{ backgroundColor: sector.bgColor }}
                      >
                        <div className="expertise-slide-header">
                          <span className="expertise-section-title">Sector Expertise / 0{idx + 1}</span>
                        </div>
                        <h2 className="expertise-slide-title">{sector.title}</h2>
                        <p className="expertise-slide-desc">{sector.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="carousel-dots" aria-hidden="true">
                    {expertiseSectors.map((_, idx) => (
                      <button
                        key={idx}
                        className={`carousel-dot ${activeSlide === idx ? 'active' : ''}`}
                        onClick={() => {
                          if (horizontalRef.current) {
                            horizontalRef.current.scrollTo({
                              left: idx * horizontalRef.current.clientWidth,
                              behavior: 'smooth'
                            });
                          }
                        }}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </section>

              <section id="services" className="macbook-section-wrapper">
                <div className="macbook-sticky-container">
                  <h2 className="macbook-section-heading">Services Provided</h2>
                  <div className="macbook-bg-graphic left-graphic" aria-hidden="true">
                    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g stroke="currentColor" strokeWidth="0.5" opacity="0.3">
                        <line x1="0" y1="40" x2="400" y2="40"/>
                        <line x1="0" y1="80" x2="400" y2="80"/>
                        <line x1="0" y1="120" x2="400" y2="120"/>
                        <line x1="0" y1="160" x2="400" y2="160"/>
                        <line x1="0" y1="200" x2="400" y2="200"/>
                        <line x1="0" y1="240" x2="400" y2="240"/>
                        <line x1="0" y1="280" x2="400" y2="280"/>
                        <line x1="0" y1="320" x2="400" y2="320"/>
                        <line x1="0" y1="360" x2="400" y2="360"/>
                        <line x1="40" y1="0" x2="40" y2="400"/>
                        <line x1="80" y1="0" x2="80" y2="400"/>
                        <line x1="120" y1="0" x2="120" y2="400"/>
                        <line x1="160" y1="0" x2="160" y2="400"/>
                        <line x1="200" y1="0" x2="200" y2="400"/>
                        <line x1="240" y1="0" x2="240" y2="400"/>
                        <line x1="280" y1="0" x2="280" y2="400"/>
                        <line x1="320" y1="0" x2="320" y2="400"/>
                        <line x1="360" y1="0" x2="360" y2="400"/>
                      </g>
                      <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" opacity="0.5"/>
                      <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
                      <rect x="120" y="120" width="160" height="160" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
                      <path d="M40 200 L360 200" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                      <path d="M200 40 L200 360" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                      <path d="M80 80 L320 320" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
                      <path d="M320 80 L80 320" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
                    </svg>
                  </div>
                  <div className="macbook-bg-graphic center-graphic" aria-hidden="true">
                    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g stroke="currentColor" strokeWidth="0.5" opacity="0.3">
                        <line x1="0" y1="40" x2="400" y2="40"/>
                        <line x1="0" y1="80" x2="400" y2="80"/>
                        <line x1="0" y1="120" x2="400" y2="120"/>
                        <line x1="0" y1="160" x2="400" y2="160"/>
                        <line x1="0" y1="200" x2="400" y2="200"/>
                        <line x1="0" y1="240" x2="400" y2="240"/>
                        <line x1="0" y1="280" x2="400" y2="280"/>
                        <line x1="0" y1="320" x2="400" y2="320"/>
                        <line x1="0" y1="360" x2="400" y2="360"/>
                        <line x1="40" y1="0" x2="40" y2="400"/>
                        <line x1="80" y1="0" x2="80" y2="400"/>
                        <line x1="120" y1="0" x2="120" y2="400"/>
                        <line x1="160" y1="0" x2="160" y2="400"/>
                        <line x1="200" y1="0" x2="200" y2="400"/>
                        <line x1="240" y1="0" x2="240" y2="400"/>
                        <line x1="280" y1="0" x2="280" y2="400"/>
                        <line x1="320" y1="0" x2="320" y2="400"/>
                        <line x1="360" y1="0" x2="360" y2="400"/>
                      </g>
                      <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" opacity="0.5"/>
                      <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
                      <rect x="120" y="120" width="160" height="160" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
                      <path d="M40 200 L360 200" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                      <path d="M200 40 L200 360" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                      <path d="M80 80 L320 320" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
                      <path d="M320 80 L80 320" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
                    </svg>
                  </div>
                  <div className="macbook-bg-graphic right-graphic" aria-hidden="true">
                    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g stroke="currentColor" strokeWidth="0.5" opacity="0.3">
                        <line x1="0" y1="40" x2="400" y2="40"/>
                        <line x1="0" y1="80" x2="400" y2="80"/>
                        <line x1="0" y1="120" x2="400" y2="120"/>
                        <line x1="0" y1="160" x2="400" y2="160"/>
                        <line x1="0" y1="200" x2="400" y2="200"/>
                        <line x1="0" y1="240" x2="400" y2="240"/>
                        <line x1="0" y1="280" x2="400" y2="280"/>
                        <line x1="0" y1="320" x2="400" y2="320"/>
                        <line x1="0" y1="360" x2="400" y2="360"/>
                        <line x1="40" y1="0" x2="40" y2="400"/>
                        <line x1="80" y1="0" x2="80" y2="400"/>
                        <line x1="120" y1="0" x2="120" y2="400"/>
                        <line x1="160" y1="0" x2="160" y2="400"/>
                        <line x1="200" y1="0" x2="200" y2="400"/>
                        <line x1="240" y1="0" x2="240" y2="400"/>
                        <line x1="280" y1="0" x2="280" y2="400"/>
                        <line x1="320" y1="0" x2="320" y2="400"/>
                        <line x1="360" y1="0" x2="360" y2="400"/>
                      </g>
                      <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" opacity="0.5"/>
                      <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
                      <rect x="120" y="120" width="160" height="160" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
                      <path d="M40 200 L360 200" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                      <path d="M200 40 L200 360" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                      <path d="M80 80 L320 320" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
                      <path d="M320 80 L80 320" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
                    </svg>
                  </div>
                  <div className="macbook-image-wrapper">
                    <img src="/macbook.webp" alt="Services on Macbook" className="macbook-image" />
                    <div className="macbook-screen-mask">
                      <div className="macbook-screen-content">
                        {detailedServices.map((service, idx) => (
                          <div key={idx} className={`macbook-service-slide ${service.bgClass}`} style={{ backgroundColor: service.bgColor }}>
                            <h3 className="macbook-service-title" style={{ color: service.titleColor }}>{service.title}</h3>
                            <p className="macbook-service-desc">{service.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              </React.Fragment>
            );
          }
          return (
            <section key={section.id} id={section.id} className="content-section">
              <p className="section-kicker">Mohan Kadimpalli</p>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          );
        })}
        <section id="contact" className="content-section contact-section">
          <p className="section-kicker">Contact</p>
          <h2>Let&apos;s Talk</h2>
          <p>mohan.kadimpalli@viksitconsulting.com</p>
          <p>Kurnool, Andhra Pradesh | Mumbai</p>
        </section>
      </div>
    </main>
  );
}
