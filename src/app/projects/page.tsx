"use client";

import { useState } from "react";
import Link from "next/link";
import { archiveProjects, Project } from "@/data/portfolio";
import { ArrowLeft, Github, ExternalLink, Filter } from "lucide-react";

export default function ProjectsArchivePage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "COMMISSIONED", "PERSONAL"];

  const filteredProjects =
    activeCategory === "All"
      ? archiveProjects
      : archiveProjects.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-[100dvh] bg-[#090a0c] text-neutral-200 px-4 py-8 sm:px-8 sm:py-16 font-mono selection:bg-emerald-500/20 selection:text-emerald-300">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Top Back Nav */}
        <div>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Overview</span>
          </Link>
        </div>

        {/* Page Title & Meta */}
        <div className="space-y-3 border-b border-neutral-800 pb-6">
          <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
            COMPLETE ARCHIVE
          </div>
          <h1 className="font-pixel text-3xl sm:text-4xl text-neutral-100 uppercase tracking-wide">
            PROJECT REPOSITORY
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed">
            Index of commercial tools, personal autonomous systems, mobile apps, and hardware lab builds.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <div className="flex items-center gap-1.5 text-sm text-neutral-500 mr-2">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`cursor-pointer px-3 py-1.5 text-sm rounded-sm transition-colors ${
                activeCategory === cat
                  ? "bg-emerald-500 text-black font-bold"
                  : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-neutral-200 hover:bg-neutral-800"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="text-sm text-neutral-500 ml-auto hidden sm:inline">
            Showing {filteredProjects.length} of {archiveProjects.length} records
          </span>
        </div>

        {/* Desktop Archive Table View */}
        <div className="hidden md:block rounded-sm border border-neutral-800 bg-[#0f1115] overflow-hidden">
          <div className="grid grid-cols-12 gap-4 border-b border-neutral-800 bg-neutral-900/60 p-4 text-sm font-bold text-neutral-400 uppercase tracking-wider">
            <div className="col-span-1">Year</div>
            <div className="col-span-4">Project &amp; Summary</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-3">Tech Stack</div>
            <div className="col-span-2 text-right">Links</div>
          </div>

          <div className="divide-y divide-neutral-800/60">
            {filteredProjects.map((project: Project) => (
              <div
                key={project.id}
                className="grid grid-cols-12 gap-4 p-4 text-sm items-center hover:bg-neutral-800/30 transition-colors"
              >
                {/* Year */}
                <div className="col-span-1 text-neutral-500 text-xs font-bold">
                  {project.year}
                </div>

                {/* Title & Tagline */}
                <div className="col-span-4 space-y-1">
                  <div className="font-pixel text-base text-neutral-100 uppercase tracking-wide">
                    {project.title}
                  </div>
                  <div className="text-xs text-neutral-400 leading-snug">
                    {project.tagline}
                  </div>
                </div>

                {/* Category */}
                <div className="col-span-2">
                  <span
                    className={`inline-block rounded-sm px-2.5 py-0.5 text-xs font-bold font-mono uppercase tracking-wider ${
                      project.category === "COMMISSIONED"
                        ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-400"
                        : "bg-neutral-800 border border-neutral-600 text-neutral-200"
                    }`}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Tech Stack */}
                <div className="col-span-3 flex flex-wrap gap-1">
                  {project.techStack.map((t) => (
                    <span
                      key={t}
                      className="rounded-sm bg-neutral-950 px-1.5 py-0.5 text-xs text-neutral-400 border border-neutral-800/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="col-span-2 flex items-center justify-end gap-3 text-sm">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                      title="GitHub Repository"
                    >
                      <Github className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                      title="Live System"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">Live Demo</span>
                    </a>
                  )}
                  {!project.repoUrl && !project.liveUrl && (
                    <span className="text-xs text-neutral-600">Client / Internal</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Archive Cards View */}
        <div className="md:hidden space-y-4">
          {filteredProjects.map((project: Project) => (
            <div
              key={project.id}
              className="rounded-sm border border-neutral-800 bg-[#0f1115] p-5 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span
                  className={`inline-block rounded-sm px-2.5 py-0.5 text-xs font-bold font-mono uppercase tracking-wider ${
                    project.category === "COMMISSIONED"
                      ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-400"
                      : "bg-neutral-800 border border-neutral-600 text-neutral-200"
                  }`}
                >
                  {project.category}
                </span>
                <span className="text-sm text-neutral-500 font-bold">{project.year}</span>
              </div>

              <div>
                <h3 className="font-pixel text-lg text-neutral-100 uppercase tracking-wide">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-400 mt-0.5">{project.tagline}</p>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-1 pt-1">
                {project.techStack.map((t) => (
                  <span
                    key={t}
                    className="rounded-sm bg-neutral-900 px-1.5 py-0.5 text-xs text-neutral-400 border border-neutral-800"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {(project.repoUrl || project.liveUrl) && (
                <div className="pt-2 border-t border-neutral-800 flex gap-4 text-sm">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span>Source</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Live App</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
