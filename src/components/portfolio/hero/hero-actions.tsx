import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto" aria-label="Action links">
      <Link href="#projects" className="w-full sm:w-auto">
        <Button
          variant="default"
          size="lg"
          className="w-full sm:w-auto cursor-pointer font-medium shadow-sm hover:shadow transition-all"
        >
          View Projects
        </Button>
      </Link>
      <Link href="#contact" className="w-full sm:w-auto">
        <Button
          variant="outline"
          size="lg"
          className="w-full sm:w-auto cursor-pointer font-medium transition-all"
        >
          Contact Me
        </Button>
      </Link>
      <a href="/resume/Houssem_Eddine_Leghelimi_Resume.pdf" target="_blank" rel="noreferrer noopener" className="w-full sm:w-auto">
        <Button
          variant="ghost"
          size="lg"
          className="w-full sm:w-auto cursor-pointer font-medium transition-all"
        >
          Resume
        </Button>
      </a>
    </div>
  );
}
