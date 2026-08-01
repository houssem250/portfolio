import { experienceEntries } from "@/content/experience";
import { Card } from "@/components/portfolio/shared/card";
import { SectionContainer } from "@/components/portfolio/shared/section-container";
import { SectionHeader } from "@/components/portfolio/shared/section-header";

export function Experience() {
  return (
    <SectionContainer id="experience">
      <SectionHeader
        title="Experience"
        subtitle="A timeline of work, academic, and project experience that shaped my approach."
      />
      <div className="relative space-y-8 pl-6 sm:pl-8">
        <div className="absolute left-2 top-2 bottom-2 w-px bg-border/80 sm:left-3" />
        {experienceEntries.map((entry) => (
          <div key={`${entry.year}-${entry.title}`} className="relative">
            <span className="absolute -left-[0.6rem] top-6 size-3 rounded-full border-4 border-background bg-foreground sm:-left-[0.68rem]" />
            <Card className="ml-4 sm:ml-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {entry.year}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-foreground">{entry.title}</h3>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    {entry.organization} • {entry.location}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{entry.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {entry.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
