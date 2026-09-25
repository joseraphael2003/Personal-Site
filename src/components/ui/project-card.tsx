"use client";

import { Project, GalleryItem } from "@/data/portfolio";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { DraggableMarquee } from "@/components/ui/draggable-marquee";

export interface ProjectCardProps {
  project: Project;
  index: number;
  headingLevel: "h2" | "h3";
  onImageClick: (item: GalleryItem, rect: DOMRect | null) => void;
}

export function ProjectCard({
  project,
  index,
  headingLevel,
  onImageClick,
}: ProjectCardProps) {
  const galleryList: GalleryItem[] | null =
    project.galleryImages && project.galleryImages.length > 0
      ? project.galleryImages
      : project.primaryImage
      ? [{ src: project.primaryImage, caption: project.title }]
      : null;
  const hasImages = !!galleryList && galleryList.length > 0;
  const Heading = headingLevel;

  return (
    <div
      className={`rounded-sm border border-edge bg-surface hover:border-edge-strong transition-colors font-text shadow-sm flex flex-col justify-between ${
        hasImages
          ? "col-span-1 md:col-span-2 p-5 sm:p-7 space-y-4"
          : "col-span-1 p-4 sm:p-6 space-y-3.5"
      }`}
    >
      <div className="space-y-3">
        {/* Project Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-edge pb-2.5 sm:pb-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs sm:text-sm text-subtle shrink-0 whitespace-nowrap">
                {String(index + 1).padStart(2, "0")} {"//"}
              </span>
              <Heading
                className="font-text font-bold text-base sm:text-lg text-ink uppercase tracking-wide"
              >
                {project.title}
              </Heading>
            </div>
            <p className="text-xs sm:text-sm text-muted mt-1">{project.tagline}</p>
          </div>

          <div className="flex items-center gap-2.5">
            <span
              className={`inline-block rounded-sm px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${
                project.category === "COMMISSIONED"
                  ? "bg-accent/15 border border-accent/40 text-accent-hover"
                  : project.category === "INTERNSHIP"
                  ? "bg-transparent border border-dashed border-accent/50 text-accent-hover"
                  : "bg-chip-hover border border-faint text-body"
              }`}
            >
              {project.category}
            </span>
            <span className="text-xs sm:text-sm text-subtle">{project.year}</span>
          </div>
        </div>

        {/* Description Body */}
        <p className="text-xs sm:text-sm text-copy leading-normal sm:leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-sm border border-edge bg-chip px-2 py-0.5 text-xs text-copy"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Image Marquee Reel (Wide Visual Cards) */}
        {hasImages && galleryList && (
          <div className="pt-2">
            <DraggableMarquee
              items={galleryList}
              speed={0.35}
              onItemClick={(origIdx, _item, rect) => {
                onImageClick(galleryList[origIdx], rect || null);
              }}
            />
          </div>
        )}
      </div>

      {/* Actions Row */}
      {(project.repoUrl || project.liveUrl) && (
        <div className="pt-3 border-t border-edge/60 flex flex-wrap items-center gap-4 text-xs sm:text-sm mt-auto">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent-hover transition-colors inline-flex items-center gap-1.5 group cursor-pointer"
            >
              <Github className="h-4 w-4" />
              <span>Source Repository</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent-hover transition-colors inline-flex items-center gap-1.5 group cursor-pointer"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Live System</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
