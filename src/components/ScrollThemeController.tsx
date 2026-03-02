"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollThemeController() {
  useEffect(() => {
    // Dynamically smooth-tween CSS variables on the root document when
    // scrolling into the "Featured Projects" section to emulate edwinle.com
    
    // Safety check for browser environment
    if (typeof window === "undefined") return;

    // We will animate the :root / html scope CSS properties directly
    const root = document.documentElement;

    const ctx = gsap.context(() => {
      // 1. White Background Shift for About Section
      ScrollTrigger.create({
        trigger: "#about",
        start: "top 20%",
        endTrigger: "#experience", 
        end: "top 50%", 
        onEnter: () => {
          gsap.to(root, {
            "--bg-primary": "#fafafa",
            "--bg-secondary": "#f0f0f0",
            "--text-primary": "#111111",
            "--text-secondary": "#555555",
            "--border-color": "#dddddd",
            "--accent": "#111111",
            duration: 1.2,
            ease: "power2.inOut"
          });
        },
        onLeave: () => {
          gsap.to(root, {
            "--bg-primary": "#151515",
            "--bg-secondary": "#1c1c1c",
            "--text-primary": "#f4f0ea",
            "--text-secondary": "#9c9c9c",
            "--border-color": "#2e2e2e",
            "--accent": "#f4f0ea",
            duration: 1.2,
            ease: "power2.inOut"
          });
        },
        onEnterBack: () => {
          gsap.to(root, {
            "--bg-primary": "#fafafa",
            "--bg-secondary": "#f0f0f0",
            "--text-primary": "#111111",
            "--text-secondary": "#555555",
            "--border-color": "#dddddd",
            "--accent": "#111111",
            duration: 1.2,
            ease: "power2.inOut"
          });
        },
        onLeaveBack: () => {
          gsap.to(root, {
            "--bg-primary": "#151515",
            "--bg-secondary": "#1c1c1c",
            "--text-primary": "#f4f0ea",
            "--text-secondary": "#9c9c9c",
            "--border-color": "#2e2e2e",
            "--accent": "#f4f0ea",
            duration: 1.2,
            ease: "power2.inOut"
          });
        }
      });

      // Create a master scroll trigger that watches the projects and github sections
      ScrollTrigger.create({
        trigger: "#projects",
        start: "top 50%",
        endTrigger: "#certifications", // Revert back to dark once certifications are hit
        end: "top 50%",
        onEnter: () => {
          gsap.to(root, {
            "--bg-primary": "#f4f0ea",
            "--bg-secondary": "#e8e2d9",
            "--text-primary": "#151515",
            "--text-secondary": "#666666",
            "--border-color": "#d1ccc5",
            "--accent": "#151515",
            duration: 1.2,
            ease: "power2.inOut"
          });
        },
        onLeave: () => {
          // Revert to Dark Mode
          gsap.to(root, {
            "--bg-primary": "#151515",
            "--bg-secondary": "#1c1c1c",
            "--text-primary": "#f4f0ea",
            "--text-secondary": "#9c9c9c",
            "--border-color": "#2e2e2e",
            "--accent": "#f4f0ea",
            duration: 1.2,
            ease: "power2.inOut"
          });
        },
        onEnterBack: () => {
          // Switch back to Light Mode tracking backwards into Projects
          gsap.to(root, {
            "--bg-primary": "#f4f0ea",
            "--bg-secondary": "#e8e2d9",
            "--text-primary": "#151515",
            "--text-secondary": "#666666",
            "--border-color": "#d1ccc5",
            "--accent": "#151515",
            duration: 1.2,
            ease: "power2.inOut"
          });
        },
        onLeaveBack: () => {
          // Switch back to standard Dark Mode at the top of the page (Hero/About)
          gsap.to(root, {
            "--bg-primary": "#151515",
            "--bg-secondary": "#1c1c1c",
            "--text-primary": "#f4f0ea",
            "--text-secondary": "#9c9c9c",
            "--border-color": "#2e2e2e",
            "--accent": "#f4f0ea",
            duration: 1.2,
            ease: "power2.inOut"
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return null; // Invisible mechanical component
}
