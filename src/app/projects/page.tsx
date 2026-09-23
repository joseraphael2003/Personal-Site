"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { archiveProjects, Project, GalleryItem } from "@/data/portfolio";
import { ArrowLeft, Github, ExternalLink, Filter, ArrowUpRight } from "lucide-react";
import { DraggableMarquee } from "@/components/ui/draggable-marquee";
import { LightboxModal } from "@/components/ui/lightbox-modal";
import { useRadialTransition, RadialTransitionOverlay } from "@/components/ui/radial-transition";

export default function ProjectsArchivePage() {
  const router = useRouter();
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const { transitioning, origin, navigateWithRadial } = useRadialTransition();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only navigate back if no modal/dialog is currently active
      if (e.key === "Escape" && !document.querySelector("[role='dialog']")) {
        navigateWithRadial("/");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  const categories = [
    { label: "All", value: "ALL" },
    { label: "Commissioned", value: "COMMISSIONED" },
    { label: "Personal", value: "PERSONAL" },
    { label: "Internship", value: "INTERNSHIP" },
  ];

  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredProjects =
    activeCategory === "ALL"
      ? archiveProjects
      : archiveProjects.filter((p) => p.category === activeCategory);

  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="min-h-[100dvh] bg-[#090a0c] text-neutral-200 px-4 py-8 sm:px-8 sm:py-16 font-mono selection:bg-emerald-500/20 selection:text-emerald-300"
    >
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Top Back Nav with Radial Transition */}
        <div>
          <Link
            href="/"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                e.preventDefault();
                navigateWithRadial("/", e);
              }
            }}
            className="group inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Overview</span>
          </Link>
        </div>

        {/* Page Title (Clean, Zero Bloat) */}
        <div className="border-b border-neutral-800 pb-4">
          <h1 className="font-pixel text-3xl sm:text-4xl text-neutral-100 uppercase tracking-wide">
            PROJECT REPOSITORY
          </h1>
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-sm text-neutral-500 mr-2">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`cursor-pointer px-3 py-1.5 text-sm rounded-sm transition-colors ${
                activeCategory === cat.value
                  ? "bg-emerald-500 text-black font-bold"
                  : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-neutral-200 hover:bg-neutral-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
          <span className="text-sm text-neutral-500 ml-auto hidden sm:inline">
            Showing {filteredProjects.length} of {archiveProjects.length} records
          </span>
        </div>

        {/* Project Cards (Overview Flagship Style) */}
        <div className="space-y-6">
          {filteredProjects.map((project: Project, idx: number) => {
            const galleryList: GalleryItem[] | null =
              project.galleryImages && project.galleryImages.length > 0
                ? project.galleryImages
                : project.primaryImage
                ? [{ src: project.primaryImage, caption: project.title }]
                : null;
            const hasImages = !!galleryList && galleryList.length > 0;

            return (
              <div
                key={project.id}
                className="rounded-sm border border-neutral-800 bg-[#0f1115] p-5 sm:p-7 space-y-4 hover:border-neutral-700 transition-colors font-mono shadow-sm"
              >
                {/* Project Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-500">
                        {String(idx + 1).padStart(2, "0")} {"//"}
                      </span>
                      <h2 className="font-pixel text-xl sm:text-2xl text-neutral-100 uppercase tracking-wide">
                        {project.title}
                      </h2>
                    </div>
                    <p className="text-sm text-neutral-400 mt-1">{project.tagline}</p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span
                      className={`inline-block rounded-sm px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${
                        project.category === "COMMISSIONED"
                          ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-400"
                          : project.category === "INTERNSHIP"
                          ? "bg-cyan-500/15 border border-cyan-500/40 text-cyan-400"
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
                {hasImages && galleryList && (
                  <div className="pt-2">
                    <DraggableMarquee
                      items={galleryList}
                      speed={0.35}
                      onItemClick={(origIdx, item, rect) => {
                        setOriginRect(rect || null);
                        setLightboxImage(galleryList[origIdx]);
                      }}
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
                        className="text-neutral-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 group cursor-pointer"
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
                        className="text-neutral-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 group cursor-pointer"
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
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <LightboxModal
          open={!!lightboxImage}
          onOpenChange={(open) => {
            if (!open) {
              setLightboxImage(null);
              setOriginRect(null);
            }
          }}
          image={lightboxImage}
          originRect={originRect}
        />
      )}

      {/* Radial Page Transition Overlay */}
      <RadialTransitionOverlay active={transitioning} origin={origin} />
    </motion.main>
  );
}
