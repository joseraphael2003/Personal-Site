"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/** Shared with the pre-paint script in app/layout.tsx. */
export const THEME_STORAGE_KEY = "portfolio-theme";

export type ThemeId = "dark" | "light";

/** Chromium typing for the crossfade API, which lib.dom may not carry yet. */
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> };
};

/**
 * Writes the theme to <html> and mirrors it for the next visit's pre-paint
 * script. Dark is the default, but the attribute is always written so the
 * CSS and the pre-paint script agree on one source of truth.
 */
function applyTheme(theme: ThemeId) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable
  }
}

/**
 * Sun / moon toggle. Both icons ship in the markup and CSS (the `light:`
 * variant) decides which one paints, so the first render matches the server's.
 * The stored theme is read in an effect, never during render.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<ThemeId>("dark");

  useEffect(() => {
    const sync = () => {
      setTheme(document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");
    };
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const next: ThemeId = theme === "dark" ? "light" : "dark";
  const label = `Theme: ${theme === "dark" ? "Dark" : "Light"} (click for ${next === "dark" ? "Dark" : "Light"})`;

  const handleClick = () => {
    const doc = document as ViewTransitionDocument;
    const crossfade = typeof doc.startViewTransition === "function" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (crossfade) {
      doc.startViewTransition(() => applyTheme(next));
    } else {
      applyTheme(next);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={label}
      className={`inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-edge transition-colors hover:border-edge-strong focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-edge-strong ${className}`}
    >
      <Sun aria-hidden className="h-3.5 w-3.5 light:hidden" />
      <Moon aria-hidden className="hidden h-3.5 w-3.5 light:block" />
    </button>
  );
}
