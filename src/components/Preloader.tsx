"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = "hidden";
    
    // Simulate loading progress
    const duration = 2.5; // Seconds
    const interval = 20; // ms
    const increments = 100 / (duration * 1000 / interval);
    
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += increments;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(progressInterval);
      }
      setProgress(Math.floor(currentProgress));
    }, interval);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "auto";
          onComplete();
        }
      });

      // Wait for progress to hit 100 roughly
      tl.to({}, { duration: 2.8 })
        .to(counterRef.current, {
          yPercent: -100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut"
        })
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut"
        }, "-=0.4");
        
    }, containerRef);

    return () => {
      clearInterval(progressInterval);
      ctx.revert();
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[99999] bg-[var(--bg-primary)] text-[var(--text-primary)] flex justify-end items-end p-8 sm:p-12 md:p-24"
    >
      <div className="overflow-hidden">
        <div ref={counterRef} className="text-[15vw] md:text-[8vw] font-medium leading-none tracking-tighter">
          {progress}%
        </div>
      </div>
    </div>
  );
}
