"use client";

import { ReactNode, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CardSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function CardSection({ children, className = "", id }: CardSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      setTimeout(() => {
        if (containerRef.current) {
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            pin: true,
            pinSpacing: false, // This keeps it pinned without pushing subsequent content down, creating the "card on card" overlap
            invalidateOnRefresh: true,
          });
        }
      }, 100);
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      id={id}
      className={`relative w-full z-20 border-t border-[var(--border-color)] rounded-t-[2.5rem] -mt-10 overflow-hidden shadow-2xl ${className}`}
    >
      {children}
    </div>
  );
}
