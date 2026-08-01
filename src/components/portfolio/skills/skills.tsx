import { skillCategories } from "@/content/skills";
import { Badge } from "@/components/portfolio/shared/badge";
import { Card } from "@/components/portfolio/shared/card";
import { SectionContainer } from "@/components/portfolio/shared/section-container";
import { SectionHeader } from "@/components/portfolio/shared/section-header";
import Image from "next/image";

export function Skills() {
  return (
    <SectionContainer id="skills">
      <SectionHeader
        title="Skills"
        subtitle="A categorized view of the technologies and systems I work with most often."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {skillCategories.map((category) => {
          const Icon = typeof category.icon === "string" ? null : category.icon;

          return (
            <Card key={category.name} className="h-full">
              <div className="flex items-center gap-3">
                {Icon ? (
                  <Icon className="size-8 text-primary" />
                ) : (
                  <Image
                    src={category.icon as string}
                    alt={category.name}
                    width={32}
                    height={32}
                    className="size-8"
                  />
                )}
                <h3 className="text-lg font-semibold text-foreground">
                  {category.name}
                </h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {category.items.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </SectionContainer>
  );
}
