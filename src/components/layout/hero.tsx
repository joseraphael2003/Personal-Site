"use client";

import { motion } from "framer-motion";
import { ProfileAvatar, ProfileName } from "@/components/profile/identity";

export function Hero() {
    return (
        <section className="flex min-h-screen flex-col items-center justify-center pb-16">
            <ProfileAvatar size="lg" className="mb-8" />
            <ProfileName size="lg" className="mb-4" />

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-muted-text text-base md:text-xl font-light tracking-wide max-w-2xl text-center"
            >
                Computer Engineering student, Ateneo de Naga University
                <br />
                <span className="text-secondary-foreground/80 text-sm md:text-lg mt-2 block">
                    Networks | AI-Assisted Developer | Musician
                </span>
            </motion.p>
        </section>
    );
}
