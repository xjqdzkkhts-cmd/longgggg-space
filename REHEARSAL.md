# Portfolio motion rehearsal — 2026-11-04

Scope: Stageshow's motion principles applied to the existing live portfolio, with the user's final correction removing About card dragging and return motion.

## Reference and implementation

Reference rules: `stageshow/references/motion.md` (cause and response, pacing, retained content, settled states) and `rehearse.md` (desktop/narrow checks, interruption, offscreen behavior, reduced motion).

The existing HTML/CSS/JavaScript remains the implementation. No faux UI scene or React Stage was introduced. No gold example was copied. The Stage-specific `film.mjs --gate` and scripted-loop state gate were not run; no gate pass is claimed for this live website.

## Verified

- JavaScript syntax: `node --check script.js`.
- Four state regression tests pass: `node --test tools/motion-state.test.mjs`. They check retained historical messages and feedback nodes, preserving the visitor's reading position, removing status messages without rebuilding history, and completing the actual answer when reduced motion changes during typing.
- Desktop (1440 × 900, Codex in-app browser): hero and About settled frames; entrance grouping; stationary About card after a 60 × 35 px drag gesture (identical bounding rectangle and transform before/after); Works moves from AI product to AI workflow during native vertical scroll; hero receives the paused state outside the viewport.
- Narrow layout (390 × 844, same browser): no positive horizontal document overflow; native horizontal Works scrolling changes the category to AI workflow; Search Focus opens and closes; AI sidebar opens and its close/send controls remain inside the screen.
- Found and fixed the narrow sidebar extending 15 px left of the document when a scrollbar is present: use available width rather than `100vw`. After correction its bounds are x=0…375 in a 390 px viewport with a 15 px scrollbar.
- No page errors or warnings were reported by the in-app browser during the final interactions.

## Captures

Local evidence is in `/Users/long/Documents/New project/artifacts/stageshow-motion/`:

- `desktop-about.jpg`
- `mobile-chat.jpg`

## Boundaries

- Reduced-motion behavior is covered by a state regression test and code/CSS review. System-level preference changes and their complete rendered animation sequence were not emulated in the in-app browser.
- No physical touch device, Safari, or Firefox was tested. A narrow viewport is not a claim of physical touch testing.
- Real AI service output was not requested; chat rendering tests use controlled local text. The API and response content are unchanged.
- This change is local source work; production deployment is not part of the verification.
