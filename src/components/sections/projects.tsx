"use client";

import { useState } from "react";
import Link from "next/link";
import { flagshipProjects, Project } from "@/data/portfolio";
import { DraggableMarquee } from "@/components/ui/draggable-marquee";
import { LightboxModal } from "@/components/ui/lightbox-modal";
import { Github, ExternalLink, ArrowRight, ArrowUpRight } from "lucide-react";

export function Projects() {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; caption?: string } | null>(null);

  return (
    <section id="projects" className="w-full border-b border-neutral-800/80 bg-[#090a0c] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="border-b border-neutral-800 pb-4 font-mono">
          <h2 className="font-pixel text-2xl sm:text-3xl text-neutral-100 uppercase tracking-wide">
            PROJECTS
          </h2>
        </div>

        {/* Compact Flagship Ledger Cards */}
        <div className="space-y-6">
          {flagshipProjects.map((project: Project, idx: number) => {
            const galleryList =
              project.galleryImages && project.galleryImages.length > 0
                ? project.galleryImages
                : project.primaryImage
                ? [{ src: project.primaryImage, caption: project.title }]
                : null;
            const hasImages = !!galleryList && galleryList.length > 0;

            return (
              <div
                key={project.id}
                className="rounded-sm border border-neutral-800 bg-[#0f1115] p-5 sm:p-7 space-y-4 hover:border-neutral-700 transition-colors font-mono"
              >
                {/* Project Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-500">0{idx + 1} {"//"}</span>
                      <h3 className="font-pixel text-xl sm:text-2xl text-neutral-100 uppercase tracking-wide">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-400 mt-1">{project.tagline}</p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span
                      className={`inline-block rounded-sm px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${
                        project.category === "COMMISSIONED"
                          ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-400"
                          : "bg-neutral-800 border border-neutral-600 text-neutral-200"
                      }`}
                    >
                      {project.category}
                    </span>
                    <span className="text-sm text-neutral-500">{project.year}</span>
                  </div>
                </div>

                {/* Description Body */}
                <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl">
                  {project.description}
                </p>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-sm border border-neutral-800 bg-neutral-900 px-2 py-0.5 text-xs text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Image Marquee Reel */}
                {hasImages && (
                  <div className="pt-2">
                    <DraggableMarquee
                      items={galleryList}
                      speed={0.35}
                      onItemClick={(origIdx) => setLightboxImage(galleryList[origIdx])}
                    />
                  </div>
                )}
                {/* Actions Row */}
                {(project.repoUrl || project.liveUrl) && (
                  <div className="pt-3 border-t border-neutral-800/60 flex flex-wrap items-center gap-4 text-sm">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                    >
                      <Github className="h-4 w-4" />
                      <span>Source Repository</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Live System</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}

                  </div>
                )}
                </div>
            );
          })}
        </div>

        {/* See All Projects Link (Compact Centered Solid Emerald Button) */}
        <div className="pt-4 flex justify-center font-mono">
          <Link
            href="/projects"
            className="cursor-pointer rounded-sm bg-emerald-500 px-6 py-3 text-sm font-mono font-bold text-black hover:bg-emerald-400 transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <span>View Complete Project Archive (8 Projects)</span>
            <ArrowRight className="h-4 w-4 text-black" />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <LightboxModal
          open={!!lightboxImage}
          onOpenChange={(open) => !open && setLightboxImage(null)}
          image={lightboxImage}
        />
      )}
    </section>
  );
}
