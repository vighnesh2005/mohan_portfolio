'use client';

import { useEffect, useRef, useState } from 'react';
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
    id: 'services',
    title: 'Services',
    body: [
      'Statutory compliance, financial reporting, corporate governance, business advisory, legal and regulatory strategy.',
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



      // 4. Staggered reveals for all content sections
      const contentSections = gsap.utils.toArray('.content-section');
      contentSections.forEach((section: any) => {
        const contentElements = section.querySelectorAll('p, h2, .about-huge-text');
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
          // Collect all slide elements
          const slides = gsap.utils.toArray('.expertise-slide', expertiseTrack);

          // Slow down scroll duration (1.5x width of container per slide)
          const getScrollDistance = () => expertiseContainer.offsetWidth * (slides.length - 1) * 1.5;

          // Move each slide by -500% of its own width
          gsap.to(slides, {
            xPercent: -100 * (slides.length - 1),
            ease: 'none',
            scrollTrigger: {
              trigger: expertiseContainer,
              pin: true,
              start: 'top top',
              end: () => `+=${getScrollDistance()}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          ScrollTrigger.create({
            trigger: expertiseContainer,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
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

  // Mobile Auto-Scroll Continuous Marquee Logic
  useEffect(() => {
    const track = horizontalRef.current;
    if (!track) return;

    let animationFrameId: number;
    let isUserInteracting = false;
    let scrollSpeed = 0.5; // Pixels per frame

    const continuousScroll = () => {
      if (window.innerWidth <= 700 && !isUserInteracting && track) {
        const maxScroll = track.scrollWidth - track.clientWidth;
        
        // If we reach the end, instantly reset to start (or just let user scroll back)
        if (track.scrollLeft >= maxScroll - 1) {
          track.scrollLeft = 0;
        } else {
          track.scrollLeft += scrollSpeed;
        }
      }
      animationFrameId = requestAnimationFrame(continuousScroll);
    };

    // Start loop
    animationFrameId = requestAnimationFrame(continuousScroll);

    // Pause on user interaction (touch or manual scroll)
    const handleInteractionStart = () => {
      isUserInteracting = true;
    };

    let resumeTimeout: NodeJS.Timeout;
    const handleInteractionEnd = () => {
      clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        isUserInteracting = false;
      }, 2000); // Resume 2 seconds after interaction stops
    };

    track.addEventListener('touchstart', handleInteractionStart, { passive: true });
    track.addEventListener('touchend', handleInteractionEnd, { passive: true });
    track.addEventListener('scroll', handleInteractionStart, { passive: true });
    
    // We need to detect when scrolling completely stops
    let scrollTimeout: NodeJS.Timeout;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleInteractionEnd, 150);
    }, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
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
                <p className="section-kicker">Mohan Kadimpalli</p>
                <div className="about-huge-text">
                  {section.body.join(' ')}
                </div>
              </section>
            );
          }
          if (section.id === 'expertise') {
            return (
              <section
                key={section.id}
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
                </div>
              </section>
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
