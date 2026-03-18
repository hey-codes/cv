import { Section } from "../../components/ui/section";

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
      <h2 className="text-[22px] font-bold uppercase" id="about-section">
        About
      </h2>
      <div className="text-pretty font-mono text-sm text-foreground/80 print:text-[10px]">
        {summary}
      </div>
    </Section>
  );
}
