"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Check local storage or system preference
    const stored = localStorage.getItem("portfolio-theme");
    if (stored === "light") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    // Inject crossfading engine
    document.documentElement.classList.add("theme-transition");
    
    if (theme === "dark") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("portfolio-theme", "light");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("portfolio-theme", "dark");
    }
    
    // Clean up crossfading engine to not ruin hover animations
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 400); // Wait 400ms for the color transitions to complete
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 md:top-8 md:right-8 z-[9999] p-4 rounded-full bg-[var(--bg-primary)]/70 backdrop-blur-md text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(255,255,255,0.05)]"
      aria-label="Toggle Theme"
      title="Toggle Theme"
      suppressHydrationWarning
    >
      {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
}
