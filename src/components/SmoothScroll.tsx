"use client";

import { ReactLenis } from "lenis/react";
import { useMemo } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const options = useMemo(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return { smoothWheel: false, duration: 0 };
    }

    return {
      lerp: 0.08,
      duration: 1,
      smoothWheel: true,
      smoothTouch: true,
    };
  }, []);

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
