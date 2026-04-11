"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Sparkles, TrendingUp, Users } from "lucide-react";
import TextReveal from "@/components/TextReveal";

gsap.registerPlugin(ScrollTrigger);

const snapshotItems = [
  {
    icon: TrendingUp,
    title: "Current Focus",
    body: "Seeking Summer 2026 internships in software engineering, ML systems, and product-focused full-stack roles.",
  },
  {
    icon: Sparkles,
    title: "How I Work",
    body: "I optimize for speed, clarity, and maintainability. I like small iterations, measurable outcomes, and clean handoff paths.",
  },
  {
    icon: ShieldCheck,
    title: "Engineering Bias",
    body: "Privacy-first defaults, responsive UIs, and CPU-friendly execution matter more to me than flashy complexity.",
  },
  {
    icon: Users,
    title: "Proof Signals",
    body: "5+ deployed projects, open-source contributions, technical leadership experience, and real-time ML work on standard hardware.",
  },
];

export default function ProfessionalSnapshot() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gsap.utils.toArray(".snapshot-card"),
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="snapshot"
      className="w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] px-4 sm:px-6 md:px-12 py-20 sm:py-24 md:py-28 border-t border-[var(--border-color)] relative z-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6 mb-10 sm:mb-12 md:mb-16">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--text-secondary)] mb-3">
              Recruiter Snapshot
            </p>
            <h2 className="text-[clamp(2.3rem,8vw,4.6rem)] font-medium tracking-[-0.04em] leading-[0.95] uppercase">
              <TextReveal>Professional Snapshot</TextReveal>
            </h2>
          </div>
          <p className="max-w-xl text-[clamp(0.98rem,4vw,1.2rem)] leading-relaxed text-[var(--text-secondary)]">
            Quick recruiter view: what I build, how I execute, and why my project signal is ready for production teams.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          {snapshotItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="snapshot-card rounded-3xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded-2xl border border-[var(--border-color)] p-3 bg-[var(--bg-secondary)]">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-secondary)] mb-2">
                      {item.title}
                    </p>
                    <p className="text-[clamp(1rem,4.2vw,1.18rem)] leading-relaxed text-[var(--text-primary)]">
                      {item.body}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-4 sm:mt-5 md:mt-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-5 sm:px-6 md:px-8 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            Strongest fit: teams that need engineers who can ship reliable interfaces and translate ML ideas into usable products.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-[var(--border-color)] px-4 py-2 text-sm font-medium hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors"
          >
            Open contact
          </a>
        </div>
      </div>
    </section>
  );
}