# cmworks - FMWorks-family design comp

An alternative visual direction for **codymitch.works**, for review only. Nothing here
is wired to the live site or to `~/Projects/cmworks-v2`.

## What this is

The live site's skeleton (one narrow centered column, compact rows, employer left /
meta right, hairline dividers between sections) rebuilt in the FMWorks visual
language: Fraunces display, Geist body, JetBrains Mono meta and labels, blue accent
for interaction, red pressmark for structure.

Design system reference: `~/Projects/design-refs/FMWorks-Design-System/`
(`BRAND.md` is normative; tokens ported from `colors_and_type.css`).

## Deliberate departures from FMWorks

FMWorks is a wide desktop app shell. This is a document, so it breaks from the system
in five visible ways:

1. **Narrow centered column**, not an app shell with a navigation rail.
2. **Icon-free.** FMWorks leans on Phosphor line icons; structure here is carried by
   rules, type, and whitespace.
3. **Ruled rows, not cards.** No `--bg-card`, no `--shadow-card`, no `--r-lg`.
4. **Squared chips** at 4px radius rather than the system's `--r-full` pills.
5. **Red promoted to a system.** FMWorks confines the pressmark to the masthead rule;
   here it marks every section head and the footer, while blue stays purely interactive.

## Copy

Verbatim from the live site, with four changes:

| Change | From | To | Source |
|---|---|---|---|
| Years of experience | `12+ years` | `13 years` | `cn-career-years` |
| Career locations | `350+ locations` | `400+ locations` | `cn-career-locations` |
| Bathhouse location | `Denver, CO` | `New York, NY` | ATS baseline 2026-08-19 |
| Bathhouse title | `Facilities Operations Manager` | `Facilities & Operations Manager` | ATS baseline 2026-08-19 |

Plus two structural changes requested for this comp:

- **Independent Consulting section omitted.**
- **Industrious added** as the most recent work-experience record, written to match the
  pattern of the other entries. Figures (48 locations, 5 districts, FEXA) come from the
  `cmworks-v2` resume, which was built from canonical sources.

Known copy tensions left alone, since copy was meant to stay as-is:

- The About sector list does not mention flex-office, though Industrious is now listed.
- `6 CMMS implementations` conflicts with the 2026-08-19 canonical reframe
  ("3 net-new, hands-on across 5 systems").
- J.Crew reads `148 Stores` in the chips and `150+ stores` in a bullet.
- The Industrious title here is `Facilities Operations Consultant, West Coast Portfolio`;
  the ATS baseline says `Facilities Consultant, West Coast Portfolio`.

## Build

`index.html` is generated. Edit `src.html`, then:

```sh
python3 build.py
```

That base64-inlines the six woff2 faces from `fonts/` so the page is a single
self-contained file with zero external requests, and opens straight from disk.

## Verified

- Desktop 1440 and mobile 390 in Chromium, no horizontal overflow, no console errors.
- Print rendered via headless Chrome to `print-check.pdf` (4 pages, headings stay with
  their records, chips render as outlined mono).
- Output is pure ASCII, so it survives being served without a charset header.
- Ctrl+J / Cmd+J command menu: filter, arrow keys, Enter to jump, Escape to close.
