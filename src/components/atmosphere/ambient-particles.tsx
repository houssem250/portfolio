"use client";

import * as React from "react";
import { useTheme } from "next-themes";

const PARTICLE_COUNT = 48;

let particleIdCounter = 0;

function generateParticleConfig(isDark: boolean) {
  particleIdCounter++;

  // Position: spread across viewport
  const left = `${Math.random() * 100}%`;
  const top = `${Math.random() * 100}%`;

  // Timing: 10s to 25s for VERY slow, realistic drift
  const dur = 10 + Math.random() * 15;
  // 0s to 5s stagger before spawning
  const delay = Math.random() * 5;

  // Size
  const size = isDark ? 3 + Math.random() * 4 : 2 + Math.random() * 3;

  // Opacity
  const opacity = isDark ? 0.3 + Math.random() * 0.5 : 0.4 + Math.random() * 0.4;

  // Drift - real dust wanders quite a bit over 20s
  const driftX = (Math.random() - 0.5) * 150; // drift left/right
  const driftY = isDark ? -(50 + Math.random() * 100) : 30 + Math.random() * 80;

  return { id: particleIdCounter, left, top, dur, delay, size, opacity, driftX, driftY };
}

/* -------------------------------------------------------------------------- */
/* Particle element                                                            */
/* -------------------------------------------------------------------------- */

function Particle({ isDark }: { isDark: boolean }) {
  // Use state to hold the particle's unique configuration
  const [p, setP] = React.useState(() => generateParticleConfig(isDark));
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    // Use native Web Animations API for high-performance, GPU-accelerated physics
    // without the CSS @keyframes variable interpolation bugs found in some browsers.
    const animation = ref.current.animate(
      [
        { opacity: 0, transform: "translate(0px, 0px) scale(0.5) rotate(0deg)" },
        {
          opacity: p.opacity,
          transform: `translate(${p.driftX * 0.2}px, ${p.driftY * 0.2}px) scale(1) rotate(30deg)`,
          offset: 0.2
        },
        {
          opacity: p.opacity,
          transform: `translate(${p.driftX * 0.8}px, ${p.driftY * 0.8}px) scale(1) rotate(120deg)`,
          offset: 0.8
        },
        {
          opacity: 0,
          transform: `translate(${p.driftX}px, ${p.driftY}px) scale(0.5) rotate(180deg)`
        }
      ],
      {
        duration: p.dur * 1000,
        delay: p.delay * 1000,
        easing: "ease-in-out",
        fill: "forwards",
      }
    );

    // Respawn particle on finish
    animation.onfinish = () => {
      setP(generateParticleConfig(isDark));
    };

    return () => {
      animation.cancel();
    };
  }, [p, isDark]);

  // Light: glowing cyan/blue particles (visible on white)
  // Dark: glowing orange/red ash
  const bg = isDark ? "rgba(255, 120, 60, 0.9)" : "rgba(50, 150, 255, 0.7)";
  const shadow = isDark
    ? `0 0 ${4 + p.size}px rgba(255, 80, 30, 0.6)`
    : `0 0 ${3 + p.size}px rgba(50, 150, 255, 0.4)`;

  return (
    <div
      ref={ref}
      key={p.id} // Forces React to create a fresh DOM node for each spawn
      style={{
        position: "absolute",
        left: p.left,
        top: p.top,
        width: `${p.size}px`,
        height: `${p.size}px`,
        borderRadius: isDark ? "30%" : "50%",
        background: bg,
        boxShadow: shadow,
        opacity: 0, // Starts invisible, animation takes over
        willChange: "transform, opacity",
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Ambient Particles — Layer 2 of the atmospheric system                      */
/* -------------------------------------------------------------------------- */

/**
 * Ambient Particles — floating dust (light) or glowing ash (dark).
 *
 * Fixed pool of ~30 tiny DOM elements. Each particle uses a single CSS animation 
 * to float smoothly. When the animation ends, a lightweight React state update
 * respawns the particle in a completely random new location.
 *
 * Performance: Extremely high. CSS handles all frame-by-frame interpolation via GPU.
 * JS only runs exactly once every ~15-25 seconds per particle to recycle it.
 */
export function AmbientParticles() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // useSyncExternalStore for SSR-safe mount detection
  const mounted = React.useSyncExternalStore(
    () => () => { },
    () => true,
    () => false,
  );

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {Array.from({ length: PARTICLE_COUNT }, (_, i) => (
        <Particle key={i} isDark={isDark} />
      ))}
    </div>
  );
}
