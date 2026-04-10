"use client";

import { useRef, useEffect } from "react";
import { Mail, Phone } from "lucide-react";
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
    <section ref={sectionRef} id="contact" className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] px-6 md:px-12 py-32 overflow-hidden relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 justify-between">
        
        <div ref={leftColRef} className="lg:w-1/2">
          <h2 className="text-5xl sm:text-6xl md:text-[72px] font-medium tracking-tight md:tracking-[-4.32px] leading-[1.1] uppercase mb-6 md:mb-8">
            Get In Touch
          </h2>
          <p className="text-lg md:text-2xl font-light text-[var(--text-secondary)] mb-10 md:mb-12">
            I am currently looking for Summer 2027 internship opportunities in software engineering, ML infrastructure, or full-stack development.
          </p>
          
          <div className="space-y-6">
            <a href="mailto:kathilshiva@gmail.com" className="flex items-center gap-4 md:gap-6 text-lg sm:text-2xl md:text-3xl font-mono uppercase hover:text-[var(--accent)] transition-colors group">
              <Mail className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" /> kathilshiva@gmail.com
            </a>
            <a href="tel:7007226872" className="flex items-center gap-4 md:gap-6 text-lg sm:text-2xl md:text-3xl font-mono uppercase hover:text-[var(--accent)] transition-colors group">
              <Phone className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" /> 7007226872
            </a>
          </div>
        </div>

        <div ref={rightColRef} className="lg:w-1/2 mt-12 lg:mt-0 flex flex-col justify-center items-start lg:items-end w-full">
          <p className="text-[var(--text-secondary)] font-mono uppercase tracking-widest mb-4">Click to compose</p>
          <a 
            href="mailto:kathilshiva@gmail.com"
            className="text-[10vw] sm:text-[7vw] lg:text-[5vw] xl:text-7xl font-black uppercase tracking-tighter leading-none hover:text-[var(--accent)] transition-colors duration-500 lg:text-right break-all"
          >
            KATHILSHIVA
          </a>
          <a 
            href="mailto:kathilshiva@gmail.com"
            className="text-[8vw] sm:text-[6vw] lg:text-[4vw] xl:text-6xl font-black uppercase tracking-tighter leading-none hover:text-[var(--accent)] transition-colors duration-500 lg:text-right text-[var(--text-secondary)]"
          >
            @GMAIL.COM
          </a>
        </div>

      </div>
    </section>
  );
}
