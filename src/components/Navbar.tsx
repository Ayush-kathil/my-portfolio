"use client";

import Magnetic from "./Magnetic";

export default function Navbar() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[9990] flex justify-center py-6 mix-blend-difference pointer-events-none">
      <div className="flex gap-4 md:gap-8 px-8 py-3 rounded-full border border-white/20 bg-black/10 backdrop-blur-md pointer-events-auto">
        {[
          { name: "About", id: "about" },
          { name: "Experience", id: "experience" },
          { name: "Projects", id: "projects" },
          { name: "Contact", id: "contact" },
        ].map((item) => (
          <Magnetic key={item.name}>
            <button
              onClick={() => scrollTo(item.id)}
              className="text-white font-mono text-xs md:text-sm uppercase tracking-widest hover:text-gray-300 transition-colors"
              suppressHydrationWarning
            >
              {item.name}
            </button>
          </Magnetic>
        ))}
      </div>
    </nav>
  );
}
