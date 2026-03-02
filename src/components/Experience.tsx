"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/TextReveal";
import CardSection from "@/components/CardSection";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Selected Contributor",
    organization: "DSC Winter of Code",
    description: "Contributed to open-source development projects.",
  },
  {
    title: "Core Member",
    organization: "MATRIX Club, VIT Bhopal",
    description: "Mentoring junior students in Python and Data Structures & Algorithms.",
  },
  {
    title: "Technical Team",
    organization: "TechnoMech Club, VIT",
    description: "Spearheading scalable technical projects.",
  },
  {
    title: "Active Problem Solver",
    organization: "Codeforces",
    description: "Regularly participating in competitive programming contests.",
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure all cards start stacked and invisible, except the first one
      gsap.set(cardsRef.current, { 
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        rotateX: 90, 
        opacity: 0,
        transformOrigin: "bottom center"
      });
      
      // Initialize the first card to be visible and flat
      if (cardsRef.current[0]) {
        gsap.set(cardsRef.current[0], { rotateX: 0, opacity: 1 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%", // Give plenty of scroll distance for the animations
          pin: true,
          scrub: 1,
        }
      });

      // Animate through each card sequentially
      cardsRef.current.forEach((card, i) => {
        if (i === 0) return; // Skip animating IN the first card, it's already there

        const prevCard = cardsRef.current[i - 1];

        // Animate the previous card flipping OUT (upwards)
        if (prevCard) {
          tl.to(prevCard, {
            rotateX: -90,
            opacity: 0,
            transformOrigin: "top center",
            duration: 1,
            ease: "power2.inOut"
          }, "flip" + i);
        }

        // Animate the current card flipping IN (from bottom)
        tl.to(card, {
          rotateX: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.inOut"
        }, "flip" + i);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <CardSection className="bg-[var(--bg-primary)] relative z-20 shadow-2xl border-t-[4px] border-t-[var(--text-primary)]" id="experience">
      <section ref={containerRef} className="w-full h-[100svh] text-[var(--text-primary)] px-6 md:px-12 flex flex-col items-center justify-center relative perspective-[2000px]">
        
        <div className="absolute top-24 md:top-32 w-full max-w-7xl px-6 md:px-12 text-center z-10">
          <h2 className="text-[50px] md:text-[72px] font-medium tracking-[-2px] md:tracking-[-4.32px] leading-none uppercase">
            <TextReveal>Experience</TextReveal>
          </h2>
        </div>
        
        <div className="relative w-full max-w-4xl h-[400px] mt-24 [transform-style:preserve-3d]">
          {experiences.map((exp, i) => (
            <div 
              key={i} 
              ref={(el) => { cardsRef.current[i] = el; }}
              className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-12 md:p-16 rounded-2xl flex flex-col items-center justify-center shadow-2xl backface-hidden"
            >
              <p className="text-xl text-[var(--text-primary)] font-mono mb-8 uppercase tracking-widest border-b border-[var(--border-color)] pb-4 text-center w-full max-w-lg">
                {exp.organization}
              </p>
              <h3 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-center">
                {exp.title}
              </h3>
              <p className="text-lg md:text-xl font-light leading-relaxed text-[var(--text-secondary)] text-center max-w-2xl">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
        
      </section>
    </CardSection>
  );
}
