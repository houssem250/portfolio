import {
  CalendarDays,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

import { certificationEntries } from "@/content/certifications";
import { Badge } from "@/components/portfolio/shared/badge";
import { Card } from "@/components/portfolio/shared/card";
import { SectionContainer } from "@/components/portfolio/shared/section-container";
import { SectionHeader } from "@/components/portfolio/shared/section-header";

/* -------------------------------------------------------------------------- */
/* Compute the tallest Skills section                                          */
/* -------------------------------------------------------------------------- */

const BADGES_PER_ROW = 2;
const BADGE_HEIGHT = 8;
const BADGE_ROW_GAP = 8;
const LABEL_HEIGHT = 8;
const MIN_SKILLS_HEIGHT = 8;

const maxSkillCount = Math.max(
  ...certificationEntries.map((cert) => cert.skills?.length ?? 0)
);

const maxRows = Math.max(
  1,
  Math.ceil(maxSkillCount / BADGES_PER_ROW)
);

const skillsMinHeight = Math.max(
  MIN_SKILLS_HEIGHT,
  LABEL_HEIGHT +
  maxRows * BADGE_HEIGHT +
  (maxRows - 1) * BADGE_ROW_GAP
);

export function Certifications() {
  return (
    <SectionContainer id="certifications">
      <SectionHeader
        title="Certifications"
        subtitle="Professional certifications and training that demonstrate continuous learning across cloud computing, software engineering, and artificial intelligence."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {certificationEntries.map((certification) => (
          <Card
            key={certification.title}
            className="
                flex
                h-full
                flex-col
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-foreground/20 
            "
          >
            {/* ---------------------------------------------------------------- */}
            {/* Header */}
            {/* ---------------------------------------------------------------- */}

            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-foreground text-background">
                <ShieldCheck className="size-5" />
              </div>

              <div className="min-w-0">
                <h3 className="text-lg font-semibold leading-tight text-foreground">
                  {certification.title}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {certification.issuer}
                </p>
              </div>
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* Date */}
            {/* ---------------------------------------------------------------- */}

            <div className="mt-5 min-h-8 flex items-center gap-2">
              <CalendarDays className="size-4" />
              <span>Issued {certification.date}</span>
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* Skills */}
            {/* ---------------------------------------------------------------- */}

            <div
              className="mt-6"
              style={{ minHeight: `${skillsMinHeight}px` }}
            >
              {certification.skills && certification.skills.length > 0 && (
                <>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Skills
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {certification.skills.map((skill) => (
                      <Badge key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* Credential */}
            {/* ---------------------------------------------------------------- */}

            <div className="mt-6 flex min-h-6 items-center gap-2 text-sm text-muted-foreground hidden">
              {certification.verifyHref && (
                <>
                  <CheckCircle2 className="size-4 text-green-600 dark:text-green-400" />
                  <span>Credential available</span>
                </>
              )}
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* Button */}
            {/* ---------------------------------------------------------------- */}

            <div className="pt-6 hidden">
              {certification.verifyHref && (
                <a
                  href={certification.verifyHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <CheckCircle2 className="size-4" />
                  Verify Credential
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}