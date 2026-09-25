import { skillCategories } from "@/data/portfolio";
import { Terminal, Cpu, Database, Wrench, CircuitBoard } from "lucide-react";

export function Skills() {
  const iconMap: Record<string, React.ReactNode> = {
    Languages: <Terminal className="h-4 w-4 text-accent-hover" />,
    "Frameworks & Systems": <Cpu className="h-4 w-4 text-accent-hover" />,
    "Databases & Storage": <Database className="h-4 w-4 text-accent-hover" />,
    "Automation & Tooling": <Wrench className="h-4 w-4 text-accent-hover" />,
    Engineering: <CircuitBoard className="h-4 w-4 text-accent-hover" />,
  };

  return (
    <section id="skills" className="w-full border-b border-edge/80 bg-page py-10 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 space-y-10 font-text">
        {/* Section Header */}
        <div className="border-b border-edge pb-4">
          <h2 className="font-display text-2xl sm:text-3xl text-ink uppercase tracking-wide">
            Tech Stack
          </h2>
        </div>

        {/* Compact Horizontal Spec-List Ledger */}
        <div className="rounded-sm border border-edge bg-surface p-4 sm:p-6 lg:p-7 divide-y divide-edge/70">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="py-2.5 sm:py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-4 lg:gap-3"
            >
              {/* Category Label with Icon */}
              <div className="flex items-center gap-2 lg:gap-2.5 shrink-0 sm:min-w-[200px] lg:min-w-[250px]">
                {iconMap[category.title] || <Terminal className="h-4 w-4 text-accent-hover" />}
                <span className="font-display text-sm sm:text-base text-body uppercase tracking-wide">
                  [{category.title}]
                </span>
              </div>

              {/* Skills Row */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-sm border border-edge bg-chip px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs sm:text-sm text-copy hover:border-edge-strong hover:text-ink transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
