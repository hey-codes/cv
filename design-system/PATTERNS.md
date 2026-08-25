# Patterns

The eight things that make this page look like itself. Every value here was read
out of the source, not remembered. Source of truth is in the right column; if a
value here disagrees with the code, the code wins and this file is stale.

Read `BRIEF.md` first for the rules these patterns obey.

---

## 1. Red-pen marginalia

**The signature.** Annotations in Cody's voice hung in the left gutter beside a
role or a section title: `first FM hire, globally`, `the receipts`, `10 days to
ramp`. This is the one bold move on the page. Everything else stays restrained
so this reads.

| | |
|---|---|
| Type | Fraunces italic, 13.5px, `leading-snug`, `text-wrap: balance` |
| Color | `--accent-red` |
| Gutter form | `≥1440px`: absolute, `right: calc(100% + 1.5rem)`, width `9.5rem`, right-aligned |
| Folded form | `<1440px`: inline above the company name as red mono uppercase, 9px, bold, `0.16em` tracking, `leading-none` |
| Print | Hidden. Paper stays conservative. |
| A11y | `aria-hidden="true"`, `pointer-events: none`, `select-none`. Decorative by design. |
| Source | `.role-note` in `src/app/globals.css`; `note` prop on `SectionHeading` and each `work` entry |

Every role carries one. They are written as fragments, lowercase, no terminal
punctuation. They comment on the record, they do not summarize it.

**Extending the design means extending this.** A new identity idea should become
a new `note`, not a second signature move competing with it.

---

## 2. Numbered section heading

The masthead pattern, repeated five times. A red pressmark dash, a mono eyebrow
in blue carrying a running number, then the Fraunces title.

```
▬  01 · PROFILE
About
```

| | |
|---|---|
| Dash | `h-1 w-5`, `rounded-[1px]`, `background: --accent-red` |
| Eyebrow | JetBrains Mono, 10.5px, bold, uppercase, `0.14em` tracking, `--accent-brand`, 9px in print |
| Title | Fraunces bold, 22px |
| Gap | `gap-x-2.5` between dash and eyebrow |
| Source | `src/components/ui/section-heading.tsx` |

The five sections and their kickers are fixed, and the scroll rail depends on
them matching: `01 · Profile`, `02 · Track record`, `03 · Experience`,
`04 · Credentials`, `05 · Capabilities` (`SECTIONS` in `scroll-nav.tsx`).

The eyebrow is `aria-hidden` and should add information rather than repeat the
title. `Track record` over `Career Highlights`, not `Career Highlights` twice.

---

## 3. Work card hover

The interaction that tells you a role is a record you can open.

| | |
|---|---|
| Lift | `translateY(-1px)` |
| Ground | `--bg-soft` |
| Edge rule | 2px bar at `left: 0.25rem`, inset `0.35rem` top and bottom, `--accent-red`, animates `opacity 0→1` and `scaleY(0.4→1)` from the top |
| Timing | 110ms lift and ground, 170ms edge rule, all `cubic-bezier(0.22, 1, 0.36, 1)` |
| Trigger | `:hover` and `:focus-within`, so keyboard gets it too |
| Print | Edge rule and negative margins removed |
| Source | `.work-card` in `globals.css` |

The edge rule is red because it is structure (this is a record boundary), not
interaction. The caret inside the card turns blue on the same hover, because
that IS interaction. That split is the whole system in one component.

---

### Role record anatomy

The order inside one `.work-card`, top to bottom:

```
first FM hire, globally          <- marginalia (gutter ≥1440, folded above <1440)
▸ BALENCIAGA        New York, NY · 2022 - 2023
Facilities Manager, Americas
Inherited a fragmented FM operation and rebuilt it...
  • Deployed ServiceChannel across 54 locations...     <- panel, collapsible
[Luxury Retail] [54 Boutiques] [3 Direct Reports]      <- chips, always visible
```

| Line | Type |
|---|---|
| Company | 18px semibold, `--accent-brand`, bold italic, `leading-none` |
| Period | JetBrains Mono 14px, `tabular-nums`, `--muted-foreground`, right-aligned on `sm+` |
| Title | JetBrains Mono 14px semibold, `leading-none` |
| Description | Geist 14px, `foreground/80`, `text-pretty` |

The whole header is a click-through toggle region with two interactive islands
punched out of it: the company link and the chips. Chips and bullets sit outside
the toggle so tapping a chip filters instead of collapsing the role.

---

## 4. Collapsible role panel

Highlights hide until asked for, so the page scans in about two minutes and
still holds the detail.

| | |
|---|---|
| Mechanism | `grid-template-rows: 0fr → 1fr` on `.role-panel`, `overflow: hidden` on the inner |
| Why not max-height | `0fr→1fr` animates to the content's real height; `max-height` guesswork cannot |
| Timing | 200ms `cubic-bezier(0.22, 1, 0.36, 1)` |
| Caret | `.role-caret` rotates 90°, turns `--accent-brand` on card hover |
| Default open | `defaultOpen: true` on Industrious, Balenciaga, FENDI |
| Bulk control | `Expand all` / `Collapse all` on the section heading's `action` slot |
| Print | `display: block !important`, `grid-template-rows: none`. An `fr` row resolved to 0px in print and painted bullets over the chips below. |

---

## 5. Chips as filters

Every chip is a button. Tapping one dims every role that does not carry it.

| | |
|---|---|
| Type | JetBrains Mono, 12px, semibold, `rounded-md` |
| Rest | `--secondary` ground |
| Active | `--accent-strong` ground, `--accent-ink` text |
| Non-match | `.work-card--dimmed`, `opacity: 0.45`, 170ms; returns to 1 on hover or focus |
| Touch | `padding-block: 0.3rem` added under `(pointer: coarse)`, look unchanged |
| Matching | Splits on `->` and parentheses, never on commas (that would tear `35,000 sq. ft.` in half). Symmetric: `FEXA` reaches `Limble -> FEXA` and back. |
| Source | `badgeSegments` / `badgeMatches` in `work-experience.tsx`, `.chip` in `globals.css` |

**Filtering never hides a role.** Non-matches recede so the page keeps its shape
and nothing disappears from a reader or from print. That is a deliberate call,
not an unfinished one.

---

## 6. Scroll rail

Position indicator in two shapes, one scroll handler.

| | |
|---|---|
| Desktop `≥1280px` | Fixed rail, `left-6`, vertically centered. Grey track, red `--accent-red` spine fills with progress, active tick scales to `1.25` |
| Below that | Sticky top bar of five numbered segments with the same fill, `bg-background/90` with backdrop blur |
| Mechanism | Single rAF-throttled scroll listener drives both; spine is `transform: scaleY`, never height, because it updates every frame |
| Active section | Computed as the last heading past the read line, not observed, so hash landings resolve correctly |
| Reduced motion | Transitions off, `scroll-behavior: auto` |
| Print | Hidden |

---

## 7. Stat strip

Four figures under the header, counting up once on load.

| | |
|---|---|
| Figures | 13 Years in FM · 400+ Locations · 3M+ Sq ft managed · $5.3M Managed spend |
| Figure type | Fraunces bold, 28px, `leading-none`, `tabular-nums lining-nums` |
| Label type | JetBrains Mono, 9.5px, semibold, uppercase, `0.14em` tracking, `--muted-foreground` |
| Count-up | 900ms, ease-out cubic (`1 - (1-t)³`), rAF |
| Reduced motion | Lands on the final value immediately |

**These four numbers are canon.** They are the same figures the resume PDFs
carry. Changing one here without changing it there creates exactly the drift
described in `OPEN.md`.

---

## 8. Link wipe

| | |
|---|---|
| Rest | No underline |
| Hover / focus | 1px `currentColor` underline at `bottom: -2px`, `scaleX(0→1)` from the left, 110ms |
| Company names | `--accent-brand`, bold italic, uppercase in the data |
| Focus ring | Always `--accent-brand`, 2px, 2px offset. Never the pressmark red. |
| Print | Removed |

---

## Motion inventory

Everything on this page is a response to input. Nothing animates on its own
except the one-time entry fade and the stat count-up.

| Motion | Duration | Curve |
|---|---|---|
| Entry fade (`.animate-fade-in`) | 400ms, `both` | `ease-out` |
| Stat count-up | 900ms | ease-out cubic |
| Hover ground, lift, chips, links | 110ms | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Edge rule, dim, caret, rail | 170ms | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Role panel | 200ms | `cubic-bezier(0.22, 1, 0.36, 1)` |

All of it is disabled under `prefers-reduced-motion` and in print. That is
enforced in `globals.css` with explicit blocks, not left to chance.

Note: `.animate-fade-in` uses `animation-fill-mode: both`, which holds sections
at `opacity: 0` until the animation runs. See `OPEN.md` — this is the leading
suspect in the Chrome rendering bug.
