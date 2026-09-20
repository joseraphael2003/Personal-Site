"use client";

import { involvement } from "@/data/portfolio";
import { DraggableMarquee } from "@/components/ui/draggable-marquee";
import { Music, Calendar, Disc3, Radio, CheckCircle2 } from "lucide-react";

export function OtherInvolvement() {
  if (!involvement || involvement.length === 0) return null;

  const getIcon = (id: string) => {
    switch (id) {
      case "celestial-carabaos":
        return <Disc3 className="h-5 w-5 text-emerald-400" />;
      case "the-masirams":
        return <Radio className="h-5 w-5 text-emerald-400" />;
      default:
        return <Music className="h-5 w-5 text-emerald-400" />;
    }
  };

  return (
    <section id="involvement" className="w-full border-b border-neutral-800/80 bg-[#090a0c] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 space-y-12 font-mono">
        {/* Section Header */}
        <div className="space-y-2 border-b border-neutral-800 pb-4">
          <h2 className="font-pixel text-2xl sm:text-3xl text-neutral-100 uppercase tracking-wide">
            OTHER INVOLVEMENT
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed">
            Executive ensemble leadership, live guitar performance, and studio recording across collegiate and indie music projects.
          </p>
        </div>

        {/* Involvements List */}
        <div className="space-y-8">
          {involvement.map((item) => (
            <div
              key={item.id}
              className="rounded-sm border border-neutral-800 bg-[#0f1115] p-6 sm:p-8 space-y-6 hover:border-neutral-700 transition-colors shadow-sm"
            >
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-neutral-800 pb-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    {getIcon(item.id)}
                    <h3 className="font-pixel text-xl sm:text-2xl text-neutral-100 tracking-wide">
                      {item.organization}
                    </h3>
                  </div>
                  <div className="text-sm text-emerald-400 font-bold mt-1">
                    {item.role}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-neutral-400">
                  <Calendar className="h-3.5 w-3.5 text-neutral-500" />
                  <span>{item.period}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-3xl">
                {item.description}
              </p>

              {/* Highlights */}
              {item.highlights && item.highlights.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {item.highlights.map((highlight, hIdx) => (
                    <div
                      key={hIdx}
                      className="rounded-sm border border-neutral-800/80 bg-[#090a0c] p-3 text-xs sm:text-sm text-neutral-300 flex items-start gap-2.5 leading-relaxed"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Photo Reel Gallery */}
              {item.gallery && item.gallery.length > 0 && (
                <div className="space-y-2 pt-3 border-t border-neutral-800/80">
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                    <span>LIVE ARCHIVE // {item.gallery.length} CAPTURES (DRAG TO SCRUB)</span>
                    <span className="text-emerald-400 font-bold">VERIFIED</span>
                  </div>
                  <DraggableMarquee items={item.gallery} speed={0.35} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
