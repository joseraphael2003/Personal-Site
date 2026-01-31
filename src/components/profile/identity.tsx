"use client";

import { motion } from "framer-motion";

// Add transition definition to imports if needed, or just type as any/Transition
// But framer-motion types are usually inferred.

interface ProfileAvatarProps {
    layoutId?: string;
    className?: string;
    size?: "sm" | "lg";
    transition?: any; // Allow overriding transition
}

export function ProfileAvatar({ layoutId, className, size = "lg", transition }: ProfileAvatarProps) {
    return (
        <motion.div
            layoutId={layoutId}
            className={`relative overflow-hidden rounded-full border-2 border-primary/50 shadow-2xl bg-surface ${className}`}
            initial={false}
            transition={transition || {
                type: "spring",
                stiffness: 120,
                damping: 25,
            }}
            style={{
                width: size === "lg" ? "min(480px, 80vw)" : 48,
                height: size === "lg" ? "min(480px, 80vw)" : 48,
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-50" />
            <img
                src="/profile.png"
                alt="Profile"
                className="absolute inset-0 w-full h-full object-cover"
            />
        </motion.div>
    );
}

export function ProfileName({ layoutId, className, size = "lg", transition }: { layoutId?: string; className?: string; size?: "lg" | "sm", transition?: any }) {
    return (
        <motion.h1
            layoutId={layoutId}
            className={`font-bold tracking-tight text-white ${className}`}
            initial={false}
            transition={transition || {
                type: "spring",
                stiffness: 120,
                damping: 25,
            }}
            style={{
                fontSize: size === "lg" ? "clamp(2.5rem, 8vw, 5rem)" : "1.25rem",
                lineHeight: 1,
            }}
        >
            Jose Raphael V. Dichoso
        </motion.h1>
    );
}
