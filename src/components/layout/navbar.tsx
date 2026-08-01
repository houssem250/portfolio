"use client";

import * as React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { navigationItems } from "@/content/navigation";
import { useActiveSection } from "@/hooks/use-active-section";

const sectionIds = navigationItems.map((item) => item.href.replace(/^#/, ""));

export function Navbar() {
  const activeId = useActiveSection(sectionIds);
  // Treat "" as home during SSR or initial load
  const isAtTop = activeId === "" || activeId === "home";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight hover:opacity-85 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Houssem
          </Link>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navigationItems.map((item) => {
            const id = item.href.replace(/^#/, "");
            const isActive = id === "home" ? isAtTop : id === activeId;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Items */}
        <div className="flex items-center gap-1">
          <a
            href="/resume/Houssem_Eddine_Leghelimi_Resume.pdf"
            target="_blank"
            rel="noreferrer noopener"
            title="Download Resume"
            className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
          >
            <FileText className="size-5" />
            <span className="sr-only">Resume</span>
          </a>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </div>
  );
}
