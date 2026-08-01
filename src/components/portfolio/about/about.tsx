import { BriefcaseBusiness, Globe, MapPin, Sparkles, GraduationCap } from "lucide-react";
import { aboutContent } from "@/content/about";
import { Card } from "@/components/portfolio/shared/card";
import { SectionContainer } from "@/components/portfolio/shared/section-container";
import { SectionHeader } from "@/components/portfolio/shared/section-header";
import { TerminalWidget } from "./terminal-widget";
import { Monitor } from "./terminal-monitor/Monitor";

const factIcons: Record<string, React.ReactNode> = {
  Location: <MapPin className="size-4" />,
  Education: <GraduationCap className="size-4" />,
  Role: <BriefcaseBusiness className="size-4" />,
  Languages: <Globe className="size-4" />,
  Interests: <Sparkles className="size-4" />,
};

export function About() {
  return (
    <SectionContainer id="about">
      <SectionHeader id="about-heading" title={aboutContent.title} subtitle={aboutContent.subtitle} />
      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-start">
        {/* Left Column: Biography + Terminal Widget */}
        <div className="flex flex-col gap-8">
          <Card className="p-8">
            <div className="space-y-5 text-base leading-7 text-muted-foreground">
              {aboutContent.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Card>

          <TerminalWidget />
        </div>

        {/* Right Column: Quick Facts + Monitor */}
        <div className="flex flex-col gap-8">
          <Card className="p-8">
            <h3 className="text-lg font-semibold text-foreground">Quick Facts</h3>
            <div className="mt-6 space-y-4">
              {aboutContent.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-start gap-3 rounded-2xl border border-border/50 bg-muted/30 p-4"
                >
                  <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-background text-foreground shadow-sm">
                    {factIcons[fact.label] ?? <Sparkles className="size-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{fact.label}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{fact.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* CRT Pixel Art Monitor */}
          <div className="w-full">
            <Monitor />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
