import Image from "next/image";
import { certifications } from "@/data/portfolio";
import { Award, ArrowUpRight, CheckCircle2 } from "lucide-react";

export function Certifications() {
  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="w-full border-b border-neutral-800/80 bg-[#090a0c] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 space-y-10 font-mono">
        {/* Section Header */}
        <div className="border-b border-neutral-800 pb-4">
          <h2 className="font-pixel text-2xl sm:text-3xl text-neutral-100 uppercase tracking-wide">
            CERTIFICATIONS
          </h2>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="rounded-sm border border-neutral-800 bg-[#0f1115] p-6 flex flex-col justify-between space-y-5 hover:border-neutral-700 transition-colors shadow-sm"
            >
              <div className="space-y-4">
                {/* Badge Thumbnail & Issuer Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-sm border border-neutral-800 bg-black/60 p-1.5 flex items-center justify-center">
                    {cert.badgeUrl ? (
                      <Image
                        src={cert.badgeUrl}
                        alt={cert.title}
                        fill
                        sizes="56px"
                        className="object-contain p-1"
                      />
                    ) : (
                      <Award className="h-6 w-6 text-emerald-400" />
                    )}
                  </div>

                  <div className="text-right text-xs text-neutral-500 font-mono">
                    <div>{cert.year}</div>
                    <div className="text-[11px] text-emerald-400 font-bold mt-0.5">VERIFIED</div>
                  </div>
                </div>

                {/* Title & Issuer */}
                <div className="space-y-1">
                  <div className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                    {cert.issuer}
                  </div>
                  <h3 className="font-pixel text-lg sm:text-xl text-neutral-100 leading-snug">
                    {cert.title}
                  </h3>
                </div>

                {/* Honors Tag */}
                {cert.honors && (
                  <div className="inline-block rounded-sm border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs text-emerald-300 font-bold">
                    {cert.honors}
                  </div>
                )}

                {/* Earner / Highlights */}
                {cert.earner && (
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 pt-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Issued to: {cert.earner}</span>
                  </div>
                )}
              </div>

              {/* Action Link Footer */}
              <div className="pt-3 border-t border-neutral-800/80">
                {cert.verifyUrl ? (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors group cursor-pointer"
                  >
                    <span>Verify on Credly</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : cert.moreUrl ? (
                  <a
                    href={cert.moreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors group cursor-pointer"
                  >
                    <span>See More</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <span className="text-xs text-neutral-500">Official Institutional Credential</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
