"use client";

import { useEffect, useState } from "react";

/** Shared with the pre-paint script in app/layout.tsx. */
export const ACCENT_STORAGE_KEY = "portfolio-accent";

export type AccentId = "emerald" | "cyan" | "violet" | "amber" | "rose";

type AccentPreset = {
  id: AccentId;
  label: string;
};

/** Mirrors the `[data-accent]` blocks in app/globals.css. Order is the cycle. */
export const ACCENT_PRESETS: AccentPreset[] = [
  { id: "emerald", label: "Emerald" },
  { id: "cyan", label: "Cyan" },
  { id: "violet", label: "Violet" },
  { id: "amber", label: "Amber" },
  { id: "rose", label: "Rose" },
];

function isAccentId(value: string | null): value is AccentId {
  return value !== null && ACCENT_PRESETS.some((preset) => preset.id === value);
}

/**
 * Applies a preset: `data-accent` on <html> retargets every `--accent-*` token
 * at once, and localStorage mirrors the choice for the next visit's pre-paint
 * script.
 */
export function applyAccentPreset(preset: AccentId) {
  document.documentElement.setAttribute("data-accent", preset);
  try {
    localStorage.setItem(ACCENT_STORAGE_KEY, preset);
  } catch {
    // Storage can be unavailable
  }
}

/**
 * One button that walks ACCENT_PRESETS in order. The label names the current
 * preset and the next one, so the single click is self-describing. The active
 * preset follows the `data-accent` attribute on <html>, which the pre-paint
 * script restores before hydration.
 */
export function AccentCycle({ className = "" }: { className?: string }) {
  const [accent, setAccent] = useState<AccentId>("emerald");

  useEffect(() => {
    const updateAccent = () => {
      const applied = document.documentElement.getAttribute("data-accent");
      if (isAccentId(applied)) setAccent(applied);
    };
    updateAccent();

    const observer = new MutationObserver(updateAccent);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-accent"] });
    return () => observer.disconnect();
  }, []);

  const index = ACCENT_PRESETS.findIndex((preset) => preset.id === accent);
  const current = ACCENT_PRESETS[index];
  const next = ACCENT_PRESETS[(index + 1) % ACCENT_PRESETS.length];
  const label = `Accent: ${current.label} (click for ${next.label})`;

  return (
    <button
      type="button"
      onClick={() => applyAccentPreset(next.id)}
      aria-label={label}
      title={label}
      className={`inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-edge transition-colors hover:border-edge-strong focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-edge-strong ${className}`}
    >
      <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-accent" />
    </button>
  );
}
