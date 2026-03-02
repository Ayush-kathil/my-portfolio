"use client";

import { useEffect, useState, useRef } from "react";
import { Github, Star, GitFork } from "lucide-react";
import TextReveal from "@/components/TextReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardSection from "@/components/CardSection";

gsap.registerPlugin(ScrollTrigger);

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

export default function GitHubProjects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch("https://api.github.com/users/Ayush-kathil/repos?sort=updated&per_page=6");
        if (res.ok) {
          const data = await res.json();
          setRepos(data);
        }
      } catch (err) {
        console.error("Failed to fetch Github repos", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  useEffect(() => {
    if (loading) return;
    
    const ctx = gsap.context(() => {
      // Scale-on-Scroll (Zoom Reveal) Premium Transition
      gsap.fromTo(
        gsap.utils.toArray(".github-card"),
        { scale: 0.85, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [loading]);

  return (
    <CardSection className="bg-[var(--bg-primary)] z-20 relative shadow-2xl border-t-[4px] border-t-[var(--text-primary)]" id="github">
      <section ref={containerRef} className="w-full text-[var(--text-primary)] px-6 md:px-12 py-32 flex flex-col justify-center relative">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 border-b border-[var(--border-color)] pb-8 gap-8">
            <h2 className="text-[50px] md:text-[72px] font-medium tracking-[-2px] md:tracking-[-4.32px] leading-none uppercase flex items-center gap-6">
              <Github className="w-12 h-12 md:w-20 md:h-20" /> <TextReveal>GitHub Open Source</TextReveal>
            </h2>
            <a
              href="https://github.com/Ayush-kathil"
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-block px-8 py-4 border border-[var(--border-color)] rounded-full hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors font-mono uppercase tracking-widest"
            >
              View GitHub Profile
            </a>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20 font-mono text-2xl animate-pulse text-[var(--text-secondary)]">
              Fetching Repositories...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="github-card group block p-8 border border-[var(--border-color)] hover:border-[var(--text-primary)] transition-colors duration-500 bg-[var(--bg-secondary)] rounded-2xl"
                >
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold truncate transition-colors">
                      {repo.name}
                    </h3>
                    <div className="flex items-center gap-4 text-[var(--text-secondary)] font-mono">
                      <span className="flex items-center gap-1"><Star className="w-4 h-4" /> {repo.stargazers_count}</span>
                      <span className="flex items-center gap-1"><GitFork className="w-4 h-4" /> {repo.forks_count}</span>
                    </div>
                  </div>
                  <p className="text-[var(--text-secondary)] font-light mb-8 line-clamp-3 min-h-[4.5rem]">
                    {repo.description || "No description provided."}
                  </p>
                  <div className="text-[var(--text-secondary)] font-mono text-sm uppercase tracking-widest group-hover:text-[var(--text-primary)] transition-colors">
                    {repo.language || "Unknown Language"}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </CardSection>
  );
}
