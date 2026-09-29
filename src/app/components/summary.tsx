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
      <SectionHeading kicker="Profile" id="about-section">
        Profile
      </SectionHeading>
      <div className="max-w-[68ch] text-pretty text-base text-foreground/80 print:max-w-none print:text-[10px]">
        {summary}
      </div>
    </Section>
  );
}
