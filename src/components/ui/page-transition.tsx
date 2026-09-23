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
import { motion, useAnimationControls } from "framer-motion";

/** Cover fade-in while the outgoing route is still on screen (ms). */
const COVER_IN_MS = 150;
/** Cover fade-out once the destination route has committed (ms). */
const COVER_OUT_MS = 220;
/** Content lift once the destination route has committed (ms). */
const LIFT_MS = 220;
/** Bail-out: drop the cover when the destination route never commits (ms). */
const COMMIT_TIMEOUT_MS = 1600;
/** Height the committed route lifts from (px). */
const LIFT_FROM_PX = 8;

const COVER_IN_TRANSITION = { duration: COVER_IN_MS / 1000, ease: "easeOut" } as const;
const COVER_OUT_TRANSITION = { duration: COVER_OUT_MS / 1000, ease: "easeOut" } as const;
const LIFT_TRANSITION = { duration: LIFT_MS / 1000, ease: "easeOut" } as const;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type NavEvent = {
  metaKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  button?: number;
};

/** Marker merged onto the history entry a forward navigation from `/` lands on. */
type HistoryState = {
  __ptFromHome?: boolean;
} & Record<string, unknown>;

type PendingNavigation = {
  /** True when this navigation is `/` → `/projects`, which marks the new entry. */
  marksFromHome: boolean;
  /** True for the reduced-motion branch: mark the entry, but never cover or lift. */
  reduced: boolean;
};

type PageTransitionContextValue = {
  navigate: (href: string, e?: NavEvent) => void;
  navigateBack: (fallbackHref: string) => void;
};

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

export function usePageTransition(): PageTransitionContextValue {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used inside <PageTransitionProvider>");
  }
  return context;
}

/**
 * Owns the fade-and-lift route transition at the root layout, so the cover and the
 * lift wrapper outlive the unmount of the route the navigation was triggered from.
 *
 * Leaving: the cover fades in over the outgoing route, then the route is pushed.
 * Commit: `usePathname` reports the change, the cover fades back out and the stable
 * content wrapper (never keyed, never remounted) lifts 8px into place.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const navigation = useRef<PendingNavigation | null>(null);
  const coverId = useRef(0);
  const liftId = useRef(0);
  const pushTimer = useRef<number | null>(null);
  const revealTimer = useRef<number | null>(null);
  const commitTimer = useRef<number | null>(null);
  const [cover, setCover] = useState<{ id: number; revealing: boolean } | null>(null);
  const liftControls = useAnimationControls();

  const clearTimers = useCallback(() => {
    if (pushTimer.current !== null) {
      window.clearTimeout(pushTimer.current);
      pushTimer.current = null;
    }
    if (revealTimer.current !== null) {
      window.clearTimeout(revealTimer.current);
      revealTimer.current = null;
    }
    if (commitTimer.current !== null) {
      window.clearTimeout(commitTimer.current);
      commitTimer.current = null;
    }
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  // The destination route has committed: reveal it and lift it into place.
  useEffect(() => {
    const previousPathname = pathnameRef.current;
    pathnameRef.current = pathname;
    if (previousPathname === pathname) return;

    const pending = navigation.current;
    if (!pending) return;
    navigation.current = null;
    clearTimers();

    // Provenance for `navigateBack`: the user arrived on /projects from home, so that
    // history entry can go back instead of pushing (which would scroll to the top).
    if (pending.marksFromHome && pathname === "/projects") {
      const state = window.history.state as HistoryState | null;
      window.history.replaceState({ ...state, __ptFromHome: true }, "");
    }

    // Reduced motion: provenance only — the route swapped without a cover or a lift.
    if (pending.reduced) return;

    // Reveal on the next tick: the exit animation must start after the committed route
    // has painted, and a synchronous setState inside this effect is not allowed.
    revealTimer.current = window.setTimeout(() => {
      revealTimer.current = null;
      setCover((current) => (current ? { ...current, revealing: true } : current));
      commitTimer.current = window.setTimeout(() => {
        commitTimer.current = null;
        setCover(null);
      }, COVER_OUT_MS);
    }, 0);

    const id = (liftId.current += 1);
    void liftControls
      .start({ y: [LIFT_FROM_PX, 0], transition: LIFT_TRANSITION })
      .then(() => {
        if (liftId.current !== id) return;
        // Park the wrapper at its settled transform. Setting `y: 0` (rather than the
        // literal `transform: "none"`) computes to "none" while leaving later `y`
        // lifts renderable: motion skips building a transform at all once `transform`
        // is one of the element's values.
        liftControls.set({ y: 0 });
      })
      // An interrupted lift (a newer lift, or unmount mid-flight) is not actionable:
      // motion-dom resolves cancelled animations today but documents a future rejection.
      .catch(() => {});
  }, [pathname, clearTimers, liftControls]);

  const startManaged = useCallback(
    (pending: PendingNavigation, commit: () => void, prefetchHref?: string) => {
      // A previous commit's reveal/removal may still be pending; it belongs to the
      // cover being replaced here, so drop it before installing the new one.
      clearTimers();
      navigation.current = pending;
      coverId.current += 1;
      setCover({ id: coverId.current, revealing: false });
      if (prefetchHref !== undefined) router.prefetch(prefetchHref);

      pushTimer.current = window.setTimeout(() => {
        pushTimer.current = null;
        commit();
        commitTimer.current = window.setTimeout(() => {
          commitTimer.current = null;
          navigation.current = null;
          setCover(null);
        }, COMMIT_TIMEOUT_MS);
      }, COVER_IN_MS);
    },
    [router, clearTimers]
  );

  const navigate = useCallback(
    (href: string, e?: NavEvent) => {
      if (typeof window === "undefined") return;

      // A managed navigation is in flight. A pending reduced-motion marker is pure
      // provenance bookkeeping, so it never blocks the next navigation.
      const pending = navigation.current;
      if (pending && !pending.reduced) return;

      // Modifier / middle clicks keep native <Link> behaviour (new tab, download, ...).
      if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) return;

      // Already on the destination: let <Link> finish without a pointless cover.
      if (href === pathnameRef.current) return;

      // `/projects#gallery` → `/projects`; a hash-only href resolves to `/`.
      const hashIndex = href.indexOf("#");
      const targetPathname = hashIndex === -1 ? href : href.slice(0, hashIndex) || "/";
      const marksFromHome = pathnameRef.current === "/" && targetPathname === "/projects";

      // Reduced motion: navigate directly, without a cover and without a lift. The
      // arrival entry is still marked, so `navigateBack` can restore the home position.
      if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
        navigation.current = marksFromHome ? { marksFromHome: true, reduced: true } : null;
        router.push(href);
        return;
      }

      startManaged({ marksFromHome, reduced: false }, () => router.push(href), targetPathname);
    },
    [router, startManaged]
  );

  const navigateBack = useCallback(
    (fallbackHref: string) => {
      if (typeof window === "undefined") return;
      const pending = navigation.current;
      if (pending && !pending.reduced) return;

      const state = window.history.state as HistoryState | null;
      // The entry was reached from home, so going back restores the home scroll
      // position instead of pushing (which Next scrolls to the top).
      if (state?.__ptFromHome === true) {
        if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
          router.back();
          return;
        }
        startManaged({ marksFromHome: false, reduced: false }, () => router.back());
        return;
      }

      navigate(fallbackHref);
    },
    [navigate, router, startManaged]
  );

  const value = useMemo<PageTransitionContextValue>(
    () => ({ navigate, navigateBack }),
    [navigate, navigateBack]
  );

  return (
    <PageTransitionContext.Provider value={value}>
      <motion.div animate={liftControls}>{children}</motion.div>
      {cover && (
        <motion.div
          key={cover.id}
          aria-hidden="true"
          data-page-transition="cover"
          className="pointer-events-none fixed left-0 top-0 z-[120] w-screen h-[100dvh] bg-[#090a0c]"
          initial={{ opacity: 0 }}
          animate={{ opacity: cover.revealing ? 0 : 1 }}
          transition={cover.revealing ? COVER_OUT_TRANSITION : COVER_IN_TRANSITION}
        />
      )}
    </PageTransitionContext.Provider>
  );
}
