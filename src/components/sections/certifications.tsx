"use client";

import Image from "next/image";
import { certifications } from "@/data/portfolio";
import { Award, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { DraggableMarquee } from "@/components/ui/draggable-marquee";
import { LightboxModal } from "@/components/ui/lightbox-modal";
import { useLightbox } from "@/hooks/use-lightbox";

export function Certifications() {
  const { image, originRect, open, onOpenChange } = useLightbox();

  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="w-full border-b border-edge/80 bg-page py-10 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 space-y-10 font-text">
        {/* Section Header */}
        <div className="border-b border-edge pb-4">
          <h2 className="font-display text-2xl sm:text-3xl text-ink uppercase tracking-wide">
            Certifications
          </h2>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {certifications.map((cert) => {
            const isFeatured = cert.galleryImages && cert.galleryImages.length > 0;

            return (
              <div
                key={cert.id}
                className={`rounded-sm border border-edge bg-surface p-4 sm:p-5 lg:p-6 flex flex-col justify-between space-y-5 hover:border-edge-strong transition-colors shadow-sm ${
                  isFeatured ? "md:col-span-6" : "md:col-span-3"
                }`}
              >
                <div className="space-y-4">
                  {/* Badge Thumbnail & Issuer Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-sm border border-edge bg-scrim/60 light:bg-field p-1.5 flex items-center justify-center">
                      {cert.badgeUrl ? (
                        <Image
                          src={cert.badgeUrl}
                          alt={cert.title}
                          fill
                          sizes="56px"
                          className="object-contain p-1"
                        />
                      ) : (
                        <Award className="h-6 w-6 text-accent-hover" />
                      )}
                    </div>

                    <div className="text-right text-xs text-subtle font-text">
                      <div>{cert.year}</div>
                      <div className="text-[11px] text-accent-hover font-bold mt-0.5">VERIFIED</div>
                    </div>
                  </div>

                  {/* Title & Issuer */}
                  <div className="space-y-1">
                    <div className="text-xs text-muted font-bold uppercase tracking-wider">
                      {cert.issuer}
                    </div>
                    <h3 className="font-text font-bold text-base sm:text-lg text-ink">
                      {cert.title}
                    </h3>
                  </div>

                  {/* Honors Tag */}
                  {cert.honors && (
                    <div className="inline-block rounded-sm border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs text-accent-soft font-bold">
                      {cert.honors}
                    </div>
                  )}

                  {/* Earner */}
                  {cert.earner && (
                    <div className="flex items-center gap-1.5 text-xs text-muted pt-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent-hover shrink-0" />
                      <span>Issued to: {cert.earner}</span>
                    </div>
                  )}

                  {/* Featured Gallery / Marquee for VITRO */}
                  {cert.galleryImages && cert.galleryImages.length > 0 && (() => {
                    const gallery = cert.galleryImages;
                    return (
                      <div className="pt-2 border-t border-edge/80">
                        <DraggableMarquee
                          items={gallery}
                          speed={0.35}
                          onItemClick={(origIdx, _item, rect) =>
                            open(gallery[origIdx], rect || null)
                          }
                        />
                      </div>
                    );
                  })()}
                </div>

                {/* Action Link Footer */}
                <div className="pt-3 border-t border-edge/80">
                  {cert.verifyUrl ? (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-hover hover:text-accent-soft transition-colors group cursor-pointer"
                    >
                      <span>Verify on Credly</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : cert.moreUrl ? (
                    <a
                      href={cert.moreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-hover hover:text-accent-soft transition-colors group cursor-pointer"
                    >
                      <span>See More</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : (
                    <span className="text-xs text-subtle">Official Institutional Credential</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {image && (
        <LightboxModal
          open={!!image}
          onOpenChange={onOpenChange}
          image={image}
          originRect={originRect}
        />
      )}
    </section>
  );
}
