"use client";

import { useRef, useEffect } from "react";
import { Mail, Phone, Calendar, ArrowUpRight, Linkedin, Github, FileText } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slide-and-Fade Classical Transition for Text
      if (leftColRef.current) {
        gsap.fromTo(leftColRef.current.children, 
          { x: -24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power2.out", scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          }}
        );
      }
      
      // Slide-and-Fade Classical Transition for CTA
      if (rightColRef.current) {
        gsap.fromTo(rightColRef.current.children, 
          { x: 24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power2.out", scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          }}
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] px-4 sm:px-6 md:px-12 py-20 sm:py-24 md:py-32 overflow-hidden relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 sm:gap-12 lg:gap-16 justify-between">
        
        <div ref={leftColRef} className="lg:w-1/2">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--text-secondary)] mb-4">Availability</p>
          <h2 className="text-[clamp(2.8rem,11vw,4.8rem)] md:text-[72px] font-medium tracking-tight md:tracking-[-4.32px] leading-[1.02] uppercase mb-5 md:mb-7">
            Get In Touch
          </h2>
          <p className="text-[clamp(1rem,4.2vw,1.3rem)] md:text-2xl font-light text-[var(--text-secondary)] mb-8 md:mb-10 max-w-2xl leading-relaxed">
            I am currently looking for Summer 2027 internship opportunities in software engineering, ML infrastructure, or full-stack development.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 md:mb-10 max-w-3xl">
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)] mb-1">Target roles</p>
              <p className="text-sm font-medium">SWE / ML Infra / Full Stack</p>
            </div>
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)] mb-1">What I optimize</p>
              <p className="text-sm font-medium">Performance + UX</p>
            </div>
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)] mb-1">Available</p>
              <p className="text-sm font-medium">Summer 2027</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-8 md:mb-10">
            <a href="mailto:kathilshiva@gmail.com" className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] px-4 py-2 text-sm font-medium hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors">
              <Mail className="w-4 h-4" /> Email me
            </a>
            <a href="https://linkedin.com/in/Ayush-kathil" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] px-4 py-2 text-sm font-medium hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href="https://github.com/Ayush-kathil" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] px-4 py-2 text-sm font-medium hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>

          <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5 sm:p-6 max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[var(--text-secondary)] mb-3">
              <Calendar className="w-4 h-4" /> Preferred first message
            </div>
            <p className="text-[clamp(0.98rem,4vw,1.08rem)] text-[var(--text-primary)] leading-relaxed">
              If you are hiring for a role with frontend ownership, product thinking, or ML-adjacent engineering, send the team context and the problem you need solved. I will respond with a concrete fit assessment.
            </p>
          </div>
        </div>

        <div ref={rightColRef} className="lg:w-1/2 mt-4 lg:mt-0 flex flex-col justify-center items-start lg:items-end w-full">
          <p className="text-[var(--text-secondary)] font-mono uppercase tracking-widest mb-4">Click to compose</p>
          <a 
            href="mailto:kathilshiva@gmail.com"
            className="text-[clamp(2.2rem,10vw,5.8rem)] xl:text-7xl font-black uppercase tracking-tighter leading-none hover:text-[var(--accent)] transition-colors duration-500 lg:text-right break-all"
          >
            KATHILSHIVA
          </a>
          <a 
            href="mailto:kathilshiva@gmail.com"
            className="text-[clamp(1.8rem,7vw,4.6rem)] xl:text-6xl font-black uppercase tracking-tighter leading-none hover:text-[var(--accent)] transition-colors duration-500 lg:text-right text-[var(--text-secondary)]"
          >
            @GMAIL.COM
          </a>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:max-w-xl">
            <a href="tel:7007226872" className="inline-flex items-center justify-between rounded-2xl border border-[var(--border-color)] px-5 py-4 bg-[var(--bg-secondary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors">
              <span className="inline-flex items-center gap-2 text-sm font-medium"><Phone className="w-4 h-4" /> Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center justify-between rounded-2xl border border-[var(--border-color)] px-5 py-4 bg-[var(--bg-secondary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors">
              <span className="inline-flex items-center gap-2 text-sm font-medium"><FileText className="w-4 h-4" /> Resume</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
