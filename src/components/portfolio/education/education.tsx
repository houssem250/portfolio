import { educationEntries } from "@/content/education";
import { Card } from "@/components/portfolio/shared/card";
import { SectionContainer } from "@/components/portfolio/shared/section-container";
import { SectionHeader } from "@/components/portfolio/shared/section-header";

export function Education() {
  return (
    <SectionContainer id="education">
      <SectionHeader
        title="Education"
        subtitle="Academic training that supports my engineering foundation and long-term approach."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {educationEntries.map((entry) => (
          <Card key={`${entry.degree}-${entry.period}`}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {entry.period}
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-foreground">
              {entry.degree} {entry.field}
            </h3>
            <p className="mt-2 text-sm font-medium text-muted-foreground">{entry.institution}</p>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">{entry.description}</p>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}
