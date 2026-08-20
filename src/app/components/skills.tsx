import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

type SkillCategory = {
  readonly category: string;
  readonly items: readonly string[];
};

interface SkillsProps {
  skills: readonly SkillCategory[];
  className?: string;
}

/**
 * Skills section component
 * Displays categorized professional skills as badges
 */
export function Skills({ skills, className }: SkillsProps) {
  return (
    <Section className={className}>
      <SectionHeading index="05" kicker="Capabilities" id="skills-section">
        Skills
      </SectionHeading>
      <div className="space-y-4">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="mb-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground print:text-[9px]">
              {group.category}
            </h3>
            <ul
              className={cn("flex list-none flex-wrap gap-1 p-0")}
              aria-label={`${group.category} skills`}
            >
              {group.items.map((skill) => (
                <li key={skill}>
                  <Badge
                    variant="secondary"
                    className="print:text-[10px]"
                    aria-label={`Skill: ${skill}`}
                  >
                    {skill}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
