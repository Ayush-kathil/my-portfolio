"use client";

import { useCallback } from "react";
import Magnetic from "./Magnetic";

export default function Navbar() {
  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const headerOffset = isMobile ? 72 : 96;
      const y = element.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <nav aria-label="Primary" className="hidden md:flex fixed top-0 left-0 w-full z-[9990] justify-center py-6 mix-blend-difference pointer-events-none">
        <ul className="flex gap-4 md:gap-8 px-8 py-3 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)]/60 backdrop-blur-xl shadow-md pointer-events-auto transition-colors duration-300">
        {[
          { name: "About", id: "about" },
          { name: "Experience", id: "experience" },
          { name: "Projects", id: "projects" },
          { name: "Contact", id: "contact" },
        ].map((item) => (
          <li key={item.name}>
            <Magnetic>
              <a
                href={`#${item.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo(item.id);
                }}
                className="px-4 py-2 rounded-full text-[var(--text-secondary)] font-medium text-xs md:text-sm tracking-wide hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                {item.name}
              </a>
            </Magnetic>
          </li>
        ))}
        </ul>
      </nav>

      <nav aria-label="Mobile Primary" className="md:hidden fixed bottom-0 left-0 w-full z-[9988] px-3 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2 pointer-events-none">
        <ul className="grid grid-cols-3 gap-2 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/88 backdrop-blur-xl p-2 shadow-lg pointer-events-auto">
          {[
            { name: "Gateway", id: "gateway" },
            { name: "Projects", id: "projects" },
            { name: "Contact", id: "contact" },
          ].map((item) => (
            <li key={item.name}>
              <a
                href={`#${item.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo(item.id);
                }}
                className="block w-full text-center rounded-xl px-2 py-2.5 text-[11px] uppercase tracking-widest font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition-colors"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
