import { parseLinks } from "@/components/parse-links";
import { Section } from "@/components/ui/section";

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
      <h2
        className="text-[22px] font-bold uppercase"
        id="career-highlights-section"
      >
        Career Highlights
      </h2>
      <ul className="ml-4 list-outside list-disc space-y-2 text-pretty font-mono text-sm italic text-foreground/80 print:text-[10px]">
        {highlights.map((highlight, index) => (
          <li key={index}>{parseLinks(highlight)}</li>
        ))}
      </ul>
    </Section>
  );
}
