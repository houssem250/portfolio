import * as React from "react";
import { terminalLines, type TerminalLine } from "@/content/terminal";
import { cn } from "@/lib/utils";

interface TerminalWidgetProps {
  lines?: TerminalLine[];
  className?: string;
}

export function TerminalWidget({
  lines = terminalLines,
  className,
}: TerminalWidgetProps) {
  return (
    <section
      aria-label="Terminal Profile"
      className={cn(
        "overflow-hidden rounded-3xl border border-border/60 bg-card/80 shadow-sm backdrop-blur transition-all duration-200 hover:border-foreground/20 hover:shadow-md",
        className,
      )}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-border/50 bg-muted/40 px-5 py-3 select-none">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="size-3 rounded-full bg-red-500/80 dark:bg-red-500/70" />
          <span className="size-3 rounded-full bg-amber-500/80 dark:bg-amber-500/70" />
          <span className="size-3 rounded-full bg-emerald-500/80 dark:bg-emerald-500/70" />
        </div>
        <span className="font-mono text-xs font-medium text-muted-foreground">
          Portfolio Terminal
        </span>
        <div className="w-11" aria-hidden="true" />
      </div>

      {/* Terminal Content */}
      <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm space-y-4">
        {lines.map((line) => (
          <div key={line.command} className="space-y-1.5">
            <div className="flex items-center gap-2 font-medium text-foreground">
              <span className="text-muted-foreground/60 select-none">$</span>
              <span>{line.command}</span>
            </div>
            <dl className="pl-4 sm:pl-5 space-y-1 text-muted-foreground">
              {line.output.map((outLine, idx) => (
                <dd key={idx} className="whitespace-pre-wrap leading-relaxed">
                  {outLine}
                </dd>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}
