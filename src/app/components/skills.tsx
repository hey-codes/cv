import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

type SkillCategory = {
  readonly category: string;
  readonly items: readonly string[];
};

interface SkillsProps {
  skills: readonly SkillCategory[];
  className?: string;
}

/**
 * Skills section component. Each group is a label over one line of
 * comma-separated text: a wall of identical chips gave "Microsoft Office" the
 * same weight as "New Site Openings".
 */
export function Skills({ skills, className }: SkillsProps) {
  return (
    <Section className={className}>
      <SectionHeading kicker="Capabilities" id="skills-section">
        Capabilities
      </SectionHeading>
      <div className="space-y-4">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="mb-0.5 text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground print:text-[9px]">
              {group.category}
            </h3>
            <p className="max-w-[68ch] text-pretty text-base text-foreground/80 print:max-w-none print:text-[10px]">
              {group.items.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
