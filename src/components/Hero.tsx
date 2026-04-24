"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

export default function Hero({ preloaderComplete = true }: { preloaderComplete?: boolean }) {
  return (
    <section
      aria-busy={!preloaderComplete}
      className="relative w-full min-h-[100svh] bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-12 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_72%_55%_at_50%_45%,#000_60%,transparent_100%)]" />
        <div className="absolute -top-28 right-0 h-72 w-72 rounded-full bg-[var(--text-primary)]/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[var(--text-primary)]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <div className="mx-auto rounded-3xl border border-[var(--border-color)] bg-[var(--bg-primary)]/85 p-6 sm:p-8 md:p-10 backdrop-blur-sm">
          <h1 className="mx-auto max-w-4xl text-balance text-[clamp(2rem,6vw,4.1rem)] font-semibold tracking-[-0.045em] leading-[1.05]">
            Machine Learning Student & Software Engineer
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(1.02rem,2.8vw,1.45rem)] font-medium leading-[1.5] text-[var(--text-secondary)]">
            Building fast, scalable, and privacy-focused web applications
          </p>

          <p className="mx-auto mt-3 max-w-3xl text-balance text-[clamp(0.92rem,2.2vw,1.05rem)] leading-[1.6] text-[var(--text-secondary)]">
            Bachelor of Technology (AIML) @ VIT Bhopal | Seeking Summer 2026 Internships
          </p>

          <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--text-primary)] px-6 py-3.5 text-sm font-medium text-[var(--bg-primary)] transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)]"
            >
              View Projects <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] px-6 py-3.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)]"
            >
              Download Resume <Download className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}