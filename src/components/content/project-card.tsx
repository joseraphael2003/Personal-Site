"use client";

import { motion } from "framer-motion";
import { Project } from "@/lib/data/projects";
import { VideoThumbnail } from "./video-thumbnail";
import { AssetCarousel } from "./asset-carousel";
import { Github, Globe } from "lucide-react";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start py-8 md:py-16 border-b border-white/5 last:border-0">
            {/* Left Column: Context (Sticky on Desktop) */}
            <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
                <header className="space-y-4">
                    <div className="flex items-center gap-3">
                        <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight">{project.title}</h3>
                        <span className={`px-2 py-0.5 text-xs font-mono rounded-full border ${project.status === "Live" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                            project.status === "Beta" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" :
                                "bg-primary/10 border-primary/20 text-primary"
                            }`}>
                            {project.status}
                        </span>
                    </div>

                    <p className="text-muted-text text-sm md:text-lg leading-relaxed">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                            <span key={tech} className="px-2 py-1 bg-white/5 rounded text-xs text-muted-text/80 font-mono">
                                {tech}
                            </span>
                        ))}
                    </div>
                </header>

                {/* Actions (Video & Links) */}
                <div className="space-y-4">
                    {project.links?.video && (
                        <div className="space-y-2">
                            <span className="text-xs font-mono text-muted-text/60 uppercase tracking-widest">Documentation Log</span>
                            <VideoThumbnail
                                thumbnail={project.assets?.thumbnail || ""}
                                videoUrl={project.links.video}
                                title={project.title}
                            />
                        </div>
                    )}

                    <div className="flex gap-4 pt-2">
                        {project.links?.demo && (
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white hover:text-primary transition-colors">
                                <Globe className="w-4 h-4" /> Live Demo
                            </a>
                        )}
                        {project.links?.repo && (
                            <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white hover:text-primary transition-colors">
                                <Github className="w-4 h-4" /> Repository
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Column: Visuals (Scrollable) */}
            <div className="lg:col-span-8 w-full min-w-0">
                <div className="space-y-4">
                    <span className="text-xs font-mono text-muted-text/60 uppercase tracking-widest lg:hidden">Interface Gallery</span>
                    <AssetCarousel images={project.assets?.gallery || []} title={project.title} />
                    <p className="text-xs text-center text-muted-text/40 font-mono hidden md:block mt-2">
                        &lt; Scroll to explore interface &gt;
                    </p>
                </div>
            </div>
        </div>
    );
}
