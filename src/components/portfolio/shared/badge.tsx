import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.PropsWithChildren<{
  className?: string;
}>;

export function Badge({ className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border/60 bg-muted/60 px-3 py-1 text-xs font-medium text-foreground/90",
        className,
      )}
    >
      {children}
    </span>
  );
}
