"use client";

import dynamic from "next/dynamic";

const ResearchGraph = dynamic(() => import("./ResearchGraph"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
      <p className="text-sm text-neutral-400 animate-pulse">
        Loading research universe…
      </p>
    </div>
  ),
});

export default function Page() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight mb-2">
        Research Universe
      </h1>
      <p className="text-neutral-500 dark:text-neutral-400 mb-8 leading-relaxed">
        An interactive map of my research across 14 publications, 7 organisms,
        field sites from the Galápagos to the Canary Islands, and the methods
        and collaborators that connect them.
      </p>
      <ResearchGraph />
    </section>
  );
}
