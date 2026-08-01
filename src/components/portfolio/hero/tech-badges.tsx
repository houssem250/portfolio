import * as React from "react";

const technologies = [
  "Spring Boot",
  "Next.js",
  "Docker",
  "TensorFlow",
  "...and more",
];

export function TechBadges() {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Core technologies and frameworks">
      {technologies.map((tech) => (
        <span
          key={tech}
          className="inline-flex items-center rounded-md border border-border/20 bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-border hover:bg-muted/65"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}
