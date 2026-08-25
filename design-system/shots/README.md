# Shots

Current state of the live design, captured 2026-08-20 from a local dev server
with Playwright (headless Chromium 151), `deviceScaleFactor: 2`, CSS animations
finished before capture.

This is v3 plus the signature pass, which is the baseline to design against.

## Breakpoint matrix

Full-page captures, light and dark.

| File | Viewport | Shows |
|---|---|---|
| `1512-light.png` / `1512-dark.png` | 1512 × 982 | Marginalia hung in the left gutter, scroll rail visible |
| `1280-light.png` / `1280-dark.png` | 1280 × 900 | Marginalia folded inline as red mono overlines; rail still present |
| `768-light.png` / `768-dark.png` | 768 × 1024 | Tablet; sticky top progress bar replaces the rail |
| `390-light.png` / `390-dark.png` | 390 × 844 | Phone, touch emulated; chips wrap, folded marginalia |

The two marginalia forms are the thing to look at. The gutter form appears at
`≥1440px` only, so `1512` and `1280` bracket that switch.

## Interaction states

Viewport-sized captures at 1512, light.

| File | Shows |
|---|---|
| `state-hover.png` | Work card under hover: 1px lift, warm `--bg-soft` ground, red edge rule struck down the left |
| `state-panel-open.png` | A role's highlights panel expanded, caret rotated |
| `state-filter-active.png` | Full page with the `Flex Office` chip active. Non-matching roles dimmed to 45%, never hidden |
| `state-command-menu.png` | Cmd+K command menu open |

## Print

`print.pdf` — Letter, zero margins, backgrounds on, print media emulated.

Three pages. Every role panel expanded, marginalia hidden, motion off, chips
intact. One defect visible on page 1: the contact line prints as
`codymitch.works /` with a dangling separator and no LinkedIn or GitHub. See
`../OPEN.md`.

## Reproducing

Requires a dev server on `:3000` (`./node_modules/.bin/next dev`) and Playwright
installed somewhere outside this repo. The capture script is not kept here
because it is throwaway; the settings above are the whole spec.
