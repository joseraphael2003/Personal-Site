"use client";

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
  if (!image) return null;

  // Calculate click origin offset if rect is present
  const originX = originRect && typeof window !== "undefined"
    ? originRect.left + originRect.width / 2 - window.innerWidth / 2
    : 0;
  const originY = originRect && typeof window !== "undefined"
    ? originRect.top + originRect.height / 2 - window.innerHeight / 2
    : 0;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md transition-opacity duration-200 animate-in fade-in" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 pointer-events-none">
          <Dialog.Popup
            aria-label={image.caption || image.alt || "Image preview"}
            className="pointer-events-auto relative max-h-[90vh] max-w-[95vw] sm:max-w-5xl w-auto flex flex-col items-center rounded-sm border border-neutral-800 bg-[#0c0d10] p-2.5 sm:p-4 shadow-2xl focus:outline-none"
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
              exit={{
                opacity: 0,
                scale: 0.8,
              }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 30,
                mass: 0.7,
              }}
            >
              <Dialog.Title className="sr-only">
                {image.caption || image.alt || "Image preview"}
              </Dialog.Title>
              {/* Close Button */}
              <div className="absolute top-3 right-3 z-20">
                <Dialog.Close className="cursor-pointer rounded-sm border border-neutral-800 bg-neutral-900/90 p-1.5 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close modal</span>
                </Dialog.Close>
              </div>

              {/* Dynamic Natural Ratio Stage Viewer */}
              <div className="relative overflow-hidden rounded-sm bg-black/70 flex items-center justify-center max-h-[82vh] max-w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.caption || image.alt || "Lightbox image"}
                  className="w-auto h-auto max-h-[80vh] max-w-[90vw] sm:max-w-[80vw] object-contain rounded-sm"
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
