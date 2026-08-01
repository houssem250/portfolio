import {
  ArrowUpRight,
  Boxes,
  FolderKanban,
  MonitorPlay,
} from "lucide-react";

import { projectEntries } from "@/content/projects";
import { Badge } from "@/components/portfolio/shared/badge";
import { Card } from "@/components/portfolio/shared/card";
import { SectionContainer } from "@/components/portfolio/shared/section-container";
import { SectionHeader } from "@/components/portfolio/shared/section-header";

const projectIcons = [MonitorPlay, FolderKanban, Boxes];

/* -------------------------------------------------------------------------- */
/* Projects Component                                                         */
/* -------------------------------------------------------------------------- */

export function Projects() {
  return (
    <SectionContainer id="projects">
      <SectionHeader
        id="projects-heading"
        title="Projects"
        subtitle="Selected work that shows how I approach product quality, delivery, and technical depth."
      />

      {/* 
        On large screens, we use a grid with CSS subgrid to perfectly align 
        all 4 sections (Icon, Description, Stack, Links) across all cards, 
        even if their content heights differ.
      */}
      <div className="grid gap-6 lg:grid-cols-3 lg:grid-rows-[auto_1fr_auto_auto]">
        {projectEntries.map((project, index) => {
          const Icon = projectIcons[index % projectIcons.length];

          return (
            <Card
              key={project.title}
              className="
                flex flex-col
                lg:col-span-1 lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:gap-0
                h-full
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-foreground/20
              "
            >
              {/* -------------------------------------------------------------- */}
              {/* Header */}
              {/* -------------------------------------------------------------- */}

              <div className="flex items-start justify-between gap-4 lg:mb-6">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-foreground text-background shadow-sm">
                  <Icon className="size-5" />
                </div>

                <ArrowUpRight className="size-5 text-muted-foreground" />
              </div>

              {/* -------------------------------------------------------------- */}
              {/* Description */}
              {/* -------------------------------------------------------------- */}

              <div className="mt-6 flex flex-1 flex-col lg:mt-0 lg:mb-6">
                <h3 className="text-xl font-semibold text-foreground">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {project.description}
                </p>
              </div>

              {/* -------------------------------------------------------------- */}
              {/* Stack */}
              {/* -------------------------------------------------------------- */}

              <div className="mt-6 lg:mt-0 lg:mb-8">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </div>

              {/* -------------------------------------------------------------- */}
              {/* Links */}
              {/* -------------------------------------------------------------- */}

              <div className="mt-8 lg:mt-0">
                <div className="flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noreferrer noopener"
                          : undefined
                      }
                      className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </SectionContainer>
  );
}