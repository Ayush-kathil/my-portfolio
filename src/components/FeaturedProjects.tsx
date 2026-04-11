"use client";

import { ArrowUpRight } from "lucide-react";
import { projectsData } from "@/data/projects";
import Link from "next/link";
import CurvedSection from "@/components/CurvedSection";

export default function FeaturedProjects() {
  return (
    <CurvedSection className="bg-[var(--bg-secondary)] border-t-[4px] border-t-[var(--text-primary)]" id="projects">
      <section className="w-full text-[var(--text-primary)] relative z-20 bg-transparent py-20 sm:py-24 md:py-28 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-10 sm:mb-12 md:mb-16">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--text-secondary)] mb-3">Selected case studies</p>
            <h2 className="text-[clamp(2.3rem,9vw,4.8rem)] font-medium tracking-[-0.05em] leading-[0.95] uppercase">
              Projects that show engineering judgment, not just polish.
            </h2>
            <p className="mt-4 text-[clamp(1rem,2.5vw,1.2rem)] text-[var(--text-secondary)] leading-relaxed">
              Each project is structured for quick scanning: problem context, implementation approach, and measurable impact.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
            {projectsData.map((proj, index) => (
              <article
                key={proj.slug}
                className="group rounded-[2rem] border border-[var(--border-color)] bg-[var(--bg-primary)] p-5 sm:p-6 md:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--text-secondary)] mb-2">
                      0{index + 1}
                    </p>
                    <h3 className="text-[clamp(1.7rem,5vw,2.7rem)] font-semibold tracking-[-0.05em] leading-[1.02]">
                      {proj.title}
                    </h3>
                  </div>
                  <Link
                    href={`/project/${proj.slug}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-color)] transition-colors hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)]"
                    aria-label={`Open case study for ${proj.title}`}
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </Link>
                </div>

                <p className="max-w-2xl text-[clamp(0.98rem,2.7vw,1.1rem)] leading-relaxed text-[var(--text-secondary)]">
                  {proj.summary}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)] mb-2">Problem</p>
                    <p className="text-sm leading-relaxed text-[var(--text-primary)]">{proj.caseStudy.problem}</p>
                  </div>
                  <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)] mb-2">Solution</p>
                    <p className="text-sm leading-relaxed text-[var(--text-primary)]">{proj.caseStudy.solution}</p>
                  </div>
                  <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)] mb-2">Impact</p>
                    <p className="text-sm leading-relaxed text-[var(--text-primary)]">{proj.caseStudy.impact}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-[var(--border-color)] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/project/${proj.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--text-primary)] px-4 py-2.5 text-sm font-medium text-[var(--bg-primary)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)]"
                  >
                    Read case study <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  {proj.liveUrl !== "#" && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)]"
                    >
                      Live preview <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </CurvedSection>
  );
}
