import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Network, TreeDeciduous, Rocket, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ecosystemData = [
  {
    id: 'top-left',
    title: 'MSME Ecosystem',
    desc: 'Fostering local business growth.',
    icon: Network,
    position: 'top-left'
  },
  {
    id: 'top-right',
    title: 'Agri Ecosystem',
    desc: 'Supporting sustainable agriculture.',
    icon: TreeDeciduous,
    position: 'top-right'
  },
  {
    id: 'bottom-left',
    title: 'Startup Incubation',
    desc: 'Mentoring emerging ventures.',
    icon: Rocket,
    position: 'bottom-left'
  },
  {
    id: 'bottom-right',
    title: 'Innovation Centres',
    desc: 'Collaborating with RTIIH Kurnool.',
    icon: Lightbulb,
    position: 'bottom-right'
  }
];

export default function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const maskEl = document.querySelector('.pie-chart-mask') as HTMLElement;
      const rotateContainer = document.querySelector('.pie-chart-rotate-container') as HTMLElement;
      
      // Initial state: Pie chart is rotated -360, Mask is 0deg (invisible), Blur starts high
      const animObj = { rot: -360, sweep: 0, blur: 12 };
      
      // Disable pointer events during animation to prevent hover effects
      if (rotateContainer) {
        rotateContainer.style.pointerEvents = 'none';
      }
      
      gsap.set('.pie-chart-rotate-container', { rotation: -360, filter: 'blur(12px)' });
      if (maskEl) {
        maskEl.style.maskImage = `conic-gradient(from 0deg, black 0deg, transparent 0deg)`;
        maskEl.style.webkitMaskImage = `conic-gradient(from 0deg, black 0deg, transparent 0deg)`;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reset',
        }
      });

      // Animate the solid grid and the mask perfectly in sync.
      // This creates the flawless CD unspooling effect out of the 12 o'clock line.
      tl.to(animObj, {
        rot: 0,
        sweep: 360,
        blur: 0,
        duration: 2.2,
        ease: 'power3.out',
        onUpdate: () => {
          gsap.set('.pie-chart-rotate-container', { rotation: animObj.rot });
          if (rotateContainer) {
            // Apply a dynamic motion blur that decreases as the rotation slows down
            rotateContainer.style.filter = `blur(${animObj.blur}px)`;
          }
          if (maskEl) {
            maskEl.style.maskImage = `conic-gradient(from 0deg, black ${animObj.sweep}deg, transparent ${animObj.sweep}deg)`;
            maskEl.style.webkitMaskImage = `conic-gradient(from 0deg, black ${animObj.sweep}deg, transparent ${animObj.sweep}deg)`;
          }
        },
        onComplete: () => {
          // Re-enable pointer events after animation is complete
          if (rotateContainer) {
            rotateContainer.style.pointerEvents = 'auto';
          }
          // Remove the mask completely so the popout cards can overflow visually
          if (maskEl) {
            maskEl.style.maskImage = 'none';
            maskEl.style.webkitMaskImage = 'none';
          }
        }
      })
      // After rotation completes, increase the size slightly
      .to('.pie-chart-wrapper', {
        scale: 1.15,
        duration: 1.2,
        ease: 'elastic.out(1, 0.6)'
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="ecosystem" ref={sectionRef} className="ecosystem-section">
      {/* Decorative Curated SVG Network Graphics */}
      <div className="ecosystem-graphic-anchor top-left" aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 40 L100 80 L160 40" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M100 80 L100 150" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M40 140 L100 150 L160 140" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M40 40 L40 140" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M160 40 L160 140" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>

          <circle cx="100" cy="80" r="15" fill="currentColor" opacity="0.8"/>
          <circle cx="40" cy="40" r="10" stroke="currentColor" strokeWidth="2" fill="var(--bg)"/>
          <circle cx="160" cy="40" r="10" stroke="currentColor" strokeWidth="2" fill="var(--bg)"/>
          <circle cx="40" cy="140" r="12" stroke="currentColor" strokeWidth="2" fill="var(--bg)"/>
          <circle cx="160" cy="140" r="12" stroke="currentColor" strokeWidth="2" fill="var(--bg)"/>
          <circle cx="100" cy="150" r="18" stroke="currentColor" strokeWidth="2" fill="var(--bg)"/>
          <circle cx="100" cy="150" r="6" fill="currentColor"/>
        </svg>
      </div>
      
      <div className="ecosystem-graphic-anchor bottom-right" aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 40 L100 80 L160 40" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M100 80 L100 150" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M40 140 L100 150 L160 140" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M40 40 L40 140" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M160 40 L160 140" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>

          <circle cx="100" cy="80" r="15" fill="currentColor" opacity="0.8"/>
          <circle cx="40" cy="40" r="10" stroke="currentColor" strokeWidth="2" fill="var(--bg)"/>
          <circle cx="160" cy="40" r="10" stroke="currentColor" strokeWidth="2" fill="var(--bg)"/>
          <circle cx="40" cy="140" r="12" stroke="currentColor" strokeWidth="2" fill="var(--bg)"/>
          <circle cx="160" cy="140" r="12" stroke="currentColor" strokeWidth="2" fill="var(--bg)"/>
          <circle cx="100" cy="150" r="18" stroke="currentColor" strokeWidth="2" fill="var(--bg)"/>
          <circle cx="100" cy="150" r="6" fill="currentColor"/>
        </svg>
      </div>

      <div className="premium-container" style={{ zIndex: 1, position: 'relative' }}>
        
        <div className="ecosystem-split-layout">
          
          <div className="side-heading left-heading">
            <h2 className="premium-heading">Ecosystem</h2>
          </div>

          <div className="pie-chart-wrapper">
          
          <div className="pie-chart-mask">
            <div className="pie-chart-rotate-container" ref={pieRef}>
              
              {ecosystemData.map((slice) => (
                <div key={slice.id} className={`pie-slice ${slice.position}`}>
                  {/* Main Slice Content */}
                  <div className="slice-content">
                    <slice.icon className="slice-icon" />
                    <h3 className="slice-title">{slice.title}</h3>
                  </div>
                  
                  {/* Hidden Popout Card */}
                  <div className="popout-card">
                    <p className="popout-desc">{slice.desc}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* Central Name Plate (Sibling so it never gets rotated or masked) */}
          <div className="pie-center">
            <div className="center-inner">
              <span className="center-name">Mohan<br/>Kadimpalli</span>
            </div>
          </div>
          
          </div> {/* Closing tag for pie-chart-wrapper */}

          <div className="side-heading right-heading">
            <h2 className="premium-heading">Involvement</h2>
          </div>

        </div>

      </div>
    </section>
  );
}
