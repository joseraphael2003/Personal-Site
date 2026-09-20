"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Dialog } from "@base-ui/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryItem } from "@/data/portfolio";
import { DraggableMarquee } from "@/components/ui/draggable-marquee";

interface GalleryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  images: GalleryItem[];
  initialIndex?: number;
}

export function GalleryModal({
  open,
  onOpenChange,
  title,
  images,
  initialIndex = 0,
}: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);


  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [open, handleNext, handlePrev]);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-150" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          <Dialog.Popup className="relative w-full max-w-4xl rounded-sm border border-neutral-700 bg-[#0c0e12] p-4 sm:p-6 shadow-2xl text-neutral-200 outline-none flex flex-col gap-4 max-h-[92vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <Dialog.Title className="font-pixel text-lg sm:text-xl text-neutral-100 uppercase tracking-wide">
                  {title}
                </Dialog.Title>
                <div className="text-xs font-mono text-neutral-400 mt-0.5">
                  Figure {currentIndex + 1} of {images.length}
                </div>
              </div>
              <Dialog.Close className="cursor-pointer rounded-sm border border-neutral-700 p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors">
                <X className="h-4 w-4" />
                <span className="sr-only">Close gallery</span>
              </Dialog.Close>
            </div>

            {/* Main Stage Viewport */}
            <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-neutral-800 bg-black flex items-center justify-center">
              <Image
                src={currentImage.src}
                alt={currentImage.caption}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 900px"
              />

              {/* Arrow navigation triggers */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    aria-label="Previous image"
                    className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 rounded-sm bg-black/70 p-2 text-neutral-300 hover:text-white hover:bg-black/90 transition-colors border border-neutral-700"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next image"
                    className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 rounded-sm bg-black/70 p-2 text-neutral-300 hover:text-white hover:bg-black/90 transition-colors border border-neutral-700"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>

            {/* Caption */}
            <div className="rounded-sm border border-neutral-800 bg-[#090a0c] px-3.5 py-2 text-xs font-mono text-neutral-300">
              {currentImage.caption}
            </div>

            {/* Interactive Draggable Marquee Reel */}
            {images.length > 1 && (
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>REEL // DRAG TO SCRUB</span>
                  <span>{images.length} CAPTURES</span>
                </div>
                <DraggableMarquee
                  items={images}
                  selectedIndex={currentIndex}
                  onItemClick={(idx) => setCurrentIndex(idx)}
                  speed={0.4}
                />
              </div>
            )}
          </Dialog.Popup>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
