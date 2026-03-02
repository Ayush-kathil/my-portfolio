"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardSection from "@/components/CardSection";

gsap.registerPlugin(ScrollTrigger);

import TextReveal from "@/components/TextReveal";
import Typewriter from "@/components/Typewriter";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Premium Scale-on-Scroll (Zoom Reveal) for Skills
      gsap.fromTo(
        gsap.utils.toArray(".skill-category"),
        { scale: 0.8, y: 50, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <CardSection className="bg-[var(--bg-secondary)] relative z-20 shadow-2xl border-t-[4px] border-t-[var(--text-primary)]" id="about">
      <section ref={sectionRef} className="w-full min-h-screen text-[var(--text-primary)] px-6 md:px-12 py-32 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-[50px] md:text-[72px] font-medium tracking-[-2px] md:tracking-[-4.32px] leading-none uppercase mb-12 border-b border-[var(--border-color)] pb-8 text-left">
            <TextReveal>About</TextReveal>
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-16 justify-between">
            <div className="lg:w-1/2 min-h-[300px]">
              <Typewriter 
                text="I am a software engineer and student currently pursuing my B.Tech in CSE at VIT Bhopal. I am passionate about building practical applications, writing clean code, and solving real-world problems. I enjoy the process of turning complex ideas into simple, intuitive, and reliable software."
                className="text-xl md:text-3xl font-light leading-relaxed text-[var(--text-secondary)] text-left"
                delay={0.01}
              />
            </div>
            
            <div ref={skillsRef} className="space-y-12">
              
              <div className="skill-category">
                <h3 className="text-xl text-[var(--text-secondary)] uppercase font-mono mb-4 tracking-wider text-left">Languages</h3>
                <p className="text-xl md:text-2xl font-medium leading-relaxed text-left">Python, C++, Java, JavaScript, SQL</p>
              </div>
              
              <div className="skill-category">
                <h3 className="text-xl text-[var(--text-secondary)] uppercase font-mono mb-4 tracking-wider text-left">AI/ML & Data Science</h3>
                <p className="text-xl md:text-2xl font-medium leading-relaxed text-[var(--text-secondary)] text-left">Machine Learning, Deep Learning, NLP, Computer Vision, Model Optimization, Pandas, NumPy, Scikit-learn, OpenCV, MediaPipe</p>
              </div>
              
              <div className="skill-category">
                <h3 className="text-xl text-[var(--text-secondary)] uppercase font-mono mb-4 tracking-wider text-left">Core CS</h3>
                <p className="text-xl md:text-2xl font-medium leading-relaxed text-[var(--text-secondary)] text-left">Data Structures & Algorithms, Object-Oriented Programming, DBMS, Operating Systems</p>
              </div>

              <div className="skill-category">
                <h3 className="text-xl text-[var(--text-secondary)] uppercase font-mono mb-4 tracking-wider text-left">Tools & Web</h3>
                <p className="text-xl md:text-2xl font-medium leading-relaxed text-[var(--text-secondary)] text-left">Git, GitHub, Linux, Netlify, Vercel</p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </CardSection>
  );
}
