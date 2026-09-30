# codymitch.works

One-page CV site for Cody Mitchell. Next.js, TypeScript, Tailwind, shadcn/ui,
deployed on Vercel. It is a document, not an app: it has to be readable in about
two minutes and it has to print cleanly.

v3 shipped 2026-08-20 as a deliberate re-launch. **Treat it as the baseline**,
not a draft waiting to be replaced.

## Read first

Design work starts in `design-system/`:

| File | What |
|---|---|
| `BRIEF.md` | What this is, who reads it, what is fixed and what is open |
| `PATTERNS.md` | The eight patterns, with real values from source |
| `tokens.css` | Colors and type, standalone, no Tailwind needed |
| `COPY.md` | Every word on the page, generated from the data file |
| `PRIOR-ART.md` | Directions already built and set aside |
| `OPEN.md` | Real defects, dead code, and what is merely unpolished |
| `shots/` | Current state: 4 breakpoints × 2 themes, 4 states, print |

## Design rules

Three rules the whole page runs on. Do not quietly relax them.

1. **Red-pen marginalia is the signature.** Red Fraunces-italic annotations in
   Cody's voice, hung in the left gutter. New identity ideas extend this system;
   they do not add a second signature to compete with it.
2. **Blue carries interaction. Red carries structure. Never crossed.** If you can
   click it, it is `--accent-brand` blue. If it marks where something begins, it
   is `--accent-red`. A red focus ring or a blue section dash breaks the system.
3. **Three families, three jobs.** Fraunces for display, Geist for prose,
   JetBrains Mono for metadata only. Bold figures inside prose are scan
   waypoints, and they are why the page reads in two minutes.

Trap: `--accent` is a hover surface, not the brand hue. The brand hue is
`--accent-brand`. This is the easiest thing here to get wrong.

## Identity lock (Cody, 2026-09-28)

"Never change these, in this task or later." They are deliberate design choices,
not defects. If a fix seems to need one changed, stop and ask Cody.

- **Dual accent:** bright blue (interactive, active, data) plus red (structure:
  rules, section dashes, progress, card hover bar). No steel blue anywhere.
  Contrast fixes darken the shade within the hue (#0070E0 light, #4DA3FF dark).
- **JetBrains Mono is the voice:** nav, numbered section labels, stat labels, job
  titles, meta lines, tags. Geist for reading paragraphs. Fraunces for display.
- **The 01 to 05 numbering** in the nav, the side rail, and the section labels.
- **The LinkedIn chip and GitHub icon style** from the original header.
- **Capabilities as chips.**
- **No shadcn/ui default styling** on controls; every control is styled from the
  site's own tokens.

The roast-fixes pass (2026-09-28) broke all of these and was reverted on branch
`restore-identity`.

## Do not touch

- **`src/data/resume-data.ts` career facts.** Every number was vetted against
  sources outside this repo during resume work, and the site is read side by
  side with the PDF resume. Never rewrite a fact for visual reasons.
- **The four stat-strip figures** (13 / 400+ / 2.9M+ / $5.3M) and the five section
  names and their order. The scroll rail depends on the numbering.
- **The live app, when exploring.** Explorations ship as a self-contained HTML
  specimen under `design-explorations/YYYY-MM-DD-<name>/` with the app reverted.
  A route left wired in is ambiguous about whether it shipped.

## House rules

- **No em dashes anywhere**, including page copy. Commas, parens, semicolons, or
  sentence breaks.
- **Never delete files.** Move to `archive/` or append `-ARCHIVE` to the name.
- Kebab-case filenames, except proper nouns, brands, and acronyms.

## Running it

```sh
./node_modules/.bin/next dev     # pnpm is not on PATH in non-login shells
```

Content is one file: `src/data/resume-data.ts`. Tokens and every custom pattern
are in `src/app/globals.css`, which is the real source of truth for styling.

## Known open

The desktop-Chrome half-render bug is unreproduced and parked for its own
session. Do not start by changing code. Details and the leading suspect are in
`design-system/OPEN.md`.
