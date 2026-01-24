"use client";

import { motion } from "framer-motion";
import { ProfileAvatar, ProfileName } from "@/components/profile/identity";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { label: "Projects", href: "/" },
    { label: "Resume", href: "/resume" },
    { label: "Studio", href: "/studio" },
    { label: "Blog", href: "/blog" },
];

export function Sidebar() {
    return (
        <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed left-0 top-0 bottom-0 w-64 p-8 flex flex-col glass-panel border-r border-accent/20"
        >
            <div className="flex flex-col items-start mb-12">
                <div className="flex items-center gap-4 mb-2">
                    <ProfileAvatar layoutId="avatar" size="sm" />
                    <ProfileName layoutId="name" size="sm" />
                </div>
            </div>

            <nav className="flex-1">
                <ul className="space-y-4">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.label}>
                            <Link
                                href={item.href}
                                className="text-muted-text hover:text-white transition-colors text-lg font-light tracking-wide block py-2"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="text-xs text-muted-text/50">
                © 2026 The Personal OS
            </div>
        </motion.aside>
    );
}
