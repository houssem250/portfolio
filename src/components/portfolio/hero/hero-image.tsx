"use client";

import * as React from "react";
import Image from "next/image";
import { getHeroImage } from "@/lib/hero-image";

export function HeroImage() {
  const [image, setImage] = React.useState<string | null>(null);
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;

    getHeroImage().then((result) => {
      if (!mounted) return;

      setImage(result);
      setChecked(true);
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (!checked) {
    return null;
  }

  if (image) {
    return (
      <div className="relative w-full max-w-[440px] aspect-square">

        {/* Ambient Glow */}
        <div className="absolute -inset-6 rounded-[40px] bg-primary/10 blur-3xl" />

        {/* Floating Shadow */}
        <div
          className="
      absolute inset-0
      rounded-3xl
      shadow-xl
      shadow-black/10
      dark:shadow-black/35
    "
        />

        {/* Glass Card */}
        <div
          className="
      absolute inset-0
      rounded-3xl
      border
      border-border
      bg-card/40
      backdrop-blur-md
    "
        />

        {/* Inner Glass Highlight */}
        <div
          className="
      absolute inset-[1px]
      rounded-[22px]
      border
      border-white/10
      dark:border-white/5
    "
        />

        {/* Dot Grid */}
        <div className="absolute inset-4 rounded-2xl bg-dot-grid opacity-40" />

        {/* Portrait */}
        <Image
          src={image}
          fill
          unoptimized
          priority
          alt="Hero portrait"
          className="
      relative
      z-10
      object-contain
      select-none
      pointer-events-none
      drop-shadow-[0_24px_48px_rgba(0,0,0,0.22)]
      dark:drop-shadow-[0_28px_60px_rgba(0,0,0,0.45)]
    "
        />
      </div>
    );
  }

  return (
    <div className="relative flex w-full select-none items-center justify-center lg:justify-end">
      <svg
        width="440"
        height="440"
        viewBox="0 0 440 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 aspect-square w-full max-w-[400px] sm:max-w-[440px]"
        aria-hidden="true"
      >
        <defs>
          {/* Subtle Dot Grid Pattern */}
          <pattern
            id="hero-dot-grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="2"
              cy="2"
              r="1.2"
              className="fill-foreground/[0.06] dark:fill-foreground/[0.08]"
            />
          </pattern>

          {/* Glow effects for active nodes */}
          <filter
            id="subtle-glow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite
              in="SourceGraphic"
              in2="blur"
              operator="over"
            />
          </filter>
        </defs>

        {/* Outer boundary frame */}
        <rect
          x="12"
          y="12"
          width="416"
          height="416"
          rx="20"
          className="fill-card/45 stroke-border/40 dark:fill-card/25 dark:stroke-border/30"
          strokeWidth="1.5"
        />

        {/* Background Grid */}
        <rect
          x="24"
          y="24"
          width="392"
          height="392"
          rx="12"
          fill="url(#hero-dot-grid)"
        />

        {/* Core Center Ring */}
        <circle
          cx="220"
          cy="220"
          r="100"
          className="stroke-foreground/[0.06] dark:stroke-foreground/[0.08]"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />

        {/* Connecting Lines */}
        <path
          d="M 220 120 C 170 120, 130 180, 130 220"
          className="stroke-foreground/[0.12] dark:stroke-foreground/[0.15]"
          strokeWidth="1.5"
        />

        <path
          d="M 220 120 C 270 120, 310 180, 310 220"
          className="stroke-foreground/[0.12] dark:stroke-foreground/[0.15]"
          strokeWidth="1.5"
        />

        <path
          d="M 130 220 C 130 280, 220 320, 220 320 C 220 320, 310 280, 310 220"
          className="stroke-foreground/[0.12] dark:stroke-foreground/[0.15]"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Software Node */}
        <g transform="translate(220, 120)">
          {/* Ambient Glow */}
          <circle
            r="28"
            className="fill-foreground/[0.02] dark:fill-foreground/[0.03]"
          />

          {/* Base Node */}
          <circle
            r="20"
            className="fill-background stroke-border dark:fill-card dark:stroke-border/70"
            strokeWidth="1.5"
          />

          {/* Application Window */}
          <rect
            x="-8"
            y="-7"
            width="16"
            height="14"
            rx="2"
            className="stroke-muted-foreground/80"
            strokeWidth="1.2"
            fill="none"
          />

          {/* Window Header */}
          <line
            x1="-8"
            y1="-3"
            x2="8"
            y2="-3"
            className="stroke-muted-foreground/80"
            strokeWidth="1"
          />

          {/* Header Dots */}
          <circle
            cx="-5"
            cy="-5"
            r="0.8"
            className="fill-muted-foreground/80"
          />

          <circle
            cx="-2"
            cy="-5"
            r="0.8"
            className="fill-muted-foreground/80"
          />

          {/* Code Symbol */}
          <path
            d="M -3 -1 L -5 1 L -3 3"
            className="stroke-muted-foreground/80"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M 3 -1 L 5 1 L 3 3"
            className="stroke-muted-foreground/80"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <line
            x1="1"
            y1="-1"
            x2="-1"
            y2="3"
            className="stroke-foreground/90"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Active Indicator */}
          <circle
            cx="6"
            cy="5"
            r="1.5"
            className="fill-amber-500/80 dark:fill-amber-400"
          />

          {/* Label */}
          <text
            y="-28"
            textAnchor="middle"
            className="fill-muted-foreground font-mono text-[9px] font-semibold uppercase tracking-widest"
          >
            Software
          </text>
        </g>
        {/* DevOps Node */}
        <g transform="translate(130, 220)">
          <circle
            r="28"
            className="fill-foreground/[0.02] dark:fill-foreground/[0.03]"
          />

          <circle
            r="20"
            className="fill-background stroke-border dark:fill-card dark:stroke-border/70"
            strokeWidth="1.5"
          />

          <path
            d="M -7 -6 L 0 -10 L 7 -6 L 7 4 L 0 8 L -7 4 Z"
            className="stroke-muted-foreground/80"
            strokeWidth="1.2"
            fill="none"
          />

          <path
            d="M 0 -10 L 0 8"
            className="stroke-muted-foreground/80"
            strokeWidth="1"
          />

          <path
            d="M -7 -6 L 0 -2 L 7 -6"
            className="stroke-muted-foreground/80"
            strokeWidth="1"
          />

          <circle
            cx="0"
            cy="-2"
            r="1.5"
            className="fill-blue-500/80 dark:fill-blue-400"
          />

          <text
            x="-26"
            y="4"
            textAnchor="end"
            className="fill-muted-foreground font-mono text-[9px] font-semibold uppercase tracking-widest"
          >
            DevOps
          </text>
        </g>

        {/* AI Node */}
        <g transform="translate(310, 220)">
          <circle
            r="28"
            className="fill-foreground/[0.02] dark:fill-foreground/[0.03]"
          />

          <circle
            r="20"
            className="fill-background stroke-border dark:fill-card dark:stroke-border/70"
            strokeWidth="1.5"
          />

          <circle
            cx="-5"
            cy="-5"
            r="2.5"
            className="fill-muted-foreground/80"
          />

          <circle
            cx="5"
            cy="5"
            r="2.5"
            className="fill-rose-500/80 dark:fill-rose-400"
          />

          <circle
            cx="-4"
            cy="5"
            r="2"
            className="fill-muted-foreground/80"
          />

          <circle
            cx="5"
            cy="-4"
            r="2"
            className="fill-muted-foreground/80"
          />

          <line
            x1="-5"
            y1="-5"
            x2="5"
            y2="5"
            className="stroke-muted-foreground/50"
            strokeWidth="1"
          />

          <line
            x1="-4"
            y1="5"
            x2="5"
            y2="-4"
            className="stroke-muted-foreground/50"
            strokeWidth="1"
          />

          <text
            x="26"
            y="4"
            textAnchor="start"
            className="fill-muted-foreground font-mono text-[9px] font-semibold uppercase tracking-widest"
          >
            AI
          </text>
        </g>

        {/* Central Core */}
        <g transform="translate(220, 220)">
          <circle
            r="12"
            className="fill-background stroke-foreground/40 dark:fill-card dark:stroke-foreground/60"
            strokeWidth="1.5"
          />

          <circle
            r="4"
            className="animate-pulse fill-foreground/85 dark:fill-foreground/95"
          />
        </g>

        {/* Status Indicator */}
        <g transform="translate(220, 370)">
          <rect
            x="-60"
            y="-10"
            width="120"
            height="20"
            rx="10"
            className="fill-background/80 stroke-border/40 dark:fill-card/85 dark:stroke-border/20"
            strokeWidth="1"
          />

          <circle
            cx="-40"
            cy="0"
            r="3"
            className="fill-emerald-500"
          />

          <text
            x="-28"
            y="3"
            className="fill-muted-foreground font-sans text-[8.5px] font-medium uppercase tracking-wider"
          >
            Systems Active
          </text>
        </g>
      </svg>
    </div>
  );
}