import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { expertiseSectors } from '../../data/constants';

gsap.registerPlugin(ScrollTrigger);

export default function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const container = sectionRef.current;

    if (!track || !container) return;

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Horizontal Scroll trigger for Sector Expertise (Desktop Only)
      mm.add('(min-width: 701px)', () => {
        // Calculate the exact distance to translate the track to reach the end
        const getScrollDistance = () => track.scrollWidth - window.innerWidth;
        
        // Slow down scroll scrub based on the total width we need to traverse
        const scrubDuration = () => getScrollDistance() * 1.2;

        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            pin: true,
            start: 'top top',
            end: () => `+=${scrubDuration()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // Toggle nav class for light text when over dark backgrounds
        const nav = document.querySelector('.site-nav');
        if (nav) {
          ScrollTrigger.create({
            trigger: container,
            start: 'top top',
            end: () => `+=${scrubDuration()}`,
            toggleClass: {
              targets: nav,
              className: 'site-nav--light-text',
            },
            invalidateOnRefresh: true,
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mobile Auto-Scroll Carousel Logic
  useEffect(() => {
    const track = trackRef.current;
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
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        handleInteractionEnd();
        if (window.innerWidth <= 700 && track.clientWidth > 0) {
          const index = Math.round(track.scrollLeft / track.clientWidth);
          setActiveSlide(index);
        }
      }, 150);
    };

    track.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(autoScrollInterval);
      clearTimeout(resumeTimeout);
      clearTimeout(scrollTimeout);
      track.removeEventListener('touchstart', handleInteractionStart);
      track.removeEventListener('touchend', handleInteractionEnd);
      track.removeEventListener('scroll', handleInteractionStart);
      track.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="expertise-horizontal-container"
    >
      <div className="expertise-sticky-wrapper">
        <div ref={trackRef} className="expertise-slides-track">
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
                if (trackRef.current) {
                  trackRef.current.scrollTo({
                    left: idx * trackRef.current.clientWidth,
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
  );
}
