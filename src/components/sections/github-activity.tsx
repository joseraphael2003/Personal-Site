"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { Tooltip } from "@base-ui/react";
import { AcronymTooltip } from "@/components/ui/tooltip";
import { profile } from "@/data/portfolio";
import {
  CONTRIBUTIONS_URL,
  normalizeContributions,
  type ContributionData,
} from "@/lib/github-contributions";
import { Github, Activity, ArrowUpRight, AlertCircle } from "lucide-react";

interface GitHubActivityProps {
  initialData?: ContributionData | null;
}
const emptySubscribe = () => () => {};

export function GitHubActivity({ initialData }: GitHubActivityProps) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [clientData, setClientData] = useState<ContributionData | null>(null);
  const data = initialData ?? clientData;

  useEffect(() => {
    const isMock = typeof window !== "undefined" && window.location.search.includes("mock=offline");

    // If no initialData was provided via SSR and not in offline mock mode, fetch client-side
    if (!initialData && !isMock) {
      fetch(CONTRIBUTIONS_URL)
        .then((res) => (res.ok ? res.json() : null))
        .then((json: unknown) => {
          if (json) {
            setClientData(normalizeContributions(json));
          }
        })
        .catch(() => {
          // Keep data as null to show clean fallback
        });
    }
  }, [initialData]);

  const isOfflineMock = isClient && typeof window !== "undefined" && window.location.search.includes("mock=offline");
  const showFallback = isOfflineMock || !data || !data.contributions || data.contributions.length === 0;
  // Render recent 52 weeks (364 days) or available days
  const displayDays = data?.contributions ? data.contributions.slice(-364) : [];

  const getColorClass = (level: number) => {
    switch (level) {
      case 1:
        return "bg-heat-1";
      case 2:
        return "bg-heat-2";
      case 3:
        return "bg-heat-3";
      case 4:
        return "bg-heat-4";
      default:
        return "bg-heat-0";
    }
  };

  return (
    <section id="github" className="w-full border-b border-edge/80 bg-page py-16 sm:py-24 font-text">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-edge pb-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl text-ink uppercase tracking-wide">
              GitHub Contribution Stream
            </h2>
          </div>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-accent-hover transition-colors inline-flex items-center gap-1.5"
          >
            <Github className="h-4 w-4" />
            <span>github.com/joseraphael2003</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Heatmap Card */}
        <div className="rounded-sm border border-edge bg-surface p-5 sm:p-7 space-y-5">
          {showFallback ? (
            /* Clean Offline Fallback Banner */
            <div className="rounded-sm border border-edge bg-page p-6 text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-muted text-sm">
                <AlertCircle className="h-4 w-4 text-subtle" />
                <span>GitHub activity feed currently offline.</span>
              </div>
              <p className="text-sm text-subtle max-w-md mx-auto">
                Live commits and daily public repository contributions can be inspected directly on
                GitHub.
              </p>
              <div className="pt-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm border border-edge-strong bg-chip px-4 py-2 text-sm text-accent-hover hover:bg-chip-hover transition-colors inline-flex items-center gap-1.5 font-bold"
                >
                  <span>View Profile on GitHub</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ) : (
            /* Live Styled SVG Matrix */
            <div className="space-y-4">
              {data && (
                <p className="sr-only">
                  {data.total} contributions in the last year.
                </p>
              )}
              <div className="flex items-center justify-between text-sm text-muted border-b border-edge/80 pb-2">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-accent-hover" />
                  <span className="text-body font-bold">{typeof data?.total === "number" ? data.total : 0}</span>
                  <span>contributions in rolling 12 months</span>
                </div>
                <div className="text-xs text-subtle hidden sm:block">
                  ROLLING 52-WEEK CALENDAR
                </div>
              </div>

              {/* Grid: 52 columns x 7 days */}
              <div className="overflow-x-auto pb-2">
                <Tooltip.Provider delay={150}>
                  <div
                    className="grid grid-rows-7 grid-flow-col gap-1 min-w-[720px] max-w-full"
                    aria-hidden="true"
                  >
                    {displayDays.map((day) => (
                      <AcronymTooltip
                        key={day.date}
                        withProvider={false}
                        tabIndex={-1}
                        className="cursor-pointer inline-block"
                        content={
                          <span>
                            <strong className="text-accent-hover">{day.count} contributions</strong> on{" "}
                            {day.date}
                          </span>
                        }
                      >
                        <div
                          className={`h-2.5 w-2.5 rounded-[1px] transition-transform hover:scale-125 ${getColorClass(
                            day.level
                          )}`}
                        />
                      </AcronymTooltip>
                    ))}
                  </div>
                </Tooltip.Provider>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end text-xs text-subtle pt-2 border-t border-edge/60">
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <div className="h-2 w-2 rounded-[1px] bg-heat-0" />
                  <div className="h-2 w-2 rounded-[1px] bg-heat-1" />
                  <div className="h-2 w-2 rounded-[1px] bg-heat-2" />
                  <div className="h-2 w-2 rounded-[1px] bg-heat-3" />
                  <div className="h-2 w-2 rounded-[1px] bg-heat-4" />
                  <span>More</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
