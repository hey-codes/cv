"use client";

import { useEffect, useState } from "react";

type Stat = {
  /** Numeric target the counter animates toward. */
  value: number;
  /** Rendered before the number, e.g. a currency mark. */
  prefix?: string;
  /** Rendered after the number, e.g. a plus or an M. */
  suffix?: string;
  label: string;
  /** Decimal places to hold while counting. */
  decimals?: number;
};

const STATS: readonly Stat[] = [
  { value: 13, label: "Years in FM" },
  { value: 400, suffix: "+", label: "Locations" },
  { value: 9, label: "Brands" },
  { value: 5.3, prefix: "$", suffix: "M", label: "Peak spend", decimals: 1 },
];

const DURATION = 900;

function useCountUp(target: number, decimals: number, run: boolean) {
  const [value, setValue] = useState(run ? 0 : target);

  useEffect(() => {
    if (!run) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // ease-out cubic: fast off the line, gentle landing
      const eased = 1 - (1 - t) ** 3;
      setValue(Number((target * eased).toFixed(decimals)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, decimals, run]);

  return value;
}

function StatValue({ stat, run }: { stat: Stat; run: boolean }) {
  const decimals = stat.decimals ?? 0;
  const value = useCountUp(stat.value, decimals, run);

  return (
    <div className="flex flex-col gap-y-0.5">
      <span className="font-display text-[28px] font-bold leading-none tabular-nums lining-nums text-foreground">
        {stat.prefix}
        {value.toFixed(decimals)}
        {stat.suffix}
      </span>
      <span className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {stat.label}
      </span>
    </div>
  );
}

/**
 * Masthead scale strip. Front-loads portfolio size before a reader hits the
 * first paragraph. Counts up once on mount, and skips straight to the final
 * figures when the reader prefers reduced motion or when printing.
 */
export function StatStrip() {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setRun(!reduced);

    // Printing mid-animation would bake a half-counted figure ("7" instead of
    // "13") into the PDF, so snap to the finals before the print dialog paints.
    const snap = () => setRun(false);
    window.addEventListener("beforeprint", snap);
    const printQuery = window.matchMedia("print");
    const onPrintChange = (e: MediaQueryListEvent) => {
      if (e.matches) snap();
    };
    printQuery.addEventListener("change", onPrintChange);
    return () => {
      window.removeEventListener("beforeprint", snap);
      printQuery.removeEventListener("change", onPrintChange);
    };
  }, []);

  return (
    <section
      aria-label="Portfolio at a glance"
      className="border-t-[3px] border-accent-red pt-3"
    >
      <dl className="flex flex-wrap items-start gap-x-8 gap-y-4">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <dt className="sr-only">{stat.label}</dt>
            <dd className="m-0">
              <StatValue stat={stat} run={run} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
