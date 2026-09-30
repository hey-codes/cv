"use client";

import { useEffect, useRef, useState } from "react";

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
  { value: 2.9, suffix: "M+", label: "Sq ft managed", decimals: 1 },
  {
    value: 5.3,
    prefix: "$",
    suffix: "M",
    label: "Managed spend",
    decimals: 1,
  },
];

const DURATION = 900;

/** The site's --ease, cubic-bezier(0.22, 1, 0.36, 1), solved for y at time t. */
function ease(t: number): number {
  const [x1, y1, x2, y2] = [0.22, 1, 0.36, 1];
  const bez = (u: number, a: number, b: number) =>
    3 * a * u * (1 - u) ** 2 + 3 * b * u ** 2 * (1 - u) + u ** 3;
  let lo = 0;
  let hi = 1;
  let u = t;
  for (let i = 0; i < 24; i++) {
    u = (lo + hi) / 2;
    if (bez(u, x1, x2) < t) lo = u;
    else hi = u;
  }
  return bez(u, y1, y2);
}

/** Starts at the final figure (what the server renders), and counts up from
 * zero only once `run` turns true. */
function useCountUp(target: number, decimals: number, run: boolean) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!run) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      setValue(Number((target * ease(t)).toFixed(decimals)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    setValue(0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, decimals, run]);

  return value;
}

function format(stat: Stat, value: number): string {
  return `${stat.prefix ?? ""}${value.toFixed(stat.decimals ?? 0)}${stat.suffix ?? ""}`;
}

function StatValue({ stat, run }: { stat: Stat; run: boolean }) {
  const value = useCountUp(stat.value, stat.decimals ?? 0, run);

  // The counting figure is hidden from assistive tech; the sr-only span always
  // holds the final value, so a screen reader never hears "7" for "13".
  return (
    <dd className="m-0 font-display text-[28px] font-bold leading-none tabular-nums lining-nums text-foreground">
      <span aria-hidden="true">{format(stat, value)}</span>
      <span className="sr-only">{format(stat, stat.value)}</span>
    </dd>
  );
}

/**
 * Masthead scale strip. Front-loads portfolio size before a reader hits the
 * first paragraph. The server renders the final figures. The count-up runs
 * once, when the strip first enters view, and never under reduced motion, in
 * a background tab, or in print.
 */
export function StatStrip() {
  const [run, setRun] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const el = ref.current;
    if (reduced || !el) return;

    // A tab opened in the background never paints its frames, which froze the
    // count partway ("0 / 8+"). Count only when someone can see it.
    const observer = new IntersectionObserver((entries) => {
      if (
        entries.some((e) => e.isIntersecting) &&
        document.visibilityState === "visible"
      ) {
        setRun(true);
        observer.disconnect();
      }
    });
    observer.observe(el);

    // Printing mid-animation would bake a half-counted figure ("7" instead of
    // "13") into the PDF, so snap to the finals before the print dialog paints.
    const snap = () => setRun(false);
    window.addEventListener("beforeprint", snap);
    const printQuery = window.matchMedia("print");
    const onPrintChange = (e: MediaQueryListEvent) => {
      if (e.matches) snap();
    };
    printQuery.addEventListener("change", onPrintChange);
    const onVisibility = () => {
      if (document.visibilityState === "hidden") snap();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("beforeprint", snap);
      printQuery.removeEventListener("change", onPrintChange);
    };
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Portfolio at a glance"
      className="border-t-[3px] border-accent-red pt-3"
    >
      {/* 2x2 on phones so the fourth figure never wraps into a lonely second
          row; a single flowing row from sm up. */}
      <dl className="grid grid-cols-2 items-start gap-x-8 gap-y-4 sm:flex sm:flex-wrap">
        {STATS.map((stat) => (
          // The visible label is the <dt>, so each pair is read once ("Years in
          // FM, 13"); flex-col-reverse keeps the figure on top visually.
          <div key={stat.label} className="flex flex-col-reverse gap-y-0.5">
            <dt className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {stat.label}
            </dt>
            <StatValue stat={stat} run={run} />
          </div>
        ))}
      </dl>
    </section>
  );
}
