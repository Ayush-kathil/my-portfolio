"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import ImpactMetrics from "@/components/ImpactMetrics";
import About from "@/components/About";
import Experience from "@/components/Experience";
import FeaturedProjects from "@/components/FeaturedProjects";
import GitHubProjects from "@/components/GitHubProjects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollThemeController from "@/components/ScrollThemeController";
import Preloader from "@/components/Preloader";

export default function Home() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  return (
    <main className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen relative">
      {!preloaderComplete && (
        <Preloader onComplete={() => setPreloaderComplete(true)} />
      )}
      
      <div className="sticky top-0 w-full h-[100svh] z-0 overflow-hidden">
        <ScrollThemeController />
        <Hero preloaderComplete={preloaderComplete} />
      </div>

      <div className="relative z-10 w-full">
        <ImpactMetrics />
        <About />
        <Experience />
        <FeaturedProjects />
        <GitHubProjects />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
