"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award } from "lucide-react";
import TextReveal from "@/components/TextReveal";
import CurvedSection from "@/components/CurvedSection";

gsap.registerPlugin(ScrollTrigger);

const certs = [
  {
    name: "Applied Machine Learning in Python",
    issuer: "University of Michigan (Coursera)"
  },
  {
    name: "Google Cloud Skills Boost: Introduction to Generative AI",
    issuer: "Google Cloud"
  }
];

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-in-Up Staggered Reveal Premium Transition
      gsap.fromTo(
        gsap.utils.toArray(".cert-item"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <CurvedSection className="bg-[var(--bg-secondary)] border-t-[4px] border-t-[var(--text-primary)] z-30" id="certifications">
      <section ref={containerRef} className="w-full text-[var(--text-primary)] px-6 md:px-12 py-32 relative">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between mb-16 border-b border-[var(--border-color)] pb-8">
            <h2 className="text-[50px] md:text-[72px] font-medium tracking-[-2px] md:tracking-[-4.32px] leading-none uppercase flex items-center gap-6">
              <Award className="w-12 h-12 md:w-20 md:h-20" /> <TextReveal>Certifications</TextReveal>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certs.map((cert, i) => (
              <div key={i} className="cert-item p-12 border border-[var(--border-color)] border-t-[4px] border-t-[var(--text-primary)] rounded-3xl bg-[var(--bg-primary)] hover:border-[var(--border-color)] hover:shadow-2xl hover:shadow-[var(--text-primary)]/5 transition-all duration-500 cursor-default group overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[var(--text-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="relative z-10 text-2xl md:text-3xl font-medium tracking-tight mb-4 group-hover:pl-2 transition-all duration-300">{cert.name}</h3>
                <p className="relative z-10 text-lg font-mono text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </CurvedSection>
  );
}
