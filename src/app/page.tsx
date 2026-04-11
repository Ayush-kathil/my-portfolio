"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Preloader from "@/components/Preloader";
import MobileGateway from "@/components/MobileGateway";

const ImpactMetrics = dynamic(() => import("@/components/ImpactMetrics"));
const ProfessionalSnapshot = dynamic(() => import("@/components/ProfessionalSnapshot"));
const About = dynamic(() => import("@/components/About"));
const Experience = dynamic(() => import("@/components/Experience"));
const FeaturedProjects = dynamic(() => import("@/components/FeaturedProjects"));
const GitHubProjects = dynamic(() => import("@/components/GitHubProjects"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));

const subscribeToThemeStore = () => () => {};

const getPreloaderSnapshot = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.sessionStorage.getItem("portfolio-preloader-seen") === "1";
};

export default function Home() {
  const [preloaderDismissed, setPreloaderDismissed] = useState(false);
  const preloaderSeen = useSyncExternalStore(
    subscribeToThemeStore,
    getPreloaderSnapshot,
    () => false,
  );
  const preloaderComplete = preloaderSeen || preloaderDismissed;

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDismissed(true);
    window.sessionStorage.setItem("portfolio-preloader-seen", "1");
  }, []);

  return (
    <main id="main-content" className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen relative">
      {!preloaderComplete && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      <div className="md:hidden relative z-10 w-full">
        <MobileGateway preloaderComplete={preloaderComplete} />
      </div>

      <div className="hidden md:block">
        <div className="sticky top-0 w-full h-[100svh] z-0 overflow-hidden">
          <Hero preloaderComplete={preloaderComplete} />
        </div>

        <div className="relative z-10 w-full">
          <ImpactMetrics />
          <ProfessionalSnapshot />
          <About />
          <Experience />
          <FeaturedProjects />
          <GitHubProjects />
          <Contact />
          <Footer />
        </div>
      </div>
    </main>
  );
}
