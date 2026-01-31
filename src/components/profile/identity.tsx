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
            className={`
                relative overflow-hidden rounded-full border-2 border-primary/50 shadow-2xl bg-surface 
                ${size === "lg" ? "w-56 h-56 md:w-[480px] md:h-[480px]" : "w-12 h-12"} 
                ${className}
            `}
            initial={false}
            transition={transition || {
                type: "spring",
                stiffness: 120,
                damping: 25,
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
            className={`
                font-bold tracking-tight text-white 
                ${size === "lg" ? "text-2xl md:text-[5rem]" : "text-xl"} 
                ${className}
            `}
            initial={false}
            transition={transition || {
                type: "spring",
                stiffness: 120,
                damping: 25,
            }}
            style={{
                lineHeight: 1,
            }}
        >
            Jose Raphael V. Dichoso
        </motion.h1>
    );
}
