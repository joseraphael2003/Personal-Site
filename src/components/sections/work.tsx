"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { workExperience } from "@/data/portfolio";
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp } from "lucide-react";

export function Work() {
  const [expanded, setExpanded] = useState(false);

  const currentRole = workExperience[0];
  const historicalRoles = workExperience.slice(1);

  return (
    <section id="work" className="w-full border-b border-neutral-800/80 bg-[#090a0c] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 space-y-10 font-mono">
        {/* Section Header */}
        <div className="border-b border-neutral-800 pb-4">
          <h2 className="font-pixel text-2xl sm:text-3xl text-neutral-100 uppercase tracking-wide">
            WORK EXPERIENCE
          </h2>
        </div>

        {/* Timeline Structure */}
        <div className="relative pl-6 sm:pl-8 border-l border-neutral-800 space-y-10">
          {/* 1. Current Active Role (Always Visible) */}
          {currentRole && (
            <div className="relative space-y-4">
              {/* Timeline Node Dot (Active Emerald Indicator) */}
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-3.5 w-3.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20"
                aria-hidden="true"
              />

              {/* Role Card / Content */}
              <div className="rounded-sm border border-neutral-800 bg-[#0f1115] p-5 sm:p-7 space-y-4 hover:border-neutral-700 transition-colors">
                {/* Meta Row */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-800 pb-3">
                  <div>
                    <div className="inline-flex items-center gap-2 mb-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs text-emerald-400 uppercase tracking-wider font-bold">
                        CURRENT ROLE
                      </span>
                    </div>
                    <h3 className="font-pixel text-lg sm:text-xl text-neutral-100">
                      {currentRole.role}
                    </h3>
                    <div className="text-sm text-neutral-400 mt-0.5 flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4 text-emerald-400" />
                      <span className="text-neutral-200 font-bold">{currentRole.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                      <span className="text-neutral-300">{currentRole.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-neutral-400" />
                      <span>{currentRole.location}</span>
                    </div>
                  </div>
                </div>

                {/* Bullets: Morph / Switch between Summary and Full Bullets */}
                <div className="text-sm text-neutral-300">
                  {!expanded ? (
                    /* Collapsed View: Single Summary Bullet */
                    <div className="flex items-start gap-2.5 leading-relaxed py-1 text-neutral-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{currentRole.summaryBullet || currentRole.bullets[0]}</span>
                    </div>
                  ) : (
                    /* Expanded View: All Detailed Bullets */
                    <ul className="space-y-2.5">
                      {currentRole.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 leading-relaxed">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. Historical Roles (Animated Collapsible Container) */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="space-y-10 overflow-hidden -ml-8 sm:-ml-10 pl-8 sm:pl-10"
              >
                {historicalRoles.map((role, idx) => (
                  <div key={`${role.company}-${idx}`} className="relative space-y-4 pt-4 first:pt-0">
                    {/* Timeline Node Dot (Neutral Zinc Milestone) */}
                    <div
                      className="absolute -left-[31px] sm:-left-[39px] top-6 h-2.5 w-2.5 rounded-full bg-neutral-600 ring-4 ring-[#090a0c]"
                      aria-hidden="true"
                    />

                    {/* Role Card */}
                    <div className="rounded-sm border border-neutral-800 bg-[#0f1115] p-5 sm:p-7 space-y-4 hover:border-neutral-700 transition-colors">
                      {/* Meta Row */}
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-800 pb-3">
                        <div>
                          <h3 className="font-pixel text-lg sm:text-xl text-neutral-100">
                            {role.role}
                          </h3>
                          <div className="text-sm text-neutral-400 mt-0.5 flex items-center gap-1.5">
                            <Briefcase className="h-4 w-4 text-neutral-400" />
                            <span className="text-neutral-200 font-bold">{role.company}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                            <span className="text-neutral-300">{role.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-neutral-400" />
                            <span>{role.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bullets */}
                      <ul className="space-y-2.5 text-sm text-neutral-300">
                        {role.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 leading-relaxed">
                            <span className="h-1.5 w-1.5 rounded-full bg-neutral-600 mt-1.5 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. Expand / Collapse Action Control */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              className="w-full rounded-sm border border-emerald-500/40 bg-emerald-950/20 px-5 py-3.5 text-sm font-mono font-bold text-emerald-300 hover:bg-emerald-900/30 hover:border-emerald-400 transition-all flex items-center justify-between gap-3 shadow-[0_0_15px_rgba(16,185,129,0.08)] cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {expanded
                    ? "Collapse to Current Role"
                    : `Expand Full Career Ledger (${workExperience.length} Roles Total)`}
                </span>
              </div>
              <span className="rounded-sm border border-emerald-500/30 bg-emerald-500/10 p-1 text-emerald-300 group-hover:bg-emerald-500/20 transition-colors">
                {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
