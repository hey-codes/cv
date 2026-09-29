import type React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Two-digit running order, e.g. "01". Rendered inside the kicker. */
  index: string;
  /** Short uppercase eyebrow. Should add information, not repeat the title. */
  kicker: string;
  /** The Fraunces display title. */
  children: React.ReactNode;
  id: string;
  className?: string;
  /** Optional control rendered flush right on the title row. */
  action?: React.ReactNode;
}

/**
 * FMWorks masthead pattern: a red pressmark dash, an uppercase mono eyebrow in
 * accent blue, then the display title. The dash is the brand's structural mark
 * and never signals interaction - that stays blue.
 *
 * Mirrors `.kicker` in FMWorks colors_and_type.css.
 */
export function SectionHeading({
  index,
  kicker,
  children,
  id,
  className,
  action,
}: SectionHeadingProps) {
  return (
    <div className={cn("relative space-y-1", className)}>
      <p
        className="inline-flex items-center gap-x-2.5 text-xs font-semibold uppercase tracking-[0.06em] text-accent-brand print:text-[9px]"
        aria-hidden="true"
      >
        <span className="h-1 w-5 shrink-0 rounded-[1px] bg-accent-red" />
        {index} &middot; {kicker}
      </p>
      <div className="flex items-baseline justify-between gap-x-4">
        <h2
          className="scroll-mt-20 text-balance font-display text-title font-bold xl:scroll-mt-8"
          id={id}
        >
          {children}
        </h2>
        {action}
      </div>
    </div>
  );
}
