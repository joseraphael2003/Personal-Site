"use client";

import { Dialog } from "@base-ui/react/dialog";
import Image from "next/image";
import { X } from "lucide-react";

interface LightboxModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image: {
    src: string;
    caption?: string;
    alt?: string;
  } | null;
}

export function LightboxModal({ open, onOpenChange, image }: LightboxModalProps) {
  if (!image) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md transition-opacity duration-200 animate-in fade-in" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 pointer-events-none">
          <Dialog.Popup
            aria-label={image.caption || image.alt || "Image preview"}
            className="pointer-events-auto relative max-h-[90vh] max-w-[95vw] sm:max-w-4xl w-full flex flex-col items-center rounded-sm border border-neutral-800 bg-[#0c0d10] p-3 sm:p-4 shadow-2xl focus:outline-none animate-in zoom-in-95 duration-200"
          >
            <Dialog.Title className="sr-only">
              {image.caption || image.alt || "Image preview"}
            </Dialog.Title>
            {/* Close Button */}
            <div className="absolute top-3 right-3 z-10">
              <Dialog.Close className="cursor-pointer rounded-sm border border-neutral-800 bg-neutral-900/80 p-1.5 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors">
                <X className="h-4 w-4" />
                <span className="sr-only">Close modal</span>
              </Dialog.Close>
            </div>

            {/* Stage Viewer */}
            <div className="relative w-full aspect-video sm:aspect-16/10 max-h-[75vh] overflow-hidden rounded-sm bg-black/60 flex items-center justify-center">
              <Image
                src={image.src}
                alt={image.caption || image.alt || "Lightbox image"}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 95vw, 1200px"
                priority
              />
            </div>

            {/* Caption */}
            {image.caption && (
              <div className="w-full pt-3 px-1 text-center sm:text-left">
                <p className="text-xs sm:text-sm font-mono text-neutral-300">
                  {image.caption}
                </p>
              </div>
            )}
          </Dialog.Popup>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
