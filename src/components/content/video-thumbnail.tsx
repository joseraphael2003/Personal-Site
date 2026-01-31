"use client";

import { Play } from "lucide-react";

interface VideoThumbnailProps {
    thumbnail: string;
    videoUrl: string;
    title: string;
}

export function VideoThumbnail({ thumbnail, videoUrl, title }: VideoThumbnailProps) {
    return (
        <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-full aspect-video rounded-lg overflow-hidden border border-white/10 hover:border-primary/50 transition-colors"
        >
            {/* Thumbnail Image */}
            <img
                src={thumbnail}
                alt={`Watch vlog: ${title}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                {/* Play Button */}
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
                    <Play className="w-5 h-5 md:w-8 md:h-8 text-white fill-white ml-1" />
                </div>
            </div>

            {/* Label */}
            <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[10px] md:text-xs text-white font-mono uppercase tracking-wider">
                Watch Vlog
            </div>
        </a>
    );
}
