"use client";

import { useState } from "react";
import Link from "next/link";
import { flagshipProjects, archiveProjects, GalleryItem } from "@/data/portfolio";
import { motion } from "framer-motion";
import { usePageTransition } from "@/components/ui/page-transition";
import { LightboxModal } from "@/components/ui/lightbox-modal";
import { ProjectCard } from "@/components/ui/project-card";
import { ArrowRight } from "lucide-react";

export function Projects() {
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const { navigate } = usePageTransition();

  return (
    <section id="projects" className="w-full scroll-mt-14 border-b border-neutral-800/80 bg-[#090a0c] py-10 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="border-b border-neutral-800 pb-4 font-mono">
          <h2 className="font-pixel text-2xl sm:text-3xl text-neutral-100 uppercase tracking-wide">
            PROJECTS
          </h2>
        </div>

        {/* Flagship Projects Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {flagshipProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              headingLevel="h3"
              onImageClick={(item, rect) => {
                setOriginRect(rect);
                setLightboxImage(item);
              }}
            />
          ))}
        </div>

        {/* See All Projects Link (Compact Centered Solid Emerald Button) */}
        <div className="pt-4 flex justify-center font-mono">
          <motion.div
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Link
              href="/projects"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                  e.preventDefault();
                  navigate("/projects", e);
                }
              }}
              className="cursor-pointer rounded-sm bg-accent px-6 py-3 text-sm font-mono font-bold text-black hover:bg-accent-hover btn-tactical-sheen transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <span>View Complete Project Archive ({archiveProjects.length} Projects)</span>
              <ArrowRight className="h-4 w-4 text-black" />
            </Link>
          </motion.div>
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
    </section>
  );
}
