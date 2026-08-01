import * as React from "react";
import { cn } from "@/lib/utils";

type SectionContainerProps = React.PropsWithChildren<{
  id: string;
  className?: string;
}>;

export function SectionContainer({ id, className, children }: SectionContainerProps) {
  return (
    <section 
      id={id} 
      aria-labelledby={`${id}-heading`} 
      className={cn("scroll-mt-24 py-20 sm:py-24 lg:py-28", className)}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
