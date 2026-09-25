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
    <section id="projects" className="w-full scroll-mt-14 border-b border-edge/80 bg-page py-10 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="border-b border-edge pb-4 font-text">
          <h2 className="font-display text-2xl sm:text-3xl text-ink uppercase tracking-wide">
            Projects
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
        <div className="pt-4 flex justify-center font-text">
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
              className="cursor-pointer rounded-sm bg-accent px-6 py-3 text-sm font-text font-bold text-on-accent hover:bg-accent-hover btn-accent transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <span>View Complete Project Archive ({archiveProjects.length} Projects)</span>
              <ArrowRight className="h-4 w-4 text-on-accent" />
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
