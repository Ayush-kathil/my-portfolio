"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { label: "INFERENCE FPS ON CPU", value: 30, suffix: "+" },
  { label: "DATASET TRANSACTIONS", value: 284807, suffix: "" },
  { label: "CLIENT DATA UPLOADED", value: 0, suffix: " bytes" },
  { label: "PROJECTS DEPLOYED LIVE", value: 2, suffix: "" },
];

export default function ImpactMetrics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      numberRefs.current.forEach((el, index) => {
        if (!el) return;
        const targetValue = metrics[index].value;
        
        gsap.to(el, {
          innerText: targetValue,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          snap: { innerText: 1 },
          onUpdate: function () {
            el.innerHTML = Math.ceil(Number(this.targets()[0].innerText)).toLocaleString();
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] px-6 md:px-12 pb-32 pt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-16">
        
        <div className="w-full md:w-1/3">
          <h2 className="text-[50px] md:text-[72px] font-medium tracking-[-2px] md:tracking-[-4.32px] leading-none uppercase mb-4">
            By The Numbers
          </h2>
          <p className="text-[var(--text-secondary)] font-mono text-sm md:text-base leading-relaxed">
            These are real outcomes from projects I have built, tested, and shipped.
          </p>
        </div>

        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16 mt-12 md:mt-0">
          {metrics.map((metric, i) => (
            <div key={i} className="flex flex-col border-l-2 border-[var(--border-color)] pl-4 md:pl-6 cursor-default group hover:border-[var(--text-primary)] transition-colors duration-500">
              <div className="text-4xl sm:text-5xl md:text-[72px] font-medium tracking-tight md:tracking-[-4.32px] leading-none mb-2 md:mb-4 group-hover:text-[var(--text-secondary)] transition-colors">
                <span ref={(el) => { numberRefs.current[i] = el; }}>0</span>
                <span>{metric.suffix}</span>
              </div>
              <span className="text-[var(--text-secondary)] font-mono uppercase tracking-widest text-xs md:text-sm">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
