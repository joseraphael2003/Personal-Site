"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function useRadialTransition() {
  const router = useRouter();
  const [transitioning, setTransitioning] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const isNavigating = useRef(false);

  const navigateWithRadial = useCallback(
    (href: string, e?: React.MouseEvent | { clientX: number; clientY: number; detail?: number }) => {
      // Prevent rapid double-clicks / concurrent animations
      if (isNavigating.current) return;

      // Handle modifier clicks (Cmd/Ctrl/Middle click) gracefully without animation
      if (e && "metaKey" in e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) {
        return;
      }

      // If user prefers reduced motion, navigate directly
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }

      // Check if click was triggered by keyboard (detail === 0 or synthetic event) -> center fallback
      const isKeyboard = e && "detail" in e && e.detail === 0;
      const clickX = e && !isKeyboard && typeof window !== "undefined"
        ? Math.max(0, Math.min(100, (e.clientX / window.innerWidth) * 100))
        : 50;
      const clickY = e && !isKeyboard && typeof window !== "undefined"
        ? Math.max(0, Math.min(100, (e.clientY / window.innerHeight) * 100))
        : 50;

      setOrigin({ x: clickX, y: clickY });
      setTransitioning(true);
      isNavigating.current = true;

      // Prefetch route to ensure instant transition
      router.prefetch(href);

      setTimeout(() => {
        router.push(href);
        setTimeout(() => {
          setTransitioning(false);
          isNavigating.current = false;
        }, 220);
      }, 280);
    },
    [router]
  );

  return {
    transitioning,
    origin,
    navigateWithRadial,
  };
}

export function RadialTransitionOverlay({
  active,
  origin,
}: {
  active: boolean;
  origin: { x: number; y: number };
}) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{
            clipPath: `circle(0% at ${origin.x}% ${origin.y}%)`,
            opacity: 0.98,
          }}
          animate={{
            clipPath: `circle(150% at ${origin.x}% ${origin.y}%)`,
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.2 },
          }}
          transition={{
            duration: 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-50 pointer-events-none bg-[#090a0c] border border-emerald-500/20 flex items-center justify-center"
        >
          <div className="font-mono text-xs uppercase tracking-widest text-emerald-400/80 animate-pulse">
            System Routing...
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
