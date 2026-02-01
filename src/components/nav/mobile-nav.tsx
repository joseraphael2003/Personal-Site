"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    Home,
    Briefcase,
    FolderGit2,
    Terminal,
    Mail,
    User,
    GraduationCap
} from "lucide-react";

const NAV_ITEMS = [
    { label: "Home", href: "/", icon: Home },
    { id: "core-infrastructure", label: "About", href: "/#core-infrastructure", icon: User },
    { id: "experience", label: "Exp", href: "/#experience", icon: Briefcase },
    { id: "education", label: "Edu", href: "/#education", icon: GraduationCap },
    { id: "projects", label: "Proj", href: "/#projects", icon: FolderGit2 },
    { id: "toolstack", label: "Tools", href: "/#toolstack", icon: Terminal },
    { label: "Contact", href: "#contact", icon: Mail },
];

export function MobileNav({ isScrolled = true }: { isScrolled?: boolean }) {
    const [activeSection, setActiveSection] = useState("");

    // Handle scroll spy
    useEffect(() => {
        const handleScroll = () => {
            const sections = NAV_ITEMS.map(item => {
                if (item.href === "/") return { id: "home", offset: 0 };
                // Handle both /#section and #section formats
                const id = item.href.replace(/^\/?#/, "");
                const element = document.getElementById(id);
                if (element) {
                    return { id, offset: element.offsetTop };
                }
                return null;
            }).filter(Boolean) as { id: string, offset: number }[];

            const scrollPosition = window.scrollY + window.innerHeight * 0.4;

            for (let i = sections.length - 1; i >= 0; i--) {
                if (scrollPosition >= sections[i].offset) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (href: string) => {
        if (href === "/" && activeSection === "home") return true;
        // Handle both /#section and #section formats
        const id = href.replace(/^\/?#/, "");
        return activeSection === id;
    };

    return (
        <div className={cn(
            "fixed bottom-6 left-4 right-4 z-50 md:hidden transition-all duration-500 transform",
            isScrolled ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
        )}>
            <div className="glass-panel bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-2 shadow-2xl">
                <nav className="flex items-center justify-between px-2 overflow-x-auto no-scrollbar gap-1">
                    {NAV_ITEMS.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center justify-center min-w-[3.5rem] py-2 rounded-xl transition-all duration-300 relative",
                                    active ? "text-primary" : "text-muted-text/60 hover:text-white"
                                )}
                            >
                                {active && (
                                    <motion.div
                                        layoutId="activeTabMobile"
                                        className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/20 shadow-[inset_0_0_10px_rgba(191,48,112,0.1)]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <item.icon className={cn("w-5 h-5 mb-1 relative z-10", active && "drop-shadow-[0_0_8px_rgba(191,48,112,0.5)]")} />
                                <span className="text-[10px] font-medium tracking-wide relative z-10">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
