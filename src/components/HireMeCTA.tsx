"use client";

import Magnetic from "./Magnetic";
import { ArrowDownToLine } from "lucide-react";

export default function HireMeCTA() {
  return (
    <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-50 mix-blend-difference">
      <Magnetic>
        <a
          href="/resume.pdf"
          target="_blank"
          download
          className="flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full font-mono text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] border-2 border-transparent hover:border-[var(--text-primary)] transition-all duration-300 group"
        >
          <span className="flex flex-col items-center gap-1 group-hover:-translate-y-1 transition-transform duration-300">
            Hire Me <ArrowDownToLine className="w-4 h-4" />
          </span>
        </a>
      </Magnetic>
    </div>
  );
}
