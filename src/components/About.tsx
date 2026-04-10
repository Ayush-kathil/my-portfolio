"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

import TextReveal from "@/components/TextReveal";

const strengths = [
  {
    title: "Computer Vision",
    body: "Built real-time pose detection with MediaPipe + OpenCV and tuned it to run smoothly on CPU-only laptops.",
  },
  {
    title: "ML Engineering",
    body: "Worked on imbalanced fraud datasets and focused on practical thresholds, not just headline accuracy.",
  },
  {
    title: "Privacy-First Web",
    body: "Shipped browser-side PDF tooling where files never leave the device, so users keep full control of data.",
  },
  {
    title: "Product Mindset",
    body: "I like fast iterations, clear UX, and shipping small improvements consistently instead of chasing flashy complexity.",
  },
];

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
      <section ref={sectionRef} className="w-full min-h-screen text-[var(--text-primary)] px-4 sm:px-6 md:px-12 py-20 sm:py-24 md:py-32 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-[clamp(2.4rem,10vw,4.5rem)] font-medium tracking-[-1.5px] md:tracking-[-4.32px] leading-none uppercase mb-8 sm:mb-12 border-b border-[var(--border-color)] pb-6 sm:pb-8 text-left">
            <TextReveal>About</TextReveal>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start">
            <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-5 sm:p-7 md:p-10 shadow-sm h-full">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-4">Quick intro</p>
              <p className="text-[clamp(1.05rem,4.6vw,1.5rem)] font-light leading-relaxed text-[var(--text-primary)] mb-5 sm:mb-6">
                I am Ayush, an AI/ML undergrad at VIT Bhopal who enjoys building products that are practical and fast. I care most about solving real problems, writing clean code, and shipping features people can actually use.
              </p>
              <p className="text-[clamp(0.98rem,4.1vw,1.125rem)] leading-relaxed text-[var(--text-secondary)]">
                Most of my work sits at the intersection of product and systems: client-side privacy-first tools, lightweight ML inference, and web interfaces that stay responsive even on average hardware.
              </p>

              <div className="mt-6 sm:mt-8 grid grid-cols-1 min-[420px]:grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-2xl border border-[var(--border-color)] p-4">
                  <p className="text-xs uppercase tracking-widest text-[var(--text-secondary)]">Graduation</p>
                  <p className="text-lg font-medium mt-1">2028</p>
                </div>
                <div className="rounded-2xl border border-[var(--border-color)] p-4">
                  <p className="text-xs uppercase tracking-widest text-[var(--text-secondary)]">Focus</p>
                  <p className="text-lg font-medium mt-1">AI + Systems</p>
                </div>
              </div>
            </div>
            
            <div ref={skillsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
              {strengths.map((item) => (
                <article key={item.title} className="skill-category rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-4 sm:p-5 md:p-6 min-h-[170px] sm:min-h-[190px] flex flex-col">
                  <span className="inline-flex w-fit rounded-full border border-[var(--border-color)] px-3 py-1 text-[11px] uppercase tracking-widest text-[var(--text-secondary)] mb-4">
                    {item.title}
                  </span>
                  <p className="text-[17px] md:text-lg font-medium leading-relaxed text-left text-[var(--text-primary)]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
