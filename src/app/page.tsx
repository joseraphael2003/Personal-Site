"use client";

import { Tabs, Tooltip } from "@base-ui/react";
import { Terminal, Cpu, Network, Radio, ShieldAlert, Sparkles } from "lucide-react";

export default function PreviewPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Telemetry Status Bar */}
      <header className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800/80 pb-4 text-xs">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-neutral-400">NODE:</span>
          <span className="font-bold text-neutral-200">ADNU.NETWORKS.2027</span>
        </div>

        <div className="flex items-center gap-4 text-neutral-500">
          <span>FREQ: 2.4/5.0GHz</span>
          <span className="text-neutral-700">|</span>
          <span className="text-emerald-400">STATUS: ACTIVE</span>
        </div>
      </header>

      {/* Hero / Identity Section */}
      <section className="mb-14 space-y-4">
        <div className="inline-flex items-center gap-2 rounded border border-emerald-500/30 bg-emerald-950/20 px-2.5 py-1 text-xs text-emerald-400">
          <Radio className="h-3.5 w-3.5 animate-pulse" />
          <span>SYS.ID // RAPHAEL DICHOSO</span>
        </div>

        <h1 className="font-pixel text-4xl tracking-wide text-neutral-100 sm:text-5xl md:text-6xl">
          JOSE RAPHAEL DICHOSO
        </h1>

        <p className="font-pixel text-lg text-emerald-400 sm:text-xl">
          &gt; COMPUTER ENGINEERING // NETWORKS &amp; HARDWARE SYSTEMS
        </p>

        <p className="max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
          Bridging physical electronics, network infrastructure, and modern software architectures.
          Specializing in hardware telemetry, protocol analysis, and full-stack engineering.
        </p>
      </section>

      {/* Interactive Base UI Telemetry Console */}
      <section className="rounded-lg border border-neutral-800 bg-[#0d0f12] p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-emerald-400" />
            <span className="font-pixel text-sm tracking-wider text-neutral-300">
              [SYSTEM_PROJECTS // TELEMETRY_CONSOLE]
            </span>
          </div>
          <span className="text-[11px] text-neutral-500">BASE UI PRIMITIVES</span>
        </div>

        <Tabs.Root defaultValue="opsdeck" className="space-y-6">
          {/* Base UI Tabs List */}
          <Tabs.List className="flex flex-wrap gap-2 border-b border-neutral-800/80 pb-3">
            <Tabs.Tab
              value="opsdeck"
              className="cursor-pointer rounded border border-transparent px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:border-neutral-700 hover:text-neutral-200 data-[selected]:border-emerald-500/50 data-[selected]:bg-emerald-950/30 data-[selected]:text-emerald-400"
            >
              [01 // OPSDECK]
            </Tabs.Tab>
            <Tabs.Tab
              value="psu"
              className="cursor-pointer rounded border border-transparent px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:border-neutral-700 hover:text-neutral-200 data-[selected]:border-emerald-500/50 data-[selected]:bg-emerald-950/30 data-[selected]:text-emerald-400"
            >
              [02 // POWER SUPPLY]
            </Tabs.Tab>
            <Tabs.Tab
              value="heatmap"
              className="cursor-pointer rounded border border-transparent px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:border-neutral-700 hover:text-neutral-200 data-[selected]:border-emerald-500/50 data-[selected]:bg-emerald-950/30 data-[selected]:text-emerald-400"
            >
              [03 // NAGA INCIDENTS]
            </Tabs.Tab>
          </Tabs.List>

          {/* Panel 1: OpsDeck */}
          <Tabs.Panel value="opsdeck" className="space-y-4 pt-1 outline-none">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-pixel text-xl text-neutral-100">OPSDECK TELEMETRY DASHBOARD</h3>
                <p className="text-xs text-neutral-400">Autonomous invoice ingestion &amp; ticket triage pipeline.</p>
              </div>
              <span className="rounded bg-neutral-800 px-2 py-0.5 text-[10px] font-bold text-neutral-300">
                SOFTWARE / AI
              </span>
            </div>

            <p className="text-xs leading-relaxed text-neutral-400">
              Integrates Telegram bots, n8n webhook workflows, and Supabase/Neon data streams into a unified visual
              operations board with generative AI document extraction.
            </p>

            {/* Spec Sheet Grid with Base UI Tooltips */}
            <Tooltip.Provider delay={100}>
              <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
                <Tooltip.Root>
                  <Tooltip.Trigger className="group flex flex-col rounded border border-neutral-800/80 bg-neutral-900/60 p-2.5 text-left transition-colors hover:border-neutral-700">
                    <span className="text-[10px] text-neutral-500">RUNTIME</span>
                    <span className="text-xs font-bold text-neutral-200 group-hover:text-emerald-400">NEXT.JS 16</span>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Positioner side="top" sideOffset={6}>
                      <Tooltip.Popup className="rounded border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-[11px] text-neutral-300 shadow-xl">
                        App Router + React 19 Turbopack engine
                      </Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip.Root>

                <Tooltip.Root>
                  <Tooltip.Trigger className="group flex flex-col rounded border border-neutral-800/80 bg-neutral-900/60 p-2.5 text-left transition-colors hover:border-neutral-700">
                    <span className="text-[10px] text-neutral-500">ORCHESTRATOR</span>
                    <span className="text-xs font-bold text-neutral-200 group-hover:text-emerald-400">N8N WORKFLOWS</span>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Positioner side="top" sideOffset={6}>
                      <Tooltip.Popup className="rounded border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-[11px] text-neutral-300 shadow-xl">
                        Self-hosted webhook triggers &amp; telegram pipelines
                      </Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip.Root>

                <Tooltip.Root>
                  <Tooltip.Trigger className="group flex flex-col rounded border border-neutral-800/80 bg-neutral-900/60 p-2.5 text-left transition-colors hover:border-neutral-700">
                    <span className="text-[10px] text-neutral-500">STORAGE</span>
                    <span className="text-xs font-bold text-neutral-200 group-hover:text-emerald-400">NEON POSTGRES</span>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Positioner side="top" sideOffset={6}>
                      <Tooltip.Popup className="rounded border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-[11px] text-neutral-300 shadow-xl">
                        Serverless branching Postgres + S3 uploads
                      </Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip.Root>

                <Tooltip.Root>
                  <Tooltip.Trigger className="group flex flex-col rounded border border-neutral-800/80 bg-neutral-900/60 p-2.5 text-left transition-colors hover:border-neutral-700">
                    <span className="text-[10px] text-neutral-500">STATUS</span>
                    <span className="text-xs font-bold text-emerald-400">DEPLOYED</span>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Positioner side="top" sideOffset={6}>
                      <Tooltip.Popup className="rounded border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-[11px] text-neutral-300 shadow-xl">
                        Production endpoint healthy
                      </Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </div>
            </Tooltip.Provider>
          </Tabs.Panel>

          {/* Panel 2: Power Supply */}
          <Tabs.Panel value="psu" className="space-y-4 pt-1 outline-none">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-pixel text-xl text-neutral-100">MODULAR LAB BENCH POWER SUPPLY</h3>
                <p className="text-xs text-neutral-400">Custom 18-0-18V 6A multi-rail electronic course design.</p>
              </div>
              <span className="rounded bg-amber-950/40 px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/30">
                HARDWARE / ELECTRONICS
              </span>
            </div>

            <p className="text-xs leading-relaxed text-neutral-400">
              Engineered with full-wave bridge rectification, dual fixed voltage outputs, and variable regulation rails.
              Features onboard slow-charge USB-A, fast-charge USB-A, and USB Type-C power delivery circuits.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
              <div className="flex flex-col rounded border border-neutral-800/80 bg-neutral-900/60 p-2.5">
                <span className="text-[10px] text-neutral-500">TRANSFORMER</span>
                <span className="text-xs font-bold text-neutral-200">18-0-18V @ 6A</span>
              </div>
              <div className="flex flex-col rounded border border-neutral-800/80 bg-neutral-900/60 p-2.5">
                <span className="text-[10px] text-neutral-500">PCB SUITE</span>
                <span className="text-xs font-bold text-neutral-200">KICAD EDA</span>
              </div>
              <div className="flex flex-col rounded border border-neutral-800/80 bg-neutral-900/60 p-2.5">
                <span className="text-[10px] text-neutral-500">TOPOLOGY</span>
                <span className="text-xs font-bold text-neutral-200">LINEAR REGULATED</span>
              </div>
              <div className="flex flex-col rounded border border-neutral-800/80 bg-neutral-900/60 p-2.5">
                <span className="text-[10px] text-neutral-500">OUTPUT RAILS</span>
                <span className="text-xs font-bold text-amber-400">MULTI-RAIL USB</span>
              </div>
            </div>
          </Tabs.Panel>

          {/* Panel 3: Heatmap */}
          <Tabs.Panel value="heatmap" className="space-y-4 pt-1 outline-none">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-pixel text-xl text-neutral-100">NAGA CITY INCIDENT HEAT MAP</h3>
                <p className="text-xs text-neutral-400">Geospatial public safety data visualization.</p>
              </div>
              <span className="rounded bg-sky-950/40 px-2 py-0.5 text-[10px] font-bold text-sky-400 border border-sky-500/30">
                DATA / GEOSPATIAL
              </span>
            </div>

            <p className="text-xs leading-relaxed text-neutral-400">
              Translating real public safety incident reports from regional news outlets into precise coordinate maps.
              Built on React, Vite, and Kepler.gl geospatial engine.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
              <div className="flex flex-col rounded border border-neutral-800/80 bg-neutral-900/60 p-2.5">
                <span className="text-[10px] text-neutral-500">ENGINE</span>
                <span className="text-xs font-bold text-neutral-200">KEPLER.GL</span>
              </div>
              <div className="flex flex-col rounded border border-neutral-800/80 bg-neutral-900/60 p-2.5">
                <span className="text-[10px] text-neutral-500">PROCESSING</span>
                <span className="text-xs font-bold text-neutral-200">PYTHON GEO</span>
              </div>
              <div className="flex flex-col rounded border border-neutral-800/80 bg-neutral-900/60 p-2.5">
                <span className="text-[10px] text-neutral-500">COORDINATES</span>
                <span className="text-xs font-bold text-neutral-200">WGS84 LONG/LAT</span>
              </div>
              <div className="flex flex-col rounded border border-neutral-800/80 bg-neutral-900/60 p-2.5">
                <span className="text-[10px] text-neutral-500">STATUS</span>
                <span className="text-xs font-bold text-sky-400">GEO-MAPPING</span>
              </div>
            </div>
          </Tabs.Panel>
        </Tabs.Root>
      </section>

      {/* Typography & Aesthetic Spec Legend */}
      <footer className="mt-12 rounded border border-dashed border-neutral-800 p-4 text-xs text-neutral-500">
        <div className="flex items-center gap-2 text-neutral-400 mb-2">
          <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
          <span className="font-pixel text-sm text-neutral-300">[AESTHETIC STACK VERIFIED]</span>
        </div>
        <p>
          • <span className="font-pixel text-neutral-300">DotGothic16</span>: Authenticated 16px pixel-matrix display font for headers &amp; badges.
        </p>
        <p className="mt-1">
          • <span className="text-neutral-300 font-bold">Space Mono</span>: High-precision geometric monospace for technical readouts &amp; body text.
        </p>
        <p className="mt-1">
          • <span className="text-neutral-300 font-bold">Base UI</span>: Headless, unstyled accessible interaction primitives (Tabs, Tooltips, Modals).
        </p>
      </footer>
    </main>
  );
}
