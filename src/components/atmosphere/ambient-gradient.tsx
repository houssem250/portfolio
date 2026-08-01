"use client";

import * as React from "react";

/**
 * Ambient Gradient — Layer 1 of the atmospheric system.
 *
 * A massive, low-contrast radial gradient that slowly drifts behind the
 * entire page. It creates the impression of distant atmospheric lighting
 * shifting almost below conscious perception.
 *
 * - Light theme: soft white + pale blue (morning atmosphere)
 * - Dark theme: muted crimson + deep violet (smoldering night)
 *
 * Uses a single CSS @keyframes animation — zero JS animation loops.
 * Only `transform` is animated — fully GPU-composited.
 */
export function AmbientGradient() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Primary gradient orb */}
      <div
        className="atmo-gradient absolute h-[200vmax] w-[200vmax]"
        style={{
          top: "50%",
          left: "50%",
          marginTop: "-100vmax",
          marginLeft: "-100vmax",
          /* Light theme: soft white-blue morning glow */
          background:
            "radial-gradient(ellipse at center, rgba(180,210,255,0.06) 0%, rgba(200,220,255,0.02) 40%, rgba(200,220,255,0) 65%)",
          transition: "background 1.2s ease-in-out",
        }}
      />

      {/* Secondary, smaller accent orb — offset for depth */}
      <div
        className="atmo-gradient absolute h-[150vmax] w-[150vmax]"
        style={{
          top: "30%",
          left: "60%",
          marginTop: "-75vmax",
          marginLeft: "-75vmax",
          background:
            "radial-gradient(ellipse at center, rgba(160,200,255,0.03) 0%, rgba(160,200,255,0) 60%)",
          transition: "background 1.2s ease-in-out",
          /* Run the same animation but offset to create parallax */
          animationDelay: "-25s",
          animationDuration: "90s",
        }}
      />

      {/* Dark-mode override: swap to crimson/violet palette */}
      <style>{`
        .dark .atmo-gradient:first-child {
          background: radial-gradient(
            ellipse at center,
            rgba(120, 20, 30, 0.05) 0%,
            rgba(60, 15, 40, 0.02) 40%,
            rgba(60, 15, 40, 0) 65%
          ) !important;
        }
        .dark .atmo-gradient:nth-child(2) {
          background: radial-gradient(
            ellipse at center,
            rgba(80, 40, 100, 0.03) 0%,
            rgba(40, 10, 30, 0.01) 40%,
            rgba(40, 10, 30, 0) 60%
          ) !important;
        }
      `}</style>
    </div>
  );
}
