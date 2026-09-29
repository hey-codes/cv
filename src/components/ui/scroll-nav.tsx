"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "about-section", index: "01", label: "Profile" },
  { id: "career-highlights-section", index: "02", label: "Track record" },
  { id: "work-experience", index: "03", label: "Experience" },
  { id: "education-section", index: "04", label: "Credentials" },
  { id: "skills-section", index: "05", label: "Capabilities" },
] as const;

/** Where a section counts as "being read": 140px below the top of the
 * viewport, a 1px band an IntersectionObserver watches. */
const READ_LINE = 140;

/**
 * Section navigation, in two shapes that share one active section.
 *
 * Desktop (1400px and up): a fixed rail of numbered mono items in the left
 * gutter. The active item turns blue, a red indicator slides to it, and a thin
 * red line fills along the rail with scroll progress. Hovering an item nudges
 * it 4px right and turns it blue.
 * Below 1400px: a slim top bar of the same numbers, the active one blue, with
 * the red progress bar underneath.
 *
 * The active section comes from an IntersectionObserver on a band at the read
 * line, so the rail indicator, the rail label, and the top bar can never
 * disagree. Everything collapses to instant changes under reduced motion.
 */
export function ScrollNav() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  // Active section. The IntersectionObserver reports which section spans the
  // read line; resolve() turns that into one answer for the rail indicator,
  // the rail labels, and the top bar, covering the three places the observer
  // alone goes quiet: above the first section (the header), at the very
  // bottom (the last heading never reaches the line), and on a divider
  // between sections after a jump.
  useEffect(() => {
    // Sections are looked up fresh, never cached for the page's lifetime: on
    // load the content first sits in a hidden streaming container before Next
    // moves it into place, and a node grabbed too early reads as top 0 and
    // points everything at the last section.
    const findSections = () =>
      SECTIONS.map((s) =>
        document.getElementById(s.id)?.closest("section")
      ).filter((el): el is HTMLElement => Boolean(el));
    const isLive = (el: HTMLElement) =>
      el.isConnected && el.getClientRects().length > 0;
    let sections = findSections();
    const idOf = (el: Element) => el.querySelector("h2[id]")?.id;
    const intersecting = new Set<string>();

    const resolve = () => {
      if (sections.length !== SECTIONS.length || !sections.every(isLive)) {
        sections = findSections();
        observe();
        // Not laid out yet: keep the current answer until it is.
        if (!sections.every(isLive)) return;
      }
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      let id: string = SECTIONS[0].id;
      if (scrollable > 0 && window.scrollY >= scrollable - 4) {
        id = SECTIONS[SECTIONS.length - 1].id;
      } else if (
        sections[0] &&
        sections[0].getBoundingClientRect().top <= READ_LINE
      ) {
        const hit = SECTIONS.find((s) => intersecting.has(s.id));
        if (hit) {
          id = hit.id;
        } else {
          for (const el of sections) {
            if (el.getBoundingClientRect().top <= READ_LINE) {
              id = idOf(el) ?? id;
            }
          }
        }
      }
      setActiveId(id);
    };

    let observer: IntersectionObserver | null = null;
    const observe = () => {
      observer?.disconnect();
      intersecting.clear();
      const bottom = Math.max(0, window.innerHeight - READ_LINE - 1);
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const id = idOf(entry.target);
            if (!id) continue;
            if (entry.isIntersecting) intersecting.add(id);
            else intersecting.delete(id);
          }
          resolve();
        },
        { rootMargin: `-${READ_LINE}px 0px -${bottom}px 0px` }
      );
      for (const el of sections) observer.observe(el);
    };

    // Scroll only drives the progress lines and the two edge cases; which
    // section is being read comes from the observer.
    const update = () => {
      // Reset first, so one bad frame can never leave updates switched off.
      ticking.current = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      setProgress(
        scrollable <= 0 ? 0 : Math.min(1, window.scrollY / scrollable)
      );
      resolve();
    };
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    // Frames can be throttled while a tab is in the background; re-sync the
    // moment it is visible or focused again, without waiting for a scroll.
    const resync = () => {
      if (document.visibilityState === "visible") update();
    };

    // Re-check when the page structure changes (the streaming handoff).
    const mutations = new MutationObserver(onScroll);
    mutations.observe(document.body, { childList: true, subtree: true });

    observe();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", observe);
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("focus", resync);
    document.addEventListener("visibilitychange", resync);
    return () => {
      observer?.disconnect();
      mutations.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", observe);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("focus", resync);
      document.removeEventListener("visibilitychange", resync);
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

  // The indicator sits on the active item: measured, then moved by transform.
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ y: 0, h: 0 });
  useLayoutEffect(() => {
    const measure = () => {
      const item = itemRefs.current[activeIndex];
      if (item) setIndicator({ y: item.offsetTop, h: item.offsetHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeIndex]);

  return (
    <>
      {/* ---------- desktop rail (1400px and up) ---------- */}
      <nav
        aria-label="Section progress"
        className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 min-[1400px]:block print:hidden"
      >
        <ol className="relative flex list-none flex-col gap-y-4 pl-4">
          {/* track, the thin progress line, and the active-item indicator */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-1 bottom-1 w-[2px] rounded-full bg-border"
          />
          <span
            aria-hidden="true"
            className="scroll-spine absolute bottom-1 left-[0.5px] top-1 w-px origin-top bg-accent-red/60"
            style={{ transform: `scaleY(${progress})` }}
          />
          <span
            aria-hidden="true"
            className="rail-indicator absolute left-0 top-0 w-[2px] rounded-full bg-accent-red"
            style={{
              transform: `translateY(${indicator.y}px)`,
              height: `${indicator.h}px`,
            }}
          />
          {SECTIONS.map((section, i) => {
            const isActive = section.id === activeId;
            return (
              <li
                key={section.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
              >
                <button
                  type="button"
                  onClick={() => jumpTo(section.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "scroll-tick scroll-tick--rail relative flex items-baseline gap-x-2 rounded-sm text-left font-mono text-[11px] uppercase tracking-[0.14em] before:absolute before:inset-x-0 before:-inset-y-[14px] before:content-[''] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    isActive ? "text-accent-brand" : "text-muted-foreground"
                  )}
                >
                  <span className="font-bold">{section.index}</span>
                  <span className="whitespace-nowrap">{section.label}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* ---------- top bar (under 1400px) ---------- */}
      <nav
        aria-label="Section progress"
        // Fixed, not sticky: the page's <main> sets overflow-auto, which would
        // make it the sticky scroll container even though the body is what
        // actually scrolls - the bar would simply scroll away.
        className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background min-[1400px]:hidden print:hidden"
      >
        <div className="flex items-center gap-x-1 px-4">
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
                  "scroll-tick min-h-11 flex-1 rounded-sm text-center font-mono text-[11px] font-bold tracking-[0.1em] hover:text-accent-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
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
