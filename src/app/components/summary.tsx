import { Section } from "../../components/ui/section";
import { SectionHeading } from "../../components/ui/section-heading";

interface AboutProps {
  summary: string;
  className?: string;
}

/**
 * Summary section component
 * Displays a summary of professional experience and goals
 */
export function Summary({ summary, className }: AboutProps) {
  return (
    <Section className={className}>
      <SectionHeading
        index="01"
        kicker="Profile"
        id="about-section"
        note="the short version"
      >
        About
      </SectionHeading>
      <div className="text-pretty text-sm text-foreground/80 print:text-[10px]">
        {summary}
      </div>
    </Section>
  );
}
