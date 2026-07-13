import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Briefcase, Building, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CredentialsRolesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        }
      });

      // 1. Move boxes into position from their respective directions while revealing them with clip-path
      tl.fromTo(
        '.bento-main',
        { x: -120, clipPath: 'inset(0 100% 0 0)' }, // Clipped fully from the right (meaning 0 width starting at left)
        { x: 0, clipPath: 'inset(0 0% 0 0)', duration: 1.6, ease: 'power3.out' },
        0
      )
      .fromTo(
        '.bento-tl',
        { y: -120, clipPath: 'inset(0 0 100% 0)' }, // Clipped fully from bottom (0 height at top)
        { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.6, ease: 'power3.out' },
        0
      )
      .fromTo(
        '.bento-tr',
        { x: 120, clipPath: 'inset(0 0 0 100%)' }, // Clipped fully from left (0 width at right)
        { x: 0, clipPath: 'inset(0 0 0 0%)', duration: 1.6, ease: 'power3.out' },
        0
      )
      .fromTo(
        '.bento-bl',
        { x: -120, clipPath: 'inset(0 100% 0 0)' }, // Clipped fully from right (0 width at left)
        { x: 0, clipPath: 'inset(0 0% 0 0)', duration: 1.6, ease: 'power3.out' },
        0
      )
      .fromTo(
        '.bento-br',
        { y: 120, clipPath: 'inset(100% 0 0 0)' }, // Clipped fully from top (0 height at bottom)
        { y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1.6, ease: 'power3.out' },
        0
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="credentials-roles" ref={sectionRef} className="premium-credentials-section">
      {/* Subtle Background Blueprint Grid */}
      <div className="premium-bg-decoration" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="blueprintGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="none" />
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprintGrid)" />
        </svg>
      </div>

      <div className="premium-container">
        <div className="bento-layout">
          
          {/* Left Column: Bento Box for Credentials & Text */}
          <div className="bento-box bento-main">
            <span className="premium-eyebrow">Mohan Kadimpalli</span>
            <h2 className="premium-heading">Credentials & Qualifications</h2>
            
            <p className="premium-paragraph intro-paragraph">
              Mohan possesses a unique tri-disciplinary expertise across finance, business administration, and law. This comprehensive foundation empowers a holistic approach to <strong>Corporate Governance</strong> and <strong>Statutory Compliance</strong> for modern enterprises.
            </p>
            
            <div className="qualifications-list">
              <div className="qual-item">
                <span className="qual-dot"></span>
                <strong>FCA</strong> - Fellow Chartered Accountant
              </div>
              <div className="qual-item">
                <span className="qual-dot"></span>
                <strong>BBM</strong> - Bachelor of Business Management
              </div>
              <div className="qual-item">
                <span className="qual-dot"></span>
                <strong>LLB</strong> - Bachelor of Legislative Law
              </div>
            </div>
          </div>

          {/* Right Column: 4 Bento Boxes for Roles */}
          <div className="bento-right-grid">
            
            <div className="bento-box premium-card bento-tl">
              <div className="card-icon-wrapper">
                <GraduationCap className="card-icon" strokeWidth={1.5} />
              </div>
              <h3 className="card-title">FCA</h3>
              <p className="card-subtitle">Fellow Chartered Accountant</p>
              <p className="card-desc">Institute of Chartered Accountants of India</p>
            </div>

            <div className="bento-box premium-card bento-tr">
              <div className="card-icon-wrapper">
                <Briefcase className="card-icon" strokeWidth={1.5} />
              </div>
              <h3 className="card-title">Vice President</h3>
              <p className="card-subtitle">Viksit Management</p>
              <p className="card-desc">Consultancy Pvt. Ltd.</p>
            </div>

            <div className="bento-box premium-card bento-bl">
              <div className="card-icon-wrapper">
                <Building className="card-icon" strokeWidth={1.5} />
              </div>
              <h3 className="card-title">Director</h3>
              <p className="card-subtitle">Adithi Millets</p>
              <p className="card-desc">Pvt. Ltd.</p>
            </div>

            <div className="bento-box premium-card bento-br">
              <div className="card-icon-wrapper">
                <Globe className="card-icon" strokeWidth={1.5} />
              </div>
              <h3 className="card-title">Founder</h3>
              <p className="card-subtitle">Artha Dharma</p>
              <p className="card-desc">Financial Literacy Foundation</p>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
