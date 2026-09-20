import { skillCategories } from "@/data/portfolio";
import { Terminal, Cpu, Database, Wrench, CircuitBoard } from "lucide-react";

export function Skills() {
  const iconMap: Record<string, React.ReactNode> = {
    Languages: <Terminal className="h-4 w-4 text-emerald-400" />,
    "Frameworks & Systems": <Cpu className="h-4 w-4 text-emerald-400" />,
    "Databases & Storage": <Database className="h-4 w-4 text-emerald-400" />,
    "Automation & Tooling": <Wrench className="h-4 w-4 text-emerald-400" />,
    Engineering: <CircuitBoard className="h-4 w-4 text-emerald-400" />,
  };

  return (
    <section id="skills" className="w-full border-b border-neutral-800/80 bg-[#090a0c] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 space-y-10 font-mono">
        {/* Section Header */}
        <div className="border-b border-neutral-800 pb-4">
          <h2 className="font-pixel text-2xl sm:text-3xl text-neutral-100 uppercase tracking-wide">
            TECH STACK
          </h2>
        </div>

        {/* Compact Horizontal Spec-List Ledger */}
        <div className="rounded-sm border border-neutral-800 bg-[#0f1115] p-5 sm:p-7 divide-y divide-neutral-800/70">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-baseline justify-between gap-3"
            >
              {/* Category Label with Icon */}
              <div className="flex items-center gap-2.5 min-w-[250px] flex-shrink-0">
                {iconMap[category.title] || <Terminal className="h-4 w-4 text-emerald-400" />}
                <span className="font-pixel text-base text-neutral-200 uppercase tracking-wide">
                  [{category.title}]
                </span>
              </div>

              {/* Skills Row */}
              <div className="flex flex-wrap items-center gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-sm border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-sm text-neutral-300 hover:border-neutral-700 hover:text-white transition-colors"
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
