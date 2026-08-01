import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * CRT phosphor glow:
 * - Vignette: dark edges from all sides (inset box-shadow)
 * - Chromatic aberration: faint RGB offset on the outer edges via a layered
 *   box-shadow trick (red left, cyan right, green top).
 * - Screen curvature illusion: a very subtle radial gradient over the center.
 */
export function Glow({ className }: { className?: string }) {
  return (
    <>
      {/* Vignette + chromatic aberration */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 rounded-[inherit]",
          className,
        )}
        style={{
          boxShadow: [
            // Vignette
            "inset 0 0 24px 6px rgba(0,0,0,0.55)",
            // Chromatic aberration glow on edges
            "inset 2px 0 8px -4px rgba(255,50,50,0.25)",
            "inset -2px 0 8px -4px rgba(50,200,255,0.25)",
            "inset 0 2px 8px -4px rgba(50,255,100,0.15)",
          ].join(", "),
        }}
      />

      {/* Screen-curvature shine: a soft radial highlight near center-top */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 10%, rgba(255,255,255,0.04) 0%, transparent 80%)",
        }}
      />
    </>
  );
}
