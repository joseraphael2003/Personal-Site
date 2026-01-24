"use client";

import { motion } from "framer-motion";
import { ProfileAvatar, ProfileName } from "@/components/profile/identity";

export function Hero() {
    return (
        <section className="flex min-h-[40vh] flex-col items-center justify-center pt-32 pb-16">
            <ProfileAvatar layoutId="avatar" size="lg" className="mb-8" />
            <ProfileName layoutId="name" size="lg" className="mb-4" />

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-muted-text text-xl font-light tracking-wide max-w-md text-center"
            >
                Senior Frontend Architect & Motion Designer.
                <br />
                Building the Personal OS.
            </motion.p>
        </section>
    );
}
