import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { detailedServices } from '../../data/constants';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const macbookWrapper = sectionRef.current;
    if (!macbookWrapper) return;

    const macbookImageWrapper = macbookWrapper.querySelector('.macbook-image-wrapper');
    const macbookScreenContent = macbookWrapper.querySelector('.macbook-screen-content');
    const macbookSectionHeading = macbookWrapper.querySelector('.macbook-section-heading');

    if (!macbookImageWrapper || !macbookScreenContent) return;

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

      // Handle heading animation independently to avoid matchMedia timeline corruption
      if (macbookSectionHeading) {
        gsap.to(macbookSectionHeading, {
          scale: window.innerWidth > 1024 ? 6 : 1,
          opacity: window.innerWidth > 1024 ? 0.06 : 0,
          y: window.innerWidth > 1024 ? '25vh' : -30,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: macbookWrapper,
            start: 'top top',
            end: '+=100%',
            scrub: 1,
          }
        });
      }

      // Phase 2: Cycle through slides (1 → 3.5 in timeline)
      const cycleDuration = 2.5 / (slides.length - 1);
      const animDuration = cycleDuration * 0.7; 
      
      for (let i = 0; i < slides.length - 1; i++) {
        const startTime = 1 + (i * cycleDuration) + (cycleDuration * 0.15);
        
        macbookTimeline.to(
          slides[i], 
          { yPercent: -100, opacity: 0, duration: animDuration, ease: 'power2.inOut' }, 
          startTime
        );
        
        macbookTimeline.fromTo(
          slides[i + 1], 
          { yPercent: 100, opacity: 0 }, 
          { yPercent: 0, opacity: 1, duration: animDuration, ease: 'power2.inOut' }, 
          startTime
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="macbook-section-wrapper">
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
  );
}
