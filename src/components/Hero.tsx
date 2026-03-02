"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Linkedin, Github, MoveRight } from "lucide-react";
import Typewriter from "./Typewriter";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ preloaderComplete = true }: { preloaderComplete?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLDivElement>(null);
  const title2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!preloaderComplete) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Subtle Background Reveal
      tl.fromTo(
        gridRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2 }
      );

      // Massive Typography Reveal
      tl.fromTo(
        [title1Ref.current, title2Ref.current],
        { yPercent: 120, rotate: 2, filter: "blur(12px)", opacity: 0 },
        { yPercent: 0, rotate: 0, filter: "blur(0px)", opacity: 1, duration: 1.8, stagger: 0.15 },
        "-=1.5"
      );

      // Subtitle Reveal
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30, filter: "blur(5px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2 },
        "-=1.4"
      );

      // Buttons Reveal
      tl.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        "-=1"
      );

      // Premium Parallax Effect
      gsap.to(containerRef.current, {
        yPercent: 15, // Move slightly down to create depth when scrolling
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [preloaderComplete]);

  return (
    <section ref={containerRef} className="relative w-full min-h-[100svh] bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col justify-center pt-32 pb-12 sm:pb-20 px-6 md:px-12 overflow-hidden">
      
      {/* Plain Background Elements */}
      <div 
        ref={gridRef}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      </div>

      <div className="z-10 mt-auto w-full flex flex-col xl:flex-row xl:items-end justify-between gap-12 xl:gap-24 relative">
        
        <div className="w-full xl:w-2/3">
          <h1 className="text-[18vw] sm:text-[14vw] xl:text-[11vw] leading-[0.9] font-semibold tracking-tighter mb-8 text-[var(--text-primary)]">
            <div className="overflow-hidden pb-1 md:pb-2">
              <div ref={title1Ref} className="origin-bottom-left will-change-transform uppercase">
                AYUSH
              </div>
            </div>
            <div className="overflow-hidden pb-2 md:pb-6">
              <div ref={title2Ref} className="origin-bottom-left will-change-transform uppercase text-[var(--text-secondary)]">
                GUPTA
              </div>
            </div>
          </h1>
          
          <div ref={subtitleRef} className="max-w-2xl pl-3 border-l-2 md:border-l-4 border-[var(--text-primary)] text-left mb-8 xl:mb-0">
             <Typewriter 
               text="Software engineer and student, passionate about building robust applications, exploring machine learning, and creating seamless software experiences."
               delay={0.01}
               className="text-base sm:text-lg md:text-2xl lg:text-3xl font-light leading-snug text-[var(--text-primary)] text-left"
             />
          </div>
        </div>
        
        <div ref={buttonsRef} className="w-full xl:w-1/3 flex flex-col gap-4 max-w-sm">
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-8 px-8 py-5 border-[1.5px] border-[var(--border-color)] bg-[var(--bg-primary)]/50 backdrop-blur-md rounded-full hover:border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-500 font-mono uppercase tracking-widest text-sm md:text-base cursor-pointer">
            <span className="flex items-center gap-3"><FileText size={18} /> Resume</span>
            <MoveRight className="group-hover:translate-x-2 transition-transform duration-300" size={18} />
          </a>
          <div className="flex gap-4">
            <a href="https://linkedin.com/in/Ayush-kathil" target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center py-5 border-[1.5px] border-[var(--border-color)] bg-[var(--bg-primary)]/50 backdrop-blur-md rounded-full hover:border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-500">
              <Linkedin size={22} />
            </a>
            <a href="https://github.com/Ayush-kathil" target="_blank" rel="noreferrer" className="flex-1 flex justify-center items-center py-5 border-[1.5px] border-[var(--border-color)] bg-[var(--bg-primary)]/50 backdrop-blur-md rounded-full hover:border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-500">
              <Github size={22} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
