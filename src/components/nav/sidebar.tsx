"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileAvatar, ProfileName } from "@/components/profile/identity";
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
    { label: "About", href: "/#core-infrastructure", icon: User },
    { label: "Experience", href: "/#experience", icon: Briefcase },
    { label: "Education", href: "/#education", icon: GraduationCap },
    { label: "Projects", href: "/#projects", icon: FolderGit2 },
    { label: "Toolstack", href: "/#toolstack", icon: Terminal },
    { label: "Contact", href: "/contact", icon: Mail },
];

export function Sidebar({ isScrolled = true }: { isScrolled?: boolean }) {
    const [isHovered, setIsHovered] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    // Handle scroll spy to detect active section
    useEffect(() => {
        const handleScroll = () => {
            const sections = NAV_ITEMS.map(item => {
                if (item.href === "/") return { id: "home", offset: 0 };
                const id = item.href.replace("/#", "");
                const element = document.getElementById(id);
                if (element) {
                    return { id, offset: element.offsetTop };
                }
                return null;
            }).filter(Boolean) as { id: string, offset: number }[];

            const scrollPosition = window.scrollY + window.innerHeight * 0.3; // Check a bit down the viewport

            // Find the last section that is above the current scroll position
            for (let i = sections.length - 1; i >= 0; i--) {
                if (scrollPosition >= sections[i].offset) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Trigger once on mount
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (href: string) => {
        if (href === "/" && activeSection === "home") return true;
        const id = href.replace("/#", "");
        return activeSection === id;
    };

    return (
        <motion.aside
            initial={{ opacity: 0, x: -20, y: "-50%" }}
            animate={{
                opacity: isScrolled ? 1 : 0,
                x: 0,
                y: "-50%",
                width: isHovered ? 280 : 80,
            }}
            exit={{ opacity: 0, x: -20, y: "-50%" }}
            transition={{
                type: "tween",
                duration: 0.1,
                ease: "easeOut"
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                "fixed left-6 top-1/2 flex flex-col glass-panel rounded-3xl z-50 overflow-hidden transition-all duration-300 h-fit py-4",
                !isScrolled && "pointer-events-none"
            )}
        >
            <motion.div
                initial={false}
                animate={{
                    height: isScrolled ? "auto" : 0,
                    marginBottom: isScrolled ? 16 : 0,
                    opacity: isScrolled ? 1 : 0,
                    filter: isScrolled ? "blur(0px)" : "blur(10px)",
                }}
                transition={{
                    duration: 0.5,
                    ease: "easeInOut"
                }}
                className="overflow-hidden"
            >
                <Link
                    href="/"
                    className={cn("flex items-center px-4", isHovered ? "justify-start gap-4" : "justify-center")}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                    <div className="shrink-0">
                        {/* Static Avatar (No layoutId/morph) */}
                        <ProfileAvatar
                            size="sm"
                            className="w-10 h-10 border-none"
                        />
                    </div>
                    <motion.div
                        animate={{
                            width: isHovered ? "auto" : 0,
                            opacity: isHovered ? 1 : 0,
                            marginLeft: isHovered ? 16 : 0,
                        }}
                        style={{ overflow: "hidden", display: "flex", whiteSpace: "nowrap" }}
                    >
                        {/* Static Name "Jose Raphael" */}
                        <span className="text-white font-bold tracking-tight text-lg">
                            Jose Raphael
                        </span>
                    </motion.div>
                </Link>
            </motion.div>

            <nav className="flex-1 overflow-y-auto px-2 no-scrollbar">
                <ul className="space-y-1">
                    {/* Removed "Home" from list, using header instead */}
                    {NAV_ITEMS.filter(item => item.label !== "Home").map((item) => {
                        const active = isActive(item.href);
                        return (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center rounded-xl p-3 transition-all duration-300 group relative overflow-hidden",
                                        isHovered ? "justify-start gap-4" : "justify-center",
                                        active
                                            ? "bg-primary/20 text-primary shadow-[inset_0_0_20px_rgba(191,48,112,0.2)] border border-primary/20"
                                            : "hover:bg-white/10 text-muted-text hover:text-white"
                                    )}
                                >
                                    {/* Active Indicator Line (Left) */}
                                    {active && (
                                        <motion.div
                                            initial={{ opacity: 0, scaleY: 0 }}
                                            animate={{ opacity: 1, scaleY: 1 }}
                                            exit={{ opacity: 0, scaleY: 0 }}
                                            className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                                        />
                                    )}

                                    <item.icon className={cn(
                                        "w-6 h-6 transition-colors shrink-0",
                                        active ? "text-primary" : "text-muted-text group-hover:text-white"
                                    )} />

                                    <motion.span
                                        animate={{
                                            width: isHovered ? "auto" : 0,
                                            opacity: isHovered ? 1 : 0,
                                            marginLeft: isHovered ? 12 : 0,
                                        }}
                                        className={cn(
                                            "font-medium tracking-wide whitespace-nowrap overflow-hidden transition-colors",
                                            active ? "text-primary font-bold" : "text-muted-text group-hover:text-white font-light"
                                        )}
                                    >
                                        {item.label}
                                    </motion.span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </motion.aside>
    );
}
