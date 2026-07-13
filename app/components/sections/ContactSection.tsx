import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="content-section contact-section">
      <p className="section-kicker">Contact</p>
      <h2>Let&apos;s Talk</h2>
      <p>mohan.kadimpalli@viksitconsulting.com</p>
      <p>Kurnool, Andhra Pradesh | Mumbai</p>
    </section>
  );
}
