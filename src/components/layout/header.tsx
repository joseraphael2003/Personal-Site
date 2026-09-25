"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { profile } from "@/data/portfolio";
import { useEmailModal } from "@/components/providers/email-modal-provider";
import { AccentCycle } from "@/components/ui/accent-cycle";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X, Mail } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function MagneticNavLink({
  label,
  id,
  isActive,
  onClick,
}: {
  label: string;
  id: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 420, damping: 25, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 420, damping: 25, mass: 0.3 });

  const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
      const rect = e.currentTarget.getBoundingClientRect();
      const offsetX = e.clientX - (rect.left + rect.width / 2);
      const offsetY = e.clientY - (rect.top + rect.height / 2);
      x.set(offsetX * 0.18);
      y.set(offsetY * 0.18);
    }
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={`#${id}`}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      aria-current={isActive ? "location" : undefined}
      className={`relative cursor-pointer transition-colors px-2.5 py-1 text-sm ${
        isActive ? "text-accent-hover font-bold" : "text-muted hover:text-ink"
      }`}
    >
      {isActive && (
        <motion.span
          layoutId="active-nav-pill"
          className="absolute inset-0 rounded-sm bg-accent/15 border border-accent/30"
          transition={{ type: "spring", stiffness: 450, damping: 32 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </motion.a>
  );
}

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

  const lastObservedSection = useRef<string>("work");

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
            lastObservedSection.current = entry.target.id;
            const atBottom =
              window.innerHeight + window.scrollY >=
              document.documentElement.scrollHeight - 90;
            if (!atBottom) {
              setActiveSection(entry.target.id);
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));

    const handleScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 90;
      if (atBottom) {
        setActiveSection("contact");
      } else if (lastObservedSection.current) {
        setActiveSection(lastObservedSection.current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-edge bg-page/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-8">
        {/* Left: Identity */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="group flex items-baseline gap-2 cursor-pointer"
          >
            <span className="font-display text-lg sm:text-xl text-ink tracking-wide group-hover:text-accent-hover transition-colors">
              {profile.name}
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation with Magnet Tabs & Sliding LayoutId Pill */}
        <nav className="hidden lg:flex items-center gap-1 font-text text-muted">
          {navLinks.map((link) => (
            <MagneticNavLink
              key={link.id}
              id={link.id}
              label={link.label}
              isActive={activeSection === link.id}
              onClick={(e) => handleScrollTo(e, link.id)}
            />
          ))}
          <ThemeToggle className="ml-1" />
          <AccentCycle />
        </nav>

        {/* Right: Availability & Action */}
        <div className="hidden lg:flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <button
              type="button"
              onClick={openEmailModal}
              className="cursor-pointer rounded-sm bg-accent px-3.5 py-1.5 text-sm font-text font-bold text-on-accent hover:bg-accent-hover btn-accent transition-colors inline-flex items-center gap-1.5 shadow-sm"
            >
              <Mail className="h-3.5 w-3.5 text-on-accent" />
              <span>Quick Email</span>
            </button>
          </motion.div>
        </div>
        {/* Mobile / Tablet menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden cursor-pointer rounded-sm border border-edge p-1.5 text-muted hover:text-ink"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-edge bg-raised px-4 py-4 font-text text-sm space-y-3">
          <div className="flex flex-col gap-2.5 pt-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <div key={link.id} className="flex items-center justify-between gap-3">
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleScrollTo(e, link.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={`py-1 transition-colors cursor-pointer ${
                      isActive ? "text-accent-hover font-bold" : "text-copy hover:text-accent-hover"
                    }`}
                  >
                    {link.label}
                  </a>
                </div>
              );
            })}
          </div>

          {/* Theme and accent controls (Mobile) */}
          <div className="flex items-center gap-2 pt-2 border-t border-edge">
            <ThemeToggle />
            <AccentCycle />
          </div>

          <div className="pt-2 border-t border-edge flex justify-end items-center text-sm">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openEmailModal();
              }}
              className="text-accent-hover flex items-center gap-1.5 font-bold cursor-pointer"
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
