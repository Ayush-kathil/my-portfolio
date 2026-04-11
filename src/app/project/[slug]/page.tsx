import { projectsData } from "@/data/projects";
import { notFound } from "next/navigation";
import { ArrowUpRight, Github, CodeXml } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

function getProject(slug: string) {
  return projectsData.find((project) => project.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProject(resolvedParams.slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: project.title,
    description: project.summary ?? project.desc,
    openGraph: {
      title: project.title,
      description: project.summary ?? project.desc,
      images: [project.image],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary ?? project.desc,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = getProject(resolvedParams.slug);
  const isGithubOgPreview = Boolean(
    project?.image?.startsWith("https://opengraph.githubassets.com/")
  );

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary ?? project.desc,
    url: project.liveUrl !== "#" ? project.liveUrl : undefined,
    codeRepository: project.githubUrl !== "#" ? project.githubUrl : undefined,
    programmingLanguage: project.tags,
  };

  return (
    <main className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen px-4 sm:px-6 md:px-12 pb-24 pt-28 sm:pt-32 overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-7xl">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)]">
          <ArrowUpRight className="h-4 w-4 rotate-180" /> Return home
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--text-secondary)]">Case study</p>
              <h1 className="max-w-4xl text-[clamp(2.8rem,8vw,6.3rem)] font-semibold tracking-[-0.06em] leading-[0.95] uppercase">
                {project.title}
              </h1>
              <p className="max-w-3xl text-[clamp(1.02rem,2.9vw,1.35rem)] leading-relaxed text-[var(--text-secondary)]">
                {project.summary ?? project.desc}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[var(--border-color)] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <section className="rounded-[1.5rem] border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)] mb-3">Problem</p>
                <p className="text-sm sm:text-base leading-relaxed text-[var(--text-primary)]">{project.caseStudy.problem}</p>
              </section>
              <section className="rounded-[1.5rem] border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)] mb-3">Solution</p>
                <p className="text-sm sm:text-base leading-relaxed text-[var(--text-primary)]">{project.caseStudy.solution}</p>
              </section>
              <section className="rounded-[1.5rem] border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)] mb-3">Impact</p>
                <p className="text-sm sm:text-base leading-relaxed text-[var(--text-primary)]">{project.caseStudy.impact}</p>
              </section>
            </div>

            <section className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5 sm:p-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--text-secondary)] mb-4">What I learned</p>
              <p className="max-w-3xl text-[clamp(0.98rem,2.8vw,1.12rem)] leading-relaxed text-[var(--text-primary)]">
                {project.about}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {(project.outcomes ?? []).map((item) => (
                  <span key={item} className="rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                    {item}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5 sm:p-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">Project details</p>
              <dl className="mt-4 space-y-4 text-sm">
                <div className="flex items-start justify-between gap-4 border-b border-[var(--border-color)] pb-3">
                  <dt className="text-[var(--text-secondary)]">Role</dt>
                  <dd className="text-right font-medium text-[var(--text-primary)]">{project.role ?? "Frontend / Full-stack"}</dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-[var(--border-color)] pb-3">
                  <dt className="text-[var(--text-secondary)]">Focus</dt>
                  <dd className="text-right font-medium text-[var(--text-primary)]">Production quality</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-[var(--text-secondary)]">Status</dt>
                  <dd className="text-right font-medium text-[var(--text-primary)]">Deployed / documented</dd>
                </div>
              </dl>
            </div>

            <div className="grid gap-3">
              {project.githubUrl && project.githubUrl !== "#" && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-between rounded-full border border-[var(--border-color)] px-5 py-4 text-sm font-medium transition-colors hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)]">
                  <span className="inline-flex items-center gap-2"><Github className="h-4 w-4" /> Source code</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}

              {project.liveUrl && project.liveUrl !== "#" && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-between rounded-full bg-[var(--text-primary)] px-5 py-4 text-sm font-medium text-[var(--bg-primary)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)]">
                  <span className="inline-flex items-center gap-2">Live preview</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </aside>
        </div>

        <section className="mt-12 sm:mt-14 rounded-[2rem] border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden">
          {project.image ? (
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-[var(--bg-primary)]">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                unoptimized={isGithubOgPreview}
                className="object-cover"
                priority={resolvedParams.slug === projectsData[0]?.slug}
              />
            </div>
          ) : (
            <div className="flex aspect-[16/9] items-center justify-center bg-[var(--bg-primary)] text-[var(--text-secondary)]">
              <div className="flex flex-col items-center gap-3">
                <CodeXml className="h-12 w-12" />
                <p className="text-sm uppercase tracking-[0.2em]">Preview unavailable</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
