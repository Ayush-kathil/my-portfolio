"use client";

import { useEffect, useState, useRef } from "react";
import { Github, Star, GitFork, ArrowUpRight, Code } from "lucide-react";
import TextReveal from "@/components/TextReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

type TabType = 'Top Stars' | 'Recent' | 'Most Forked';

export default function GitHubProjects() {
  const [allRepos, setAllRepos] = useState<Repo[]>([]);
  const [displayRepos, setDisplayRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('Top Stars');
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch("https://api.github.com/users/Ayush-kathil/repos?per_page=100");
        if (res.ok) {
          const data: Repo[] = await res.json();
          // Filter out forks if you want, or just show all
          setAllRepos(data);
          sortAndSetRepos(data, 'Top Stars');
        }
      } catch (err) {
        console.error("Failed to fetch Github repos", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  const sortAndSetRepos = (repos: Repo[], tab: TabType) => {
    const sorted = [...repos];
    if (tab === 'Recent') {
      sorted.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    } else if (tab === 'Top Stars') {
      sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (tab === 'Most Forked') {
      sorted.sort((a, b) => b.forks_count - a.forks_count);
    }
    // Show all repositories instead of slicing
    setDisplayRepos(sorted);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    sortAndSetRepos(allRepos, tab);
  };

  useEffect(() => {
    if (loading) return;
    
    // Using a simple animation without pinning the entire section
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gsap.utils.toArray(".github-card"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [loading, displayRepos]);

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
              <Github className="w-12 h-12 md:w-20 md:h-20" /> <TextReveal>GitHub Open Source</TextReveal>
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

          <div className="flex gap-4 mb-12 overflow-x-auto pb-4 hide-scrollbar w-full">
            {(['Top Stars', 'Recent', 'Most Forked'] as TabType[]).map(tab => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                suppressHydrationWarning
                className={`px-8 py-4 rounded-full font-mono uppercase tracking-widest text-sm transition-all whitespace-nowrap ${
                  activeTab === tab 
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border border-[var(--text-primary)]' 
                  : 'border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-32 font-mono text-2xl animate-pulse text-[var(--text-secondary)]">
              Fetching Repositories...
            </div>
          ) : (
            <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {displayRepos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="github-card group flex flex-col h-full p-8 border border-[var(--border-color)] rounded-3xl hover:bg-[var(--bg-secondary)] hover:border-[var(--text-primary)] transition-all duration-500 relative"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-full bg-[var(--bg-secondary)] group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-primary)] transition-colors duration-300">
                      <Code className="w-6 h-6" />
                    </div>
                    <ArrowUpRight className="w-6 h-6 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-[var(--text-primary)] line-clamp-2">
                    {repo.name} 
                  </h3>
                  
                  <p className="text-lg font-light text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors mb-8 flex-grow">
                    {repo.description || "No description provided."}
                  </p>
                  
                  <div className="flex items-center gap-6 justify-between text-[var(--text-secondary)] font-mono text-xs md:text-sm uppercase tracking-widest mt-auto border-t border-[var(--border-color)] pt-6 group-hover:border-[var(--text-primary)] transition-colors duration-300">
                    <span className="group-hover:text-[var(--text-primary)] transition-colors truncate max-w-[50%]">
                      {repo.language || "N/A"}
                    </span>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="flex items-center gap-1 group-hover:text-[var(--text-primary)] transition-colors"><Star className="w-4 h-4" /> {repo.stargazers_count}</span>
                      <span className="flex items-center gap-1 group-hover:text-[var(--text-primary)] transition-colors"><GitFork className="w-4 h-4" /> {repo.forks_count}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
          
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
