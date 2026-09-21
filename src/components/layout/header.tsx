"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { profile } from "@/data/portfolio";
import { useEmailModal } from "@/components/providers/email-modal-provider";
import { Menu, X, Mail } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const { openEmailModal } = useEmailModal();

  const navLinks = [
    { label: "Work", id: "work" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Education", id: "education" },
    { label: "Certs", id: "certifications" },
    { label: "Involvement", id: "involvement" },
    { label: "Contact", id: "contact" },
  ];

  const handleScrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const elem = document.getElementById(targetId);
    if (elem) {
      const yOffset = -64;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const sectionIds = ["work", "projects", "skills", "education", "certifications", "involvement", "contact"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-[#090a0c]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-8">
        {/* Left: Identity */}
        <div className="flex items-center gap-3">
          <Link href="/" className="group flex items-baseline gap-2">
            <span className="font-pixel text-lg sm:text-xl text-neutral-100 tracking-wide group-hover:text-emerald-400 transition-colors">
              {profile.name}
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-mono text-neutral-400">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScrollTo(e, link.id)}
                aria-current={isActive ? "location" : undefined}
                className={`cursor-pointer transition-colors py-1 ${
                  isActive
                    ? "text-emerald-400 font-bold border-b-2 border-emerald-400"
                    : "hover:text-neutral-100"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Availability & Action */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            type="button"
            onClick={openEmailModal}
            className="cursor-pointer rounded-sm bg-emerald-500 px-3.5 py-1.5 text-sm font-mono font-bold text-black hover:bg-emerald-400 transition-colors inline-flex items-center gap-1.5 shadow-sm"
          >
            <Mail className="h-3.5 w-3.5 text-black" />
            <span>Quick Email</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden cursor-pointer rounded-sm border border-neutral-800 p-1.5 text-neutral-400 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-[#0c0d10] px-4 py-4 font-mono text-sm space-y-3">
          <div className="flex flex-col gap-2.5 pt-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleScrollTo(e, link.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={`py-1 transition-colors cursor-pointer ${
                    isActive ? "text-emerald-400 font-bold" : "text-neutral-300 hover:text-emerald-400"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="pt-2 border-t border-neutral-800 flex justify-end items-center text-sm">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openEmailModal();
              }}
              className="text-emerald-400 flex items-center gap-1.5 font-bold cursor-pointer"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Quick Email</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
