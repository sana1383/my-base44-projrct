# AGENTS.md — Horizon Properties

Premium RTL (Persian) real-estate marketing site. Vite + React SPA, no backend.

## Run it

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

Serves on host port **3000** (Vite dev server on 5173 in the container).
`npm ci` runs on container start from the committed `package-lock.json`;
`node_modules` and the npm cache live in named volumes, not on the host.

## Non-obvious notes

- **No secrets and no external services.** All property/team content lives in
  `src/data/properties.js` and `src/data/site.js`. There is no database, no API
  key and nothing to configure before booting.
- **Photography is loaded from the Unsplash CDN at runtime.** The browser needs
  outbound network access for images to appear; the app itself boots fine
  without it.
- **Persian typography rules.** The UI is `dir="rtl"` with the Vazirmatn font.
  Never apply `letter-spacing` to Persian text — it breaks the connected glyphs.
  Latin-only strings (the `HORIZON` sub-wordmark) may use tracking.
- **Numbers** are rendered through `src/lib/format.js` so the whole UI uses
  Persian digits. Add new numeric output there, not with a local formatter.
- **RTL-aware carousel.** `scrollLeft` is negative under RTL, so the carousel
  in `src/components/PropertyCarousel.jsx` inverts its scroll direction. Keep
  that inversion when touching carousel code.
- **Favorites** are persisted in `localStorage` under `horizon:favorites`.
- **Contact / viewing forms** validate and confirm client-side only. Wire
  `InquiryModal`'s submit and `ContactPage`'s submit to a real endpoint when a
  backend exists.

## Sandbox preview allowances (do not remove)

`vite.config.js` extends host/origin allowances **only** when
`BASE44_PREVIEW_MODE === '1'`:

- `server.allowedHosts` gains `.${BASE44_SANDBOX_HOST_DOMAIN}` so the preview
  proxy's Host header is accepted (the sandbox id rotates, hence the wildcard).
- `server.hmr.clientPort = 443` because the preview is served over HTTPS in
  front of the proxy.

With the flag unset (any other value) both options are `undefined` and Vite
keeps its defaults. `server.watch.usePolling` is always on because bind mounts
do not deliver native file events inside the sandbox.

## How to verify a change

1. `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/` → `200`.
2. Load the page in the preview and exercise the changed flow.
3. `docker compose -f docker-compose.base44.yml logs web` for build/runtime errors.
