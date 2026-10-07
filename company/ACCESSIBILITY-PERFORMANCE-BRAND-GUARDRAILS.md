# NexLabs Technology — Accessibility & Performance Brand Guardrails

**Status:** `CANONICAL_WO_014`

## Principle

The brand is successful only when people can use it.

A cinematic surface does not override accessibility, semantic content or performance.

## Semantic independence

Critical content/navigation must not depend on:
- WebGL;
- canvas;
- animation;
- hover;
- pointer precision;
- sound;
- 3D scene availability.

## Reduced motion

Honor `prefers-reduced-motion`.

Brand identity and content remain complete in a static experience.

## Keyboard/focus

Interactive components require:
- keyboard access;
- visible focus;
- logical order;
- no focus trap from decorative layers.

## Contrast

Cold-white/blue-gray/cyan roles must maintain readable contrast in actual implementation.

Glow cannot be the only contrast mechanism.

## Responsive

Mobile must:
- avoid horizontal overflow;
- preserve semantic copy;
- reduce decorative density;
- keep controls touch-usable;
- avoid unreadable micro-HUD elements.

## Performance architecture

Prefer:
- poster-first hero;
- progressive enhancement;
- static fallbacks;
- code splitting/lazy load for expensive scenes;
- lightweight SVG/CSS for simple brand motion;
- bounded particle/effect density.

## Logo

Static logo rendering must not require heavy client JavaScript.

## Failure state

If an expensive visual fails:
- navigation works;
- content renders;
- CTA remains usable;
- brand still appears through static assets/tokens.

## Quality evidence

Website implementation should retain:
- lint/typecheck/build;
- browser/mobile checks;
- reduced-motion behavior;
- console health;
- accessibility checks;
- performance evidence proportional to change.

## Priority order

When forced to trade off:

`SEMANTIC USABILITY → ACCESSIBILITY → CONTENT TRUTH → PERFORMANCE → VISUAL FIDELITY → DECORATIVE DETAIL`

The goal is to improve all of them, not use this order as an excuse for poor design.
