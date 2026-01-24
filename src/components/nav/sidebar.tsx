"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileAvatar, ProfileName } from "@/components/profile/identity";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    Home,
    Briefcase,
    FileText,
    Music,
    PenTool,
    ShoppingBag,
    Mail,
    User
} from "lucide-react";

const NAV_ITEMS = [
    { label: "Home", href: "/", icon: Home },
    { label: "About", href: "/about", icon: User },
    { label: "Experience", href: "/resume", icon: Briefcase },
    { label: "Projects", href: "/projects", icon: FileText }, // Swapped icon? Or kept same? User said "Experience" below About.
    // Let's assume Projects uses FileText or similar. 
    // Wait, User said "Add Experience below About".
    // "Projects" was there.
    // "Toolstack" was there.
    // "Blogs" was there.
    // "Shop" was there.
    // "Songs" was there.
    // "Playground" REMOVE.
    // "Contact" was there.

    // Adjusted list:
    // Home
    // About
    // Experience (New) -> /resume seems appropriate for Experience? Or /experience?
    // Projects
    // Toolstack
    // Blogs
    // Shop
    // Songs
    // Contact

    { label: "Toolstack", href: "/toolstack", icon: FileText }, // Reusing FileText for toolstack?
    { label: "Blogs", href: "/blog", icon: PenTool },
    { label: "Shop", href: "/shop", icon: ShoppingBag },
    { label: "Songs", href: "/studio", icon: Music },
    { label: "Contact", href: "/contact", icon: Mail },
];

export function Sidebar({ isScrolled = true }: { isScrolled?: boolean }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.aside
            initial={{ opacity: 0, x: -20, y: "-50%" }}
            animate={{
                opacity: 1,
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
            )}
        >
            <motion.div
                animate={{
                    height: isScrolled ? "auto" : 0,
                    marginBottom: isScrolled ? 16 : 0,
                    opacity: isScrolled ? 1 : 0
                }}
                className="overflow-hidden"
            >
                <div className={cn("flex items-center px-4", isHovered ? "justify-start gap-4" : "justify-center")}>
                    <div className="shrink-0">
                        {isScrolled && <ProfileAvatar
                            layoutId="avatar"
                            size="sm"
                            className="w-10 h-10 border-none"
                            transition={{ type: "tween", duration: 0.1, ease: "easeOut" }}
                        />}
                    </div>
                    <motion.div
                        animate={{
                            width: isHovered ? "auto" : 0,
                            opacity: isHovered ? 1 : 0,
                            marginLeft: isHovered ? 16 : 0,
                        }}
                        style={{ overflow: "hidden", display: "flex", whiteSpace: "nowrap" }}
                    >
                        {isScrolled && <ProfileName
                            layoutId="name"
                            size="sm"
                            className="text-lg"
                            transition={{ type: "tween", duration: 0.1, ease: "easeOut" }}
                        />}
                    </motion.div>
                </div>
            </motion.div>

            <nav className="flex-1 overflow-y-auto px-2 no-scrollbar">
                <ul className="space-y-1">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.label}>
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex items-center rounded-xl p-3 transition-colors group",
                                    isHovered ? "justify-start gap-4 hover:bg-white/10" : "justify-center hover:bg-white/10"
                                )}
                            >
                                <item.icon className="w-6 h-6 text-muted-text group-hover:text-white transition-colors shrink-0" />
                                <motion.span
                                    animate={{
                                        width: isHovered ? "auto" : 0,
                                        opacity: isHovered ? 1 : 0,
                                        marginLeft: isHovered ? 12 : 0, // Adjusted margin
                                    }}
                                    className="text-muted-text group-hover:text-white font-light tracking-wide whitespace-nowrap overflow-hidden"
                                >
                                    {item.label}
                                </motion.span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </motion.aside>
    );
}
