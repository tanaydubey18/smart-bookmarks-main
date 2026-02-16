"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if preloader has already run in this session
    const hasSeenPreloader = sessionStorage.getItem("preloader_session_seen");
    if (hasSeenPreloader) {
      setIsVisible(false);
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      // Random increment between 1 and 7
      const increment = Math.floor(Math.random() * 7) + 1;
      current = Math.min(current + increment, 100);
      setProgress(current);

      if (current === 100) {
        clearInterval(interval);
        sessionStorage.setItem("preloader_session_seen", "true");
        
        // Final flourish and exit
        const tl = gsap.timeline({
          onComplete: () => setIsVisible(false)
        });

        tl.to(counterRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in"
        })
        .to(lineRef.current, {
          scaleX: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in"
        }, "-=0.3")
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut"
        });
      }
    }, Math.floor(Math.random() * 150) + 50); // Random delay for more natural feel

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black overflow-hidden"
    >
      <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 text-right space-y-4">
        {/* Counter */}
        <div 
          ref={counterRef}
          className="text-white font-mono text-7xl md:text-9xl font-bold tracking-tighter flex items-baseline justify-end leading-none"
        >
          <span>{progress}</span>
          <span className="text-xl md:text-2xl text-white/30 ml-4">%</span>
        </div>

        {/* Progress Line */}
        <div className="relative h-[2px] w-48 md:w-80 ml-auto bg-white/10 overflow-hidden rounded-full">
          <div 
            ref={lineRef}
            className="absolute left-0 top-0 h-full bg-white origin-left"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Subtle Brand Text */}
        <div className="pt-4 opacity-40">
          <p className="text-white text-[10px] uppercase tracking-[0.5em] font-medium font-mono">
            Architecting Session
          </p>
        </div>
      </div>
      
      {/* Decorative architectural grid (subtle) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none invert">
          <div className="absolute inset-0 bg-grid" style={{ backgroundSize: "40px 40px" }} />
      </div>
    </div>
  );
}
