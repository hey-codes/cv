# Open

What is actually unfinished, versus what is deliberately settled. Written
2026-08-20, after a full capture pass across four breakpoints, both themes, and
print.

**Shipped-but-imperfect is the intended state of v3.** Cody's framing at launch
was that getting it out mattered more than getting it perfect. Leftover rough
edges are not regressions and not evidence the launch was premature. The list
below separates the real defects from the merely unpolished.

---

## Verified this pass

Mobile and print had never been visually checked since the v3 launch, because
the browser tooling in that session could not resize the window. Both were
captured properly this time.

| | Result |
|---|---|
| 390px, light and dark | **Good.** Marginalia folds correctly to red mono overlines. Chips wrap, no overflow, type legible. |
| 768px, 1280px | **Good.** 1280 shows the folded marginalia form, 1512 shows the gutter form. |
| Print | **Good.** 3 pages, all role panels expanded, marginalia hidden, chips intact, no clipped content. One defect below. |
| Full-page render, Chromium | **Full 3760px renders.** No truncation. |

Two suspicions I had going in turned out to be wrong, and are recorded so nobody
re-chases them: the `overflow: auto` on `<main>` does **not** clip the gutter
marginalia (measured `leftOfMain: 128px`, well inside the box), and `main` does
not scroll internally (`scrollWidth === clientWidth === 1400`).

---

## Real defects

### 1. Printed page has no LinkedIn or GitHub

`PrintContact` only ever renders `personalWebsiteUrl`, `contact.email`, and
`contact.tel`. The data has none of the last two, and the social links live in
a separate icon-only list that is `print:hidden`. **A printed copy gives a
reader no way to reach him** beyond the site URL.

Compounding it: the `/` separator after the website is rendered unconditionally,
so the line prints as `codymitch.works /` with a dangling slash and nothing
after it. Visible on page 1 of `shots/print.pdf`.

`src/app/components/header.tsx`, `PrintContact`.

### 2. Chrome stops rendering about halfway down

Reported by Cody 2026-08-20 immediately after the signature-pass deploy: on
desktop Chrome the live page stops displaying roughly halfway through. Comet and
mobile show the full page. **Still not reproduced.** Headless Chromium renders
the full 3760px here, which means it is likely Chrome-version or extension
specific rather than a layout bug.

Leading suspect, unchanged: `.animate-fade-in` uses `animation-fill-mode: both`,
which holds every section at `opacity: 0` until its animation runs. If the
animation never starts, the content is present in the DOM and invisible. That
failure mode matches the symptom exactly, including why a screenshot tool sees
nothing wrong.

Deliberately parked for its own session. Start with a repro on the live URL in
Cody's own Chrome, with his Chrome version and where exactly it cuts off. Do not
start by changing code.

### 3. Content drift against the resumes

`src/data/resume-data.ts` and the tailored resumes in career-hub hold the same
career facts with no link between them, and have drifted before. Cody lists the
site on his resumes, so a recruiter holding both sees any contradiction
directly.

The site was synced to the Alo Yoga canon on 2026-08-20, so it is currently
correct. It will drift again the next time a resume is tailored. **Design work
should not touch these facts at all.**

---

## Dead code

`RESUME_DATA.projects` carries 5 entries and
`src/app/components/projects.tsx` renders them in 198 lines, but the component
is never imported into `src/app/page.tsx`. None of it appears on the live page.

It is a real decision waiting to be made, not an oversight to clean up silently:
either the consulting work earns a sixth section or the data and component get
archived. Listed in `COPY.md` so the content is visible either way.

---

## Unpolished, not broken

The wanted direction is **simple and refined, not louder**.

- **Marginalia asymmetry.** Only 2 of 5 sections carry a note (`the short
  version` on About, `the receipts` on Career Highlights). Experience,
  Education, and Skills have none. Every work role has one. This is the
  signature system, and it is applied unevenly.
- **The header.** Least designed part of the page, first thing anyone sees.
- **Header and stat strip.** They stack but were never designed as one unit.
- **Dark mode.** Derived from light rather than designed. It works.
- **Vertical rhythm.** Spacing between roles and sections was never tuned
  deliberately; it is whatever the component defaults produced.
- **Mobile top bar.** Functional and plain.

## A naming trap

`--accent` is a **hover surface**, not the brand hue. The brand hue is
`--accent-brand`. This comes from shadcn/ui and it is the single easiest thing
in this codebase to get wrong. Using `--accent` expecting blue produces a
near-invisible grey.
