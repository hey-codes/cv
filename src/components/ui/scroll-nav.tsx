"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "about-section", index: "01", label: "Profile" },
  { id: "career-highlights-section", index: "02", label: "Track record" },
  { id: "work-experience", index: "03", label: "Experience" },
  { id: "education-section", index: "04", label: "Credentials" },
  { id: "skills-section", index: "05", label: "Capabilities" },
] as const;

/**
 * Scroll position indicator, in two shapes.
 *
 * Desktop (xl and up): a fixed rail in the left gutter. A red spine fills to
 * match page progress and a marker slides to whichever section is in view.
 * Mobile: a slim sticky bar of numbered segments with the same filling rule.
 *
 * Both derive from a single rAF-throttled scroll listener, and both collapse to
 * a static list when the reader prefers reduced motion.
 */
export function ScrollNav() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  // One scroll handler drives both the spine fill and the active section.
  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      setProgress(
        scrollable <= 0 ? 0 : Math.min(1, window.scrollY / scrollable)
      );

      // Active section = the last heading to have crossed the read line.
      // Computed rather than observed, so jumping to a section (or landing on a
      // hash) resolves correctly instead of holding a stale value.
      //
      // The final section's heading can never reach that line, because the page
      // bottoms out first - at a 1000px viewport the whole tail sits inside a
      // single screen. Rather than pretend otherwise with a sweeping threshold
      // (which just makes the second-to-last section unreachable instead), the
      // last section claims the indicator once you are actually at the bottom.
      const READ_LINE = 140;
      let current: string = SECTIONS[0].id;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= READ_LINE) {
          current = section.id;
        }
      }
      if (scrollable > 0 && window.scrollY >= scrollable - 4) {
        current = SECTIONS[SECTIONS.length - 1].id;
      }
      setActiveId(current);

      ticking.current = false;
    };
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const jumpTo = useCallback((id: string) => {
    // An explicit behavior:"smooth" overrides the CSS scroll-behavior reset, so
    // the reduced-motion check has to happen here rather than in the stylesheet.
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    document.getElementById(id)?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  const activeIndex = SECTIONS.findIndex((s) => s.id === activeId);

  return (
    <>
      {/* ---------- desktop rail ---------- */}
      <nav
        aria-label="Section progress"
        className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block print:hidden"
      >
        <ol className="relative flex list-none flex-col gap-y-4 pl-4">
          {/* track + fill */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-1 bottom-1 w-[2px] rounded-full bg-border"
          />
          <span
            aria-hidden="true"
            className="scroll-spine absolute bottom-1 left-0 top-1 w-[2px] origin-top rounded-full bg-accent-red"
            style={{ transform: `scaleY(${progress})` }}
          />
          {SECTIONS.map((section, i) => {
            const isActive = section.id === activeId;
            const isPast = i < activeIndex;
            return (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => jumpTo(section.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "scroll-tick group flex items-baseline gap-x-2 rounded-sm text-left font-mono text-[10px] uppercase tracking-[0.14em] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    isActive
                      ? "text-accent-brand"
                      : isPast
                        ? "text-muted-foreground"
                        : "text-muted-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "scroll-tick__num font-bold",
                      isActive && "scroll-tick__num--on"
                    )}
                  >
                    {section.index}
                  </span>
                  <span
                    className={cn(
                      "scroll-tick__label",
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                    )}
                  >
                    {section.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* ---------- mobile bar ---------- */}
      <nav
        aria-label="Section progress"
        // Fixed, not sticky: the page's <main> sets overflow-auto, which would
        // make it the sticky scroll container even though the body is what
        // actually scrolls - the bar would simply scroll away.
        className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm xl:hidden print:hidden"
      >
        <div className="flex items-center gap-x-1 px-4 py-2">
          {SECTIONS.map((section) => {
            const isActive = section.id === activeId;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => jumpTo(section.id)}
                aria-current={isActive ? "true" : undefined}
                aria-label={`Jump to ${section.label}`}
                className={cn(
                  "scroll-tick flex-1 rounded-sm py-1 text-center font-mono text-[10px] font-bold tracking-[0.1em] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive ? "text-accent-brand" : "text-muted-foreground"
                )}
              >
                {section.index}
              </button>
            );
          })}
        </div>
        <div className="h-[2px] w-full bg-border">
          <div
            className="scroll-spine h-full w-full origin-left rounded-full bg-accent-red"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </nav>
    </>
  );
}
