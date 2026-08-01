import * as React from "react";
import { cn } from "@/lib/utils";

interface MonitorFrameProps {
  children: React.ReactNode;
  isOn: boolean;
  onLedClick: (e: React.MouseEvent) => void;
  className?: string;
}

export function MonitorFrame({ children, isOn, onLedClick, className }: MonitorFrameProps) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      {/* Main CRT Housing */}
      <div className="relative w-full rounded-2xl border border-border/80 bg-card p-3 shadow-sm sm:p-4 xl:p-5 pb-7 sm:pb-8">
        {/* The Screen Bezel */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border-[3px] border-foreground/10 bg-black shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)]">
          {children}
        </div>

        {/* Lower Bezel — Brand Vents + Power LED */}
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-between px-5 sm:px-7">
          {/* Decorative vents */}
          <div className="flex gap-1" aria-hidden="true">
            <div className="h-[3px] w-4 rounded-full bg-foreground/10" />
            <div className="h-[3px] w-4 rounded-full bg-foreground/10" />
            <div className="h-[3px] w-4 rounded-full bg-foreground/10" />
          </div>

          {/* Power LED — clickable toggle */}
          <button
            onClick={onLedClick}
            className={cn(
              "size-2.5 rounded-full transition-all duration-500 cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isOn
                ? "bg-green-400 shadow-[0_0_6px_2px_rgba(74,222,128,0.5)]"
                : "bg-red-500 shadow-[0_0_6px_2px_rgba(239,68,68,0.5)]",
            )}
            aria-label={isOn ? "Turn off monitor" : "Turn on monitor"}
          />
        </div>
      </div>

      {/* Monitor Stand */}
      <div className="h-5 w-16 border-x border-foreground/10 bg-card sm:h-6 sm:w-20" />
      {/* Monitor Base */}
      <div className="h-2.5 w-28 rounded-b-sm border border-t-0 border-foreground/10 bg-card shadow-sm sm:w-36" />
    </div>
  );
}
