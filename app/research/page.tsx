"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const ResearchGraph = dynamic(() => import("./ResearchGraph"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center">
      <p className="text-sm text-neutral-500 animate-pulse">
        Loading universe…
      </p>
    </div>
  ),
});

export default function Page() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Back button */}
      <Link
        href="/"
        className="absolute top-4 left-4 z-20 flex items-center gap-1.5 text-sm text-neutral-500 hover:text-white transition-colors px-3 py-1.5 rounded-md hover:bg-white/5"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        back
      </Link>

      {/* Title overlay */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
        <h1 className="text-sm font-medium tracking-widest uppercase text-neutral-500">
          Universe
        </h1>
      </div>

      <ResearchGraph />
    </div>
  );
}
