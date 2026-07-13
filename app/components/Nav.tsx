import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let handleMouseEnterBtn: ((e: MouseEvent) => void) | null = null;
    let handleMouseMoveBtn: ((e: MouseEvent) => void) | null = null;
    let handleMouseLeaveBtn: ((e: MouseEvent) => void) | null = null;
    let ctaBtnElement: HTMLElement | null = null;

    const ctx = gsap.context(() => {
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
    }, navRef);

    return () => {
      ctx.revert();
      if (ctaBtnElement) {
        if (handleMouseEnterBtn) ctaBtnElement.removeEventListener('mouseenter', handleMouseEnterBtn);
        if (handleMouseMoveBtn) ctaBtnElement.removeEventListener('mousemove', handleMouseMoveBtn);
        if (handleMouseLeaveBtn) ctaBtnElement.removeEventListener('mouseleave', handleMouseLeaveBtn);
      }
    };
  }, []);

  return (
    <nav ref={navRef} className="site-nav" aria-label="Primary navigation">
      <a className="nav-logo" href="#home" aria-label="Mohan Kadimpalli home">
        MK
      </a>
      <a className="nav-cta" href="#contact">
        <span className="nav-cta-bg"></span>
        <span className="nav-cta-text">Contact</span>
      </a>
    </nav>
  );
}
