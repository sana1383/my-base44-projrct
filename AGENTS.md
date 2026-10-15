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
- `public/media/harth-hero.mp4` — hero background video (see below)
- `src/index.css` — complete design system (colors, typography, layout, responsive)

## Design Tokens
Defined in `:root` in `src/index.css`:
- Warm ivory `#F5EFE5`, Cream `#EFE5D8`, Coffee brown `#79513A`, Espresso `#241914`
- Dark charcoal `#1B1916` (story panel), Espresso `#241914` (footer), Soft border `#D8CBBE`
- Header is a 3-column grid (`1fr auto 1fr`) so the nav sits optically centered on desktop
- Menu header is a 2-column grid: title left, supporting copy + "View Full Menu" right (stacks under 860px)
- Hero photo (`.hero__img`) is absolutely positioned to fill `.hero__right`. Under 860px the wrapper is a fixed 62svh band, so the photo never leaves an empty gap under itself (a plain `height: 100%` image resolves to its natural ratio there)

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
- Crop: the 16:9 source is cropped hard by the tall desktop column, so `object-position: 42% center`
  keeps the cup and the café interior in frame. Re-check the crop at the *start and end* of the clip
  (the camera slowly pushes in), not just one frame.
- Depth: `useHeroParallax` writes `--par-x` / `--par-y` / `--par-scroll` on `.hero__right`; CSS reads
  them with a different factor per layer (media 1×, center caption 0.45×, corner caption 0.3×) — that
  difference is the parallax effect. The variables must stay on that wrapper, since `.hero__media` and
  the captions are siblings and custom properties only inherit downwards. Any new moving layer should
  read the same variables rather than adding its own listener.
- Motion gates: only `pointerType === 'mouse'` moves the hero, only at `min-width: 861px`, and never
  under `prefers-reduced-motion` (where the video is also paused, hidden, and the still photo is used).
  Phones, tablets and touch-laptop touchscreens stay completely still.
- Verifying playback: `videoWidth` stays `0` and `requestVideoFrameCallback` never fires when the
  browser cannot decode the codec, even though `readyState` is 4 and `currentTime` advances. Check
  both, plus `video.canPlayType('video/mp4; codecs="avc1.42E01E"')`, before believing the video plays.

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
