"use client";

import { ReactNode } from "react";
import { Tabs } from "@base-ui/react";

interface SpecTabsProps {
  overviewContent: ReactNode;
  specsContent: ReactNode;
  defaultTab?: "overview" | "specs";
}

export function SpecTabs({
  overviewContent,
  specsContent,
  defaultTab = "overview",
}: SpecTabsProps) {
  return (
    <Tabs.Root defaultValue={defaultTab} className="w-full space-y-4">
      <Tabs.List className="flex gap-2 border-b border-neutral-800 pb-2">
        <Tabs.Tab
          value="overview"
          className="cursor-pointer px-3 py-1 text-sm font-mono text-neutral-400 transition-colors data-[active]:text-accent-hover data-[active]:border-b-2 data-[active]:border-accent-hover data-[active]:font-bold aria-selected:text-accent-hover aria-selected:border-b-2 aria-selected:border-accent-hover aria-selected:font-bold focus-visible:outline-none"
        >
          [OVERVIEW]
        </Tabs.Tab>
        <Tabs.Tab
          value="specs"
          className="cursor-pointer px-3 py-1 text-sm font-mono text-neutral-400 transition-colors data-[active]:text-accent-hover data-[active]:border-b-2 data-[active]:border-accent-hover data-[active]:font-bold aria-selected:text-accent-hover aria-selected:border-b-2 aria-selected:border-accent-hover aria-selected:font-bold focus-visible:outline-none"
        >
          [SPECIFICATIONS]
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="overview" className="outline-none">
        {overviewContent}
      </Tabs.Panel>

      <Tabs.Panel value="specs" className="outline-none">
        {specsContent}
      </Tabs.Panel>
    </Tabs.Root>
  );
}
