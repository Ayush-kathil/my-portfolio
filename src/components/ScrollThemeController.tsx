"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollThemeController() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;

    // Check if user has manually set light mode
    const isUserLightMode = () => {
      return localStorage.getItem("portfolio-theme") === "light";
    };

    // Define palettes
    const darkPalette = {
      "--bg-primary": "#000000",
      "--bg-secondary": "#111111",
      "--text-primary": "#FFFFFF",
      "--text-secondary": "#CFCFCF",
      "--border-color": "#2C2C2C",
      "--accent": "#FFFFFF",
    };

    const lightAboutPalette = {
      "--bg-primary": "#FFFFFF",
      "--bg-secondary": "#F2F2F2",
      "--text-primary": "#000000",
      "--text-secondary": "#2F2F2F",
      "--border-color": "#D3D3D3",
      "--accent": "#000000",
    };

    const warmProjectsPalette = {
      "--bg-primary": "#F8F8F8",
      "--bg-secondary": "#ECECEC",
      "--text-primary": "#000000",
      "--text-secondary": "#3A3A3A",
      "--border-color": "#C9C9C9",
      "--accent": "#000000",
    };

    // Only apply scroll-driven themes in dark mode.
    // If user manually chose light, scroll controller stays inactive.
    const applyPalette = (palette: Record<string, string>) => {
      if (isUserLightMode()) return;
      gsap.to(root, {
        ...palette,
        duration: 0.55,
        overwrite: "auto",
        ease: "power2.inOut",
      });
    };

    const ctx = gsap.context(() => {
      // About section: shift to light
      ScrollTrigger.create({
        trigger: "#about",
        start: "top 20%",
        endTrigger: "#experience",
        end: "top 50%",
        onEnter: () => applyPalette(lightAboutPalette),
        onLeave: () => applyPalette(darkPalette),
        onEnterBack: () => applyPalette(lightAboutPalette),
        onLeaveBack: () => applyPalette(darkPalette),
      });

      // Projects section: shift to warm palette
      ScrollTrigger.create({
        trigger: "#projects",
        start: "top 50%",
        endTrigger: "#contact",
        end: "top 50%",
        onEnter: () => applyPalette(warmProjectsPalette),
        onLeave: () => applyPalette(darkPalette),
        onEnterBack: () => applyPalette(warmProjectsPalette),
        onLeaveBack: () => applyPalette(darkPalette),
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
