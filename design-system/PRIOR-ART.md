# Prior art

Directions already built and set aside. Both are real, working artifacts, not
sketches. Read these before proposing a new direction, so the proposal is a
step past them rather than a repeat of one.

Neither shipped. The live site carries nothing from either.

---

## 1. Record layout — the Wrapped register

`design-explorations/2026-08-20-record-layout/record-layout.html`
Open it in any browser; it carries its own fonts and makes zero network
requests. `THEME` toggles light and dark.

**The question it asked:** does the register of CM Wrapped 2026, a deck built as
a bit, survive being used on something that has to read as a resume?

**What it borrowed**

| From Wrapped | What it became |
|---|---|
| Paper ground, white plates | `#F4F3EF` ground; plates with a 1px ink edge at 2px radius. The live site is white on white, so nothing has an edge. |
| Ink act breaks | The five section dividers become full-bleed panels: red Fraunces numeral, condensed caps label, mono standfirst. |
| Ledger bars | "Portfolio, by brand" grows on scroll, sharpens to the pressmark on hover. |
| Barlow Semi Condensed | A fourth family, carrying plate strips and big numerals. Fraunces sprawls at that size. |
| Inverted plates | Two, one per half of the page, so the eye lands somewhere in a run of white rectangles. |
| Resting marks | A hollow square that fills red when open. Replaces the caret and doubles as the bullet. |

**Deliberately left out:** the fidelity-break chrome, the drag-to-rank game, the
plate shake, the `DECLASSIFIED` stamp. All work in a deck; none survive contact
with a document a hiring manager is scanning.

**The judgment calls worth keeping**, whatever direction comes next:

- **The ledger is derived, not authored.** Every bar is parsed from a chip the
  role already carries (`54 Boutiques`, `~142 Stores`), so the ledger and the
  resume cannot drift apart.
- **BATHHOUSE is excluded from the ledger** and footnoted as single-site work. A
  bar of one against a bar of a hundred and fifty is a rendering problem, not a
  fact, and padding it would mean editing data to suit a layout.
- **No platform ledger in Capabilities.** The honest derivation is lopsided:
  ServiceChannel across five brands, everything else at one.
- **Section numbers stayed**, against the house default that bans them, because
  the numbers are the record's filing order and the scroll rail navigates by
  them.
- **Motion reduced to one authored moment**: the ledger filling on scroll, once.
  The staggered fade-in on every section was dropped as a tic rather than a
  moment.

That last one is a direct critique of the live site and worth taking seriously.

**Cost if it ever ships:** three things go back into the app, in order — the
Barlow Semi Condensed woff2 files registered as `--font-barlow-cond`,
`record-metrics.ts` into `src/lib/`, and the `alt-route/` into `src/app/alt/`.
All three were working on 2026-08-20 and then reverted.

---

## 2. cmworks — the FMWorks-family comp

`design-system/prior-art/cmworks-fmw-comp/index.html`, with
`print-check.pdf` beside it. Copied in from `~/Projects/cmworks-fmw-comp/`,
which is outside this folder.

**The question it asked:** what does the live site's skeleton look like rebuilt
in the FMWorks visual language, rather than the shadcn palette it inherited?

Same one-column skeleton, same compact rows, employer left and meta right, same
hairline dividers. Skinned in Fraunces display, Geist body, JetBrains Mono meta,
blue for interaction, red pressmark for structure.

**Its five deliberate departures from FMWorks** are the same tensions this site
lives with, and it is worth seeing them stated as design decisions:

1. Narrow centered column, not an app shell with a nav rail.
2. Icon-free. Structure carried by rules, type, and whitespace.
3. Ruled rows, not cards. No `--bg-card`, no `--shadow-card`, no `--r-lg`.
4. Squared chips at 4px, not the system's pill `--r-full`.
5. Red promoted to a system: every section head and the footer, not just the
   masthead rule.

The live site has since converged on all five independently.

**Structural experiments it ran**, both still open questions:

- **Independent Consulting section omitted entirely.** Relevant to the dormant
  `projects` data described in `OPEN.md`.
- **Industrious written as a normal work record**, matching the pattern of the
  other entries rather than being set apart.

**Warning: its copy is stale.** That comp was built against an older content
state and its README documents four copy fixes plus several unresolved
tensions (`6 CMMS implementations`, a J.Crew figure mismatch, a title that
disagrees with the ATS baseline). The live `resume-data.ts` has since been
synced to the Alo canon and is correct. **Take the layout from this comp, never
the words.** `COPY.md` is the current text.

---

## What both told us

Neither was rejected for being bad. The live site's answer to "clean but
generic" was the signature pass: promote the red-pen marginalia rather than
change the skin or the register.

So the useful reading is not "these failed." It is that a **skin change**
(cmworks) and a **register change** (record layout) were both available and
neither was chosen. The chosen move was smaller and more personal. A new
direction should be judged against that standard: does it make the page more
specifically Cody's, or just more designed?
