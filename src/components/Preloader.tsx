"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "auto";
          onComplete();
        }
      });

      tl.fromTo([textRef1.current, textRef2.current], 
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power4.out" }
        )
        .to([textRef1.current, textRef2.current], {
          yPercent: -120,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.inOut",
          delay: 0.3
        })
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.65,
          ease: "power4.inOut"
        }, "-=0.3");
        
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[99999] bg-[var(--text-primary)] flex flex-col justify-center items-center p-8 sm:p-12 md:p-24"
    >
      <div className="overflow-hidden flex gap-4 md:gap-8 text-[var(--bg-primary)]">
        <div ref={textRef1} className="text-4xl md:text-7xl lg:text-9xl font-semibold tracking-tighter uppercase will-change-transform pb-2">
          AYUSH
        </div>
        <div ref={textRef2} className="text-4xl md:text-7xl lg:text-9xl font-semibold tracking-tighter uppercase will-change-transform pb-2 opacity-50">
          GUPTA
        </div>
      </div>
    </div>
  );
}
