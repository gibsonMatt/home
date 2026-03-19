import "../global.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";

const cx = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ");

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cx(
        "min-h-screen bg-[#0a0a0a] text-white",
        GeistSans.variable,
        GeistMono.variable,
      )}
    >
      {children}
      <Analytics />
    </div>
  );
}
