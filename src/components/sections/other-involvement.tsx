"use client";

import { useState } from "react";
import { involvement } from "@/data/portfolio";
import { DraggableMarquee } from "@/components/ui/draggable-marquee";
import { LightboxModal } from "@/components/ui/lightbox-modal";
import { Music, Calendar, Disc3, Radio } from "lucide-react";

export function OtherInvolvement() {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; caption?: string } | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  if (!involvement || involvement.length === 0) return null;

  const getIcon = (id: string) => {
    switch (id) {
      case "celestial-carabaos":
        return <Disc3 className="h-5 w-5 text-accent-hover" />;
      case "the-masirams":
        return <Radio className="h-5 w-5 text-accent-hover" />;
      default:
        return <Music className="h-5 w-5 text-accent-hover" />;
    }
  };

  return (
    <section id="involvement" className="w-full border-b border-edge/80 bg-page py-10 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 space-y-12 font-text">
        {/* Section Header */}
        <div className="space-y-2 border-b border-edge pb-4">
          <h2 className="font-display text-2xl sm:text-3xl text-ink uppercase tracking-wide">
            Other Involvement
          </h2>
        </div>

        {/* Involvements List */}
        <div className="space-y-8">
          {involvement.map((item) => (
            <div
              key={item.id}
              className="rounded-sm border border-edge bg-surface p-4 sm:p-6 lg:p-8 space-y-6 hover:border-edge-strong transition-colors shadow-sm"
            >
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-edge pb-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    {getIcon(item.id)}
                    <h3 className="font-text font-bold text-base sm:text-lg text-ink">
                      {item.organization}
                    </h3>
                  </div>
                  <div className="text-sm text-accent-hover font-bold mt-1">
                    {item.role}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted">
                  <Calendar className="h-3.5 w-3.5 text-subtle" />
                  <span>{item.period}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-copy leading-normal sm:leading-relaxed max-w-3xl">
                {item.description}
              </p>


              {/* Photo Reel Gallery */}
              {item.gallery && item.gallery.length > 0 && (
                <div className="space-y-2 pt-3 border-t border-edge/80">
                  <DraggableMarquee
                    items={item.gallery}
                    speed={0.35}
                    onItemClick={(origIdx, galleryItem, rect) => {
                      setOriginRect(rect || null);
                      setLightboxImage(item.gallery[origIdx]);
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {lightboxImage && (
        <LightboxModal
          open={!!lightboxImage}
          onOpenChange={(open) => {
            if (!open) {
              setLightboxImage(null);
              setOriginRect(null);
            }
          }}
          image={lightboxImage}
          originRect={originRect}
        />
      )}
    </section>
  );
}
