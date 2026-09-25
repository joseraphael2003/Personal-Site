// Shared framer-motion presets.
// The pressable hover/tap spring is byte-identical at every CTA call site
// (hero, work, header, footer, projects), so it lives here.

import type { MotionProps } from "framer-motion";

export const pressableMotion = {
  whileHover: { scale: 1.025 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 400, damping: 25 },
} satisfies MotionProps;
