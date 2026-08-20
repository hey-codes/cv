"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { parseLinks } from "@/components/parse-links";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { RESUME_DATA } from "@/data/resume-data";
import { cn } from "@/lib/utils";

type WorkExperience = (typeof RESUME_DATA)["work"][number];
type WorkBadges = readonly string[];

/**
 * Chips are written for humans, so the same system shows up in more than one
 * shape: "FEXA" on one role and "Limble -> FEXA" on another, "Hybrid" here and
 * "Hybrid (Travel 60%)" there. Split on arrows and parentheses only - never on
 * commas, which would tear "35,000 sq. ft." in half - and treat any resulting
 * segment as a match.
 */
function badgeSegments(badge: string): string[] {
  return badge
    .split(/->|[()]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function badgeMatches(badge: string, tag: string): boolean {
  if (badge === tag) return true;
  // Symmetric on purpose: tapping "FEXA" must reach "Limble -> FEXA", and
  // tapping "Limble -> FEXA" must reach "FEXA". Comparing whole segments (not
  // words) keeps "Luxury Retail" and "High-End Retail" apart.
  const tagParts = badgeSegments(tag);
  return badgeSegments(badge).some((part) => tagParts.includes(part));
}

function roleKey(item: WorkExperience): string {
  return `${item.company}-${item.start}`;
}

function roleMatches(badges: WorkBadges, tag: string): boolean {
  return badges.some((badge) => badgeMatches(badge, tag));
}

interface BadgeListProps {
  className?: string;
  badges: WorkBadges;
  activeTag: string | null;
  onToggle: (tag: string) => void;
}

/**
 * Renders work-experience badges as toggle buttons. Tapping one filters the
 * whole section by that tag; tapping it again clears. Pointer- and
 * touch-equivalent, so phones get the same affordance desktop does.
 */
function BadgeList({ className, badges, activeTag, onToggle }: BadgeListProps) {
  if (badges.length === 0) return null;

  return (
    <ul
      className={cn("inline-flex list-none gap-x-1 p-0", className)}
      aria-label="Filter roles by tag"
    >
      {badges.map((badge) => {
        const isActive = activeTag !== null && badgeMatches(badge, activeTag);
        return (
          <li key={badge}>
            <button
              type="button"
              onClick={() => onToggle(badge)}
              aria-pressed={isActive}
              aria-label={`Filter roles tagged ${badge}`}
              className="rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Badge
                variant="secondary"
                className={cn(
                  "chip align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight",
                  isActive &&
                    "bg-accent-strong text-accent-ink hover:bg-accent-strong"
                )}
              >
                {badge}
              </Badge>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

interface WorkPeriodProps {
  location?: string;
  start: WorkExperience["start"];
  end?: WorkExperience["end"];
}

/**
 * Displays location and work period in a consistent format
 */
function WorkPeriod({ location, start, end }: WorkPeriodProps) {
  return (
    <div
      className="font-mono text-sm tabular-nums text-muted-foreground sm:shrink-0 sm:whitespace-nowrap"
      title={`Employment period: ${start} to ${end ?? "Present"}`}
    >
      {location && <>{location} · </>}
      {start} - {end ?? "Present"}
    </div>
  );
}

interface CompanyLinkProps {
  company: WorkExperience["company"];
  link: WorkExperience["link"];
}

/**
 * Renders company name with optional link
 */
function CompanyLink({ company, link }: CompanyLinkProps) {
  return (
    <a
      className="link-wipe text-accent-brand font-bold italic"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${company} company website`}
    >
      {company}
    </a>
  );
}

interface WorkExperienceItemProps {
  work: WorkExperience;
  activeTag: string | null;
  onToggle: (tag: string) => void;
  open: boolean;
  onToggleOpen: () => void;
}

/**
 * Individual work experience card component
 * Handles responsive layout for badges (mobile/desktop)
 */
function WorkExperienceItem({
  work,
  activeTag,
  onToggle,
  open,
  onToggleOpen,
}: WorkExperienceItemProps) {
  const {
    company,
    link,
    location,
    badges,
    title,
    start,
    end,
    description,
    highlights,
    note,
  } = work;

  // Open state lives in the parent so "expand all" can drive every role at once.
  const panelId = useId();
  const hasHighlights = Boolean(highlights && highlights.length > 0);

  // Filtering never hides a role - non-matches recede so the page keeps its shape.
  const isDimmed = activeTag !== null && !roleMatches(badges, activeTag);

  return (
    <Card
      className={cn(
        "work-card border-none py-1 print:py-0",
        isDimmed && "work-card--dimmed"
      )}
    >
      {note && (
        <span
          aria-hidden="true"
          className="role-note pointer-events-none select-none font-display text-[13.5px] italic leading-snug text-accent-red"
        >
          {note}
        </span>
      )}

      {/* Toggle region: the header and the summary line. Chips and the expanded
          bullets sit outside it, so tapping a chip still filters and links
          inside the highlights still open. */}
      <div className="relative">
        <CardHeader className="print:space-y-1">
          {/* Below the gutter breakpoint the margin note folds inline as a red
              overline, so every reader gets the annotation, not just wide
              desktops. */}
          {note && (
            <p
              aria-hidden="true"
              className="pointer-events-none relative z-10 font-mono text-[9px] font-bold uppercase leading-none tracking-[0.16em] text-accent-red min-[1440px]:hidden print:hidden"
            >
              {note}
            </p>
          )}
          <div className="pointer-events-none relative z-10 flex flex-col items-start gap-y-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-x-2">
            <h3 className="flex items-center gap-x-1.5 text-[18px] font-semibold leading-none print:text-sm">
              {hasHighlights && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "role-caret text-[11px] text-muted-foreground print:hidden",
                    open && "is-open"
                  )}
                >
                  &#9656;
                </span>
              )}
              {/* the only interactive island in an otherwise click-through row */}
              <span className="pointer-events-auto">
                <CompanyLink company={company} link={link} />
              </span>
            </h3>
            <WorkPeriod location={location} start={start} end={end} />
          </div>

          <h4 className="pointer-events-none relative z-10 font-mono text-sm font-semibold leading-none print:text-[12px]">
            {title}
          </h4>
        </CardHeader>

        <p className="pointer-events-none relative z-10 mt-2 text-sm text-foreground/80 print:mt-1 print:text-[10px] text-pretty">
          {description}
        </p>

        {/* An overlay button rather than a wrapping div: the company name is a
            link and cannot nest inside a button, and a div with onClick would
            not be keyboard-operable. */}
        {hasHighlights && (
          <button
            type="button"
            onClick={onToggleOpen}
            aria-expanded={open}
            aria-controls={panelId}
            className="absolute -inset-x-2 -inset-y-1 z-0 cursor-pointer rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring print:hidden"
          >
            <span className="sr-only">
              {open ? "Hide" : "Show"} highlights for {company}
            </span>
          </button>
        )}
      </div>

      <CardContent>
        {/* font-sans overrides CardContent's mono: bullets are prose, and the
            bolded figures only read as waypoints against an upright sans. */}
        <div className="font-sans text-sm text-foreground/80 print:text-[10px] text-pretty">
          {hasHighlights && (
            <div
              id={panelId}
              className={cn("role-panel", open && "role-panel--open")}
            >
              <div className="role-panel__inner">
                <ul className="mt-1 ml-4 list-outside list-disc">
                  {highlights?.map((highlight) => (
                    <li key={highlight}>{parseLinks(highlight)}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="mt-2">
          <BadgeList
            className="flex-wrap gap-1"
            badges={badges}
            activeTag={activeTag}
            onToggle={onToggle}
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface WorkExperienceProps {
  work: (typeof RESUME_DATA)["work"];
}

/**
 * Main work experience section component
 * Renders a list of work experiences in chronological order
 */
export function WorkExperience({ work }: WorkExperienceProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  // The headline roles open on first load so a skimming reader meets the best
  // bullets without clicking; everything else stays folded.
  const [openKeys, setOpenKeys] = useState<ReadonlySet<string>>(
    () => new Set(work.filter((item) => item.defaultOpen).map(roleKey))
  );

  const toggle = useCallback((tag: string) => {
    setActiveTag((current) => (current === tag ? null : tag));
  }, []);

  const clear = useCallback(() => setActiveTag(null), []);

  const expandableKeys = work
    .filter((item) => item.highlights && item.highlights.length > 0)
    .map(roleKey);
  const allOpen =
    expandableKeys.length > 0 &&
    expandableKeys.every((key) => openKeys.has(key));

  const toggleOne = useCallback((key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setOpenKeys((prev) => {
      const keys = work
        .filter((item) => item.highlights && item.highlights.length > 0)
        .map(roleKey);
      return keys.every((key) => prev.has(key)) ? new Set() : new Set(keys);
    });
  }, [work]);

  // Escape clears the filter, matching the command menu's dismissal.
  useEffect(() => {
    if (activeTag === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveTag(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeTag]);

  const matchCount =
    activeTag === null
      ? 0
      : work.filter((item) => roleMatches(item.badges, activeTag)).length;

  return (
    <Section>
      <SectionHeading
        index="03"
        kicker="Experience"
        id="work-experience"
        action={
          expandableKeys.length > 0 ? (
            <button
              type="button"
              onClick={toggleAll}
              aria-expanded={allOpen}
              className="group inline-flex shrink-0 items-center gap-x-1.5 rounded-sm font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-accent-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 print:hidden"
            >
              <span
                aria-hidden="true"
                className={cn("role-caret text-[11px]", allOpen && "is-open")}
              >
                &#9656;
              </span>
              {allOpen ? "Collapse all" : "Expand all"}
            </button>
          ) : undefined
        }
      >
        Work Experience
      </SectionHeading>

      <p className="-mt-1 font-mono text-[10.5px] text-muted-foreground print:hidden">
        Tap a tag to trace it across every role.
      </p>

      {/* Always mounted, so a screen reader is already watching the region when
          the first tag is picked. A live region inserted together with its own
          text is frequently missed. sr-only keeps it out of the layout. */}
      <output aria-live="polite" className="sr-only">
        {activeTag === null
          ? ""
          : `${matchCount} ${matchCount === 1 ? "role" : "roles"} tagged ${activeTag}`}
      </output>

      {activeTag !== null && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 print:hidden">
          <span className="inline-flex items-center gap-x-2.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-accent-brand">
            <span className="h-1 w-5 shrink-0 rounded-[1px] bg-accent-red" />
            {matchCount} {matchCount === 1 ? "role" : "roles"} &middot;{" "}
            {activeTag}
          </span>
          <button
            type="button"
            onClick={clear}
            className="link-wipe font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted-foreground"
          >
            Clear
          </button>
        </div>
      )}

      <div
        className="space-y-6 print:space-y-0"
        role="feed"
        aria-labelledby="work-experience"
      >
        {work.map((item) => (
          <article key={`${item.company}-${item.start}`}>
            <WorkExperienceItem
              work={item}
              activeTag={activeTag}
              onToggle={toggle}
              open={openKeys.has(roleKey(item))}
              onToggleOpen={() => toggleOne(roleKey(item))}
            />
          </article>
        ))}
      </div>
    </Section>
  );
}
