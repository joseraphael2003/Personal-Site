"use client";

import { useState, useEffect } from "react";
import { Project } from "@/lib/data/projects";
import { ChevronLeft, ChevronRight, Github, Globe, Play } from "lucide-react";

interface ProjectSpotlightProps {
    projects: Project[];
}

export function ProjectSpotlight({ projects }: ProjectSpotlightProps) {
    const [activeIdx, setActiveIdx] = useState(0);
    const [galleryIdx, setGalleryIdx] = useState(0);

    // Reset gallery index when project changes
    useEffect(() => {
        setGalleryIdx(0);
    }, [activeIdx]);
    if (!projects || projects.length === 0) {
        return <div className="text-white">No projects available</div>;
    }

    const project = projects[activeIdx];
    const hasMultiple = projects.length > 1;
    const gallery = project?.assets?.gallery || [];
    const hasGallery = gallery.length > 0;

    const goNext = () => setActiveIdx((prev) => (prev + 1) % projects.length);
    const goPrev = () => setActiveIdx((prev) => (prev - 1 + projects.length) % projects.length);
    const goGalleryNext = () => setGalleryIdx((prev) => (prev + 1) % gallery.length);
    const goGalleryPrev = () => setGalleryIdx((prev) => (prev - 1 + gallery.length) % gallery.length);

    // Get adjacent images for bokeh effect
    const prevGalleryImg = gallery[(galleryIdx - 1 + gallery.length) % gallery.length];
    const nextGalleryImg = gallery[(galleryIdx + 1) % gallery.length];

    return (
        <div className="w-full">
            {/* === DESKTOP VERSION === */}
            <div className="hidden lg:block">
                {hasGallery ? (
                    /* Two-Column Layout: Gallery (60%) + Info (40%) */
                    <div className="relative w-full min-h-[650px] rounded-2xl overflow-hidden bg-surface border border-white/10 grid grid-cols-5">
                        {/* Left Column: Gallery Images */}
                        <div className="col-span-3 relative flex items-center justify-center overflow-hidden bg-black/60">
                            {/* Noise Overlay */}
                            <div
                                className="absolute inset-0 opacity-[0.03] pointer-events-none z-10"
                                style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }}
                            />

                            {/* Bokeh/Blurred Background - Previous Image */}
                            {gallery.length > 1 && (
                                <>
                                    <img
                                        src={prevGalleryImg}
                                        alt=""
                                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 h-[400px] w-auto object-contain blur-xl opacity-30 scale-90"
                                    />
                                    <img
                                        src={nextGalleryImg}
                                        alt=""
                                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 h-[400px] w-auto object-contain blur-xl opacity-30 scale-90"
                                    />
                                </>
                            )}

                            {/* Dark gradient overlay for depth */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-[5]" />

                            {/* Main Gallery Image */}
                            <img
                                src={gallery[galleryIdx]}
                                alt={`${project.title} screenshot ${galleryIdx + 1}`}
                                className="relative z-20 max-h-[580px] w-auto object-contain rounded-xl shadow-2xl"
                            />

                            {/* Gallery Navigation */}
                            {gallery.length > 1 && (
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 z-30">
                                    <button type="button" onClick={goGalleryPrev}
                                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <span className="text-white/70 text-xs font-mono">
                                        {galleryIdx + 1} / {gallery.length}
                                    </span>
                                    <button type="button" onClick={goGalleryNext}
                                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Project Info */}
                        <div className="col-span-2 p-10 space-y-6 flex flex-col justify-center bg-gradient-to-l from-black/90 to-black/60">
                            {/* Status */}
                            <span className={`inline-block w-fit px-3 py-1 text-sm font-mono rounded-full border ${project.status === "Live"
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                                }`}>
                                {project.status}
                            </span>

                            {/* Title */}
                            <h3 className="text-4xl font-bold text-white">{project.title}</h3>

                            {/* Description */}
                            <p className="text-base text-muted-text leading-relaxed">{project.description}</p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech) => (
                                    <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/80 font-mono">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Links */}
                            <div className="flex gap-4 pt-4">
                                {project.links?.video && (
                                    <a href={project.links.video} target="_blank" rel="noopener noreferrer"
                                        className="px-5 py-2.5 bg-white text-black font-semibold rounded-lg hover:bg-white/90 flex items-center gap-2 text-sm">
                                        <Play className="w-4 h-4 fill-black" /> Watch Log
                                    </a>
                                )}
                                {project.links?.demo && (
                                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                                        className="px-5 py-2.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 flex items-center gap-2 text-sm">
                                        <Globe className="w-4 h-4" /> Live Demo
                                    </a>
                                )}
                                {project.links?.repo && (
                                    <a href={project.links.repo} target="_blank" rel="noopener noreferrer"
                                        className="p-2.5 bg-white/5 text-white rounded-lg hover:bg-white/10">
                                        <Github className="w-5 h-5" />
                                    </a>
                                )}
                            </div>

                            {/* Project Navigation (if multiple projects) */}
                            {hasMultiple && (
                                <div className="flex items-center gap-4 pt-6 border-t border-white/10 mt-auto">
                                    <button type="button" onClick={goPrev}
                                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center">
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <div className="flex gap-2">
                                        {projects.map((_, idx) => (
                                            <button key={idx} type="button" onClick={() => setActiveIdx(idx)}
                                                className={`w-2 h-2 rounded-full transition-colors ${idx === activeIdx ? "bg-white" : "bg-white/30"}`} />
                                        ))}
                                    </div>
                                    <button type="button" onClick={goNext}
                                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    /* Full-Width Layout: No Gallery */
                    <div className="relative w-full min-h-[500px] rounded-2xl overflow-hidden bg-surface border border-white/10 flex items-center justify-center p-16">
                        {/* Noise Overlay */}
                        <div
                            className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1]"
                            style={{ backgroundImage: "url('/noise.png')", backgroundRepeat: "repeat" }}
                        />

                        {/* Dark Gradient Background (matching gallery style) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

                        {/* Content - Centered */}
                        <div className="relative z-10 max-w-3xl text-center space-y-6">
                            {/* Status */}
                            <span className={`inline-block px-4 py-1.5 text-sm font-mono rounded-full border ${project.status === "Live"
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                                }`}>
                                {project.status}
                            </span>

                            {/* Title */}
                            <h3 className="text-5xl font-bold text-white">{project.title}</h3>

                            {/* Description */}
                            <p className="text-lg text-muted-text leading-relaxed">{project.description}</p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap justify-center gap-2">
                                {project.techStack.map((tech) => (
                                    <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/80 font-mono">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Links */}
                            <div className="flex justify-center gap-4 pt-4">
                                {project.links?.demo && (
                                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                                        className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 flex items-center gap-2">
                                        <Globe className="w-4 h-4" /> Visit Site
                                    </a>
                                )}
                                {project.links?.repo && (
                                    <a href={project.links.repo} target="_blank" rel="noopener noreferrer"
                                        className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 flex items-center gap-2">
                                        <Github className="w-5 h-5" /> View Source
                                    </a>
                                )}
                            </div>

                            {/* Project Navigation (if multiple projects) */}
                            {hasMultiple && (
                                <div className="flex items-center justify-center gap-4 pt-8 border-t border-white/10">
                                    <button type="button" onClick={goPrev}
                                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center">
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <div className="flex gap-2">
                                        {projects.map((_, idx) => (
                                            <button key={idx} type="button" onClick={() => setActiveIdx(idx)}
                                                className={`w-2 h-2 rounded-full transition-colors ${idx === activeIdx ? "bg-white" : "bg-white/30"}`} />
                                        ))}
                                    </div>
                                    <button type="button" onClick={goNext}
                                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* === MOBILE VERSION (Vertical Stack) === */}
            <div className="lg:hidden space-y-12">
                {projects.map((proj) => (
                    <div key={proj.id} className="space-y-4">
                        {/* Image (only if has gallery) */}
                        {proj.assets?.gallery && proj.assets.gallery.length > 0 && (
                            <div className="aspect-video rounded-xl overflow-hidden border border-white/10 bg-surface">
                                <img src={proj.assets.gallery[0]} alt={proj.title} className="w-full h-full object-cover" />
                            </div>
                        )}

                        {/* Info */}
                        <div className="w-full space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-white">{proj.title}</h3>
                                <span className={`px-2 py-0.5 text-[10px] font-mono rounded-full border ${proj.status === "Live"
                                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                    : "bg-primary/10 border-primary/30 text-primary"
                                    }`}>
                                    {proj.status}
                                </span>
                            </div>
                            <p className="text-sm text-muted-text">{proj.description}</p>
                            <div className="flex gap-3 pt-2">
                                {proj.links?.video && (
                                    <a href={proj.links.video} target="_blank" rel="noopener noreferrer"
                                        className="text-xs font-mono text-white underline underline-offset-4">
                                        WATCH LOG
                                    </a>
                                )}
                                {proj.links?.demo && (
                                    <a href={proj.links.demo} target="_blank" rel="noopener noreferrer"
                                        className="text-xs font-mono text-white underline underline-offset-4">
                                        VISIT
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
