import { projectsData } from "@/data/projects";
import { notFound } from "next/navigation";
import Magnetic from "@/components/Magnetic";
import { ArrowUpRight, Github, CodeXml } from "lucide-react";
import Link from "next/link";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="w-full bg-[#050505] text-white min-h-screen pt-32 px-6 md:px-12 pb-24">
      <Link href="/" className="inline-block mb-12 font-mono text-neutral-500 hover:text-white transition-colors uppercase tracking-widest text-sm">
        [ Return Home ]
      </Link>
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter mb-8 leading-none">
          {project.title}
        </h1>
        
        <div className="flex gap-4 flex-wrap mb-16">
          {project.tags.map((tag, i) => (
            <span key={i} className="px-6 py-2 rounded-full border border-neutral-700 text-sm uppercase font-mono tracking-wider">
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-2xl font-mono text-neutral-500 uppercase tracking-widest mb-6 border-b border-neutral-800 pb-4">
              About the Project
            </h2>
            <p className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed">
              {project.about}
            </p>
          </div>
          
          <div className="flex flex-col gap-6 justify-center lg:items-end">
            <Magnetic>
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-4 w-full md:w-auto px-12 py-6 bg-white text-black font-bold uppercase tracking-widest text-lg hover:bg-neutral-300 transition-colors">
                <Github className="w-6 h-6" /> Source Code
              </a>
            </Magnetic>
            
            <Magnetic>
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-4 w-full md:w-auto px-12 py-6 border border-white text-white font-bold uppercase tracking-widest text-lg hover:bg-white hover:text-black transition-colors">
                <ArrowUpRight className="w-6 h-6" /> Live Preview
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="w-full aspect-video bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center overflow-hidden relative group">
          <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <p className="font-mono text-white tracking-widest uppercase">Preview Unavailable / Interactive Demo Placeholder</p>
          </div>
          <CodeXml className="w-32 h-32 text-neutral-800" />
        </div>
      </div>
    </main>
  );
}
