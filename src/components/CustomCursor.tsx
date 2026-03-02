"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only run on desktop devices
    if (window.matchMedia("(max-width: 768px)").matches) return;

    // Optional: Hide default cursor globally
    document.body.style.cursor = "none";
    document.querySelectorAll('a, button').forEach((el) => {
      (el as HTMLElement).style.cursor = "none";
    });

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[data-cursor-hover="true"]')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "auto";
    };
  }, []);

  // Hydration safety: Return null on server, and avoid rendering if touch device
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  if (!mounted || (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches)) return null;

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      opacity: 1,
    },
    hover: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      scale: 1.5,
      opacity: 0.8,
      backgroundColor: "var(--text-primary)",
    },
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[var(--text-primary)] pointer-events-none z-[9999] hidden md:block mix-blend-difference"
        variants={variants}
        animate={isHovering ? "hover" : "default"}
        transition={isHovering ? { type: "tween", ease: "backOut", duration: 0.15 } : { type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      />
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-[var(--text-primary)] rounded-full pointer-events-none z-[10000] hidden md:block mix-blend-difference"
        style={{ transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)` }}
      />
    </>
  );
}
