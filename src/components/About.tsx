"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

import TextReveal from "@/components/TextReveal";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gsap.utils.toArray(".skill-category"),
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      id="about"
      className="relative w-full z-20 border-t border-[var(--border-color)] rounded-t-[3rem] -mt-8 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_40px_-15px_rgba(255,255,255,0.05)] bg-[var(--bg-secondary)]"
    >
      <section ref={sectionRef} className="w-full min-h-screen text-[var(--text-primary)] px-6 md:px-12 py-28 md:py-32 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-[50px] md:text-[72px] font-medium tracking-[-2px] md:tracking-[-4.32px] leading-none uppercase mb-12 border-b border-[var(--border-color)] pb-8 text-left">
            <TextReveal>About</TextReveal>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-7 md:p-10 shadow-sm h-full">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-4">Quick intro</p>
              <p className="text-lg md:text-2xl font-light leading-relaxed text-[var(--text-primary)] mb-6">
                I am Ayush, an AI/ML undergrad at VIT Bhopal who enjoys building products that are practical and fast. I care most about solving real problems, writing clean code, and shipping features people can actually use.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-[var(--text-secondary)]">
                Most of my work sits at the intersection of product and systems: client-side privacy-first tools, lightweight ML inference, and web interfaces that stay responsive even on average hardware.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-[var(--border-color)] p-4">
                  <p className="text-xs uppercase tracking-widest text-[var(--text-secondary)]">Graduation</p>
                  <p className="text-lg font-medium mt-1">2027</p>
                </div>
                <div className="rounded-2xl border border-[var(--border-color)] p-4">
                  <p className="text-xs uppercase tracking-widest text-[var(--text-secondary)]">Focus</p>
                  <p className="text-lg font-medium mt-1">AI + Systems</p>
                </div>
              </div>
            </div>
            
            <div ref={skillsRef} className="grid grid-cols-1 gap-4 md:gap-5">
              <div className="skill-category rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-5 md:p-6">
                <h3 className="text-sm text-[var(--text-secondary)] uppercase font-mono mb-2 tracking-wider text-left">Computer Vision</h3>
                <p className="text-base md:text-lg font-medium leading-relaxed text-left">Built real-time pose detection with MediaPipe + OpenCV and tuned it to run smoothly on CPU-only laptops.</p>
              </div>
              
              <div className="skill-category rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-5 md:p-6">
                <h3 className="text-sm text-[var(--text-secondary)] uppercase font-mono mb-2 tracking-wider text-left">ML Engineering</h3>
                <p className="text-base md:text-lg font-medium leading-relaxed text-left">Worked on imbalanced fraud datasets and focused on practical thresholds, not just headline accuracy.</p>
              </div>

              <div className="skill-category rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-5 md:p-6">
                <h3 className="text-sm text-[var(--text-secondary)] uppercase font-mono mb-2 tracking-wider text-left">Privacy-First Web</h3>
                <p className="text-base md:text-lg font-medium leading-relaxed text-left">Shipped browser-side PDF tooling where files never leave the device, so users keep full control of data.</p>
              </div>

              <div className="skill-category rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-5 md:p-6">
                <h3 className="text-sm text-[var(--text-secondary)] uppercase font-mono mb-2 tracking-wider text-left">Product Mindset</h3>
                <p className="text-base md:text-lg font-medium leading-relaxed text-left">I like fast iterations, clear UX, and shipping small improvements consistently instead of chasing flashy complexity.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
