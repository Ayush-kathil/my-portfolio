"use client";

import { useRef, useEffect } from "react";
import { Github, ArrowUpRight, Code } from "lucide-react";
import TextReveal from "@/components/TextReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GITHUB_CONTRIBUTIONS = [
  {
    id: 1,
    name: "Pdf-editx",
    description: "Client-side PDF processing: compression, password removal, image optimization. Zero server upload.",
    html_url: "https://github.com/Ayush-kathil/Pdf-editx",
    language: "JavaScript",
    reason: "Built to eliminate the need for uploading sensitive documents to external servers. Learned client-side binary manipulation and Web Worker-based processing."
  },
  {
    id: 2,
    name: "Cyberia: Fake Banking APK Detection",
    description: "Multi-modal ML pipeline combining APK static analysis with steganography detection. 96.8% accuracy.",
    html_url: "https://github.com/Ayush-kathil/Cyberia---Detecting-Fake-Banking-APKs",
    language: "Python",
    reason: "Built to address credential theft via fake banking apps. Combined reverse engineering, computer vision, and ensemble classifiers into a single detection pipeline."
  },
  {
    id: 3,
    name: "Credit-Card-Fraud-Detection",
    description: "ML pipeline with SMOTE resampling on 284,807 transactions. Precision-recall optimization for 0.17% fraud rate.",
    html_url: "https://github.com/Ayush-kathil/Credit-Card-Fraud-Detection",
    language: "Jupyter Notebook",
    reason: "Built to understand why 99.9% accuracy can mean a useless model. The real challenge: maximizing recall without flooding users with false positives."
  },
  {
    id: 4,
    name: "Yoga-Pose-Detection",
    description: "Real-time pose estimation at 30+ FPS on CPU using MediaPipe and OpenCV.",
    html_url: "https://github.com/Ayush-kathil/yoga-pose-detection",
    language: "Python",
    reason: "Built to democratize safe fitness practice. The constraint: maintain 30+ FPS doing full pose estimation on standard laptop CPU hardware, no GPU."
  },
  {
    id: 5,
    name: "Hotel-Sunrise",
    description: "Fully responsive hotel booking frontend. Vanilla HTML/CSS/JS, zero frameworks, deployed on Netlify.",
    html_url: "https://github.com/Ayush-kathil/Hotel-Sunrise",
    language: "TypeScript",
    reason: "Built to prove foundational web skills. Pixel-perfect responsive layout using raw CSS Grid and Flexbox, no utility frameworks."
  },
  {
    id: 6,
    name: "Movie-Recommendation-System",
    description: "Content-based engine using cosine similarity on vectorized metadata for 5,000+ movies.",
    html_url: "https://github.com/Ayush-kathil/Movie-Recommendation-System",
    language: "Jupyter Notebook",
    reason: "Built to understand sparse matrix operations, NLP text vectorization, and pairwise distance computation at scale."
  }
];

export default function GitHubProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gsap.utils.toArray(".github-card"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={sectionRef}
      id="github"
      className="relative w-full z-20 border-t-[4px] border-t-[var(--text-primary)] rounded-t-[2.5rem] -mt-10 shadow-2xl bg-[var(--bg-primary)]"
    >
      <section className="w-full text-[var(--text-primary)] px-6 md:px-12 py-32 flex flex-col justify-center relative">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 border-b border-[var(--border-color)] pb-8 gap-8">
            <h2 className="text-[50px] md:text-[72px] font-medium tracking-[-2px] md:tracking-[-4.32px] leading-none uppercase flex items-center gap-6">
              <Github className="w-12 h-12 md:w-20 md:h-20" /> <TextReveal>All Repositories</TextReveal>
            </h2>
            <a
              href="https://github.com/Ayush-kathil"
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-3 px-8 py-4 border border-[var(--border-color)] rounded-full hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors font-mono uppercase tracking-widest group shrink-0"
            >
              View GitHub Profile
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </a>
          </div>

          <div className="mb-12">
            <p className="text-lg md:text-xl font-light text-[var(--text-secondary)] max-w-3xl">
              A curated set of repositories that show how I think, build, and iterate in real projects.
            </p>
          </div>

          <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {GITHUB_CONTRIBUTIONS.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="github-card group flex flex-col h-full p-8 border-[0.5px] border-[var(--border-color)] rounded-3xl hover:bg-[var(--bg-secondary)] hover:border-[var(--text-primary)] transition-all duration-500 relative"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-full bg-[var(--bg-secondary)] group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-primary)] transition-colors duration-300">
                    <Code className="w-6 h-6" />
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] group-hover:rotate-45 transition-transform duration-300" />
                </div>
                
                <h3 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">
                  {repo.name} 
                </h3>
                
                <p className="text-md font-light text-[var(--text-secondary)] mb-6">
                  {repo.description}
                </p>

                <div className="mt-auto pt-6 border-t border-[var(--border-color)] group-hover:border-[var(--text-primary)] transition-colors duration-300">
                  <p className="text-sm leading-relaxed text-[var(--text-primary)] opacity-90 italic">
                    {repo.reason}
                  </p>
                  <div className="mt-6 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                    <span>{repo.language}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          <div className="mt-16 flex justify-center md:hidden">
            <a
              href="https://github.com/Ayush-kathil"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 border border-[var(--border-color)] rounded-full hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors font-mono uppercase tracking-widest group shrink-0"
            >
               View GitHub Profile
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
