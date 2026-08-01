import * as React from "react";
import {
  type MonitorScene,
  GRID,
  STARS,
  CLOUDS,
  MOUNTAIN_BACK,
  MOUNTAIN_FRONT,
  RAIN_DROPS,
  SNOWFLAKES,
} from "@/content/monitor-scenes";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

/** Build a stair-stepped SVG path for a mountain silhouette. */
function steppedPath(profile: readonly number[], gridH: number): string {
  let d = `M0 ${gridH}V${profile[0]}`;
  for (let x = 1; x < profile.length; x++) {
    d += `H${x}V${profile[x]}`;
  }
  d += `H${profile.length}V${gridH}Z`;
  return d;
}

const FILL_TRANSITION = "fill 800ms ease-in-out";

// Precompute paths once (module-level — no re-render cost)
const backPath = steppedPath(MOUNTAIN_BACK, GRID.h);
const frontPath = steppedPath(MOUNTAIN_FRONT, GRID.h);

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

interface PixelSceneProps {
  scene: MonitorScene;
  className?: string;
}

export function PixelScene({ scene, className }: PixelSceneProps) {
  const { colors, celestial, showStars, showClouds, showRain, showSnow, snowCaps } = scene;

  return (
    <svg
      viewBox={`0 0 ${GRID.w} ${GRID.h}`}
      preserveAspectRatio="none"
      className={cn("absolute inset-0 block h-full w-full", className)}
      shapeRendering="crispEdges"
    >
      <defs>
        {/* Sky gradient — stop-color supports CSS transitions in most browsers */}
        <linearGradient id="crt-skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            style={{
              stopColor: colors.skyTop,
              transition: "stop-color 800ms ease-in-out",
            }}
          />
          <stop
            offset="100%"
            style={{
              stopColor: colors.skyBottom,
              transition: "stop-color 800ms ease-in-out",
            }}
          />
        </linearGradient>

        {/* Radial glow for celestial halo */}
        <radialGradient id="crt-haloGrad" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            style={{
              stopColor: colors.celestialHalo,
              stopOpacity: 0.45,
              transition: "stop-color 800ms ease-in-out",
            }}
          />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Sky ──────────────────────────────────────────────────────── */}
      <rect width={GRID.w} height={GRID.h} fill="url(#crt-skyGrad)" />

      {/* ── Stars ──────────────────────────────────────────────────── */}
      {/* Rendered only if showStars is true. Each star uses its own SVG <animate> tag for independent pulsing. */}
      {showStars &&
        STARS.map((star, i) => {
          const size = star.size ?? 1;
          return (
            <rect
              key={`star-${i}`}
              x={star.x}
              y={star.y}
              width={size}
              height={size}
              style={{
                fill: colors.starFill,
                transition: FILL_TRANSITION,
              }}
            >
              <animate
                attributeName="opacity"
                values={star.values}
                dur={`${star.dur}s`}
                begin={`${star.delay}s`}
                repeatCount="indefinite"
              />
            </rect>
          );
        })}

      {/* ── Celestial halo (radial glow) ────────────────────────────── */}
      {celestial && (
        <circle
          cx={celestial.x + 0.5}
          cy={celestial.y + 0.5}
          r={celestial.r + 4}
          className="animate-halo-breathe"
          style={{
            fill: `url(#crt-haloGrad)`,
            transition: FILL_TRANSITION,
          }}
        />
      )}

      {/* ── Celestial body ───────────────────────────────────────────── */}
      {celestial && (
        <circle
          cx={celestial.x + 0.5}
          cy={celestial.y + 0.5}
          r={celestial.r}
          className="animate-moon-pulse"
          style={{ fill: colors.celestialFill, transition: FILL_TRANSITION }}
        />
      )}

      {/* ── Clouds (two copies for seamless wrap) ─────────────────── */}
      {/* Each cloud group is rendered at its base position and at base+GRID.w.
          Both shift left by GRID.w user-units over `driftDur` seconds, so
          when the primary disappears off-screen left, the duplicate takes over. */}
      {showClouds && (
        <>
          {CLOUDS.map((cloud, ci) => {
            const driftDur = ci === 0 ? "45" : "60";
            return (
              <g key={`cloud-group-${ci}`}>
                {/* Primary copy at original position */}
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    from="0 0"
                    to={`-${GRID.w} 0`}
                    dur={`${driftDur}s`}
                    repeatCount="indefinite"
                  />
                  {cloud.pixels.map(([px, py], pi) => (
                    <rect
                      key={`cl-${ci}-a-${pi}`}
                      x={cloud.baseX + px}
                      y={cloud.baseY + py}
                      width="1"
                      height="1"
                      style={{
                        fill: colors.cloudFill,
                        transition: FILL_TRANSITION,
                        opacity: 0.75,
                      }}
                    />
                  ))}
                </g>

                {/* Duplicate shifted one full width right — wraps seamlessly */}
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    from={`${GRID.w} 0`}
                    to="0 0"
                    dur={`${driftDur}s`}
                    repeatCount="indefinite"
                  />
                  {cloud.pixels.map(([px, py], pi) => (
                    <rect
                      key={`cl-${ci}-b-${pi}`}
                      x={cloud.baseX + px}
                      y={cloud.baseY + py}
                      width="1"
                      height="1"
                      style={{
                        fill: colors.cloudFill,
                        transition: FILL_TRANSITION,
                        opacity: 0.75,
                      }}
                    />
                  ))}
                </g>
              </g>
            );
          })}
        </>
      )}


      {/* ── Rain drops ───────────────────────────────────────────────── */}
      {/* Each drop is a <line> inside a <g> that gets animated vertically
          via SVG animateTransform (true SVG user-unit space — works with
          preserveAspectRatio="none"). Duration and delay spread drops. */}
      {showRain &&
        RAIN_DROPS.map((drop, i) => {
          const duration = `${2.4 + drop.delay * 1.0}`;
          return (
            <g key={`rain-g-${i}`}>
              <line
                x1={drop.x}
                y1={-2}
                x2={drop.x - 0.6}
                y2={-2 + drop.height}
                stroke="#88AACC"
                strokeWidth="0.35"
                strokeLinecap="round"
                opacity="0.7"
              >
                {/* SVG animateTransform moves in user-unit space */}
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  from={`0 0`}
                  to={`0 ${GRID.h + 4}`}
                  dur={`${duration}s`}
                  begin={`${drop.delay}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0.7;0.7;0"
                  keyTimes="0;0.1;0.85;1"
                  dur={`${duration}s`}
                  begin={`${drop.delay}s`}
                  repeatCount="indefinite"
                />
              </line>
            </g>
          );
        })}

      {/* ── Snowflakes ───────────────────────────────────────────────── */}
      {showSnow &&
        SNOWFLAKES.map((flake, i) => (
          <rect
            key={`sn-${i}`}
            x={flake.x}
            y={-2}
            width="1"
            height="1"
            fill="#FFFFFF"
            opacity="0"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="0 0"
              to="0 34"
              dur={`${3.5 + (i % 3) * 0.8}s`}
              begin={`${flake.delay}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0.9;0.9;0"
              keyTimes="0;0.08;0.9;1"
              dur={`${3.5 + (i % 3) * 0.8}s`}
              begin={`${flake.delay}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}

      {/* ── Back mountains ───────────────────────────────────────────── */}
      <path
        d={backPath}
        style={{ fill: colors.mountainBack, transition: FILL_TRANSITION }}
      />

      {/* ── Front mountains ──────────────────────────────────────────── */}
      <path
        d={frontPath}
        style={{ fill: colors.mountainFront, transition: FILL_TRANSITION }}
      />

      {/* ── Snow caps (deterministic) ────────────────────────────────── */}
      {snowCaps &&
        MOUNTAIN_FRONT.map((y, x) => {
          if (y >= 24) return null;
          const capHeight = y < 21 ? 2 : 1;
          return (
            <rect
              key={`cap-${x}`}
              x={x}
              y={y}
              width="1"
              height={capHeight}
              style={{ fill: "#E0E5F0", opacity: 0.85 }}
            />
          );
        })}
    </svg>
  );
}
