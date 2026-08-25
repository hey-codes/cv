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

---

## Update 2026-08-25: defect 2 root cause found

**Mechanism confirmed. The leading suspect in the note above was correct, and the trigger is now known.**

`.animate-fade-in` uses `animation: fadeIn 400ms ease-out both`. Chrome does not
advance the document animation timeline for a tab that has never been rendered.
Measured on the live site in Chrome 151.0.7922.174:

| | Observed |
|---|---|
| Layout | Correct. `document.scrollHeight` 3734, `main` 3734. Nothing is clipped. |
| Content | Present. 164 KB of real DOM, every section, every fact. |
| Console | Silent. No errors, no warnings, no exceptions. |
| fadeIn animations | All 7 report `playState: "running"` with `currentTime: 84ms`, **frozen**. Still 84ms after waiting 2500ms. |
| Resulting opacity | `0.32, 0.18, 0.04, 0, 0, 0, 0` against delays `0, 40, 75, 150, 225, 300, 375ms`. |

With `animation-fill-mode: both`, an element is pinned to the animation's value at
the current timeline position. Frozen at 84ms, the four blocks whose delay exceeds
84ms are pinned to the `from` keyframe, which is `opacity: 0`. The first three are
pinned mid-fade, which is why the header and stat strip render ghost-grey rather
than black.

**This is exactly the reported symptom: the page stops about halfway down.** It is
not a layout bug, not a clipping bug, and not a hydration bug. The content is
present, laid out, and permanently invisible.

### Screenshot evidence

Captured with `visibilityState: "hidden"`: header, stat strip, and scroll rail all
render at ghost-grey partial opacity; sections 02 through 05 are entirely blank
white. Matches Cody's description precisely.

### What is NOT yet proven

The repro above was in a tab that stayed `visibilityState: "hidden"` throughout.
**It has not been proven that the frozen state persists once a tab actually becomes
visible.** Normally the timeline resumes on visibility and the fade completes.

The open question is which real-world path reaches a permanently frozen timeline.
Candidates worth testing, in order of likelihood:

1. Cmd-click or middle-click a link so the page loads in a background tab, then
   switch to it. This is a common way to open a portfolio link.
2. Chrome session restore on browser launch.
3. Chrome omnibox prerender, where the page loads in a prerendered hidden state.
4. Chrome Memory Saver discarding and reloading the tab.

Cody should run test 1 in his own Chrome, since it needs a real foreground switch.

### Why this is worth fixing regardless of which path triggers it

Content visibility is currently gated on an animation clock advancing. Any cause of
a stalled or non-advancing timeline, in any browser, now or later, renders the page
blank with no error. That is a fragile pattern independent of this specific Chrome
behavior.

### Correction to the record

An earlier pass in this session measured `main` at height 0 and concluded the layout
had collapsed. **That measurement was an artifact of the tab never having been
painted, and is wrong.** Once the tab was forced to render, `main` measured 3734px.
Recorded so nobody re-chases a layout collapse that does not exist.

### Fix applied 2026-08-25 (branch `fix/fade-in-frozen-timeline`, not merged, not pushed)

**Attempt 1 failed and is recorded so nobody retries it.** Moving from
`animation` to `transition` with `@starting-style` did **not** work. CSS
transitions run on the same frozen document timeline as animations. Measured
`opacity:running@133`, stuck, with opacities `0.489, 0.355, 0.23, 0, 0, 0, 0`.
Four blocks still invisible. Better than before, still broken.

**Attempt 2 works.** The rule is now:

    .animate-fade-in {
      opacity: 1;
      translate: 0 0;
      transition: translate 400ms ease-out;
    }
    @starting-style {
      .animate-fade-in { translate: 0 6px; }
    }

`opacity` is never driven by the timeline. Only `translate` moves. A frozen
timeline now means text sits 6px from its final position at full opacity, which
is imperceptible and completely readable.

`page.tsx` changed 7 inline `animationDelay` values to `transitionDelay`
(0, 40, 75, 150, 225, 300, 375ms). The stagger is unchanged.

**Do not reintroduce opacity into this rule.** That is the entire defect.

### Verification

Test harness: a Chrome tab that never becomes visible reproduces the frozen
timeline deterministically, which makes this testable without waiting on a
real-world trigger.

| | Before | After |
|---|---|---|
| Opacities | `0.199, 0.042, 0, 0, 0, 0, 0` | `1, 1, 1, 1, 1, 1, 1` |
| Fully invisible blocks | 5 of 7 | 0 of 7 |
| Timeline frozen | yes | **yes, still** |
| Page renders | ghost top, blank below | full page |

The timeline is still frozen after the fix. That is the point: the failure
condition is unchanged and the symptom is gone, which is what distinguishes a
root-cause fix from one that merely avoids the trigger.

Also checked: production build succeeds; `@starting-style` survives
minification and ships as `@starting-style{.animate-fade-in{translate:0 6px}}`;
Biome clean across 37 files; `tsc --noEmit` clean; all five sections present in
the production render.

### Still open after this fix

1. **Never confirmed in a foreground tab.** Every repro ran in a permanently
   hidden tab. It is still unproven which real-world path (background tab,
   session restore, prerender, Memory Saver) reaches a frozen timeline that
   survives becoming visible. The fix is correct regardless, but the original
   trigger remains unidentified.
2. **`@keyframes fadeIn` at globals.css:96 is now dead.** Left in place
   deliberately: one change at a time. Remove in a separate pass. It is a trap,
   since reusing it reintroduces the bug.
3. **The class name `.animate-fade-in` is now a misnomer.** Nothing fades. Rename
   in the same pass that removes the dead keyframe.
4. Print and reduced-motion were verified by reading the shipped CSS
   (`opacity:1!important` in both), not by rendering. Worth a real print check.
