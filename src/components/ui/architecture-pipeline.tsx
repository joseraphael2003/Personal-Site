import { PipelineStep } from "@/data/portfolio";
import { ArrowDown, ArrowRight } from "lucide-react";

interface ArchitecturePipelineProps {
  steps: PipelineStep[];
  className?: string;
}

export function ArchitecturePipeline({
  steps,
  className = "",
}: ArchitecturePipelineProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className={`space-y-2 font-mono ${className}`}>
      <div className="flex items-center justify-between text-xs text-neutral-500 border-b border-neutral-800 pb-1.5">
        <span className="text-emerald-400 font-bold uppercase tracking-wider">
          ARCHITECTURE PIPELINE
        </span>
        <span>{steps.length} STAGES</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1">
        {steps.map((step, idx) => (
          <div
            key={step.stage}
            className="relative rounded-sm border border-neutral-800 bg-[#090a0c] p-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                <span>0{idx + 1}</span>
                <span className="text-emerald-400 font-bold">STAGE</span>
              </div>
              <div className="font-pixel text-sm text-neutral-100 uppercase tracking-wide">
                {step.stage}
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed mt-1.5">
                {step.details}
              </p>
            </div>

            {/* Connecting chevron indicators */}
            {idx < steps.length - 1 && (
              <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 h-4 w-4 items-center justify-center rounded-full bg-[#0c0d10] border border-neutral-700 text-neutral-400">
                <ArrowRight className="h-2.5 w-2.5" />
              </div>
            )}
            {idx < steps.length - 1 && (
              <div className="flex md:hidden justify-center pt-2 text-neutral-600">
                <ArrowDown className="h-3 w-3" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
