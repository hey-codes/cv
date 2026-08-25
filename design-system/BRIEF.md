# codymitch.works — design brief

Read this first. `PATTERNS.md` has the mechanics, `tokens.css` has the values,
`COPY.md` has the words, `PRIOR-ART.md` has the directions already tried,
`OPEN.md` has what is actually unfinished. Screenshots of the current state are
in `shots/`.

---

## What this is

A one-page CV site for Cody Mitchell, a facilities manager with 13 years across
9 brands and 400+ locations. Live at codymitch.works. Next.js, TypeScript,
Tailwind, shadcn/ui, deployed on Vercel. Content lives in one file,
`src/data/resume-data.ts`; updating the site is a text edit and a deploy.

It is a **document**, not an app. No dashboard, no shell, no navigation chrome
beyond a scroll rail. It has to survive being printed, and it has to be readable
in about two minutes by someone who has fifty of these open.

## Who reads it

Recruiters and hiring managers in facilities and workplace operations, usually
on a desktop, usually while holding the PDF resume that links here. That second
part matters: **the site and the resume are read side by side**, so a
contradiction between them is visible immediately. It also means the page must
print cleanly, because someone will.

Not a developer audience. The GitHub link is there because it is his, not
because the readers care.

## Where it stands

v3 shipped 2026-08-20 as a deliberate re-launch, not an increment. A signature
pass landed on top of it the same day. **Treat v3 as the baseline**; it is not a
first draft waiting to be replaced.

Cody's own read of v3 before the signature pass was "clean but generic." The
signature pass was the answer to that, and it is the thing to build on.

---

## The three rules

These are settled. Work with them; do not quietly relax them.

### 1. Red-pen marginalia is the signature

Red italic annotations in Cody's voice, hung in the left gutter: `first FM hire,
globally`, `10 days to ramp`, `the receipts`. This is the one bold move on the
page, chosen over a work-order motif, an oversized editorial hero, and a career
route line.

**New identity ideas should extend the marginalia, not add a second signature.**
If an idea needs its own loud gesture to work, it is competing with this one and
one of them will lose.

### 2. Blue carries interaction. Red carries structure. Never crossed.

`--accent-brand` blue: links, company names, section eyebrows, carets on hover,
focus rings, active chips. If you can click it, it is blue.

`--accent-red` pressmark: section dashes, marginalia, the work-card edge rule,
the scroll spine, the footer rule. If it marks where something begins or belongs,
it is red.

A red focus ring or a blue section dash breaks the whole system. This is the
rule most likely to be violated by accident.

### 3. Three families, three jobs

**Fraunces** display only: the name, section titles, stat figures, marginalia.
**Geist Sans** prose only: summary, descriptions, bullets.
**JetBrains Mono** metadata only: dates, locations, chips, kickers, labels,
role titles.

Mono is doing real work here, not decoration. It is what makes a dense list of
dates and locations scannable. Using it for prose, or using Geist for a date,
is what made earlier versions look like every other developer CV template.

**Bold figures are scan waypoints.** `**$5.3M**`, `**54 locations**`,
`**10 days**` inside bullets are the reason the page can be read in two minutes.
The `parseLinks` helper supports `**bold**` and `[text](url)` in any content
string.

---

## What is fixed and what is open

**Fixed** (changing these is a decision, not a design tweak):

- The five sections and their order: Profile, Track record, Experience,
  Credentials, Capabilities. The scroll rail's `SECTIONS` array depends on the
  ids and numbering matching.
- The four stat-strip figures: 13 Years in FM, 400+ Locations, 3M+ Sq ft
  managed, $5.3M Managed spend. Same figures as the resume PDFs.
- The career facts in `resume-data.ts`. Every number was vetted during resume
  work. Rewriting copy for visual reasons breaks a chain of verification that
  lives outside this repo.
- Filtering dims, never hides. The page must keep its shape.
- Print must stay conservative: no marginalia, no motion, everything expanded.

**Open** (fair game, and wanted):

- Overall distinctiveness. The stated direction is **simple and refined, not
  louder**. More restraint deployed more precisely, not more effects.
- Density and rhythm. The page is long; the vertical rhythm between roles and
  sections has never been tuned deliberately.
- The header. It is the least designed part of the page and the first thing
  anyone sees.
- The stat strip's relationship to the header. Currently they stack; they have
  never been designed as one unit.
- Dark mode. It works, but it was derived from light rather than designed.
- The mobile top bar. Functional, plain.
- Anything the marginalia system could do that it does not do yet.

---

## Where things live

```
design-system/          this folder — the design documentation
  BRIEF.md              you are here
  PATTERNS.md           the eight patterns, with real values
  tokens.css            colors and type, standalone, no Tailwind needed
  COPY.md               every word on the page, as plain text
  PRIOR-ART.md          directions already explored and set aside
  OPEN.md               real defects and deferred work
  shots/                current state: 4 breakpoints × 2 themes, 4 states, print

src/data/resume-data.ts the only content file
src/app/globals.css     tokens + every custom pattern (the real source of truth)
src/app/components/     header, stat-strip, summary, career-highlights,
                        work-experience, education, skills
src/components/ui/      section-heading, section, scroll-nav, badge, card,
                        command, dialog, button
src/app/fonts/          self-hosted woff2: Fraunces, JetBrains Mono (Geist via npm)

design-explorations/    a self-contained HTML specimen, not wired to the site
```

## Ancestry

The tokens are a port of the **FMWorks design system**, Cody's FM software
design language. That system lives outside this folder at
`~/Projects/design-refs/FMWorks-Design-System/`, so it cannot be read from here
— everything needed is inlined in `tokens.css`, including the four deliberate
departures.

The short version: FMWorks is a wide app shell with a nav rail, Phosphor icons,
cards with shadow, and pill chips, and it confines the red pressmark to the
masthead. This site is a narrow document with none of that chrome, and it
promotes red to a system-wide structural mark.

## Working conventions

- **No em dashes.** Anywhere. Commas, parens, semicolons, or sentence breaks.
  This is a hard rule of Cody's and it applies to copy on the page.
- Never delete files. Move to an `archive/` folder or append `-ARCHIVE`.
- Kebab-case filenames, except proper nouns, brands, and acronyms.
- Explorations ship as self-contained HTML specimens under
  `design-explorations/YYYY-MM-DD-<name>/`, with the live app left untouched.
  A route left wired into the app is ambiguous about whether it shipped; a
  standalone file is unambiguously a specimen.
