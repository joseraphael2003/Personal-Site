"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/**
 * Applies the visitor's `prefers-reduced-motion` setting to every
 * framer-motion animation below it. MotionConfig disables transform,
 * layout and size animations (x/y/scale/rotate/width/height/insets), so
 * those jump straight to their target while opacity fades still run.
 * The GSAP-driven marquee opts out separately, in draggable-marquee.tsx.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
