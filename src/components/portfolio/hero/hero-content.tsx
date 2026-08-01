import * as React from "react";
import { TechBadges } from "./tech-badges";

export function HeroContent() {
  return (
    <div className="flex flex-col gap-6 max-w-xl text-left">
      <div className="flex flex-col gap-2">
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          👋 Hi, I&apos;m
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
          Houssem Eddine
        </h1>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
          Leghelimi
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground/90">
          Software Engineer
        </h2>
        <p className="text-xs sm:text-sm font-medium tracking-widest text-muted-foreground uppercase">
          Web &bull; Mobile &bull; DevOps &bull; AI Enthusiast
        </p>
      </div>

      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
        I enjoy turning ideas into reliable software through clean architecture, thoughtful design, and modern technologies.
        My interests span web development, mobile development, artificial intelligence, and building scalable solutions that solve real-world problems.
      </p>

      <div className="pt-2">
        <TechBadges />
      </div>
    </div>
  );
}
