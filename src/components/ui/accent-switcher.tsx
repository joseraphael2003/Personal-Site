"use client";

import { useEffect, useState } from "react";
import { Popover } from "@base-ui/react";
import { Check, Crosshair } from "lucide-react";

/** Shared with the pre-paint script in app/layout.tsx. */
export const ACCENT_STORAGE_KEY = "portfolio-accent";

export type AccentId = "emerald" | "cyan" | "violet" | "amber" | "rose";

type AccentPreset = {
  id: AccentId;
  label: string;
  color: string;
  glow: string;
};

/** Mirrors the `[data-accent]` blocks in app/globals.css. */
export const ACCENT_PRESETS: AccentPreset[] = [
  { id: "emerald", label: "Emerald", color: "#10b981", glow: "rgba(16, 185, 129, 0.2)" },
  { id: "cyan", label: "Cyan", color: "#06b6d4", glow: "rgba(6, 182, 212, 0.2)" },
  { id: "violet", label: "Violet", color: "#8b5cf6", glow: "rgba(139, 92, 246, 0.2)" },
  { id: "amber", label: "Amber", color: "#f59e0b", glow: "rgba(245, 158, 11, 0.2)" },
  { id: "rose", label: "Rose", color: "#f43f5e", glow: "rgba(244, 63, 94, 0.2)" },
];

function isAccentId(value: string | null): value is AccentId {
  return value !== null && ACCENT_PRESETS.some((preset) => preset.id === value);
}

/**
 * Applies a preset: `data-accent` on <html> retargets every `--accent-*` token
 * at once, and localStorage mirrors the choice for the next visit's pre-paint
 * script. Shared with the mobile swatch strip in the header.
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
 * Compact reticle trigger plus swatch popover. The active row follows the
 * `data-accent` attribute on <html>, so the mobile swatch strip stays in sync.
 */
export function AccentSwitcher({ className = "" }: { className?: string }) {
  const [accent, setAccent] = useState<AccentId>("emerald");
  const [open, setOpen] = useState(false);

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

  const applyAccent = (preset: AccentId) => {
    applyAccentPreset(preset);
    setAccent(preset);
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        aria-label="Accent color"
        title="Accent color"
        className={`group inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-neutral-800 transition-colors hover:border-neutral-700 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-600 data-[popup-open]:border-neutral-700 data-[popup-open]:bg-white/[0.04] ${className}`}
      >
        <Crosshair
          className="h-3.5 w-3.5"
          style={{
            color: "var(--accent-color, #10b981)",
            filter: "drop-shadow(0 0 4px var(--accent-glow, rgba(16, 185, 129, 0.2)))",
          }}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="bottom" align="end" sideOffset={8} className="z-50">
          <Popover.Popup className="w-44 rounded-sm border border-neutral-800 bg-[#0c0e12] p-2 font-mono text-xs shadow-xl">
            <p className="px-1.5 pb-1 text-[10px] uppercase tracking-[0.18em] text-neutral-500">
              Accent
            </p>
            <div className="flex flex-col gap-0.5">
              {ACCENT_PRESETS.map((preset) => {
                const isActive = accent === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyAccent(preset.id)}
                    aria-pressed={isActive}
                    className={`flex cursor-pointer items-center gap-2 rounded-sm px-1.5 py-1 text-left transition-colors ${
                      isActive
                        ? "bg-white/[0.06] text-neutral-100"
                        : "text-neutral-400 hover:bg-white/[0.04] hover:text-neutral-100"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="h-2.5 w-2.5 shrink-0 rounded-full border"
                      style={{ borderColor: preset.color, backgroundColor: preset.glow }}
                    />
                    <span className="flex-1">{preset.label}</span>
                    {isActive && (
                      <Check
                        className="h-3 w-3"
                        style={{ color: "var(--accent-color, #10b981)" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
