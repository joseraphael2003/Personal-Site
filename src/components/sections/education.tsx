import { education } from "@/data/portfolio";
import { GraduationCap, CheckCircle2, Calendar, MapPin } from "lucide-react";

export function Education() {
  const item = education[0];
  if (!item) return null;

  return (
    <section id="education" className="w-full border-b border-edge/80 bg-page py-10 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 space-y-10 font-text">
        {/* Section Header */}
        <div className="border-b border-edge pb-4">
          <h2 className="font-display text-2xl sm:text-3xl text-ink uppercase tracking-wide">
            Education
          </h2>
        </div>

        {/* Focused Full-Width Degree Card */}
        <div>
          <div className="rounded-sm border border-edge bg-surface p-4 sm:p-6 lg:p-8 space-y-5 hover:border-edge-strong transition-colors">
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-edge pb-4">
              <div>
                <div className="flex items-center gap-2 text-accent-hover">
                  <GraduationCap className="h-4 w-4" />
                  <span className="text-sm font-bold text-muted">
                    {item.institution}
                  </span>
                </div>
                <h3 className="font-text font-bold text-base sm:text-lg text-ink mt-1">
                  {item.degree}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-subtle">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted" />
                  <span className="text-copy">{item.period}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <MapPin className="h-3.5 w-3.5 text-muted" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>

            {/* Honors Tag */}
            {item.honors && (
              <div className="inline-block rounded-sm border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs text-accent-soft font-bold">
                {item.honors}
              </div>
            )}

            {/* Key Takeaways */}
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-copy leading-normal sm:leading-relaxed pt-1">
              {item.details.map((detail, dIdx) => (
                <li key={dIdx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-accent-hover mt-0.5 flex-shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
