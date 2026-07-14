import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail } from 'lucide-react';

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Create a dramatic entrance for the massive text and buttons
      gsap.fromTo(
        '.contact-reveal',
        { opacity: 0, y: 100, rotationZ: 2 },
        {
          opacity: 1,
          y: 0,
          rotationZ: 0,
          duration: 1.5,
          ease: 'power4.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Magnetic hover effect for the CTA buttons (Replicated from Navbar)
      const ctaBtns = section.querySelectorAll('.nav-cta');
      ctaBtns.forEach((btn) => {
        const ctaBg = btn.querySelector('.nav-cta-bg');
        const ctaText = btn.querySelector('.nav-cta-text');

        if (!ctaBg || !ctaText) return;

        const onMouseEnter = (e: any) => {
          const rect = btn.getBoundingClientRect();
          const relX = e.clientX - rect.left;
          const relY = e.clientY - rect.top;
          
          gsap.to(ctaBg, {
            left: relX,
            top: relY,
            width: rect.width * 2.5,
            height: rect.width * 2.5,
            duration: 0.4,
            ease: 'power2.out',
          });
        };

        const onMouseLeave = (e: any) => {
          const rect = btn.getBoundingClientRect();
          const relX = e.clientX - rect.left;
          const relY = e.clientY - rect.top;
          
          gsap.to(ctaBg, {
            left: relX,
            top: relY,
            width: 0,
            height: 0,
            duration: 0.4,
            ease: 'power2.out',
          });
        };

        btn.addEventListener('mouseenter', onMouseEnter);
        btn.addEventListener('mouseleave', onMouseLeave);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="premium-contact-section">
      <div className="contact-graphic-anchor" aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Geometric Abstract Weighing Scale Matching the About Page Design Language */}
          {/* Central Pillar */}
          <path d="M100 30 L100 170" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          {/* Pillar Base */}
          <path d="M60 170 L140 170" stroke="currentColor" strokeWidth="2" />
          {/* Top Beam */}
          <path d="M40 50 L160 50" stroke="currentColor" strokeWidth="2" />
          
          {/* Left Strings & Pan */}
          <path d="M40 50 L20 110 L60 110 Z" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M20 110 Q40 130 60 110" stroke="currentColor" strokeWidth="2" />
          
          {/* Right Strings & Pan */}
          <path d="M160 50 L140 110 L180 110 Z" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M140 110 Q160 130 180 110" stroke="currentColor" strokeWidth="2" />

          {/* Geometric Accents (Nodes) */}
          <circle cx="100" cy="30" r="10" stroke="currentColor" strokeWidth="2" fill="var(--bg)"/>
          <circle cx="100" cy="50" r="8" fill="currentColor"/>
          <circle cx="100" cy="170" r="12" stroke="currentColor" strokeWidth="2" fill="var(--bg)"/>
          
          <circle cx="40" cy="50" r="6" stroke="currentColor" strokeWidth="2" fill="var(--bg)"/>
          <circle cx="160" cy="50" r="6" stroke="currentColor" strokeWidth="2" fill="var(--bg)"/>
          
          {/* Ethereal Orbits */}
          <circle cx="40" cy="120" r="30" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
          <circle cx="160" cy="120" r="30" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5"/>
        </svg>
      </div>
      
      <div className="premium-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="contact-content-wrapper">
          
          <h2 className="contact-massive-text contact-reveal">
            LET&apos;S BUILD<br/>SOMETHING<br/><span className="text-highlight">EXTRAORDINARY.</span>
          </h2>

          <div className="contact-actions contact-reveal">
            <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS || "Mohan.kadimpalli@gmail.com"}`} className="nav-cta">
              <span className="nav-cta-bg"></span>
              <span className="nav-cta-text">
                <Mail className="btn-icon" />
                <span>Send an Email</span>
              </span>
            </a>
            
            <a href={process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/mohankadimpalli/"} target="_blank" rel="noopener noreferrer" className="nav-cta linkedin-btn">
              <span className="nav-cta-bg"></span>
              <span className="nav-cta-text">
                <LinkedinIcon className="btn-icon" />
                <span>Connect on LinkedIn</span>
              </span>
            </a>
          </div>

          <div className="contact-ending contact-reveal">
            <p>Based in Kurnool, Andhra Pradesh &amp; Mumbai</p>
            <p className="ending-sub">Partnering with visionary founders across India.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
