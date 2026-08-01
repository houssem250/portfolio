"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { scenes, sceneOrder, type SceneId } from "@/content/monitor-scenes";
import { MonitorFrame } from "./MonitorFrame";
import { MonitorScreen } from "./MonitorScreen";
import { cn } from "@/lib/utils";

// useSyncExternalStore is the lint-safe way to detect client-side mounting.
// The server snapshot returns false; the client snapshot returns true.
const subscribe = () => () => {};
function useMounted() {
  return React.useSyncExternalStore(
    subscribe,
    () => true,   // client snapshot
    () => false,  // server snapshot
  );
}

export function Monitor({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const [isOn, setIsOn] = React.useState(true);
  const [showToast, setShowToast] = React.useState(false);

  // Track what theme the user picked their override scene from.
  // If the theme changes, we discard the override by storing the sceneId
  // together with the theme it was chosen under.
  const [override, setOverride] = React.useState<{
    sceneId: SceneId;
    theme: string;
  } | null>(null);

  const currentTheme = resolvedTheme ?? "light";
  const defaultSceneId: SceneId = currentTheme === "dark" ? "blood-moon" : "blue-moon";

  // If the override was set under a different theme, treat it as stale.
  const activeSceneId: SceneId =
    override && override.theme === currentTheme ? override.sceneId : defaultSceneId;
  const activeScene = scenes[activeSceneId];

  const handleScreenClick = React.useCallback(() => {
    if (!isOn) return;
    setOverride((prev) => {
      const current = prev?.theme === currentTheme ? prev.sceneId : defaultSceneId;
      const idx = sceneOrder.indexOf(current);
      const next = sceneOrder[(idx + 1) % sceneOrder.length];
      return { sceneId: next, theme: currentTheme };
    });
    setShowToast(true);
    const timeout = setTimeout(() => setShowToast(false), 2000);
    return () => clearTimeout(timeout);
  }, [isOn, currentTheme, defaultSceneId]);

  const handlePowerToggle = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOn((prev) => !prev);
  }, []);

  // SSR / hydration placeholder — show powered-off frame until client mounts.
  if (!mounted) {
    return (
      <div className={className}>
        <MonitorFrame isOn={false} onLedClick={() => {}}>
          <div className="h-full w-full bg-black" />
        </MonitorFrame>
      </div>
    );
  }

  return (
    <div
      className={cn("group/monitor relative", className)}
      aria-label="Interactive CRT Monitor — click screen to change scene, click LED to toggle power"
    >
      <MonitorFrame isOn={isOn} onLedClick={handlePowerToggle}>
        {isOn ? (
          <>
            {/* Clickable screen */}
            <div
              className="h-full w-full cursor-pointer"
              onClick={handleScreenClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleScreenClick()}
              aria-label={`Current scene: ${activeScene.name}. Click to change.`}
            >
              <MonitorScreen scene={activeScene} />
            </div>

            {/* Hover terminal overlay */}
            <div className="pointer-events-none absolute inset-0 z-40 flex flex-col justify-end bg-black/75 p-3 font-mono text-[10px] leading-relaxed opacity-0 transition-opacity duration-300 group-hover/monitor:opacity-100 sm:p-4 sm:text-xs">
              <div className="space-y-1">
                <div>
                  <span className="mr-1.5 select-none text-white/40">$</span>
                  <span className="text-green-400/80">wallpaper</span>
                </div>
                <div className="pl-4 text-white/60">{activeScene.name}</div>
                <div
                  className={cn(
                    "pt-1 text-white/40 transition-opacity duration-300",
                    showToast ? "opacity-100" : "opacity-0",
                  )}
                >
                  Wallpaper changed.
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full w-full bg-black" />
        )}
      </MonitorFrame>
    </div>
  );
}
