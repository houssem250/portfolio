import * as React from "react";
import { cn } from "@/lib/utils";

export function DeadPixels({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 z-30 overflow-hidden", className)}>
      {/* Stuck 'on' (bright) pixel */}
      <div 
        className="absolute w-[2px] h-[2px] bg-red-400 opacity-80"
        style={{ top: '23%', left: '42%' }}
      />
      
      {/* Stuck 'on' (bright) pixel */}
      <div 
        className="absolute w-[2px] h-[2px] bg-green-400 opacity-60"
        style={{ top: '65%', left: '81%' }}
      />
      
      {/* Stuck 'off' (dark) pixel */}
      <div 
        className="absolute w-[2px] h-[2px] bg-black opacity-90"
        style={{ top: '82%', left: '15%' }}
      />
    </div>
  );
}
