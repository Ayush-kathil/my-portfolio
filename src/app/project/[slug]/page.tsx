import { projectsData } from "@/data/projects";
import { notFound } from "next/navigation";
import Magnetic from "@/components/Magnetic";
import { ArrowUpRight, Github, CodeXml } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import * as motion from "framer-motion/client";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.slug === resolvedParams.slug);
  const isGithubOgPreview = Boolean(
    project?.image?.startsWith("https://opengraph.githubassets.com/")
  );

  if (!project) {
    notFound();
  }

  // Define variants for the scroll animations
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.95, y: 80 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };

  return (
    <main className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen pt-32 px-6 md:px-12 pb-32 overflow-hidden">
      <Link href="/" className="inline-block mb-12 font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors uppercase tracking-widest text-sm">
        [ Return Home ]
      </Link>
      
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial="hidden" 
          animate="visible" 
          variants={fadeUpVariant}
          className="text-5xl md:text-8xl font-bold uppercase tracking-tighter mb-8 leading-none"
        >
          {project.title}
        </motion.h1>
        
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeUpVariant}
          className="flex gap-4 flex-wrap mb-16"
        >
          {project.tags.map((tag, i) => (
            <span key={i} className="px-6 py-2 rounded-full border border-neutral-700 text-sm uppercase font-mono tracking-wider">
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24"
        >
            <div className="space-y-16">
              <section>
                <motion.h2 variants={fadeUpVariant} className="text-2xl font-mono text-[var(--text-secondary)] uppercase tracking-widest mb-6 border-b border-[var(--border-color)] pb-4">
                  About the Project
                </motion.h2>
                <motion.p variants={fadeUpVariant} className="text-xl md:text-2xl text-[var(--text-primary)] opacity-80 font-light leading-relaxed">
                  {project.about}
                </motion.p>
              </section>

              {project.problemStatement && (
                <section>
                  <motion.h2 variants={fadeUpVariant} className="text-2xl font-mono text-[var(--text-secondary)] uppercase tracking-widest mb-6 border-b border-[var(--border-color)] pb-4">
                    The Problem
                  </motion.h2>
                  <motion.p variants={fadeUpVariant} className="text-xl md:text-2xl text-[var(--text-primary)] opacity-80 font-light leading-relaxed">
                    {project.problemStatement}
                  </motion.p>
                </section>
              )}

              {project.architecture && (
                <section>
                  <motion.h2 variants={fadeUpVariant} className="text-2xl font-mono text-[var(--text-secondary)] uppercase tracking-widest mb-6 border-b border-[var(--border-color)] pb-4">
                    Architecture & Approach
                  </motion.h2>
                  <motion.p variants={fadeUpVariant} className="text-xl md:text-2xl text-[var(--text-primary)] opacity-80 font-light leading-relaxed">
                    {project.architecture}
                  </motion.p>
                </section>
              )}

              {project.challenges && (
                <section>
                  <motion.h2 variants={fadeUpVariant} className="text-2xl font-mono text-[var(--text-secondary)] uppercase tracking-widest mb-6 border-b border-[var(--border-color)] pb-4">
                    Key Challenges
                  </motion.h2>
                  <motion.p variants={fadeUpVariant} className="text-xl md:text-2xl text-[var(--text-primary)] opacity-80 font-light leading-relaxed">
                    {project.challenges}
                  </motion.p>
                </section>
              )}

              {project.impact && (
                <section>
                  <motion.h2 variants={fadeUpVariant} className="text-2xl font-mono text-[var(--text-secondary)] uppercase tracking-widest mb-6 border-b border-[var(--border-color)] pb-4">
                    Impact
                  </motion.h2>
                  <motion.p variants={fadeUpVariant} className="text-xl md:text-2xl text-[var(--text-primary)] opacity-80 font-light leading-relaxed">
                    {project.impact}
                  </motion.p>
                </section>
              )}
            </div>
          
          <div className="flex flex-col gap-6 justify-center lg:items-end">
            {project.githubUrl && project.githubUrl !== "#" && (
              <motion.div variants={fadeUpVariant} className="w-full md:w-auto">
                <Magnetic>
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-4 w-full md:w-auto px-12 py-6 bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-widest text-lg hover:opacity-80 transition-all">
                    <Github className="w-6 h-6" /> Source Code
                  </a>
                </Magnetic>
              </motion.div>
            )}
            
            {project.liveUrl && project.liveUrl !== "#" && (
              <motion.div variants={fadeUpVariant} className="w-full md:w-auto">
                <Magnetic>
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-4 w-full md:w-auto px-12 py-6 border border-[var(--text-primary)] text-[var(--text-primary)] font-bold uppercase tracking-widest text-lg hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all">
                    <ArrowUpRight className="w-6 h-6" /> Live Preview
                  </a>
                </Magnetic>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }}
          variants={imageVariant}
          className={`w-full relative group ${!project.image ? 'aspect-video bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center overflow-hidden' : 'rounded-2xl overflow-hidden shadow-2xl shadow-neutral-900/50'}`}
        >
          {project.image ? (
            <div className="relative w-full aspect-[16/9] md:aspect-[16/10] overflow-hidden">
              <Image 
                src={project.image} 
                alt={`${project.title} Preview`}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                unoptimized={isGithubOgPreview}
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8 md:p-12">
                 <p className="text-white font-mono uppercase tracking-widest text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out shadow-black drop-shadow-md">
                   {project.title} Interface
                 </p>
              </div>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="font-mono text-white tracking-widest uppercase text-center px-4">Preview Unavailable / CLI Application</p>
              </div>
              <CodeXml className="w-32 h-32 text-neutral-800 group-hover:scale-110 transition-transform duration-700" />
            </>
          )}
        </motion.div>
      </div>
    </main>
  );
}
