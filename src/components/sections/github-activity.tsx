"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { AcronymTooltip } from "@/components/ui/tooltip";
import { profile } from "@/data/portfolio";
import { Github, Activity, ArrowUpRight, AlertCircle } from "lucide-react";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubActivityProps {
  initialData?: {
    total: number;
    contributions: ContributionDay[];
  } | null;
}
const emptySubscribe = () => () => {};

export function GitHubActivity({ initialData }: GitHubActivityProps) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const isMock = typeof window !== "undefined" && window.location.search.includes("mock=offline");

    // If no initialData was provided via SSR and not in offline mock mode, fetch client-side
    if (!initialData && !isMock) {
      fetch("https://github-contributions-api.jogruber.de/v4/joseraphael2003?y=last")
        .then((res) => (res.ok ? res.json() : null))
        .then((json) => {
          if (json && json.contributions) {
            const totalCount =
              typeof json.total?.lastYear === "number"
                ? json.total.lastYear
                : typeof json.total === "number"
                ? json.total
                : Number(Object.values(json.total || {})[0]) || 0;
            const flatDays: ContributionDay[] = [];
            json.contributions.forEach((day: { date: string; count: number; level: number }) => {
              flatDays.push({
                date: day.date,
                count: day.count,
                level: Math.min(4, Math.max(0, day.level)) as 0 | 1 | 2 | 3 | 4,
              });
            });
            setData({ total: totalCount, contributions: flatDays });
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
    <section className="w-full border-b border-neutral-800/80 bg-[#090a0c] py-16 sm:py-24 font-mono">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-800 pb-4">
          <div>
            <h2 className="font-pixel text-2xl sm:text-3xl text-neutral-100 uppercase tracking-wide">
              GITHUB CONTRIBUTION STREAM
            </h2>
          </div>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 hover:text-accent-hover transition-colors inline-flex items-center gap-1.5"
          >
            <Github className="h-4 w-4" />
            <span>github.com/joseraphael2003</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Heatmap Card */}
        <div className="rounded-sm border border-neutral-800 bg-[#0f1115] p-5 sm:p-7 space-y-5">
          {showFallback ? (
            /* Clean Offline Fallback Banner */
            <div className="rounded-sm border border-neutral-800 bg-[#090a0c] p-6 text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-neutral-400 text-sm">
                <AlertCircle className="h-4 w-4 text-neutral-500" />
                <span>GitHub activity feed currently offline.</span>
              </div>
              <p className="text-sm text-neutral-500 max-w-md mx-auto">
                Live commits and daily public repository contributions can be inspected directly on
                GitHub.
              </p>
              <div className="pt-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-accent-hover hover:bg-neutral-800 transition-colors inline-flex items-center gap-1.5 font-bold"
                >
                  <span>View Profile on GitHub</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ) : (
            /* Live Styled SVG Matrix */
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-neutral-400 border-b border-neutral-800/80 pb-2">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-accent-hover" />
                  <span className="text-neutral-200 font-bold">{typeof data?.total === "number" ? data.total : 0}</span>
                  <span>contributions in rolling 12 months</span>
                </div>
                <div className="text-xs text-neutral-500 hidden sm:block">
                  ROLLING 52-WEEK CALENDAR
                </div>
              </div>

              {/* Grid: 52 columns x 7 days */}
              <div className="overflow-x-auto pb-2">
                <div className="grid grid-rows-7 grid-flow-col gap-1 min-w-[720px] max-w-full">
                  {displayDays.map((day) => (
                    <AcronymTooltip
                      key={day.date}
                      tabIndex={-1}
                      className="outline-none focus:outline-none cursor-pointer inline-block"
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
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end text-xs text-neutral-500 pt-2 border-t border-neutral-800/60">
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
