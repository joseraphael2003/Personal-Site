"use client";

import { profile } from "@/data/portfolio";
import { useEmailModal } from "@/components/providers/email-modal-provider";
import { useCopyEmail } from "@/hooks/use-copy-email";
import { pressableMotion } from "@/lib/motion";
import { Copy, Check, Github, Linkedin, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const { copied, copyEmail } = useCopyEmail();
  const { openEmailModal } = useEmailModal();

  return (
    <footer id="contact" className="w-full border-t border-edge bg-sunken py-10 sm:py-14 lg:py-20 font-text text-muted">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 space-y-12">
        {/* Main CTA Block */}
        <div className="rounded-sm border border-edge bg-raised p-4 sm:p-6 lg:p-10 space-y-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="font-display text-2xl sm:text-4xl text-ink uppercase tracking-wide">
              Let&apos;s Talk!
            </h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              Available for remote jobs, commissioned freelance software development, automation
              workflows, and internship opportunities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={copyEmail}
              className="cursor-pointer rounded-sm border border-edge-strong bg-chip px-4 py-3 text-sm text-body hover:bg-chip-hover hover:text-ink transition-colors inline-flex items-center justify-center gap-2 font-bold"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-accent-hover" />
                  <span className="text-accent-hover">Email Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-muted" />
                  <span>Copy Direct Email</span>
                </>
              )}
            </button>

            <motion.div {...pressableMotion}>
              <button
                type="button"
                onClick={openEmailModal}
                className="cursor-pointer rounded-sm bg-accent px-5 py-3 text-sm font-bold text-on-accent hover:bg-accent-hover btn-accent transition-colors inline-flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Mail className="h-4 w-4 text-on-accent" />
                <span>Send Email</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Footer Navigation & Credits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-edge/80 text-sm">
          {/* Identity & Location */}
          <div className="space-y-1.5">
            <div className="font-display text-base text-body">{profile.name}</div>
            <div className="flex items-center gap-1.5 text-subtle text-xs">
              <MapPin className="h-3.5 w-3.5 text-accent-hover" />
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Direct Channels */}
          <div className="flex flex-col gap-2 md:items-center">
            <span className="text-xs uppercase tracking-wider text-subtle font-bold">
              CHANNELS
            </span>
            <div className="flex items-center gap-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-hover transition-colors inline-flex items-center gap-1"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-hover transition-colors inline-flex items-center gap-1"
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Architecture & Copyright */}
          <div className="md:text-right space-y-0.5 text-xs text-subtle font-text">
            <div>All rights reserved.</div>
            <div>2026 Jose Raphael V. Dichoso.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
