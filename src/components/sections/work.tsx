"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { workExperience } from "@/data/portfolio";
import { pressableMotion } from "@/lib/motion";
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp } from "lucide-react";

type Role = (typeof workExperience)[number];

/** One bullet: a rail dot plus the bullet text. */
function Bullet({ text, dotClass }: { text: string; dotClass: string }) {
  return (
    <>
      <span className={`h-1.5 w-1.5 rounded-full ${dotClass} mt-1.5 shrink-0`} />
      <span>{text}</span>
    </>
  );
}

/**
 * One timeline entry. `current` is the always-visible active role (accent rail
 * node, accent bullets, summary/full toggle); `historical` is a collapsed-ledger
 * entry (hollow node, muted lead-ins).
 */
function RoleCard({
  role,
  variant,
  expanded = false,
}: {
  role: Role;
  variant: "current" | "historical";
  expanded?: boolean;
}) {
  const isCurrent = variant === "current";

  return (
    <div className="relative space-y-4">
      {/* Role Node (Centered exactly over 1px rail border) */}
      <div
        className={
          isCurrent
            ? "absolute -left-[29.5px] sm:-left-[37.5px] top-6 h-2.5 w-2.5 bg-accent-hover shadow-[0_0_8px_color-mix(in_srgb,var(--accent-hover)_50%,transparent)]"
            : "absolute -left-[28.5px] sm:-left-[36.5px] top-6 h-2 w-2 bg-page border border-edge-strong"
        }
        aria-hidden="true"
      />

      <div className="rounded-sm border border-edge bg-surface p-4 sm:p-6 lg:p-7 space-y-4 hover:border-edge-strong transition-colors shadow-sm">
        {/* Meta Row */}
        <div className="flex flex-row flex-wrap sm:flex-nowrap items-start sm:items-baseline justify-between gap-2 border-b border-edge pb-2.5 sm:pb-3">
          <div>
            <h3 className="font-text font-bold text-base sm:text-lg text-ink">
              {role.role}
            </h3>
            <div className="text-sm text-muted mt-0.5 flex items-center gap-1.5">
              <Briefcase className={`h-4 w-4 ${isCurrent ? "text-accent-hover" : "text-muted"}`} />
              <span className="text-body font-bold">{role.company}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-subtle">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-muted" />
              <span className="text-copy">{role.period}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-muted" />
              <span>{role.location}</span>
            </div>
          </div>
        </div>

        {/* Bullets: the active role morphs between summary and full bullets */}
        {isCurrent ? (
          <div className="text-xs sm:text-sm text-copy">
            {!expanded ? (
              /* Collapsed View: Single Summary Bullet */
              <div className="flex items-start gap-2.5 leading-normal sm:leading-relaxed py-1 text-body">
                <Bullet text={role.summaryBullet || role.bullets[0]} dotClass="bg-accent-hover" />
              </div>
            ) : (
              /* Expanded View: All Detailed Bullets */
              <ul className="space-y-2 sm:space-y-2.5">
                {role.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5 leading-normal sm:leading-relaxed">
                    <Bullet text={bullet} dotClass="bg-accent-hover" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-copy">
            {role.bullets.map((bullet, bIdx) => (
              <li key={bIdx} className="flex items-start gap-2.5 leading-normal sm:leading-relaxed">
                <Bullet text={bullet} dotClass="bg-faint" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function Work() {
  const [expanded, setExpanded] = useState(false);

  const currentRole = workExperience[0];
  const historicalRoles = workExperience.slice(1);

  return (
    <section id="work" className="w-full border-b border-edge/80 bg-page py-10 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 space-y-10 font-text">
        {/* Section Header */}
        <div className="border-b border-edge pb-4">
          <h2 className="font-display text-2xl sm:text-3xl text-ink uppercase tracking-wide">
            Work Experience
          </h2>
        </div>

        {/* Timeline Rail */}
        <div className="relative pl-6 sm:pl-8 border-l border-edge space-y-8">
          {/* 1. Current Active Role (Always Visible) */}
          {currentRole && <RoleCard role={currentRole} variant="current" expanded={expanded} />}

          {/* 2. Historical Roles (Collapsible) */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 22 }}
                className="space-y-8 overflow-hidden -ml-8 sm:-ml-10 pl-8 sm:pl-10 pt-2"
              >
                {historicalRoles.map((role, idx) => (
                  <RoleCard key={`${role.company}-${idx}`} role={role} variant="historical" />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. Expand / Collapse Action Control (Centered Compact Solid Emerald Button) */}
        <div className="pt-4 flex justify-center">
          <motion.div {...pressableMotion}>
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              className="cursor-pointer rounded-sm bg-accent px-5 py-2.5 text-sm font-text font-bold text-on-accent hover:bg-accent-hover btn-accent transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <span>
                {expanded
                  ? "Collapse to Current Role"
                  : `Expand Full Career Ledger (${workExperience.length} Roles Total)`}
              </span>
              {expanded ? <ChevronUp className="h-4 w-4 text-on-accent" /> : <ChevronDown className="h-4 w-4 text-on-accent" />}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
