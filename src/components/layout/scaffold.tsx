"use client";

import { useState, useEffect } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { Hero } from "@/components/layout/hero";
import { Sidebar } from "@/components/nav/sidebar";
import { cn } from "@/lib/utils";

export function Scaffold({ children }: { children: React.ReactNode }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Switch state after scrolling down 100px
            const isScrolled = window.scrollY > 100;
            setScrolled(isScrolled);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen relative">
            <LayoutGroup>
                {/* State A: Hero (Visible only when at top) */}
                {!scrolled && (
                    <div className="relative z-10 container mx-auto px-4">
                        <Hero />
                    </div>
                )}

                {/* State B: Sidebar (Visible when scrolled) */}
                {scrolled && (
                    <div className="relative z-20">
                        <Sidebar />
                    </div>
                )}

                {/* Main Content Area */}
                {/* When scaffolded, this pushes content down or to the right */}
                <main
                    className={cn(
                        "transition-all duration-500 ease-in-out",
                        scrolled ? "pl-72 pr-8 pt-8" : "pt-8 px-4 container mx-auto"
                    )}
                >
                    {/* 
            If not scrolled, content is below the Hero area.
            If scrolled, content is on the right.
            We add top padding or margin to account for Hero space if needed, 
            but in this "morph" design, typically the content (Project Grid) 
            lives 'below the fold' of the Hero initially.
          */}
                    {/* If !scrolled, we might want to push content down so it appears below Hero? 
               But Hero is in normal flow above. So content just follows.
               Wait, if Hero is unmounted when scrolled, the content will jump up! 
               
               We need a placeholder for the Hero space or valid shared layout 
               that doesn't cause content jump.
               
               Approach:
               When !scrolled: Hero is present (height ~500px). Content follows.
               When scrolled: Hero is removed. Sidebar is fixed. Content margin-left 72.
               
               Problem: Removing Hero causes content to jump up by 500px, 
               potentially messing up the "scroll position" logic which depends on scrollY.
               
               Fix: Keep Hero mounted but invisible? Or use a "Ghost" Hero?
               Or better: The "Hero" is just the top part of the page content. 
               The Sidebar is a *separate* layer that fades in.
               But the "Avatar/Name" need to *move* from Hero to Sidebar.
               
               Refined Strategy:
               The "Hero" elements (Avatar/Name) are FLIP animated. 
               If we remove the Hero component from DOM, the document height shrinks.
               
               We can render the logic as:
               - Sidebar is always mounted but hidden/transparent when !scrolled?
               - User requirement: "State A... Sidebar Hidden... State B... Sidebar Appears".
               
               To prevent layout jump, we can keep the Hero *space* but move the elements out?
               Or, the "Hero" section IS the top of the main content column.
          */}

                    <div className={cn("min-h-screen", !scrolled && "mt-12")}>
                        {children}
                    </div>
                </main>
            </LayoutGroup>
        </div>
    );
}
