import * as React from "react";
import { type MonitorScene } from "@/content/monitor-scenes";
import { PixelScene } from "./PixelScene";
import { Scanlines } from "./Scanlines";
import { DeadPixels } from "./DeadPixels";
import { Glow } from "./Glow";
import { cn } from "@/lib/utils";

interface MonitorScreenProps {
  scene: MonitorScene;
  className?: string;
}

export function MonitorScreen({ scene, className }: MonitorScreenProps) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-black animate-flicker",
        className,
      )}
    >
      {/* The pixel art wallpaper — fills the entire screen */}
      <PixelScene scene={scene} />

      {/* CRT Overlays */}
      <Scanlines />
      <DeadPixels />
      <Glow />
    </div>
  );
}
