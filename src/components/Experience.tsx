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
      const mm = gsap.matchMedia();

      // DESKTOP ANIMATION (3D FLIP)
      mm.add("(min-width: 768px)", () => {
        gsap.set(cardsRef.current, { 
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          rotateX: 90, 
          opacity: 0,
          transformOrigin: "bottom center"
        });
        
        if (cardsRef.current[0]) {
          gsap.set(cardsRef.current[0], { rotateX: 0, opacity: 1 });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=300%", 
            pin: true,
            scrub: 1,
          }
        });

        cardsRef.current.forEach((card, i) => {
          if (i === 0) return;
          const prevCard = cardsRef.current[i - 1];

          if (prevCard) {
            tl.to(prevCard, {
              rotateX: -90,
              opacity: 0,
              transformOrigin: "top center",
              duration: 1,
              ease: "power2.inOut"
            }, "flip" + i);
          }

          tl.to(card, {
            rotateX: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.inOut"
          }, "flip" + i);
        });
      });

      // MOBILE ANIMATION (CLEAN VERTICAL FADE)
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          gsap.utils.toArray(".mobile-exp-card"),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <CardSection className="bg-[var(--bg-primary)] relative z-20 shadow-2xl border-t-[4px] border-t-[var(--text-primary)]" id="experience">
      <section ref={containerRef} className="w-full text-[var(--text-primary)] px-6 md:px-12 py-32 md:py-0 md:h-[100svh] flex flex-col md:items-center md:justify-center relative md:perspective-[2000px]">
        
        <div className="md:absolute md:top-24 md:top-32 w-full max-w-7xl md:text-center z-10 mb-16 md:mb-0">
          <h2 className="text-5xl sm:text-6xl md:text-[72px] font-medium tracking-tight md:tracking-[-4.32px] leading-none uppercase">
            <TextReveal>Experience</TextReveal>
          </h2>
        </div>
        
        {/* DESKTOP 3D EFFECT */}
        <div className="hidden md:block relative w-full max-w-4xl h-[400px] mt-24 [transform-style:preserve-3d]">
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

        {/* MOBILE STACK EFFECT */}
        <div className="flex flex-col gap-6 md:hidden w-full">
           {experiences.map((exp, i) => (
              <div 
                key={i}
                className="mobile-exp-card bg-[var(--bg-secondary)] border border-[var(--border-color)] p-8 rounded-2xl flex flex-col shadow-xl"
              >
                <p className="text-sm sm:text-base text-[var(--text-primary)] font-mono mb-6 uppercase tracking-widest border-b border-[var(--border-color)] pb-3">
                  {exp.organization}
                </p>
                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight mb-4 text-[var(--text-primary)]">
                  {exp.title}
                </h3>
                <p className="text-base sm:text-lg font-light leading-relaxed text-[var(--text-secondary)]">
                  {exp.description}
                </p>
              </div>
           ))}
        </div>
        
      </section>
    </CardSection>
  );
}
