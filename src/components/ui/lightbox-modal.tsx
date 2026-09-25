"use client";

import { useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface LightboxModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image: {
    src: string;
    caption?: string;
    alt?: string;
  } | null;
  originRect?: DOMRect | null;
}

export function LightboxModal({ open, onOpenChange, image, originRect }: LightboxModalProps) {
  const [loaded, setLoaded] = useState(false);

  if (!image) return null;

  // Calculate click origin offset if rect is present
  const originX = originRect && typeof window !== "undefined"
    ? originRect.left + originRect.width / 2 - window.innerWidth / 2
    : 0;
  const originY = originRect && typeof window !== "undefined"
    ? originRect.top + originRect.height / 2 - window.innerHeight / 2
    : 0;

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) setLoaded(false);
        onOpenChange(nextOpen);
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md transition-opacity duration-200 animate-in fade-in" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 pointer-events-none">
          <Dialog.Popup
            aria-label={image.caption || image.alt || "Image preview"}
            className="pointer-events-auto relative max-h-[88dvh] max-w-[94vw] sm:max-w-5xl w-auto overflow-hidden flex flex-col items-center rounded-sm border border-edge bg-raised p-2.5 sm:p-4 shadow-2xl focus:outline-none"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.55,
                x: originX,
                y: originY,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 30,
                mass: 0.7,
              }}
              className="relative w-full flex flex-col items-center"
            >
              <Dialog.Title className="sr-only">
                {image.caption || image.alt || "Image preview"}
              </Dialog.Title>
              {/* Close Button */}
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20">
                <Dialog.Close className="cursor-pointer rounded-sm border border-edge bg-chip/90 p-1.5 text-muted hover:text-white light:hover:text-ink hover:border-edge-strong transition-colors">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close modal</span>
                </Dialog.Close>
              </div>

              {/* Dynamic Natural Ratio Stage Viewer with Strict Containment */}
              <div
                className={`relative overflow-hidden rounded-sm bg-black/80 flex items-center justify-center max-w-full max-h-[80dvh] ${
                  !loaded ? "min-h-[220px] min-w-[min(280px,100%)]" : ""
                }`}
              >
                {/* Subtle pulse skeleton before decode */}
                {!loaded && (
                  <div className="absolute inset-0 bg-white/[0.06] animate-pulse rounded-sm" />
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.caption || image.alt || "Lightbox image"}
                  onLoad={() => setLoaded(true)}
                  className={`w-auto h-auto max-w-full max-h-[78dvh] object-contain select-none rounded-sm transition-opacity duration-300 ${
                    loaded ? "opacity-100" : "opacity-0"
                  }`}
                  loading="eager"
                />
              </div>
            </motion.div>
          </Dialog.Popup>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
