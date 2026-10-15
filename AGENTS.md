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
- `src/hooks/useHeroParallax.js` — hero background-video parallax + `usePrefersReducedMotion`
- `src/hooks/useParallaxScroll.js` — single-element scroll parallax (story photograph)
- `src/hooks/useTilt.js` — pointer tilt for product cards (mouse only)
- `public/media/harth-hero.mp4` — hero background video (see below)
- `src/index.css` — complete design system (colors, typography, layout, responsive)

## Design Tokens
Defined in `:root` in `src/index.css`:
- Warm ivory `#F5EFE5`, Cream `#EFE5D8`, Coffee brown `#79513A`, Espresso `#241914`
- Espresso deep `#1A1310`, charcoal `#14120F`, warm white `#FFFDF8`, border `#DDD1C4`
- **Muted copper `#A96A3E` is the only accent** (`--copper` / `--copper-light` `#D8A87E` for
  dark photography). It marks eyebrows, card labels, active nav underline, dividers, focus rings
  and hover states — never body copy, and never more than one accent per view.
- Ink over photography: `--on-media` / `--on-media-muted`. Anything sitting on the hero video uses
  these, not the espresso ink.
- Spacing is one scale (`--space-1` … `--space-6`), shadows are espresso-tinted
  (`--shadow-soft/card/lift`), and dark panels use the gradients `--grad-espresso` / `--grad-media`.
- Header is a 3-column grid (`1fr auto 1fr`) so the nav sits optically centered on desktop
- Menu header is a 2-column grid: title left, supporting copy + "View Full Menu" right (stacks under 860px)
- **Hero is a full-bleed cinematic composition**: `.hero__media` covers the whole section and
  `.hero__inner` lays the copy over it, anchored to the bottom-start corner (bottom-right in RTL) with
  the editorial line in the end corner. There is no split column any more — the old `.hero__left` /
  `.hero__right` rules are gone; keep new hero layers inside `.hero__inner` or absolutely positioned
  over `.hero__media`, and mind the fixed header (top padding is `calc(76px + var(--space-5))`).

## Hero background video
- The asset is `public/media/harth-hero.mp4`, served straight from `public/` (no import, no build step).
- **It is a re-encode, on purpose.** The video the user uploaded was HEVC/H.265 (`hvc1`), which only
  Safari decodes among mainstream browsers — Chrome reported `readyState 4` while never presenting a
  single frame, so the hero silently showed the poster photo forever. The file in the repo is the same
  footage re-encoded to H.264 (`libx264`, yuv420p, 1280x720, 10s, audio stripped, `+faststart` so the
  moov atom streams first). If the video is ever replaced, **confirm the new file is H.264**; a "plays
  fine for me in Safari" test is not enough.
- Poster + fallback: the Pexels still (`heroImage`) is both `poster=` on the `<video>` and the `<img>`
  layer that stays underneath it. The `<img>` and `<video>` occupy the same absolute box with the same
  `object-fit`, so the video fades in over the still with no layout shift, and a browser that cannot
  decode the file still shows a proper photo.
- Crop: `object-position: 42% center` keeps the cup and the café interior in frame at every
  breakpoint (phones crop the 16:9 source far harder than the full-bleed desktop frame). Re-check the
  crop at the *start and end* of the clip — the camera slowly pushes in — not just one frame.
- Depth: `useHeroParallax` writes `--par-x` / `--par-y` / `--par-scroll` on `.hero` (the section
  carries the ref, so every layer inherits them); CSS reads them with a different factor per layer —
  media 1×, copy 0.3×, corner line 0.15× — and that difference *is* the parallax effect. Keep new
  moving layers on those same variables instead of adding another listener.
- Motion gates: only `pointerType === 'mouse'` moves the hero, only at `min-width: 861px`, and never
  under `prefers-reduced-motion` (where the video is also paused, hidden, and the still photo is used).
  Phones, tablets and touch-laptop touchscreens stay completely still.
- Verifying playback: `videoWidth` stays `0` and `requestVideoFrameCallback` never fires when the
  browser cannot decode the codec, even though `readyState` is 4 and `currentTime` advances. Check
  both, plus `video.canPlayType('video/mp4; codecs="avc1.42E01E"')`, before believing the video plays.

## Motion & interaction gates
Every moving piece is opt-in on the visitor's side — check these before adding movement:
- `useHeroParallax` (hero video + copy) — pointer and scroll, desktop only, mouse pointers only, off under reduced-motion.
- `useParallaxScroll` (story photograph, `--p-y`) — desktop only, off under reduced-motion; the image is overscaled 1.12 in CSS so the drift never exposes an edge.
- `useTilt` (product cards, `--tilt-x` / `--tilt-y` + `is-tilting`) — mouse pointers only; touch and pen are ignored, and the class is what carries `will-change`, so idle cards never hold a composited layer.
- `.reveal` scroll reveals are shortened (0.75s, 22px) and staggered by `data-delay`; `useScrollReveal` already forces them visible under reduced-motion.
- The global reduced-motion block is the safety net: it also parks the hero/copy/story transforms and removes the card lift.

## Header states
`.header` has three looks and JS toggles exactly one of the first two:
`header--on-media` (top of page, transparent, light ink over the hero video, with a soft top shade so
the wordmark never sinks into a bright frame) → `header--scrolled` (solid ivory bar, espresso ink),
plus `header--dark` when the story/footer panels are under it. The reservation pill takes its ink from
those classes — do not reintroduce the inline style that used to patch it per section.

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
