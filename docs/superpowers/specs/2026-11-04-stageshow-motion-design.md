# Portfolio motion refinement

Approved direction: A, restrained refinement of the existing website (2026-11-04). Later user correction: remove the About card drag and return effect.

## Scope and motion language

Keep the site's content, visual identity, native scroll mapping, and real interactions. Apply Stageshow's motion rules to the existing HTML/CSS/JavaScript: immediate input feedback, short overlapping entrances, continuous interrupted movement, readable settled states, and no unexplained reset. This is a live website refinement, not a new faux product scene; the React demonstration kit and scripted loop gate are not the runtime or acceptance harness.

- Feedback: 140–180 ms; surfaces: 360–440 ms; entrances: 560–620 ms.
- Arrival curve: cubic-bezier(0.25, 0.8, 0.25, 1).
- Travel curve: cubic-bezier(0.45, 0, 0.1, 1).
- Related cards stagger by 60 ms; text stays at its actual size.

## Changes

1. Reveal sections and About cards once. Use small translations instead of moving cards up from the bottom of the entire grid. Returning to a section preserves its readable state.
2. Remove decorative dragging and return motion from About cards, including grab cursors and native dragging of their decorative images. Keep the cards stationary and their existing button actions usable.
3. Keep Works scrolling native and direct. Cache card geometry and add a small focus hysteresis so category labels do not flicker at boundaries. Reduced motion settles labels immediately.
4. Retain chat message nodes and feedback controls while updating only changed content. Animate new messages once, preserve reading position when the visitor scrolls up, and finish text immediately under reduced motion.
5. Share visibility and reduced-motion handling. Pause decorative work offscreen/when the document is hidden. Respond when reduced motion changes while the page is open. Keep useful static results visible.
6. Coordinate the hero title, credit and contact entrance; retain responsive layout and existing interaction behavior.

## Implementation and verification

Work on a local preview copied from the clean Personal-website revision 9084356. Modify the existing JS/CSS and asset versions; do not migrate frameworks. Check syntax, retained chat nodes/scroll position, stationary About cards, category boundaries, reduced motion, hidden/offscreen effects, navigation and narrow layout. Capture desktop and 390 px views. Record actual checks and limitations in REHEARSAL.md. Copy the verified changes into the original repository with a baseline check so concurrent user edits are not overwritten.
