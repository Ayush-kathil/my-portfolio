"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { projectsData } from "@/data/projects";
import Link from "next/link";
import CurvedSection from "@/components/CurvedSection";
import TextReveal from "@/components/TextReveal";
import BackgroundMarquee from "@/components/BackgroundMarquee";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".project-panel");

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${panels.length * 100}%`,
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <CurvedSection className="bg-[var(--bg-secondary)] border-t-[4px] border-t-[var(--text-primary)]" id="projects">
      <BackgroundMarquee text="SELECTED WORK" />
      <section ref={containerRef} className="w-full h-screen text-[var(--text-primary)] overflow-hidden relative z-20 bg-transparent">
        
        <div className="absolute top-24 md:top-32 left-6 md:left-12 z-20">
          <h2 className="text-[50px] md:text-[72px] font-medium tracking-[-2px] md:tracking-[-4.32px] leading-none uppercase">
            <TextReveal>Featured Projects</TextReveal>
          </h2>
        </div>

        <div ref={sliderRef} className="flex h-full w-max items-center pt-32 md:pt-48 pb-12">
          {projectsData.map((proj, i) => (
            <div key={i} className="project-panel w-screen h-full flex flex-col justify-center px-6 md:px-16 lg:px-32">
              <div className="max-w-5xl w-full h-[65vh] flex flex-col p-8 md:p-12 lg:p-16 border-t-[6px] border-t-[var(--text-primary)] border-x border-b border-[var(--border-color)] rounded-[2rem] md:rounded-[3rem] bg-[var(--bg-primary)]/40 backdrop-blur-xl hover:border-x-[var(--text-primary)] hover:border-b-[var(--text-primary)] hover:bg-[var(--bg-primary)]/60 transition-all duration-700 group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                <div className="relative z-10 w-full h-full flex flex-col">
                  <div className="text-[var(--text-secondary)] font-mono text-xl md:text-2xl mb-6 md:mb-12">0{i + 1} / 0{projectsData.length}</div>
                  <Link href={`/project/${proj.slug}`} className="inline-block group/title">
                    <h3 className="text-[40px] md:text-[64px] font-semibold tracking-tighter leading-none uppercase mb-6 md:mb-10 text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors cursor-pointer flex items-center gap-4 md:gap-8">
                      {proj.title} <ArrowUpRight className="w-10 h-10 md:w-16 md:h-16 flex-shrink-0 group-hover/title:rotate-45 group-hover/title:scale-110 transition-transform duration-500 ease-out" />
                    </h3>
                  </Link>
                  <p className="text-xl md:text-3xl font-light text-[var(--text-secondary)] mb-10 max-w-4xl leading-relaxed flex-grow">
                    {proj.desc}
                  </p>
                  <div className="flex gap-3 md:gap-4 flex-wrap">
                    {proj.tags.map((tag, tIndex) => (
                      <span key={tIndex} className="px-5 py-2.5 rounded-full border border-[var(--border-color)] text-xs md:text-sm uppercase font-mono tracking-wider bg-[var(--bg-primary)]/50 group-hover:bg-transparent transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </CurvedSection>
  );
}
