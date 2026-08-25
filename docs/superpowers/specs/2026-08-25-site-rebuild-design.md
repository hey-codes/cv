# codymitch.works rebuild: design spec

Date: 2026-08-25
Status: **Approved design, parked.** Build does not start until the unblockers in section 2 are cleared.
Supersedes the open questions in `2026-08-25-site-rebuild-brief.md`; that file is the conversation record, this file is the decision record.

---

## 1. What this is

A ground-up rebuild of codymitch.works as a new project at `~/Projects/cmworks-v3`.

The existing repo `~/Projects/codymitch-works-cv` stays untouched and stays live for the entire build. Nothing switches over until the new site is reviewed and approved. Nothing is pushed to GitHub and nothing is deployed without explicit sign-off.

**Primary purpose:** get hired. Secondary: showcase a curated subset of side projects.

**Audience:** recruiters and hiring managers in facilities and workplace operations, usually on desktop, usually holding the PDF resume that links here. The site and the resume are read side by side, so a contradiction between them is visible immediately.

### The honest framing

This rebuild was roasted before it was approved, and the roast held up on several points. Recording that here so the plan does not quietly re-inflate:

- The live site shipped 2026-08-20 as a deliberate re-launch. Rebuilding it does not, by itself, change a hiring outcome.
- The previous rebuild attempt (`~/Projects/cmworks-v2`) was fully designed, never deployed, and died on three blockers: photos, a one-liner, and vendor OKs.
- Therefore this spec is sequenced behind real unblockers, cut to two pages, and stripped of speculative infrastructure.

---

## 2. Sequencing: unblockers first

The rebuild is **parked** until these are done, in this order:

| # | Unblocker | Definition of done |
|---|---|---|
| 1 | Desktop-Chrome half-render bug | Reproduced reliably, root cause identified, fixed on the **live** site and verified. See `design-system/OPEN.md`. |
| 2 | Industrious confidentiality check | The Industrious agreement re-read for any confidentiality clause covering location data. Answer recorded in writing. |
| 3 | Rebuild kickoff | Only after 1 and 2. Re-read this spec, then invoke writing-plans. |

Bug 1 is not optional polish. If the cause is Next 16 or React 19 rather than site code, a fresh Next 16 build inherits it, and that is worth knowing before paying for a rebuild.

---

## 3. Stack

- Next.js (App Router), TypeScript, Tailwind, shadcn/ui.
- Vercel as the eventual deploy target. **Not deployed, not pushed, until explicitly approved.**
- Rationale for shadcn/ui: components are files you own in your repo, which is what makes the design system portable if a second site ever exists.

---

## 4. Visual identity: Field Ledger shell, marginalia signature

Adopted from `~/Projects/cmworks-v2/DESIGN.md`, with two deliberate changes.

**Kept from Field Ledger:**
- Space Grotesk for display and body.
- IBM Plex Mono for data, labels, and metadata.
- Safety red `#FF3B2E` as the single accent, carrying structure (section marks, rules, emphasis), never decoration.
- Ledger structure and grid.

**Dropped from Field Ledger:**
- The cream paper ground `#FFFEF8` and the graph-paper texture.

**Carried over from the live v3 site:**
- **Red-pen marginalia is the signature.** Red Fraunces-italic annotations in Cody's voice, hung in the left gutter.

### Why marginalia comes along

Removing the paper removed Field Ledger's signature. Removing the marginalia would have removed v3's. Doing both leaves Space Grotesk plus a mono font plus a red accent, which is a generic developer portfolio and lands back on the "clean but generic" note that started all of this. The marginalia is the only signature element that has actually shipped and actually solved that problem, so it earns its place.

### Type rule

**Three families, three jobs, never mixed.** Space Grotesk for content, IBM Plex Mono for data only, Fraunces italic for marginalia only. A mono paragraph or a Grotesk stat block breaks the system. This rule is the reason the page reads in two minutes.

### Theme

Light and dark, following the visitor's system preference, with a manual toggle.

- Light ground: clean white.
- Dark ground: iron ink `#141A1F`.
- Safety red is the accent in both.
- Print always forces the light theme. The Home page must print cleanly as a resume.

Every color and size lives in one token file. That file is the portable artifact.

---

## 5. Content architecture

Two sources, deliberately separated.

### 5a. Career facts: career-hub stays canonical

`~/Projects/career-hub/source-of-truth/*.yaml` is the single true copy of every career fact: `profile.yaml`, `timeline.yaml`, `achievements.yaml`, `canonical-numbers.yaml`, `skills-taxonomy.yaml`.

A sync script reads those files and writes a **generated** file into the site.

- The generated file is never hand-edited.
- The admin panel shows career facts read-only.
- This is what guarantees the site and the PDF resume cannot drift apart.

Accepted cost: changing a job title is a career-hub edit plus a sync, not a click. Those facts change roughly never; the drift risk is the thing that actually bites in an interview.

### 5b. Site content: markdown and YAML in the repo

A `content/` folder holds everything site-specific: projects, page copy, marginalia text. Plain markdown and YAML, portable, local-first.

### 5c. Admin panel

Sveltia CMS, **local mode only**.

- One config file plus a dev command. Opens a form-based panel at localhost.
- Writes directly to local files. No accounts, no internet, no GitHub, nothing leaves the machine.
- Hosted mode at `/admin` is explicitly **out of scope** and stays out until GitHub publishing is approved.

Accepted cost: Cody edits content through Claude on every other project he owns, so the panel may go unused. It is cheap enough to keep for the days a form is preferable to a terminal.

---

## 6. Pages

**Two pages. That is the whole site.**

### Home

The full hiring pitch on one scrolling page. Prints clean as a resume.

Sections: intro, stat strip (13 / 400+ / 3M+ / $5.3M), **metro map**, experience, skills, contact.

**Metro map:** a compact map of the 47 metros, sitting near the stat strip. Constraints that keep it honest:
- Metro level only. No individual sites, no addresses, no way to tie a brand to a location.
- Must survive being printed.
- Must work at phone width.
- Simple by design. Complexity here is what killed cmworks-v2.

Data source: the metro list already exists. `~/Projects/cmworks-v2/data/*.json` plus `scripts/generate-career-data.py` produced 405 locations, 9 brands, and 47 metros. Port the **aggregated metro output only**; the per-location data does not come across, per section 7.

### Projects

A curated subset of side projects, each with a detail page.

**v1 ships with a Lorem Ipsum placeholder project.** The page structure gets built and proven; real project content is written later. The Projects page must not go public with placeholder text still in it.

---

## 7. Confidentiality rule

Publishable: aggregate figures (13 years, 400+ locations, 9 brands, 47 metros, $5.3M) and a metro-level map.

Not publishable: addresses, individual site identifiers, or any pairing of a brand to a specific location. This covers the Industrious engagement (1099, 2026-04-01 to 2026-08-14) and carries forward the metro-level privacy rule already written in cmworks-v2.

Open action: re-read the Industrious agreement for a confidentiality clause before the map ships. See section 2.

---

## 8. Explicitly cut

Recorded so they do not creep back in without a decision.

| Cut | Reason |
|---|---|
| Atlas as its own page | Scope. The metro map lives on Home instead. |
| Writing page | No posts exist. Empty sections read worse than absent ones. |
| Photos page | No photos chosen. This blocker already killed cmworks-v2 once. |
| Starter template repo | No second site exists. Design system stays in its own folder, which is enough. |
| Personal server ingest door | Server data is "nothing yet." Building a schema and script for data that does not exist is padding. |
| Hosted admin panel at /admin | Requires GitHub publishing, which is deferred. |
| GitHub push and Vercel deploy | Explicitly declined by Cody. Local only until approved. |

Each of these becomes its own small project later, and only starts once its blocker is already cleared.

---

## 9. Testing

Light and practical.

- Automated tests on the career-hub sync script. It must never silently drop a fact.
- Automated tests on content validation. A malformed project file fails loudly rather than rendering blank.
- Smoke tests that each route loads in both themes.
- Print output checked by hand.
- Browser screenshots reviewed at each milestone.

---

## 10. Repo layout intent

Not a template, but organized so the portable parts are separable if a second site ever happens:

- design tokens and the design system in their own folder
- CMS config in its own folder
- the career-hub sync script in its own folder
- `content/` for site content

---

## 11. Open items

1. Real project content for the Projects page (currently placeholder).
2. Marginalia copy for the new pages.
3. Industrious agreement review (section 2, blocker 2).
4. Whether `~/Projects/cmworks-v2` gets archived once this ships, since both repos currently claim the same domain.
5. Final confirmation of the project folder name `cmworks-v3`.

---

## 12. Next step

Do **not** invoke writing-plans yet. The next action is unblocker 1: the desktop-Chrome half-render bug, on the live site, via systematic debugging.
