# codymitch.works ground-up rebuild: brainstorming handoff brief

Date: 2026-08-25. Status: brainstorming in progress (superpowers:brainstorming, architectural path). Step 1 (explore context) done, step 3 (clarifying questions) started. Next session should resume at step 3.

## Ground rules for this conversation
- Cody knows web basics, not much more. Keep every question simple, plain language, one idea per question, multi-choice with 3-5 options and a final "Other / let me describe".
- Questions should ramp: start at "what is this for" and climb toward "how do we build it". No jargon without a one-line plain-English gloss.
- Do not write code, scaffold, or pick a stack until Cody approves a design. Hard gate.
- Global CLAUDE.md rules apply (no em dashes, never delete, kebab-case).

## Facts from repo scan
- Live site `~/Projects/codymitch-works-cv` (GitHub hey-codes/cv, domain codymitch.works): Next.js 16, React 19, TS, Tailwind 3.4, shadcn/ui, Biome, self-hosted fonts (Fraunces, Geist, JetBrains Mono). Content in one file `src/data/resume-data.ts`. Vercel hosting, no vercel.json, no GitHub workflows, @vercel/analytics. One-page CV: cmdk command menu, scroll rail, stat strip, projects/skills/education, dark/light, print layout, OG image, sitemap, structured data. Design notes in `design-system/` (red marginalia signature; blue = interaction, red = structure). Open bug: desktop Chrome half-render (`design-system/OPEN.md`).
- Parked concept `~/Projects/cmworks-v2` (never deployed, no remote): plain HTML, six pages (Home, Atlas, Resume, Photos, Projects, Contact), "Field Ledger" identity in `DESIGN.md`, `PRODUCT.md`, `HANDOFF.md`. Data: `data/*.json` -> `scripts/generate-career-data.py` -> 405 locations, 9 brands, 47 metros. Rules: verified figures only, zero runtime external requests, metro-level privacy for Industrious.
- Career source of truth lives in `~/Projects/career-hub/` (resumes, YAML).

## Cody's answers so far
1. Purpose: get hired first; also showcase a curated subset of side projects (not all).
2. Editing: web admin panel (not editing files by hand).
3. Personal server: feeds the site occasionally (build-time data). Site must work when the server is off. Server stays separate.
4. Reuse goals (all four): starter template repo, shared design system (shadcn + tokens), shared content pipeline (same content -> site approach), same hosting recipe (Vercel/GitHub).

## Early hypothesis to pressure-test (not approved)
"Admin panel" + "works when server is off" + "shared content pipeline" suggests a git-backed CMS (admin UI writes markdown/YAML into the GitHub repo; Vercel rebuilds). Alternatives to present with trade-offs: hosted headless CMS (Sanity, Payload Cloud) vs. self-hosted CMS on the personal server (breaks the "works when server is off" rule unless cached at build). Ask this as the next question.

## Remaining questions to ramp through (suggested order)
1. CMS shape (above).
2. Pages/sections: which of Home, Resume, Projects, Atlas/map, Photos, Writing, Contact make the cut for v1.
3. Design direction: keep the v3 red-marginalia identity, adopt the Field Ledger identity, or fresh.
4. Data: does the site read career-hub YAML directly, or does the CMS become the new source of truth (risk: two sources).
5. Server integration: what data the server sends (examples), push vs. pull, auth.
6. Multi-project layout: monorepo with packages (ui, content, config) vs. template repo cloned per project.
7. Non-goals for v1.

Then: propose 2-3 approaches, present design in sections, write spec to `docs/superpowers/specs/2026-08-25-site-rebuild-design.md`, then writing-plans.

## Answers, round 2 (2026-08-25, Opus session)
5. CMS shape: **git-backed CMS**. Admin panel at /admin, GitHub login, Save writes markdown/YAML into the repo, Vercel rebuilds. No third-party content host. Reusable in every future project.
6. Pages for v1: **full site** = Home, Projects, Atlas (map), Writing, Photos. Cody chose the largest option. Claude flagged the empty-section risk and will propose designing all five but shipping in waves (Home + Projects first). Not yet resolved.
7. Visual identity: **Field Ledger from cmworks-v2, minus the paper theme.** Keep Space Grotesk (display/body), IBM Plex Mono (data/labels), safety-red #FF3B2E as the single accent, ledger structure. Drop cream #FFFEF8 and the graph-paper texture.
8. Ground: **light + dark with a toggle, following system preference.** Light = clean white, dark = iron ink #141A1F. Safety red in both. Print always forces light. Every token defined twice.
9. Career facts: **career-hub stays canonical.** `~/Projects/career-hub/source-of-truth/*.yaml` (profile, timeline, achievements, canonical-numbers, skills-taxonomy) is the one true copy; a sync script pulls into the site at build. Admin panel edits site-only content (projects, writing, photos, page copy); career facts are read-only there.

## Still to ask
- Server integration: what the personal server actually sends, push vs pull, auth.
- Multi-project layout: monorepo with shared packages vs template repo cloned per project.
- Non-goals for v1.
