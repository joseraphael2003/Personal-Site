"use client";

import { useState, useEffect, useRef } from "react";
import { LayoutGroup } from "framer-motion";
import { Hero } from "@/components/layout/hero";
import { Sidebar } from "@/components/nav/sidebar";
import { MobileNav } from "@/components/nav/mobile-nav";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

// Lazy-load CursorGlow — not needed for initial paint
const CursorGlow = dynamic(() => import("@/components/ui/cursor-glow").then(m => ({ default: m.CursorGlow })), { ssr: false });

export function Scaffold({ children }: { children: React.ReactNode }) {
    const [scrolled, setScrolled] = useState(false);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            // Throttle with rAF — fires at most once per frame (~60fps)
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                const isScrolled = window.scrollY > window.innerHeight * 0.4;
                setScrolled(isScrolled);
                rafRef.current = 0;
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div className="min-h-screen relative bg-background/50">
            {/* CursorGlow: unmounted when scrolled past hero to stop Spring calculations */}
            {!scrolled && <CursorGlow visible={true} dimmed={false} />}

            <LayoutGroup>
                {/* Fixed Hero Layer - Stays at the back */}
                <div
                    className={cn(
                        "fixed inset-0 z-0 transition-all duration-1000 ease-out flex flex-col justify-center",
                        scrolled ? "blur-md opacity-40 scale-95" : "blur-0 opacity-100 scale-100"
                    )}
                >
                    <Hero />
                </div>

                {/* Sidebar Layer (Desktop) & Mobile Nav (Bottom) */}
                <div className="relative z-50">
                    <Sidebar isScrolled={scrolled} />
                    <MobileNav isScrolled={scrolled} />
                </div>

                {/* Scrollable Content Layer - Slides OVER the Hero */}
                <main className="relative z-10 w-full">
                    <div className="min-h-screen w-full pointer-events-none" />
                    <div className={cn(
                        "transition-all duration-700 ease-out min-h-screen",
                        scrolled ? "pl-0 md:pl-[120px] pr-0 md:pr-8" : "px-4"
                    )}>
                        {children}
                    </div>
                </main>
            </LayoutGroup>
        </div>
    );
}
