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
      const mm = gsap.matchMedia();

      // Desktop: Horizontal Scroll Pin
      mm.add("(min-width: 768px)", () => {
        const panels = gsap.utils.toArray(".project-panel");

        if(panels.length > 0) {
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
        }
      });

      // Mobile: Simple Fade Elements
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(".mobile-project", 
          { y: 50, opacity: 0 },
          { 
            y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            }
          }
        );
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <CurvedSection className="bg-[var(--bg-secondary)] border-t-[4px] border-t-[var(--text-primary)]" id="projects">
      <BackgroundMarquee text="SELECTED WORK" />
      <section ref={containerRef} className="w-full text-[var(--text-primary)] overflow-hidden relative z-20 bg-transparent py-24 md:py-0 md:h-screen">
        
        <div className="md:absolute md:top-24 md:top-32 left-6 md:left-12 z-20 mb-12 md:mb-0 px-6 md:px-0">
          <h2 className="text-5xl sm:text-6xl md:text-[72px] font-medium tracking-tight md:tracking-[-4.32px] leading-none uppercase">
            <TextReveal>Featured Projects</TextReveal>
          </h2>
        </div>

        {/* DESKTOP HORIZONTAL SCROLL */}
        <div ref={sliderRef} className="hidden md:flex h-full w-max items-center pt-32 md:pt-48 pb-12">
          {projectsData.map((proj, i) => (
            <div key={i} className="project-panel w-screen h-full flex flex-col justify-center px-6 md:px-16 lg:px-32">
              <div className="max-w-5xl w-full min-h-[55vh] h-auto flex flex-col p-6 md:p-10 lg:p-12 border-t-[6px] border-t-[var(--text-primary)] border-x border-b border-[var(--border-color)] rounded-[2rem] md:rounded-[3rem] bg-[var(--bg-primary)]/40 backdrop-blur-xl hover:border-x-[var(--text-primary)] hover:border-b-[var(--text-primary)] hover:bg-[var(--bg-primary)]/60 transition-all duration-700 group relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem] md:rounded-[3rem]"></div>
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

        {/* MOBILE VERTICAL STACK */}
        <div className="flex flex-col gap-8 md:hidden px-6 w-full relative z-20">
          {projectsData.map((proj, i) => (
            <div key={`mob-${i}`} className="mobile-project w-full flex flex-col p-6 sm:p-8 border-t-[4px] border-t-[var(--text-primary)] border-x border-b border-[var(--border-color)] rounded-3xl bg-[var(--bg-primary)]/60 backdrop-blur-xl relative shadow-lg">
              <div className="text-[var(--text-secondary)] font-mono text-sm sm:text-base mb-4 tracking-widest">0{i + 1} / 0{projectsData.length}</div>
              <Link href={`/project/${proj.slug}`} className="group/title block mb-6">
                <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight uppercase leading-[1.1] text-[var(--text-primary)] mb-2 flex items-center justify-between gap-4">
                  {proj.title} <ArrowUpRight className="w-8 h-8 flex-shrink-0" />
                </h3>
              </Link>
              <p className="text-lg sm:text-xl font-light text-[var(--text-secondary)] mb-8 leading-relaxed">
                {proj.desc}
              </p>
              <div className="flex gap-2 flex-wrap mt-auto">
                {proj.tags.map((tag, tIndex) => (
                  <span key={tIndex} className="px-3 py-1.5 rounded-full border border-[var(--border-color)] text-[10px] sm:text-xs uppercase font-mono tracking-wider bg-transparent">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </CurvedSection>
  );
}
