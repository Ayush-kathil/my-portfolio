"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/TextReveal";
import CardSection from "@/components/CardSection";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Open Source Contributor",
    organization: "DSC Winter of Code 2026",
    description:
      "Contributed bug fixes and feature improvements across Python and JavaScript repositories, collaborated with maintainers through review cycles, and improved issue turnaround reliability.",
  },
  {
    title: "Technical Lead",
    organization: "MATRIX Club, VIT Bhopal",
    description:
      "Led a 6-member team and designed hands-on Python data-structure sessions for juniors, translating complex topics into practical implementation workflows.",
  },
  {
    title: "Technical Team Member",
    organization: "TechnoMech Club, VIT Bhopal",
    description:
      "Built internal event tooling and supported frontend delivery, deployment setup, and post-launch fixes to keep execution stable under deadlines.",
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // UNIFIED ANIMATION (CLEAN SLIDE IN FADE)
      gsap.fromTo(
        gsap.utils.toArray(".exp-card"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <CardSection className="bg-[var(--bg-primary)] relative z-20 shadow-2xl border-t-[4px] border-t-[var(--text-primary)]" id="experience">
      <section ref={containerRef} className="w-full text-[var(--text-primary)] px-6 md:px-12 py-32 flex flex-col items-center justify-center relative">
        
        <div className="w-full max-w-7xl md:text-center z-10 mb-24">
          <h2 className="text-5xl sm:text-6xl md:text-[72px] font-medium tracking-tight md:tracking-[-4.32px] leading-none uppercase">
            <TextReveal>Experience</TextReveal>
          </h2>
          <p className="mt-4 mx-auto max-w-3xl text-[clamp(1rem,2.6vw,1.25rem)] text-[var(--text-secondary)] leading-relaxed">
            Roles that demonstrate leadership, collaboration, and execution quality beyond coursework.
          </p>
        </div>
        
        {/* PREMIUM STACK EFFECT */}
        <div className="w-full max-w-4xl flex flex-col gap-8 md:gap-12 relative z-10">
          {experiences.map((exp, i) => (
            <div 
              key={i} 
              className="exp-card bg-[var(--bg-secondary)]/60 backdrop-blur-xl border border-[var(--border-color)] p-8 md:p-12 lg:p-16 rounded-3xl flex flex-col md:flex-row md:items-center py-12 md:justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-[var(--accent)] group"
            >
              <div className="md:w-1/3 mb-6 md:mb-0">
                <p className="text-sm md:text-base text-[var(--accent)] font-medium uppercase tracking-wide border-l-2 border-[var(--accent)] pl-4 group-hover:pl-6 transition-all duration-300">
                  {exp.organization}
                </p>
              </div>
              <div className="md:w-2/3 md:pl-12 md:border-l border-[var(--border-color)] group-hover:border-[var(--accent)] transition-colors duration-300">
                <h3 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 group-hover:text-[var(--accent)] transition-colors duration-300">
                  {exp.title}
                </h3>
                <p className="text-lg md:text-xl font-light leading-relaxed text-[var(--text-secondary)]">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>


        
      </section>
    </CardSection>
  );
}
