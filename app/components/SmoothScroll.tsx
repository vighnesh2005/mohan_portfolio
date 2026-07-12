'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let updateLenisFn: ((time: number) => void) | null = null;

    // Initialize Lenis smooth scroll
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Synchronize Lenis scrolling with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Connect Lenis to the GSAP Ticker for framerate-independent updates
    updateLenisFn = (time: number) => {
      lenis?.raf(time * 1000);
    };
    gsap.ticker.add(updateLenisFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (updateLenisFn) {
        gsap.ticker.remove(updateLenisFn);
      }
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return null;
}
