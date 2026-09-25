"use client";

import { ReactNode } from "react";
import { Tooltip } from "@base-ui/react";

interface AcronymTooltipProps {
  children: ReactNode;
  content: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  tabIndex?: number;
  className?: string;
}

export function AcronymTooltip({
  children,
  content,
  side = "top",
  tabIndex,
  className,
}: AcronymTooltipProps) {
  return (
    <Tooltip.Provider delay={150}>
      <Tooltip.Root>
        <Tooltip.Trigger
          tabIndex={tabIndex}
          className={
            className ||
            "cursor-help underline decoration-faint decoration-dotted underline-offset-4 hover:decoration-accent-hover transition-colors focus-visible:outline-none"
          }
        >
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner side={side} sideOffset={6} className="z-50">
            <Tooltip.Popup className="rounded-sm border border-edge-strong bg-raised px-2.5 py-1.5 text-[11px] font-text text-body shadow-xl max-w-xs leading-relaxed animate-in fade-in-0 zoom-in-95 duration-100">
              {content}
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
