# Harth Coffee — Base44 Dev Environment

## Overview
Premium specialty coffee single-page website built with Vite + React 18.
No backend or database — all data is in `src/data/` and cart state is in-memory.

## Setup
```bash
docker compose -f docker-compose.base44.yml up -d --build
```
The app runs on host port 3000 (mapped to container port 5173).
Vite dev server binds 0.0.0.0 with live reload.

## Architecture
- **Framework:** Vite 5 + React 18 (JSX, no TypeScript)
- **Styling:** Single CSS file (`src/index.css`) with CSS variables for design tokens
- **Fonts:** Google Fonts — Vazirmatn carries all Persian text (body + headings).
  Cormorant Garamond / Manrope are kept only for the Latin `HARTH COFFEE` wordmark
  (`--brand-serif` / `--brand-sans`), so the logo keeps its original look.
- **Language:** `index.html` sets `<html lang="fa" dir="rtl">`. All UI copy is Persian.
- **Images:** Pexels CDN (verified working photo IDs in `src/data/menuItems.js`)
- **State:** All UI/cart state managed in `src/App.jsx`, passed via props

## Key Files
- `src/App.jsx` — root component, state management for cart & modals
- `src/components/` — all UI components (Header, Hero, Menu, Story, Values, Footer, modals)
- `src/data/menuItems.js` — product catalog, image URLs, filter definitions
- `src/data/locations.js` — sample location data
- `src/hooks/useScrollReveal.js` — Intersection Observer scroll animation hook
- `src/index.css` — complete design system (colors, typography, layout, responsive)

## Design Tokens
Defined in `:root` in `src/index.css`:
- Warm ivory `#F5EFE5`, Cream `#EFE5D8`, Coffee brown `#79513A`, Espresso `#241914`
- Dark charcoal `#1B1916` (story panel), Espresso `#241914` (footer), Soft border `#D8CBBE`
- Header is a 3-column grid (`1fr auto 1fr`) so the nav sits optically centered on desktop
- Menu header is a 2-column grid: title left, supporting copy + "View Full Menu" right (stacks under 860px)
- Hero photo (`.hero__img`) is absolutely positioned to fill `.hero__right`. Under 860px the wrapper is a fixed 62svh band, so the photo never leaves an empty gap under itself (a plain `height: 100%` image resolves to its natural ratio there)

## Features
- Smooth-scroll navigation with active section tracking
- Sticky header that transitions to dark over story/footer sections
- Functional cart drawer (add, quantity, remove, subtotal)
- Search modal filtering menu items by name/category
- Reservation form with validation (frontend demonstration)
- Full menu modal with category filters
- Locations modal with sample data
- Shop "coming soon" state
- Newsletter signup with email validation
- Mobile full-screen navigation panel
- Scroll-reveal animations (respects prefers-reduced-motion)
- Accessible modals (Escape to close, focus management, ARIA labels)

## Localization (Persian / RTL)
The site is fully Persian and right-to-left. Things that are easy to break when editing:
- **Never add `letter-spacing` or `text-transform: uppercase` to Persian text** — tracking
  disconnects the joined script. `.logo__main` / `.logo__sub` are the only intentional exceptions
  (Latin wordmark).
- Layout direction comes from `dir="rtl"` on `<html>`. Prefer logical properties
  (`inset-inline-*`, `padding-inline`, `border-inline-end`, `text-align: start/end`).
  `transform: translateX()` is **physical**, so the drawer / mobile menu / arrow hover nudges
  are mirrored by hand (drawer anchors `inset-inline-end` = left edge; mobile menu slides from the left).
- Mixed-direction values are bidi-isolated so they stay visually LTR: prices, `$` amounts,
  stats (`10K+`, `4.8 ★`), phone numbers, emails. CSS classes already set
  `direction: ltr; unicode-bidi: isolate`; in JSX use `<bdi dir="ltr">`.
  Email/phone **inputs** use `dir="ltr"` with Persian labels.
- Persian glyphs are wider/taller than Latin: display sizes are reduced (hero `clamp(2.6rem, 5.2vw, 5.4rem)`)
  and leading opened up (`body` `1.75`, headings `1.3`). Keep that ratio when adding text.
- Photographs are **not** mirrored (`scaleX(-1)` is never used) — only layout and directional icons flip
  (`ArrowLeft` / `ArrowUpLeft` from `src/components/Icons.jsx` replace the LTR-facing arrows).
- Prices are still in dollars by design; product `id` / `category` / `price` / `image` keys stay English —
  only `name`, `label` and `description` were localized.

## Notes
- Cart, reservations, and newsletter are frontend demonstrations — no backend is configured.
- Location data is clearly labeled as sample.
- Social links use placeholder hrefs (`#`).
- No secrets or environment variables are required to run the app.
