"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FileText, Mail, Copy, Check, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { profile } from "@/data/portfolio";
import { useEmailModal } from "@/components/providers/email-modal-provider";
import { useCopyEmail } from "@/hooks/use-copy-email";
import { pressableMotion } from "@/lib/motion";
import { Auralis } from "@/components/ui/auralis";

export function Hero() {
  const { copied, copyEmail } = useCopyEmail();
  // `null` until mounted: the aura is decorative, and deferring the tier choice
  // keeps the server HTML and the first client render identical.
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const { openEmailModal } = useEmailModal();

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const syncTier = () => setIsDesktop(query.matches);
    syncTier();
    query.addEventListener("change", syncTier);
    return () => query.removeEventListener("change", syncTier);
  }, []);

  return (
    <section id="hero" className="relative w-full border-b border-edge/80 bg-page pt-12 sm:pt-20 pb-16 sm:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (60%): Editorial Thesis Stack */}
          <div className="lg:col-span-7 space-y-6 font-text">
            {/* 1. Status Badge (Enlarged + Dual Sonar Radar Ping + Emerald Technical Glow) */}
            <div className="inline-flex items-center gap-2 rounded-sm border border-accent/40 bg-accent-deep/20 px-3.5 py-1.5 text-sm shadow-[0_0_12px_var(--accent-glow)]">
              <span className="font-bold uppercase tracking-wider animate-text-shimmer">
                {profile.status}
              </span>
            </div>

            {/* 2. Display Headline with Compact Mobile Avatar */}
            <div className="flex items-center gap-3.5 sm:gap-5 lg:block min-w-0">
              {/* Compact Avatar (Mobile / Tablet only) */}
              <div className="lg:hidden relative h-16 w-16 shrink-0 rounded-sm border border-edge bg-surface p-1 shadow-md">
                {/* Auralis Simplex Aura — the mobile tier's only instance */}
                {isDesktop === false && (
                  <Auralis className="z-0 rounded-sm" opacity={0.95} dprCap={1} maxFps={30} />
                )}
                <div className="relative z-[1] h-full w-full overflow-hidden rounded-sm bg-page/60">
                  <Image
                    src="/profile.png"
                    alt={profile.name}
                    fill
                    priority
                    sizes="64px"
                    className="object-cover object-top"
                  />
                  {/* Technical Micro Reticles */}
                  <div
                    className="pointer-events-none absolute top-1 left-1 h-2 w-2 border-t-2 border-l-2 border-accent-hover z-10"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute top-1 right-1 h-2 w-2 border-t-2 border-r-2 border-accent-hover z-10"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute bottom-1 left-1 h-2 w-2 border-b-2 border-l-2 border-accent-hover z-10"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute bottom-1 right-1 h-2 w-2 border-b-2 border-r-2 border-accent-hover z-10"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-6xl text-ink uppercase tracking-wide leading-tight lg:leading-none min-w-0">
                {profile.headline}
              </h1>
            </div>
            {/* 3. Executive Bio (from resume) */}
            <p className="text-xs sm:text-base text-copy max-w-xl leading-normal sm:leading-relaxed">
              {profile.bio}
            </p>

            {/* 4. Contact Details Bar */}
            <div className="pt-1 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              {/* Email with Click-to-Copy */}
              <div className="relative inline-flex items-center">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="cursor-pointer group inline-flex items-center gap-1.5 text-body hover:text-accent-hover transition-colors font-medium"
                  title="Click to copy email address"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-accent-hover" />
                  ) : (
                    <Copy className="h-4 w-4 text-subtle group-hover:text-accent-hover transition-colors" />
                  )}
                  <span>{profile.email}</span>
                </button>

                {/* Floating "Copied to clipboard" feedback badge */}
                {copied && (
                  <div
                    role="status"
                    className="absolute -top-7 left-0 rounded-sm border border-accent/40 bg-page px-2 py-0.5 text-xs text-accent-hover font-bold shadow-lg animate-in fade-in zoom-in-95 duration-150 motion-reduce:animate-none"
                  >
                    Copied to clipboard!
                  </div>
                )}
              </div>

              {/* Minimalist GitHub Link with Label */}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="cursor-pointer text-body hover:text-accent-hover hover:bg-chip/60 rounded-sm px-2 py-1 transition-colors inline-flex items-center gap-1.5 text-sm font-medium"
                title="GitHub Profile"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>

              {/* Minimalist LinkedIn Link with Label */}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="cursor-pointer text-body hover:text-accent-hover hover:bg-chip/60 rounded-sm px-2 py-1 transition-colors inline-flex items-center gap-1.5 text-sm font-medium"
                title="LinkedIn Profile"
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* 5. Primary Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {/* Quick Email Modal Trigger (Primary Green Action) */}
              <motion.div {...pressableMotion}>
                <button
                  type="button"
                  onClick={openEmailModal}
                  className="cursor-pointer rounded-sm bg-accent px-5 py-2.5 text-sm font-bold text-on-accent hover:bg-accent-hover btn-accent transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  <Mail className="h-4 w-4 text-on-accent" />
                  <span>Quick Email</span>
                </button>
              </motion.div>

              {/* Get Resume CTA (Secondary Grey Action) */}
              <a
                href="/resume%20for%20site.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer rounded-sm border border-edge-strong bg-chip/60 px-5 py-2.5 text-sm text-copy hover:text-ink hover:bg-chip-hover/80 transition-colors inline-flex items-center gap-2"
              >
                <FileText className="h-4 w-4 text-accent-hover" />
                <span>Get Resume</span>
              </a>
            </div>
          </div>

          {/* Right Column (40%): Styled 4:5 Portrait Frame (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-5 justify-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[340px] rounded-sm border border-edge bg-surface p-3 shadow-2xl">
              {/* Auralis Simplex Aura (z-0, accent-synced, auto-pauses off-screen) */}
              {isDesktop === true && <Auralis className="z-0 rounded-sm" opacity={0.95} />}

              {/* Frame Surface with 4:5 Aspect Ratio (z-[1], above the aura) */}
              <div className="relative z-[1] aspect-4/5 w-full overflow-hidden rounded-sm border border-edge bg-page/60">
                <Image
                  src="/profile.png"
                  alt={profile.name}
                  fill
                  sizes="340px"
                  className="object-cover object-top"
                />

                {/* Technical Corner Reticles Overlay */}
                <div
                  className="pointer-events-none absolute top-2 left-2 h-3 w-3 border-t-2 border-l-2 border-accent/50 z-10"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute top-2 right-2 h-3 w-3 border-t-2 border-r-2 border-accent/50 z-10"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 border-accent/50 z-10"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-accent/50 z-10"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
