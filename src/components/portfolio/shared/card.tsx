import * as React from "react";
import { cn } from "@/lib/utils";

type CardProps = React.PropsWithChildren<{
  className?: string;
}>;

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm backdrop-blur transition-transform duration-200 hover:-translate-y-1 hover:shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
