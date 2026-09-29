type Stat = {
  /** The figure exactly as printed. Static on purpose: a count-up let
   * screenshots and link-preview crawlers capture interim numbers. */
  value: string;
  label: string;
};

const STATS: readonly Stat[] = [
  { value: "13", label: "Years in FM" },
  { value: "400+", label: "Locations" },
  { value: "3M+", label: "Sq ft managed" },
  { value: "$5.3M", label: "Managed spend" },
];

/**
 * Masthead scale strip. Front-loads portfolio size before a reader hits the
 * first paragraph. The label is the <dt> and the figure the <dd>, so a screen
 * reader hears each pair once ("Years in FM, 13"); flex-col-reverse puts the
 * figure on top visually without changing that reading order.
 */
export function StatStrip() {
  return (
    <section
      aria-label="Portfolio at a glance"
      className="border-t-[3px] border-accent-red pt-3"
    >
      {/* 2x2 on phones so the fourth figure never wraps into a lonely second
          row; a single flowing row from sm up. */}
      <dl className="grid grid-cols-2 items-start gap-x-8 gap-y-4 sm:flex sm:flex-wrap">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse gap-y-0.5">
            <dt className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {stat.label}
            </dt>
            <dd className="m-0 font-display text-[28px] font-bold leading-none tabular-nums lining-nums text-foreground">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
