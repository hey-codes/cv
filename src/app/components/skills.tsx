import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
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
      <h2 className="text-[22px] font-bold uppercase" id="skills-section">
        Skills
      </h2>
      <div className="space-y-3">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="mb-1 text-sm font-semibold text-accent-brand">
              {group.category}
            </h3>
            <ul
              className={cn("flex list-none flex-wrap gap-1 p-0")}
              aria-label={`${group.category} skills`}
            >
              {group.items.map((skill) => (
                <li key={skill}>
                  <Badge
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
