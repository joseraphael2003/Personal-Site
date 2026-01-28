"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
    motion,
    useMotionValue,
    animate,
    AnimatePresence,
    AnimationPlaybackControls,
    PanInfo
} from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

export interface MemoryItem {
    id: number;
    title: string;
    description: string;
    type?: string | null;
    src: string;
    year?: string | null;
    tag?: string | null;
}

export function MemoryStream({ items = [] }: { items: MemoryItem[] }) {
    // Duplicate for infinite loop (Triple set for smooth transitioning)
    const streamItems = useMemo(() => [...items, ...items, ...items], [items]);

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const xTranslation = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);
    const [controls, setControls] = useState<AnimationPlaybackControls | null>(null);
    const resumeTimer = useRef<NodeJS.Timeout | null>(null);

    // Measure one set width
    useEffect(() => {
        if (containerRef.current && items.length > 0) {
            // Calculate total width of one set
            // Assuming 3 sets, we divide scrollWidth by 3
            const fullWidth = containerRef.current.scrollWidth;
            const oneSetWidth = fullWidth / 3;
            setContentWidth(oneSetWidth);

            // Initial Start
            startLoop(oneSetWidth);
        }
    }, [items]);

    const startLoop = useCallback((width: number) => {
        if (!width) return;

        // Animate from -width to 0 (Left to Right movement)
        // We start at -width (showing Set 2) and move to 0 (Showing Set 1)
        // Then snap back to -width
        const duration = 80; // seconds for full cycle

        const anim = animate(xTranslation, [-width, 0], {
            ease: "linear",
            duration: duration,
            repeat: Infinity,
            repeatType: "loop",
            onUpdate: (latest) => {
                // Optional: logic if needed
            }
        });
        setControls(anim);
    }, [xTranslation]);

    const stopLoop = () => {
        if (controls) {
            controls.stop();
        }
        if (resumeTimer.current) {
            clearTimeout(resumeTimer.current);
        }
    };

    const resumeLoop = () => {
        // Determine where we are, animate to 0, then restart loop
        const currentX = xTranslation.get();

        // We want to move towards 0.
        // Calculate distance
        const distanceToZero = Math.abs(currentX - 0);
        // Calculate duration based on speed (width / 80s)
        const speed = contentWidth / 80;
        const duration = distanceToZero / speed;

        // Animate to completion of current cycle
        const recoveryAnim = animate(xTranslation, 0, {
            ease: "linear",
            duration: duration,
            onComplete: () => {
                // Restart infinite loop
                startLoop(contentWidth);
            }
        });
        setControls(recoveryAnim);
    };

    // Interactions
    const onHoverStart = () => stopLoop();

    const onHoverEnd = () => {
        // Resume immediately on hover end (standard) or use timer?
        // User said "2 seconds after it stops moving". usually applies to drag.
        // For hover, instant resume is cleaner.
        resumeLoop();
    };

    const onDragStart = () => stopLoop();

    const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        // Wait 2 seconds then resume
        resumeTimer.current = setTimeout(() => {
            resumeLoop();
        }, 2000);
    };

    if (!items || items.length === 0) return null;

    return (
        <div className="w-full overflow-hidden py-12 relative group z-10">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

            {/* Track */}
            <motion.div
                ref={containerRef}
                className="flex gap-4 md:gap-8 w-fit cursor-grab active:cursor-grabbing"
                style={{ x: xTranslation }}
                drag="x"
                // Allow loose dragging but maybe bound it simply prevents losing content
                // Since we have 3 sets, range could be [-2 * width, 0] roughly
                dragConstraints={{ left: -contentWidth * 2, right: 0 }}
                onHoverStart={onHoverStart}
                onHoverEnd={onHoverEnd}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            >
                {streamItems.map((item, index) => {
                    // Use a safer key strategy if IDs are duplicated in stream
                    // But we index it anyway.
                    const uniqueKey = `card-${item.id}-${index}`;
                    return (
                        <motion.div
                            key={uniqueKey}
                            layoutId={uniqueKey}
                            onClick={() => setSelectedId(uniqueKey)}
                            className="relative min-w-[200px] h-[120px] md:min-w-[300px] md:h-[180px] rounded-xl overflow-hidden cursor-pointer border border-white/10 bg-white/5 shrink-0"
                            whileHover={{
                                scale: 1.05,
                                filter: "brightness(1.2)",
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Image
                                src={item.src}
                                alt={item.title}
                                fill
                                className="object-cover pointer-events-none"
                                sizes="(max-width: 768px) 200px, 300px"
                            />
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Quick Look Modal */}
            <AnimatePresence>
                {selectedId && (() => {
                    // Parse ID from "card-{id}-{index}"
                    // e.g. "card-1-0" or "card-123-5"
                    const parts = selectedId.split("-");
                    // parts[0] = "card", parts[1] = id, parts[2] = index
                    // If ID matches, we found it.
                    // Note: items might have number ID, so compare String(id).
                    let activeItem = null;
                    if (parts.length >= 3) {
                        const idStr = parts[1];
                        activeItem = items.find(m => String(m.id) === idStr);
                    }

                    if (!activeItem) return null;

                    return (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                            />

                            <motion.div
                                layoutId={selectedId}
                                // Thick Glass Edge (Inner Shadow) + System Header Structure
                                className="relative bg-[#0f050a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] w-full max-w-7xl flex flex-col z-60"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* 2. System Header Bar */}
                                <div className="h-10 bg-[#150a10] border-b border-white/5 flex items-center justify-between px-4 select-none shrink-0">
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                        </div>
                                        <span className="font-mono text-[10px] text-muted-text/40 tracking-widest uppercase ml-2">
                                            IMG_PREVIEW // ID: {activeItem.id}_{activeItem.year}_{activeItem.tag}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="p-1.5 hover:bg-white/10 rounded-md text-muted-text/60 hover:text-white transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* 3. Grid w/ Vertical Seam */}
                                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr]">
                                    {/* Left: Image (Darker Panel + Seam) */}
                                    <div className="relative h-64 md:h-[600px] w-full bg-black/40 border-r border-white/5">
                                        <Image
                                            src={activeItem.src}
                                            alt={activeItem.title}
                                            fill
                                            className="object-contain p-4"
                                            priority
                                        />
                                    </div>

                                    {/* Right: Data (Noise Texture) */}
                                    <div className="p-8 md:p-12 flex flex-col justify-center space-y-8 bg-noise relative">
                                        <div>
                                            {/* 5. Glass Badge Accent */}
                                            <div className="flex items-center gap-2 mb-6">
                                                <span className="px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-[10px] font-mono text-primary uppercase tracking-widest shadow-[0_0_10px_-5px_rgba(236,72,153,0.5)]">
                                                    Event • {activeItem.year}
                                                </span>
                                            </div>

                                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-2">{activeItem.title}</h3>
                                        </div>

                                        <p className="font-mono text-base md:text-xl text-muted-text leading-relaxed border-l-2 border-primary/30 pl-6 py-4 bg-primary/5 rounded-r-lg">
                                            {activeItem.description}
                                        </p>

                                        <div className="flex items-center gap-2 text-sm font-mono text-muted-text/60 pt-4 px-1">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            Data retrieved from memory bank.
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    );
                })()}
            </AnimatePresence>
        </div>
    );
}
