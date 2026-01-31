"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function CursorGlow({ visible = true, dimmed = false }: { visible?: boolean; dimmed?: boolean }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Track window dimensions for mirroring
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        // Set initial size
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });

        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }; // Slightly softer for "floating" feel
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    // Create mirrored motion values
    const xMirror = useTransform(x, (val) => windowSize.width - val);
    const yMirror = useTransform(y, (val) => windowSize.height - val);

    useEffect(() => {
        const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
            mouseX.set(clientX);
            mouseY.set(clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Champagne (#F7E6CA) hints mixed with Wine palette
    // Core: Champagne hints -> Rose Wine -> Deep Wine -> Transparent
    // Champagne (#F7E6CA) hints mixed with Wine palette
    // Core: Champagne hints -> Electric Wine -> Deep Wine -> Transparent
    const gradientStyle = "radial-gradient(circle, rgba(247, 230, 202, 0.15) 0%, rgba(191, 48, 112, 0.4) 25%, rgba(142, 31, 87, 0.3) 50%, transparent 70%)";
    const size = 1200; // Even bigger

    const pulseAnim = {
        scale: [1, 1.1, 1],
        opacity: [0.8, 1, 0.8],
    };

    const pulseTransition = {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
    };

    // Champagne (#F7E6CA) particles around the cursor
    // We create a few floating particles that follow the cursor with slight lag/randomness
    const particles = Array.from({ length: 8 }); // 8 particles

    if (!mounted) return null;

    return (
        <>
            {/* DESKTOP: Interactive Cursor Glow */}
            <motion.div
                className="pointer-events-none fixed inset-0 z-0 overflow-hidden hidden md:block"
                animate={{ opacity: visible ? (dimmed ? 0.35 : 1) : 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* 1. Main Gradient (Reduced champagne influence in core, mostly wine) */}
                <motion.div
                    className="absolute rounded-full blur-3xl mix-blend-screen"
                    animate={pulseAnim}
                    transition={pulseTransition}
                    style={{
                        width: size,
                        height: size,
                        // Updated to New Primary (Electric Wine) + Accent
                        background: "radial-gradient(circle, rgba(191, 48, 112, 0.4) 0%, rgba(142, 31, 87, 0.3) 40%, transparent 70%)",
                        x,
                        y,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                />

                {/* 2. Mirrored Gradients (Keeping them subtle) */}
                {[xMirror, x, xMirror].map((xPos, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full blur-3xl mix-blend-screen"
                        animate={pulseAnim}
                        transition={{ ...pulseTransition, delay: i + 1 }}
                        style={{
                            width: size,
                            height: size,
                            background: "radial-gradient(circle, rgba(191, 48, 112, 0.4) 0%, rgba(142, 31, 87, 0.3) 40%, transparent 70%)",
                            x: xPos,
                            y: i === 1 ? yMirror : (i === 0 ? y : yMirror),
                            translateX: "-50%",
                            translateY: "-50%",
                        }}
                    />
                ))}

                {/* 3. Champagne Particles (All 4 Quadrants) */}
                {[
                    { xPos: x, yPos: y },
                    { xPos: xMirror, yPos: y },
                    { xPos: x, yPos: yMirror },
                    { xPos: xMirror, yPos: yMirror }
                ].map((pos, quadIndex) => (
                    <div key={`quad-${quadIndex}`}>
                        {particles.map((_, i) => {
                            const angle = (i / particles.length) * Math.PI * 2;
                            const radius = 60 + Math.random() * 80;
                            const offsetX = Math.cos(angle) * radius;
                            const offsetY = Math.sin(angle) * radius;

                            // Random wander range
                            const wanderX = Math.random() * 60 - 30;
                            const wanderY = Math.random() * 60 - 30;

                            return (
                                <motion.div
                                    key={`p-${quadIndex}-${i}`}
                                    className="absolute rounded-full blur-md"
                                    animate={{
                                        opacity: [0.3, 0.8, 0.3],
                                        scale: [1, 1.5, 0.8],
                                        translateX: [offsetX, offsetX + wanderX, offsetX - wanderX, offsetX],
                                        translateY: [offsetY, offsetY + wanderY, offsetY - wanderY, offsetY],
                                    }}
                                    transition={{
                                        duration: 0.8 + Math.random(), // Much faster (0.8s - 1.8s)
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: Math.random() * 0.2
                                    }}
                                    style={{
                                        width: 3 + Math.random() * 4,
                                        height: 3 + Math.random() * 4,
                                        background: "#F7E6CA",
                                        x: pos.xPos,
                                        y: pos.yPos,
                                    }}
                                />
                            );
                        })}
                    </div>
                ))}
            </motion.div>

            {/* MOBILE: Static Ambient Pulse (Option A) */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden block md:hidden">
                <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-60"
                    animate={{
                        opacity: [0.4, 0.7, 0.4],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div
                        className="w-[120vw] h-[120vw] rounded-full blur-3xl"
                        style={{
                            background: "radial-gradient(circle, rgba(191, 48, 112, 0.3) 0%, rgba(247, 230, 202, 0.1) 40%, transparent 70%)"
                        }}
                    />
                </motion.div>
                {/* Subtle static particles */}
                <div className="absolute inset-0 opacity-30 bg-[url('/noise.png')] mix-blend-overlay" />
            </div>
        </>
    );
}
