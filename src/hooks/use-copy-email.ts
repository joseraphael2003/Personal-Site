"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "@/data/portfolio";

/**
 * Copies the profile email to the clipboard.
 * `copied` only turns true after a successful write and resets after 2s; the
 * timer lives in a ref so a re-copy restarts it and unmount clears it.
 */
export function useCopyEmail() {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | null>(null);

  const clearResetTimer = useCallback(() => {
    if (resetTimer.current !== null) {
      window.clearTimeout(resetTimer.current);
      resetTimer.current = null;
    }
  }, []);

  useEffect(() => clearResetTimer, [clearResetTimer]);

  const copyEmail = useCallback(async () => {
    clearResetTimer();
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      resetTimer.current = window.setTimeout(() => {
        resetTimer.current = null;
        setCopied(false);
      }, 2000);
    } catch {
      // Fallback for environments where clipboard API is restricted
      window.location.href = `mailto:${profile.email}`;
    }
  }, [clearResetTimer]);

  return { copied, copyEmail };
}
