"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

/** Cover + ring expansion duration (ms). */
const EXPAND_MS = 320;
/** Delay before the route push lands. Keeps navigation latency well under the 350ms budget. */
const NAVIGATE_DELAY_MS = 300;
/** Reciprocal collapse that reveals the committed route (ms). */
const REVEAL_MS = 420;
/** Bail-out: collapse anyway if the destination route never commits. */
const COMMIT_TIMEOUT_MS = 1600;

const EXPAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const REVEAL_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

const EXPAND_TRANSITION = { duration: EXPAND_MS / 1000, ease: EXPAND_EASE };
const REVEAL_TRANSITION = { duration: REVEAL_MS / 1000, ease: REVEAL_EASE };

/** Accent token, with an emerald fallback until the theme layer defines it. */
const ACCENT = "var(--accent-color, #10b981)";

type RadialNavEvent = {
  clientX?: number;
  clientY?: number;
  detail?: number;
  metaKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  button?: number;
};

type RadialOrigin = {
  id: number;
  x: number;
  y: number;
  radius: number;
};

type RadialTransitionContextValue = {
  navigateWithRadial: (href: string, e?: RadialNavEvent) => void;
};

const RadialTransitionContext = createContext<RadialTransitionContextValue | null>(null);

export function useRadialTransition(): RadialTransitionContextValue {
  const context = useContext(RadialTransitionContext);
  if (!context) {
    throw new Error("useRadialTransition must be used inside <RadialTransitionProvider>");
  }
  return context;
}

/**
 * Holds the radial transition state at the root layout so the overlay outlives the
 * unmount of the route it was triggered from. The cover expands from the click
 * coordinates, the route commits, then `usePathname` reports the commit and the
 * cover collapses back into the origin to reveal the new page.
 */
export function RadialTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const overlayId = useRef(0);
  const isNavigating = useRef(false);
  const pushTimer = useRef<number | null>(null);
  const commitTimer = useRef<number | null>(null);
  const [overlay, setOverlay] = useState<RadialOrigin | null>(null);

  const clearTimers = useCallback(() => {
    if (pushTimer.current !== null) {
      window.clearTimeout(pushTimer.current);
      pushTimer.current = null;
    }
    if (commitTimer.current !== null) {
      window.clearTimeout(commitTimer.current);
      commitTimer.current = null;
    }
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  // The destination route has committed: run the reciprocal collapse.
  useEffect(() => {
    const previous = pathnameRef.current;
    pathnameRef.current = pathname;
    if (previous === pathname || !isNavigating.current) return;
    clearTimers();
    isNavigating.current = false;
    setOverlay(null);
  }, [pathname, clearTimers]);

  const navigateWithRadial = useCallback(
    (href: string, e?: RadialNavEvent) => {
      if (typeof window === "undefined" || isNavigating.current) return;

      // Modifier / middle clicks keep native <Link> behaviour (new tab, download, ...).
      if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) return;

      // Already on the destination: let <Link> finish without a pointless cover.
      if (href === pathnameRef.current) return;

      // Reduced motion: navigate directly.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isKeyboard =
        !e || e.detail === 0 || typeof e.clientX !== "number" || typeof e.clientY !== "number";
      const x = isKeyboard ? vw / 2 : Math.max(0, Math.min(vw, e.clientX as number));
      const y = isKeyboard ? vh / 2 : Math.max(0, Math.min(vh, e.clientY as number));
      // Radius reaching the farthest viewport corner so the cover fully clears the screen.
      const radius = Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y)) + 16;

      isNavigating.current = true;
      overlayId.current += 1;
      setOverlay({ id: overlayId.current, x, y, radius });
      router.prefetch(href);

      pushTimer.current = window.setTimeout(() => {
        pushTimer.current = null;
        router.push(href);
        commitTimer.current = window.setTimeout(() => {
          commitTimer.current = null;
          isNavigating.current = false;
          setOverlay(null);
        }, COMMIT_TIMEOUT_MS);
      }, NAVIGATE_DELAY_MS);
    },
    [router]
  );

  const value = useMemo<RadialTransitionContextValue>(
    () => ({ navigateWithRadial }),
    [navigateWithRadial]
  );

  return (
    <RadialTransitionContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {overlay && <RadialTransitionCover key={overlay.id} origin={overlay} />}
      </AnimatePresence>
    </RadialTransitionContext.Provider>
  );
}

function RadialTransitionCover({ origin }: { origin: RadialOrigin }) {
  const { x, y, radius } = origin;
  const ringBox = {
    left: x - radius,
    top: y - radius,
    width: radius * 2,
    height: radius * 2,
  };

  return (
    <>
      {/*
        Cover: page background colour so the outgoing route is hidden without a flash,
        tinted with the accent from the click origin for visible contrast.
      */}
      <motion.div
        aria-hidden="true"
        data-radial-overlay="cover"
        className="pointer-events-none fixed inset-0 z-[120] bg-[#090a0c]"
        style={{
          backgroundImage: `radial-gradient(circle at ${x}px ${y}px, color-mix(in srgb, ${ACCENT} 16%, transparent), transparent 62%)`,
          willChange: "clip-path",
        }}
        initial={{ clipPath: `circle(0px at ${x}px ${y}px)` }}
        animate={{ clipPath: `circle(${radius}px at ${x}px ${y}px)`, transition: EXPAND_TRANSITION }}
        exit={{ clipPath: `circle(0px at ${x}px ${y}px)`, transition: REVEAL_TRANSITION }}
      />
      {/* Accent ring tracing the cover boundary. */}
      <motion.div
        aria-hidden="true"
        data-radial-ring="primary"
        className="pointer-events-none fixed z-[121] rounded-full border-2"
        style={{
          ...ringBox,
          borderColor: ACCENT,
          filter: `drop-shadow(0 0 10px ${ACCENT})`,
          willChange: "transform",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: EXPAND_TRANSITION }}
        exit={{ scale: 0, opacity: 0, transition: REVEAL_TRANSITION }}
      />
      {/* Echo trace trailing the primary ring. */}
      <motion.div
        aria-hidden="true"
        data-radial-ring="echo"
        className="pointer-events-none fixed z-[121] rounded-full border"
        style={{ ...ringBox, borderColor: ACCENT, willChange: "transform" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.06, opacity: [0, 0.4, 0], transition: EXPAND_TRANSITION }}
        exit={{ scale: 0, opacity: 0, transition: REVEAL_TRANSITION }}
      />
    </>
  );
}
