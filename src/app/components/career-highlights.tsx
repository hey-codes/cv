import { parseLinks } from "@/components/parse-links";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

interface CareerHighlightsProps {
  highlights: readonly string[];
  className?: string;
}

/**
 * Career Highlights section component
 * Displays numbered career highlights
 */
export function CareerHighlights({
  highlights,
  className,
}: CareerHighlightsProps) {
  return (
    <Section className={className}>
      <SectionHeading
        index="02"
        kicker="Track record"
        id="career-highlights-section"
      >
        Career Highlights
      </SectionHeading>
      <ul className="ml-4 list-outside list-disc space-y-2 text-pretty font-mono text-sm italic text-foreground/80 print:text-[10px]">
        {highlights.map((highlight) => (
          <li key={highlight}>{parseLinks(highlight)}</li>
        ))}
      </ul>
    </Section>
  );
}
