# CLAUDE.md

Project context for Claude (or any assistant) working in this repository.

## About the project

CodeMarket: a fictional tech marketplace static site, built to practice HTML/CSS/JS.
No backend, no build step, no dependencies — just open `index.html`.

## Stack

- Semantic HTML5 (uses `role`, `aria-label`, `aria-labelledby` — keep these attributes when editing)
- Plain CSS3 (no framework, no preprocessor)
- Vanilla JavaScript (`js/script.js`, currently only handles opening/closing the mobile menu)

## CSS architecture

- `css/style.css`: base (desktop-first) styles + all design tokens in `:root`
- `css/responsive.css`: media queries only. Doesn't define its own tokens — reuses
  the variables from `style.css` (`--color-*`, `--space-*`, `--font-*`, `--header-height*`)
- **Always use the existing variables instead of hardcoded values** (color, spacing, font).
  If a new value is needed, add a variable to `:root` (in `style.css`) instead of
  hardcoding it.

### Breakpoints (desktop-first via `max-width`, largest to smallest)
- `min-width: 1400px` → large/ultrawide screens
- (base, no media query) → standard desktop
- `max-width: 992px` → tablets (menu becomes a dropdown with a hamburger button)
- `max-width: 768px` → mobile
- `orientation: landscape and max-height: 500px` → phone in landscape

⚠️ Important: **never duplicate the same breakpoint in separate blocks** (this was a
real bug in the project — two `@media (max-width: 768px)` blocks competing and
overriding each other). If you need to change an existing breakpoint, edit the
existing block instead of creating a new one.

## Visual identity

- Palette: dark slate header/footer (`--color-header`), teal accent (`--color-accent`)
  for links/buttons, amber (`--color-highlight`) for deals/discounts. Avoid falling
  back into the "near-black + neon green" cliché — it was intentionally replaced.
- Typography: `Space Grotesk` (headings), `Inter` (body), `JetBrains Mono` (prices,
  menu labels, the `// sobre`-style "comments" above section titles). Imported via
  `@import` from Google Fonts at the top of `style.css`.
- Signature visual element: product `.card`s have a row of dots at the top (code
  editor window style) via `::before` with `box-shadow`. Don't remove this without
  rethinking the visual identity as a whole.

## Menu (header)

- Desktop: `#menu` is an always-visible horizontal navbar (`display: flex`), no
  click required.
- ≤992px: `#menu-toggle` (hamburger) appears, `#menu` becomes a dropdown hidden
  until it gets the `.show` class (already handled in `script.js` — no need to
  touch it for styling adjustments).

## Commit conventions

Commits in Portuguese, following Conventional Commits: `feat:`, `fix:`, `refactor:`,
`style:`. Prefer separate commits when changes serve different purposes (e.g. one
commit for `style.css`, another for `responsive.css`, if the changes are unrelated
in nature); combine into a single commit when they're part of the same delivery/design
decision.

## Current status / next steps

- v1 shipped: complete, responsive site (mobile → ultrawide), working menu, defined
  visual identity.
- Pending: "Comprar" (Buy) buttons still don't do anything (no cart/checkout). If
  implementing this, keep everything in `js/script.js` or split into another JS
  file, without introducing frameworks unless explicitly requested.
- Deployed via GitHub Pages (branch `main`, root folder).
