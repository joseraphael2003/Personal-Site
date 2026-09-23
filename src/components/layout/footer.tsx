"use client";

import { useState } from "react";
import { profile } from "@/data/portfolio";
import { useEmailModal } from "@/components/providers/email-modal-provider";
import { Copy, Check, Github, Linkedin, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const [copied, setCopied] = useState(false);
  const { openEmailModal } = useEmailModal();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="w-full border-t border-neutral-800 bg-[#07080a] py-10 sm:py-14 lg:py-20 font-mono text-neutral-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 space-y-12">
        {/* Main CTA Block */}
        <div className="rounded-sm border border-neutral-800 bg-[#0c0e12] p-4 sm:p-6 lg:p-10 space-y-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="font-pixel text-2xl sm:text-4xl text-neutral-100 tracking-wide">
              LET&apos;S TALK!
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Available for commissioned freelance software development, automation workflows, and
              internship opportunities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleCopyEmail}
              className="cursor-pointer rounded-sm border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-200 hover:bg-neutral-800 hover:text-white transition-colors inline-flex items-center justify-center gap-2 font-bold"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">Email Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-neutral-400" />
                  <span>Copy Direct Email</span>
                </>
              )}
            </button>

            <motion.div
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <button
                type="button"
                onClick={openEmailModal}
                className="cursor-pointer rounded-sm bg-emerald-500 px-5 py-3 text-sm font-bold text-black hover:bg-emerald-400 btn-tactical-sheen transition-colors inline-flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Mail className="h-4 w-4 text-black" />
                <span>Send Email</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Footer Navigation & Credits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-neutral-800/80 text-sm">
          {/* Identity & Location */}
          <div className="space-y-1.5">
            <div className="font-pixel text-base text-neutral-200">{profile.name}</div>
            <div className="flex items-center gap-1.5 text-neutral-500 text-xs">
              <MapPin className="h-3.5 w-3.5 text-emerald-400" />
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Direct Channels */}
          <div className="flex flex-col gap-2 md:items-center">
            <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold">
              CHANNELS
            </span>
            <div className="flex items-center gap-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Architecture & Copyright */}
          <div className="md:text-right space-y-0.5 text-xs text-neutral-500 font-mono">
            <div>All rights reserved.</div>
            <div>2026 Jose Raphael V. Dichoso.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
