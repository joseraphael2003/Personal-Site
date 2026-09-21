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

        {/* Timeline Structure (Segmented Terminal Brackets) */}
        <div className="space-y-6">
          {/* 1. Current Active Role (Always Visible) */}
          {currentRole && (
            <div className="rounded-sm border border-neutral-800 border-l-2 border-l-emerald-500 bg-[#0f1115] p-5 sm:p-7 space-y-4 hover:border-neutral-700 transition-colors shadow-sm">
                {/* Meta Row */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-800 pb-3">
                  <div>
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
          )}

          {/* 2. Historical Roles (Animated Collapsible Container) */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 22 }}
                className="space-y-6 overflow-hidden pt-2"
              >
                {historicalRoles.map((role, idx) => (
                  <div
                    key={`${role.company}-${idx}`}
                    className="rounded-sm border border-neutral-800 border-l-2 border-l-neutral-700 bg-[#0f1115] p-5 sm:p-7 space-y-4 hover:border-neutral-700 transition-colors shadow-sm"
                  >
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
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. Expand / Collapse Action Control (Compact Solid Emerald Button) */}
          <div className="pt-2 flex justify-start">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              className="cursor-pointer rounded-sm bg-emerald-500 px-5 py-2.5 text-sm font-mono font-bold text-black hover:bg-emerald-400 transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <span>
                {expanded
                  ? "Collapse to Current Role"
                  : `Expand Full Career Ledger (${workExperience.length} Roles Total)`}
              </span>
              {expanded ? <ChevronUp className="h-4 w-4 text-black" /> : <ChevronDown className="h-4 w-4 text-black" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
