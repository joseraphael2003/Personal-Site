"use client";

import { useState, useEffect } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { Hero } from "@/components/layout/hero";
import { Sidebar } from "@/components/nav/sidebar";
import { cn } from "@/lib/utils";
import { CursorGlow } from "@/components/ui/cursor-glow";

export function Scaffold({ children }: { children: React.ReactNode }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Switch state when overlay covers significant part of hero
            // Using 40% of viewport height as threshold (Layer hits 60% from top)
            const isScrolled = window.scrollY > window.innerHeight * 0.4;
            setScrolled(isScrolled);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen relative bg-background/50">
            {/* Cursor Glow is always visible, but dimmed when overlay is up */}
            <CursorGlow visible={true} dimmed={scrolled} />

            <LayoutGroup>
                {/* Fixed Hero Layer - Stays at the back */}
                <div
                    className={cn(
                        "fixed inset-0 z-0 transition-all duration-1000 ease-out flex flex-col justify-center",
                        // When scrolled: Blur it, dim it (opacity-40), scale down slightly.
                        // It does NOT disappear (opacity-0 removed).
                        scrolled ? "blur-md opacity-40 scale-95" : "blur-0 opacity-100 scale-100"
                    )}
                >
                    <Hero />
                </div>

                {/* Sidebar Layer - Appears on top when scrolled */}
                <div className="relative z-50">
                    <Sidebar isScrolled={scrolled} />
                </div>

                {/* Scrollable Content Layer - Slides OVER the Hero */}
                <main className="relative z-10 w-full">
                    {/* Spacer to push content below the full-screen Hero initially */}
                    {/* This ensures the user sees the Hero first, then scrolls "up" (content moves up) */}
                    <div className="h-screen w-full pointer-events-none" />

                    {/* The Actual Content (Glass Overlay, Projects, etc.) */}
                    <div className={cn(
                        "transition-all duration-700 ease-out min-h-screen",
                        // When sidebar appears, add padding to avoid overlap
                        scrolled ? "pl-0 md:pl-[120px] pr-0 md:pr-8" : "px-4"
                    )}>
                        {children}
                    </div>
                </main>
            </LayoutGroup>
        </div>
    );
}
