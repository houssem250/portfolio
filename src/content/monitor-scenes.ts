/* ========================================================================== */
/* Scene definitions for the CRT Monitor pixel art widget                     */
/* ========================================================================== */

export type SceneId = "blue-moon" | "sunrise" | "rain" | "snow" | "blood-moon";

export interface SceneColors {
  skyTop: string;
  skyBottom: string;
  celestialFill: string;
  celestialHalo: string;
  starFill: string;
  cloudFill: string;
  mountainBack: string;
  mountainFront: string;
}

export interface MonitorScene {
  id: SceneId;
  name: string;
  colors: SceneColors;
  /** Position of the main celestial body (moon or sun). null = hidden. */
  celestial: { x: number; y: number; r: number } | null;
  showStars: boolean;
  showClouds: boolean;
  showRain: boolean;
  showSnow: boolean;
  snowCaps: boolean;
}

/* -------------------------------------------------------------------------- */
/* Shared geometry constants                                                   */
/* -------------------------------------------------------------------------- */

export const GRID = { w: 40, h: 30 } as const;

export interface StarSpec {
  x: number;
  y: number;
  size?: number;
  dur: number;
  delay: number;
  values: string;
}

export const STARS: ReadonlyArray<StarSpec> = [
  { x: 3, y: 2, dur: 6.2, delay: 0.2, values: "0.1; 1; 0.3; 0.9; 0.1" },
  { x: 8, y: 5, dur: 9.5, delay: 2.1, values: "0.8; 0.1; 1; 0.2; 0.8" },
  { x: 15, y: 1, size: 1.2, dur: 5.4, delay: 0.8, values: "0.2; 0.9; 0.1; 1; 0.2" },
  { x: 5, y: 9, dur: 8.1, delay: 3.5, values: "0.05; 1; 0.15; 0.85; 0.05" },
  { x: 12, y: 7, dur: 11.0, delay: 1.2, values: "0.9; 0.2; 1; 0.1; 0.9" },
  { x: 20, y: 3, size: 1.2, dur: 6.8, delay: 2.5, values: "0.1; 0.8; 0.3; 1; 0.1" },
  { x: 35, y: 2, dur: 5.9, delay: 0.5, values: "0.3; 1; 0.1; 0.7; 0.3" },
  { x: 37, y: 6, dur: 9.2, delay: 3.0, values: "0.05; 0.95; 0.2; 1; 0.05" },
  { x: 25, y: 4, dur: 7.5, delay: 4.1, values: "1; 0.15; 0.8; 0.3; 1" },
  { x: 2, y: 14, dur: 10.5, delay: 1.8, values: "0.2; 1; 0.1; 0.85; 0.2" },
  { x: 18, y: 12, dur: 8.7, delay: 0.4, values: "0.1; 0.75; 0.2; 1; 0.1" },
  { x: 33, y: 10, size: 1.2, dur: 6.5, delay: 1.1, values: "0.9; 0.1; 1; 0.3; 0.9" },
  { x: 10, y: 3, dur: 10.2, delay: 2.0, values: "0.15; 1; 0.25; 0.9; 0.15" },
  { x: 38, y: 12, dur: 5.2, delay: 0.7, values: "0.3; 0.9; 0.05; 1; 0.3" },
  { x: 28, y: 2, dur: 8.4, delay: 3.2, values: "0.1; 1; 0.2; 0.75; 0.1" },
  { x: 22, y: 8, dur: 9.8, delay: 1.0, values: "0.85; 0.1; 0.95; 0.2; 0.85" },
  { x: 14, y: 14, dur: 7.1, delay: 3.8, values: "0.2; 0.8; 0.1; 1; 0.2" },
  { x: 31, y: 5, size: 1.2, dur: 8.9, delay: 2.2, values: "0.1; 1; 0.3; 0.8; 0.1" },
];

export const CLOUDS: ReadonlyArray<{
  baseX: number;
  baseY: number;
  pixels: ReadonlyArray<readonly [number, number]>;
  delay: number;
}> = [
  {
    baseX: 3,
    baseY: 13,
    pixels: [
      [2, 0], [3, 0],
      [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1],
      [-1, 2], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
    ],
    delay: 0,
  },
  {
    baseX: 24,
    baseY: 11,
    pixels: [
      [1, 0], [2, 0],
      [0, 1], [1, 1], [2, 1], [3, 1],
      [-1, 2], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2],
    ],
    delay: 25,
  },
];

/** Back mountain layer – taller peaks, lighter shade. */
export const MOUNTAIN_BACK: readonly number[] = [
  30, 28, 26, 24, 22, 20, 19, 18, 17, 16,
  15, 16, 17, 18, 19, 20, 21, 22, 21, 20,
  19, 18, 17, 16, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 30,
];

/** Front mountain layer – shorter peaks, darker shade. */
export const MOUNTAIN_FRONT: readonly number[] = [
  30, 30, 29, 28, 27, 25, 23, 22, 21, 22,
  23, 24, 25, 26, 27, 26, 25, 24, 23, 22,
  21, 20, 20, 21, 22, 23, 24, 25, 24, 23,
  22, 22, 22, 23, 24, 25, 26, 28, 30, 30,
];

/** Rain drop positions (generated deterministically). */
export const RAIN_DROPS: ReadonlyArray<{
  x: number;
  height: number;
  delay: number;
}> = Array.from({ length: 28 }, (_, i) => ({
  x: (i * 7 + 3) % 40,
  height: 2 + (i % 2),
  delay: (i * 0.12) % 1.2,
}));

/** Snowflake positions (generated deterministically). */
export const SNOWFLAKES: ReadonlyArray<{
  x: number;
  delay: number;
}> = Array.from({ length: 20 }, (_, i) => ({
  x: (i * 9 + 2) % 40,
  delay: (i * 0.35) % 3.5,
}));

/* -------------------------------------------------------------------------- */
/* Scene palette definitions                                                   */
/* -------------------------------------------------------------------------- */

export const scenes: Record<SceneId, MonitorScene> = {
  "blue-moon": {
    id: "blue-moon",
    name: "Blue Moon",
    colors: {
      skyTop: "#14233C",
      skyBottom: "#28446E",
      celestialFill: "#EAF6FF",
      celestialHalo: "#7BB8E0",
      starFill: "#FFFFFF",
      cloudFill: "#8EAED0",
      mountainBack: "#3A5270",
      mountainFront: "#24364D",
    },
    celestial: { x: 30, y: 8, r: 3 },
    showStars: true,
    showClouds: true,
    showRain: false,
    showSnow: false,
    snowCaps: false,
  },

  sunrise: {
    id: "sunrise",
    name: "Sunrise",
    colors: {
      skyTop: "#1A0533",
      skyBottom: "#FF6B35",
      celestialFill: "#FFD93D",
      celestialHalo: "#FF8C42",
      starFill: "#FFE0B2",
      cloudFill: "#FFB5A0",
      mountainBack: "#2D1B30",
      mountainFront: "#1A0F1D",
    },
    celestial: { x: 20, y: 22, r: 4 },
    showStars: false,   // daytime — no stars visible
    showClouds: true,
    showRain: false,
    showSnow: false,
    snowCaps: false,
  },

  rain: {
    id: "rain",
    name: "Rain",
    colors: {
      skyTop: "#3A4555",
      skyBottom: "#4A5568",
      celestialFill: "#4A5568",
      celestialHalo: "#4A5568",
      starFill: "transparent",
      cloudFill: "#2D3640",
      mountainBack: "#3A4050",
      mountainFront: "#2A3040",
    },
    celestial: null,
    showStars: false,   // overcast rain — no stars visible
    showClouds: false,
    showRain: true,
    showSnow: false,
    snowCaps: false,
  },

  snow: {
    id: "snow",
    name: "Snow",
    colors: {
      skyTop: "#1A2035",
      skyBottom: "#2A3045",
      celestialFill: "#D8D8E8",
      celestialHalo: "#8888A0",
      starFill: "#FFFFFF",
      cloudFill: "#2A3040",
      mountainBack: "#252535",
      mountainFront: "#1A1A25",
    },
    celestial: { x: 30, y: 8, r: 3 },
    showStars: true,
    showClouds: false,
    showRain: false,
    showSnow: true,
    snowCaps: true,
  },

  "blood-moon": {
    id: "blood-moon",
    name: "Blood Moon",
    colors: {
      skyTop: "#0B1020",
      skyBottom: "#15162A",
      celestialFill: "#3B0000",
      celestialHalo: "#B3001B",
      starFill: "#FFD1D1",
      cloudFill: "#1A1A30",
      mountainBack: "#1A1A1A",
      mountainFront: "#111111",
    },
    celestial: { x: 30, y: 8, r: 3 },
    showStars: true,
    showClouds: false,
    showRain: false,
    showSnow: false,
    snowCaps: false,
  },
};

export const sceneOrder: SceneId[] = [
  "blue-moon",
  "sunrise",
  "rain",
  "snow",
  "blood-moon",
];
