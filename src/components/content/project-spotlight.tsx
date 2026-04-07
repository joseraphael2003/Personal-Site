"use client";

import { useState } from "react";
import { Project } from "@/lib/data/projects";
import { ChevronLeft, ChevronRight, Github, Globe, Play, Clock, Images, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ProjectSpotlightProps {
    projects: Project[];
}

export function ProjectSpotlight({ projects }: ProjectSpotlightProps) {
    if (!projects || projects.length === 0) {
        return <div className="text-white">No projects available</div>;
    }

    return (
        <div className="w-full relative border-l-2 border-white/10 ml-3 md:ml-6 space-y-24 py-8">
            {projects.map((project, index) => (
                <div key={project.id} className="relative pl-8 md:pl-12">
                    {/* Timeline Bullet - Centered on border-l-2 (left:0). w-6(24px). Center=12. Border-Center=1. Offset = -11px */}
                    <span className="absolute -left-[13px] top-2 md:top-12 w-6 h-6 rounded-full bg-black border-2 border-primary flex items-center justify-center z-10">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                    </span>

                    {/* Card */}
                    <ProjectCardItem project={project} />
                </div>
            ))}

            {/* Coming Soon Indicator */}
            <div className="relative pl-8 md:pl-12 opacity-50 hover:opacity-100 transition-opacity">
                <span className="absolute -left-[13px] top-3 w-6 h-6 rounded-full bg-black border-2 border-white/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white/50" />
                </span>
                <div className="flex items-center gap-3 text-muted-text font-mono text-sm border border-white/5 bg-white/5 rounded-lg p-4 max-w-md">
                    <Clock className="w-4 h-4" />
                    <span>More projects initializing...</span>
                </div>
            </div>
        </div>
    );
}

function ProjectCardItem({ project }: { project: Project }) {
    const [galleryIdx, setGalleryIdx] = useState(0);
    const [showGallery, setShowGallery] = useState(false);

    const gallery = project.assets?.gallery || [];
    const hasGallery = gallery.length > 0;

    const goGalleryNext = () => setGalleryIdx((prev) => (prev + 1) % gallery.length);
    const goGalleryPrev = () => setGalleryIdx((prev) => (prev - 1 + gallery.length) % gallery.length);

    // Get adjacent images for bokeh effect
    const prevGalleryImg = gallery[(galleryIdx - 1 + gallery.length) % gallery.length];
    const nextGalleryImg = gallery[(galleryIdx + 1) % gallery.length];

    // === DESKTOP LAYOUT ===
    return (
        <div className="w-full">
            {/* Desktop: Specific Layouts */}
            <div className="hidden lg:block">
                {hasGallery ? (
                    /* Two-Column Layout: Info (Left) + Gallery (Right) - SWAPPED per request */
                    <div className="relative w-full min-h-[600px] rounded-2xl overflow-hidden bg-surface border border-white/10 grid grid-cols-5">
                        {/* Left Column: Project Info (40%) */}
                        <div className="col-span-2 p-10 space-y-6 flex flex-col justify-center bg-gradient-to-r from-black/90 to-black/60 z-20">
                            <StatusBadge status={project.status} />
                            <h3 className="text-4xl font-bold text-white">{project.title}</h3>
                            <p className="text-base text-muted-text leading-relaxed">{project.description}</p>
                            <TechStack stack={project.techStack} />
                            <ProjectLinks links={project.links} />
                        </div>

                        {/* Right Column: Gallery Images (60%) */}
                        <div className="col-span-3 relative flex items-center justify-center overflow-hidden bg-black/60">
                            {/* Noise Overlay */}
                            <div
                                className="absolute inset-0 opacity-[0.03] pointer-events-none z-10"
                                style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }}
                            />

                            {/* Bokeh/Blurred Background */}
                            {gallery.length > 1 && (
                                <>
                                    <img src={prevGalleryImg} alt="" className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 h-[400px] w-auto object-contain blur-xl opacity-30 scale-90" />
                                    <img src={nextGalleryImg} alt="" className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 h-[400px] w-auto object-contain blur-xl opacity-30 scale-90" />
                                </>
                            )}

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-black/40 z-[5]" />

                            {/* Main Image */}
                            <img
                                src={gallery[galleryIdx]}
                                alt={`${project.title} screenshot`}
                                className="relative z-20 max-h-[500px] w-auto object-contain rounded-xl shadow-2xl"
                            />

                            {/* Gallery Navigation */}
                            {gallery.length > 1 && (
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 z-30">
                                    <button onClick={goGalleryPrev} type="button" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center p-0">
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <span className="text-white/70 text-xs font-mono">{galleryIdx + 1} / {gallery.length}</span>
                                    <button onClick={goGalleryNext} type="button" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center p-0">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                            {/* View Photos Button */}
                            <button
                                type="button"
                                onClick={() => setShowGallery(true)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-black/60 backdrop-blur-sm text-white z-30 border border-white/10 hover:bg-black/80 transition-colors flex items-center gap-2 text-sm">
                                <Images className="w-4 h-4" /> View Photos
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Full-Width Layout: No Gallery (Personal Site) */
                    <div className="relative w-full min-h-[500px] rounded-2xl overflow-hidden bg-surface border border-white/10 flex items-center justify-center p-16">
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1]" style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

                        <div className="relative z-10 max-w-3xl text-center space-y-6">
                            <StatusBadge status={project.status} />
                            <h3 className="text-5xl font-bold text-white">{project.title}</h3>
                            <p className="text-lg text-muted-text leading-relaxed">{project.description}</p>
                            <div className="flex justify-center flex-wrap gap-2">
                                {project.techStack.map(t => <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/80 font-mono">{t}</span>)}
                            </div>
                            <div className="flex justify-center pt-4">
                                <ProjectLinks links={project.links} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Layout: Vertical Stack */}
            <div className="lg:hidden space-y-3">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <span className="font-mono text-sm text-primary">{project.category}</span>
                        <StatusBadge status={project.status} />
                    </div>
                    {/* Title: Matched 'Experience' (text-lg md:text-2xl font-bold) */}
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                        {project.title}
                    </h3>
                </div>

                {/* Description: Matched 'Experience' (text-[13px] md:text-lg) */}
                <p className="text-[13px] text-muted-text leading-relaxed">
                    {project.description}
                </p>

                <TechStack stack={project.techStack} />

                {/* Touch-Friendly Action Grid */}
                <div className="pt-4 grid grid-cols-2 gap-3">
                    {/* View Photos Button (Mobile Only) */}
                    {hasGallery && (
                        <button
                            type="button"
                            onClick={() => setShowGallery(true)}
                            className="col-span-2 flex items-center justify-center gap-2 p-3 rounded-lg bg-white/5 text-white font-medium text-sm border border-white/10 hover:bg-white/10">
                            <Images className="w-4 h-4" /> View Photos
                        </button>
                    )}

                    {project.links?.video && (
                        <a href={project.links.video} target="_blank" rel="noopener noreferrer"
                            className="col-span-2 flex items-center justify-center gap-2 p-3 rounded-lg bg-white text-black font-semibold text-sm">
                            <Play className="w-4 h-4 fill-black" /> Watch Log
                        </a>
                    )}
                    {project.links?.demo && (
                        <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-white/10 text-white font-semibold text-sm border border-white/10">
                            <Globe className="w-4 h-4" /> Live Demo
                        </a>
                    )}
                    {project.links?.repo && (
                        <a href={project.links.repo} target="_blank" rel="noopener noreferrer"
                            className={`flex items-center justify-center gap-2 p-3 rounded-lg bg-white/5 text-white font-medium text-sm border border-white/10 ${!project.links.demo ? 'col-span-2' : ''}`}>
                            <Github className="w-4 h-4" /> Source
                        </a>
                    )}
                </div>
            </div>

            {/* Inline Gallery Overlay (Opens within the project card area) */}
            <AnimatePresence>
                {showGallery && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-start justify-center overflow-y-auto"
                        onClick={() => setShowGallery(false)}
                    >
                        {/* Gallery Container — auto-height based on image aspect ratio */}
                        <div
                            className="relative w-full max-w-3xl mx-auto my-8 md:my-16 px-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setShowGallery(false)}
                                className="absolute -top-2 right-2 md:right-0 p-2 rounded-full bg-black/60 border border-white/10 text-white z-50 backdrop-blur-sm hover:bg-black/80 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Image — natural aspect ratio */}
                            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-surface/50">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={galleryIdx}
                                        src={gallery[galleryIdx]}
                                        alt={`${project.title} screenshot ${galleryIdx + 1}`}
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        dragElastic={0.2}
                                        onDragEnd={(_, { offset }) => {
                                            if (offset.x < -50) goGalleryNext();
                                            else if (offset.x > 50) goGalleryPrev();
                                        }}
                                        draggable={false}
                                        initial={{ opacity: 0, scale: 0.97 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.97 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-full h-auto object-contain cursor-grab active:cursor-grabbing"
                                    />
                                </AnimatePresence>
                            </div>

                            {/* Navigation & Indicators */}
                            {gallery.length > 1 && (
                                <div className="flex items-center justify-center gap-4 pt-4">
                                    <button onClick={goGalleryPrev} type="button" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <div className="flex items-center gap-2">
                                        {gallery.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setGalleryIdx(i)}
                                                className={`rounded-full transition-all ${i === galleryIdx ? "w-3 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"}`}
                                            />
                                        ))}
                                    </div>
                                    <button onClick={goGalleryNext} type="button" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Helpers
const StatusBadge = ({ status }: { status: string }) => {
    let classes = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"; // Default: Live
    if (status === "Beta") classes = "bg-amber-500/10 border-amber-500/30 text-amber-400";
    if (status === "Work in Progress") classes = "bg-amber-500/10 border-amber-500/30 text-amber-400";
    if (status === "In Development") classes = "bg-sky-500/10 border-sky-500/30 text-sky-400";
    if (status === "Concept") classes = "bg-purple-500/10 border-purple-500/30 text-purple-400";
    if (status === "Discontinued") classes = "bg-red-500/10 border-red-500/30 text-red-400";

    return (
        <span className={`inline-block w-fit px-3 py-1 text-sm font-mono rounded-full border ${classes}`}>{status}</span>
    );
};

const TechStack = ({ stack }: { stack: string[] }) => (
    <div className="flex flex-wrap gap-2">
        {stack.map(t => <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/80 font-mono">{t}</span>)}
    </div>
);

const ProjectLinks = ({ links, isMobile = false }: { links: any, isMobile?: boolean }) => (
    <div className={`flex gap-4 ${isMobile ? 'pt-2' : ''}`}>
        {links?.video && (
            <a href={links.video} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-white text-black font-semibold rounded-lg hover:bg-white/90 flex items-center gap-2 text-sm">
                <Play className="w-4 h-4 fill-black" /> Watch Log
            </a>
        )}
        {links?.demo && (
            <a href={links.demo} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4" /> Live Demo
            </a>
        )}
        {links?.repo && (
            <a href={links.repo} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 text-white rounded-lg hover:bg-white/10">
                <Github className="w-5 h-5" />
            </a>
        )}
    </div>
);

