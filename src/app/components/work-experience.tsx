"use client";

import { ChevronRightIcon } from "lucide-react";
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
 * shape: "FEXA" on one role and "Limble → FEXA" on another. Split on arrows
 * and parentheses only - never on commas, which would tear "35,000 sq ft" in
 * half - and treat any resulting segment as a match.
 */
function badgeSegments(badge: string): string[] {
  return badge
    .split(/->|→|[()]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function badgeMatches(badge: string, tag: string): boolean {
  if (badge === tag) return true;
  // Symmetric on purpose: tapping "FEXA" must reach "Limble → FEXA", and
  // tapping "Limble → FEXA" must reach "FEXA". Comparing whole segments (not
  // words) keeps "Luxury Retail" and "High-End Retail" apart.
  const tagParts = badgeSegments(tag);
  return badgeSegments(badge).some((part) => tagParts.includes(part));
}

/**
 * Only industry and platform tags trace across roles. Sq ft, spend, OPEX, and
 * one-off notes ("Parental Leave Cover", "Hybrid (Travel 60%)") stay static:
 * a tag that only ever matches its own role is noise as a control.
 */
const TRACEABLE_SEGMENTS: ReadonlySet<string> = new Set([
  // industries
  "Flex Office",
  "Thermal Wellness",
  "Luxury Retail",
  "EV / Automotive",
  "Boutique Fitness",
  "High-End Retail",
  // platforms
  "ServiceChannel",
  "FEXA",
  "Limble",
  "MaintainX",
]);

function isTraceable(badge: string): boolean {
  return badgeSegments(badge).every((part) => TRACEABLE_SEGMENTS.has(part));
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
 * Renders work-experience badges. Industry and platform tags are toggles that
 * light up every matching tag across roles (outlined in steel blue, so they
 * read as controls); everything else is a flat gray static chip.
 */
function BadgeList({ className, badges, activeTag, onToggle }: BadgeListProps) {
  if (badges.length === 0) return null;

  return (
    <ul
      className={cn("inline-flex list-none gap-x-1 p-0", className)}
      aria-label="Tags"
    >
      {badges.map((badge) => {
        if (!isTraceable(badge)) {
          return (
            <li key={badge}>
              <Badge
                variant="secondary"
                className="min-h-6 align-middle text-xs hover:bg-secondary print:px-1 print:py-0.5 print:text-[8px] print:leading-tight"
              >
                {badge}
              </Badge>
            </li>
          );
        }
        const isActive = activeTag !== null && badgeMatches(badge, activeTag);
        return (
          <li key={badge}>
            <button
              type="button"
              onClick={() => onToggle(badge)}
              aria-pressed={isActive}
              aria-label={`Highlight every role tagged ${badge}`}
              className="tag-hit rounded-md transition-transform duration-150 ease-out motion-safe:active:scale-[0.96] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Badge
                variant="outline"
                className={cn(
                  "chip min-h-6 align-middle border-accent-brand/30 bg-background text-xs hover:bg-accent-brand/10 print:border-transparent print:bg-secondary print:px-1 print:py-0.5 print:text-[8px] print:leading-tight",
                  isActive &&
                    "border-accent-strong bg-accent-strong text-accent-ink hover:bg-accent-strong"
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
    location,
    badges,
    title,
    start,
    end,
    description,
    highlights,
  } = work;

  // Open state lives in the parent so "expand all" can drive every role at once.
  const panelId = useId();
  const hasHighlights = Boolean(highlights && highlights.length > 0);

  return (
    <Card className="work-card border-none py-1 print:py-0">
      <CardHeader className="print:space-y-1">
        <div className="flex flex-col items-start gap-y-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-x-2">
          <h3 className="text-balance text-base font-bold print:text-sm">
            {/* The toggle is the caret and the company name only. Bullets and
                the summary line are plain text, so selecting them never
                collapses anything. Padding (offset by negative margin) makes
                the hit area 44px tall without moving the layout. */}
            {hasHighlights ? (
              <button
                type="button"
                onClick={onToggleOpen}
                aria-expanded={open}
                aria-controls={panelId}
                className="-my-[9px] inline-flex items-center gap-x-1.5 rounded-sm py-[9px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring print:pointer-events-none"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "role-caret text-muted-foreground print:hidden",
                    open && "is-open"
                  )}
                >
                  <ChevronRightIcon className="block size-3.5" strokeWidth={2} />
                </span>
                {company}
              </button>
            ) : (
              company
            )}
          </h3>
          <WorkPeriod location={location} start={start} end={end} />
        </div>

        <h4 className="text-base font-semibold text-balance text-foreground/80 print:text-[12px]">
          {title}
        </h4>
      </CardHeader>

      <p className="mt-2 max-w-[68ch] text-base text-foreground/80 print:mt-1 print:max-w-none print:text-[10px] text-pretty">
        {description}
      </p>

      <CardContent>
        {/* font-sans overrides CardContent's mono: bullets are prose, and the
            bolded figures only read as waypoints against an upright sans. */}
        <div className="max-w-[68ch] font-sans text-base text-foreground/80 print:max-w-none print:text-[10px] text-pretty">
          {hasHighlights && (
            <div
              id={panelId}
              inert={!open}
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
            className="tag-list flex-wrap gap-1"
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
  // Every role opens on first load so a skimming reader meets every bullet
  // without clicking; "Compact view" folds them.
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
        kicker="Experience"
        id="work-experience"
        action={
          expandableKeys.length > 0 ? (
            <button
              type="button"
              onClick={toggleAll}
              aria-expanded={allOpen}
              className="group relative before:absolute before:-inset-x-2 before:-inset-y-[13px] before:content-[''] inline-flex shrink-0 items-center gap-x-1.5 rounded-sm text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground transition-[color,transform] duration-150 ease-out motion-safe:active:scale-[0.96] hover:text-accent-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 print:hidden"
            >
              <span
                aria-hidden="true"
                className={cn("role-caret", allOpen && "is-open")}
              >
                <ChevronRightIcon className="block size-3" strokeWidth={2} />
              </span>
              {allOpen ? "Compact view" : "Expand all"}
            </button>
          ) : undefined
        }
      >
        Experience
      </SectionHeading>

      <p className="-mt-1 text-xs text-muted-foreground print:hidden">
        Select a tag to see every role that shares it.
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
          <span className="inline-flex items-center gap-x-2.5 text-xs font-semibold uppercase tracking-[0.06em] text-accent-brand">
            <span className="h-1 w-5 shrink-0 rounded-[1px] bg-accent-red" />
            {matchCount} {matchCount === 1 ? "role" : "roles"} &middot;{" "}
            {activeTag}
          </span>
          <button
            type="button"
            onClick={clear}
            className="link-wipe before:absolute before:-inset-x-2 before:-inset-y-[13px] before:content-[''] text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground transition-transform duration-150 ease-out motion-safe:active:scale-[0.96]"
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
