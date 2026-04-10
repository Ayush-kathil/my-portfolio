"use client";

import Link from "next/link";
import Image from "next/image";
import * as motion from "framer-motion/client";
import { ArrowUpRight, FileText, Github, Sparkles, ShieldCheck, Cpu } from "lucide-react";
import { projectsData } from "@/data/projects";

interface MobileGatewayProps {
  preloaderComplete?: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function MobileGateway({ preloaderComplete = true }: MobileGatewayProps) {
  return (
    <div className="w-full min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 -right-20 w-72 h-72 rounded-full bg-[var(--text-primary)]/5 blur-3xl" />
        <div className="absolute top-[35%] -left-16 w-56 h-56 rounded-full bg-[var(--text-primary)]/5 blur-3xl" />
      </div>

      <motion.main
        initial="hidden"
        animate={preloaderComplete ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.05,
            },
          },
        }}
        className="relative z-10 px-4 pt-24 pb-32"
      >
        <motion.section id="gateway" variants={cardVariants} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/70 backdrop-blur-xl p-6 shadow-xl scroll-mt-24">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--text-secondary)] mb-4">Professional Gateway</p>
          <h1 className="text-[clamp(2rem,10vw,3.2rem)] font-semibold leading-[0.95] tracking-tight uppercase mb-4">
            Ayush Gupta
          </h1>
          <p className="text-[clamp(1rem,4.6vw,1.2rem)] leading-relaxed text-[var(--text-secondary)]">
            I build AI products end-to-end, from model logic to polished web experiences, with a bias for ownership, speed, and measurable outcomes.
          </p>

          <div className="grid grid-cols-3 gap-2 mt-6">
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-3 text-center">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">Role</p>
              <p className="text-sm font-medium mt-1">AI + Web</p>
            </div>
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-3 text-center">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">Focus</p>
              <p className="text-sm font-medium mt-1">Impact</p>
            </div>
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-3 text-center">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">Grad</p>
              <p className="text-sm font-medium mt-1">2028</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-between rounded-full border border-[var(--border-color)] px-5 py-3.5 bg-[var(--bg-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors"
            >
              <span className="inline-flex items-center gap-2 text-sm font-medium"><FileText size={16} /> Resume</span>
              <ArrowUpRight size={16} />
            </a>
            <a
              href="https://github.com/Ayush-kathil"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-between rounded-full border border-[var(--border-color)] px-5 py-3.5 bg-[var(--bg-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors"
            >
              <span className="inline-flex items-center gap-2 text-sm font-medium"><Github size={16} /> GitHub</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.section>

        <motion.section variants={cardVariants} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="mt-5 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/70 backdrop-blur-xl p-5">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--text-secondary)] mb-4">How I Build</p>
          <div className="space-y-3">
            <div className="rounded-2xl border border-[var(--border-color)] p-4 bg-[var(--bg-primary)]">
              <p className="inline-flex items-center gap-2 text-sm font-semibold mb-1"><Sparkles size={14} /> Product Thinking</p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Ship fast, learn from users, and iterate with clear metrics.</p>
            </div>
            <div className="rounded-2xl border border-[var(--border-color)] p-4 bg-[var(--bg-primary)]">
              <p className="inline-flex items-center gap-2 text-sm font-semibold mb-1"><Cpu size={14} /> Engineering Quality</p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Prioritize performance, reliability, and maintainable architecture.</p>
            </div>
            <div className="rounded-2xl border border-[var(--border-color)] p-4 bg-[var(--bg-primary)]">
              <p className="inline-flex items-center gap-2 text-sm font-semibold mb-1"><ShieldCheck size={14} /> Trust by Design</p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Default to secure and privacy-conscious implementation choices.</p>
            </div>
          </div>
        </motion.section>

        <motion.section id="projects" variants={cardVariants} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="mt-5 scroll-mt-24">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">Featured Work</p>
            <span className="text-xs text-[var(--text-secondary)]">{projectsData.length} projects</span>
          </div>

          <div className="space-y-4">
            {projectsData.map((project, index) => (
              
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: index * 0.03 }}
                className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden"
              >
                <div className="relative w-full aspect-[16/10] bg-[var(--bg-primary)]">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      sizes="100vw"
                      unoptimized={project.image.startsWith("https://opengraph.githubassets.com/")}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-[var(--text-secondary)]">Preview unavailable</div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="text-lg font-semibold leading-tight">{project.title}</h3>
                    <Link href={`/project/${project.slug}`} className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                      View <ArrowUpRight size={14} />
                    </Link>
                  </div>

                  <p className="text-sm leading-relaxed text-[var(--text-secondary)] line-clamp-3">{project.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section id="contact" variants={cardVariants} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} className="mt-5 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/70 backdrop-blur-xl p-5 scroll-mt-24">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--text-secondary)] mb-4">Contact Gateway</p>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] mb-4">
            Open to internships and software engineering opportunities where I can ship high-impact AI and web systems.
          </p>
          <div className="grid grid-cols-1 gap-3">
            <a
              href="mailto:kathilshiva@gmail.com"
              className="inline-flex items-center justify-between rounded-full border border-[var(--border-color)] px-5 py-3.5 bg-[var(--bg-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors"
            >
              <span className="text-sm font-medium">Email</span>
              <ArrowUpRight size={16} />
            </a>
            <a
              href="https://linkedin.com/in/Ayush-kathil"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-between rounded-full border border-[var(--border-color)] px-5 py-3.5 bg-[var(--bg-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors"
            >
              <span className="text-sm font-medium">LinkedIn</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
}
