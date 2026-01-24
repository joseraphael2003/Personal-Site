"use client";

import { motion } from "framer-motion";

interface ProfileAvatarProps {
    layoutId?: string;
    className?: string;
    size?: "sm" | "lg";
}

export function ProfileAvatar({ layoutId, className, size = "lg" }: ProfileAvatarProps) {
    return (
        <motion.div
            layoutId={layoutId}
            className={`relative overflow-hidden rounded-full border-2 border-primary/50 shadow-2xl bg-surface ${className}`}
            initial={false}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
            }}
            style={{
                width: size === "lg" ? 160 : 48,
                height: size === "lg" ? 160 : 48,
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-50" />
            {/* Placeholder for image */}
            <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-xs">
                IMG
            </div>
        </motion.div>
    );
}

export function ProfileName({ layoutId, className, size = "lg" }: { layoutId?: string; className?: string; size?: "lg" | "sm" }) {
    return (
        <motion.h1
            layoutId={layoutId}
            className={`font-bold tracking-tight text-white ${className}`}
            initial={false}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
            }}
            style={{
                fontSize: size === "lg" ? "3.75rem" : "1.25rem",
                lineHeight: 1,
            }}
        >
            User Name
        </motion.h1>
    );
}
