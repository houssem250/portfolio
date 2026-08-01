import * as React from "react";
import { cn } from "@/lib/utils";

export function Scanlines({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 z-20 overflow-hidden", className)}>
      {/* Static horizontal scanline pattern — subtle dark stripes every 3px */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 3px)",
        }}
      />

      {/* Sweeping bright scanline — moves from top:−8% to top:110% so it
          fully enters and exits the container, driven by @keyframes crt-sweep
          defined inline here as a CSS animation on the element. */}
      <div
        className="animate-scanline absolute left-0 right-0 h-[8%]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}
