"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { archiveProjects, Project, GalleryItem } from "@/data/portfolio";
import { ArrowLeft, Filter } from "lucide-react";
import { LightboxModal } from "@/components/ui/lightbox-modal";
import { ProjectCard } from "@/components/ui/project-card";
import { usePageTransition } from "@/components/ui/page-transition";

export default function ProjectsArchivePage() {
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const { navigateBack } = usePageTransition();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only navigate back if no modal/dialog is currently active
      if (e.key === "Escape" && !document.querySelector("[role='dialog']")) {
        navigateBack("/#projects");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateBack]);

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
    <main className="min-h-[100dvh] bg-[#090a0c] text-neutral-200 px-4 py-8 sm:px-8 sm:py-16 font-mono selection:bg-accent/20 selection:text-accent-soft">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Top Back Nav */}
        <div>
          <Link
            href="/#projects"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                e.preventDefault();
                navigateBack("/#projects");
              }
            }}
            className="group inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-accent-hover transition-colors cursor-pointer"
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
                  ? "bg-accent text-black font-bold"
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

        {/* Project Cards (Dynamic Bento Grid: 2-col full width for image projects, 1-col compact for text-only) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {filteredProjects.map((project: Project, idx: number) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              headingLevel="h2"
              onImageClick={(item, rect) => {
                setOriginRect(rect);
                setLightboxImage(item);
              }}
            />
          ))}
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

    </main>
  );
}
