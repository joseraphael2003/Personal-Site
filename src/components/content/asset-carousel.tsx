"use client";

import { useRef } from "react";

interface AssetCarouselProps {
    images: string[];
    title: string;
}

export function AssetCarousel({ images, title }: AssetCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative group">
            <div
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide"
                style={{ scrollBehavior: "smooth" }}
            >
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className="snap-center shrink-0 w-[280px] md:w-[400px] aspect-[9/16] rounded-xl overflow-hidden border border-white/5 bg-white/5 first:ml-0 last:mr-0"
                    >
                        <img
                            src={img}
                            alt={`${title} screenshot ${idx + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>

            {/* Scroll Indication Gradient (Fades out when scrolled - refined later if needed) */}
            <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-black/50 to-transparent pointer-events-none md:hidden" />
        </div>
    );
}
