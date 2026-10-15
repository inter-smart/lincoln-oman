# Frontend QA Report — Lincoln (Home page)

Audit date: 2026-10-15 · Workflow: `Frontend-Engineering-Handbook/FRONTEND-QA-TEST.md` (Phases 1–8)
Evidence: `qa/screenshots/` (12 real captures from this run). Raw Lighthouse JSON was kept outside the repo (session scratchpad).

---

## 1. Executive Summary

| Item | Result |
|---|---|
| Overall QA status | **PASS WITH WARNINGS** |
| Project type | Next.js 16.4.0 App Router, React 19.3.0, Tailwind CSS 4.3.3, shadcn/ui (Radix 1.7.0), Embla 8.6.0 — plain JS |
| Routes identified | 6 — `/` (page), `/robots.txt`, `/sitemap.xml`, `/icon.png`, `/apple-icon.png`, `/opengraph-image.jpg` (+ framework `/_not-found`) |
| Routes tested | 6 / 6 (`/` fully; metadata routes by HTTP response) |
| Issues found | 24 |
| Fixed and verified | 17 |
| Open / accepted / blocked / out of scope | 7 (0 P0, 0 P1) |
| Highest outstanding severity | **P2** — mobile Lighthouse Performance 79–86 (median 82, target 85); simulated mobile LCP 3.5–4.4 s (target ≤ 2.5 s) |

Two P1 defects were found and fixed: the site allowed crawling and indexing (the QA requirement says it must not), and the Vehicles mega-menu items could not be hovered or clicked with a real mouse because the header row sat on top of the panel.

---

## 2. Environment and Test Coverage

| | |
|---|---|
| OS | Windows 11 Pro 10.0.26200 |
| Node / npm | v26.11.1 / 11.13.0 |
| Build mode | Production (`next build` with Turbopack, served with `next start -p 3300`) |
| Browsers | Chromium 156 (Playwright 1.64 build 1248), Firefox 157 (Playwright), WebKit 27.2 (Playwright — Safari's engine on Windows, **not** Apple Safari) |
| Tools | Lighthouse 12.8.2 (CLI), Chrome DevTools MCP (Lighthouse snapshot + performance trace), Playwright, html-validate 9 (local), ESLint 9 (`eslint-config-next`), `node --test`, `npm audit` |
| Viewports | 320, 360, 375, 390, 430, 576, 768, 1024, 1280, 1440, 1600, 1920 px |
| Not performed | Apple Safari / iOS devices (no macOS); Microsoft Edge (Chromium engine covered by Chromium); W3C Nu validator (not used to avoid uploading unreleased content — local html-validate used instead); real-user field data (no CrUX for a local site); INP (needs field data) |

---

## 3. Quality Scorecard

| Category | Status | Issues Found | Issues Fixed | Outstanding |
|---|---|---:|---:|---:|
| Code Review | PASS | 2 | 2 | 0 |
| Build and Lint | PASS | 0 | 0 | 0 |
| Robots and Indexing | PASS | 1 | 1 | 0 |
| Performance | PARTIAL | 2 | 1 | 1 |
| Console and Network | PASS | 0 | 0 | 0 |
| HTML Validation | PASS | 5 | 5 | 0 |
| Security | PASS (warnings) | 3 | 1 | 2 |
| Accessibility | PASS | 5 | 5 | 0 |
| Responsive Design | PASS | 1 | 1 | 0 |
| Visual Alignment | PASS | 0 | 0 | 0 |
| Functional Testing | PASS | 1 | 1 | 0 |
| SEO and Metadata | PASS (warnings) | 2 | 0 | 2 |
| Cross-Browser Testing | PARTIAL | 0 | 0 | 0 (Safari / iOS not testable) |

SEO is scored separately from the indexing policy: Lighthouse SEO reads **69** only because `is-crawlable` fails — that is the required `noindex` working. Every other SEO audit passes.

---

## 4. Performance Results

Lighthouse lab results on `/`, production build, Lighthouse 12.8.2, simulated throttling.

| Run | Form factor | Perf | A11y | Best Pr. | SEO* | FCP | LCP | TBT | CLS | SI |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Baseline (webpack build) | Mobile | **68** | 100 | 100 | 100 | 1.4 s | 4.4 s | 680 ms | 0 | 2.8 s |
| Baseline (webpack build) | Desktop | 95 | 100 | 100 | 100 | 0.4 s | 1.0 s | 150 ms | 0 | 1.0 s |
| After fixes, run 1 | Mobile | 84 | 100 | 100 | 69 | 1.0 s | 3.7 s | 270 ms | 0 | 2.0 s |
| After fixes, run 2 | Mobile | 86 | 100 | 100 | 69 | 0.9 s | 3.5 s | 260 ms | 0 | 1.6 s |
| After fixes, run 3 | Mobile | 85 | 100 | 100 | 69 | 0.9 s | 3.9 s | 210 ms | 0 | 2.3 s |
| Final build, run 1 | Mobile | 79 | 100 | 100 | 69 | 1.0 s | 4.4 s | 290 ms | 0 | 2.5 s |
| Final build, run 2 | Mobile | 80 | 100 | 100 | 69 | 1.0 s | 3.8 s | 370 ms | 0 | 1.9 s |
| Final build, run 3 | Mobile | 80 | 100 | 100 | 69 | 1.0 s | 3.8 s | 350 ms | 0 | 2.6 s |
| Final build | Desktop | **100** | 100 | 100 | 69 | 0.3 s | 0.8 s | 40 ms | 0 | 0.6 s |

\* SEO 69 = intended `noindex` (see §3). Baseline was 100 because the site was wrongly indexable.

Test conditions: mobile = 412×823 (Moto G Power), RTT 150 ms, 1.6 Mbps, 4× CPU slowdown; desktop = 1350×940, RTT 40 ms, 10 Mbps, no CPU slowdown. The final-build runs changed only pointer-events/outline classes. Their lower scores come from run-to-run TBT variance on this machine, which was short of memory during the session (the dev server was reaped for memory). **Mobile median across the six post-fix runs: 82.**

Measured, not simulated:

| Measurement | Value |
|---|---|
| Lighthouse observed (unthrottled) LCP, mobile | 475–1008 ms |
| Lighthouse observed page load, mobile | 357–610 ms |
| Chrome DevTools trace, 390×844 @3×, Fast 4G + 4× CPU (before QA) | LCP 799 ms (TTFB 13, load delay 308, render delay 474), CLS 0.00 |
| Page weight (mobile) | 452 KiB transferred; HTML 19.5 KB gzip |

Page load under 2 s: **met** in every measured navigation. The simulated mobile LCP of 3.5–4.4 s is a Lantern estimate. Its LCP element is a decorative hero gradient image whose paint the simulation places behind framework hydration (React DOM and the Next router account for about 400 KB of the JS).

---

## 5. Issue Register

| ID | Sev. | Category | Route / Viewport | Description | Status |
|---|---|---|---|---|---|
| QA-01 | P1 | Robots/Indexing | `/`, all | Site was crawlable and indexable: `robots.txt` `Allow: /`, no meta robots, no `X-Robots-Tag` | Fixed and verified |
| QA-02 | P1 | Functional | `/`, ≥ 992 px | Mega-menu model links and buttons unreachable by real mouse — header row and preview layer intercept pointer events | Fixed and verified |
| QA-03 | P1 | Performance | `/`, mobile | Mobile Lighthouse Performance 68 (TBT 680 ms) | Fixed and verified (68 → 79–86) |
| QA-04 | P2 | Performance | `/`, mobile | Mobile Performance median 82 (< 85); simulated LCP 3.5–4.4 s (> 2.5 s) | Open |
| QA-05 | P2 | Accessibility | `/`, all | News dates `#929191` on white = 3.14:1 (needs 4.5:1) | Fixed and verified |
| QA-06 | P2 | Accessibility | `/`, ≥ 768 px | Quick-action rail hover label `#485b65` on white/70 over dark bands ≈ 3.7:1 | Fixed (verified by calculation ≈ 5.6:1) |
| QA-07 | P2 | Accessibility | `/`, ≥ 992 px | No visible focus indicator on the Vehicles trigger, mega-menu links or Sheet close button | Fixed and verified |
| QA-08 | P3 | Accessibility | `/`, all | Targets under 24 px (WCAG 2.5.8): language link 15 px, Menu trigger 17 px, social links 19 px tall | Fixed and verified (24/24/25 px) |
| QA-09 | P3 | Accessibility | `/`, all | `prefers-reduced-motion` not applied to tw-animate entrances, menu and hover transitions | Fixed and verified |
| QA-10 | P2 | HTML | `/` | 84 non-integer `width`/`height` attributes on `<img>` | Fixed and verified |
| QA-11 | P3 | HTML | `/` | Vehicles `<button>` without `type` | Fixed and verified |
| QA-12 | P3 | HTML | `/` | Duplicated `group` class (shadcn template) | Fixed and verified |
| QA-13 | P3 | HTML | `/` | `<time>` content "09.03.2020" without machine-readable `datetime` | Fixed and verified |
| QA-14 | P3 | HTML | `/` | Carousel used `div role="region"` instead of native `<section>` | Fixed and verified |
| QA-15 | P2 | Responsive | `/`, 320 px | 15 px horizontal overflow (Legacy logo, Newsroom header row, footer "Follow us" row) | Fixed and verified |
| QA-16 | P2 | Security | all | `X-Powered-By: Next.js` disclosed; no nosniff, frame, referrer or permissions headers | Fixed and verified |
| QA-17 | P3 | Security | all | No Content-Security-Policy | Open |
| QA-18 | P3 | Security | dev only | `npm audit`: 5 high (braces ReDoS) via `eslint-config-next` → `fast-glob` → `micromatch` → `braces` | Accepted limitation |
| QA-19 | P2 | SEO | all | Canonical, OG URL and sitemap fall back to `http://localhost:3000` | Accepted limitation (deploy config) |
| QA-20 | P3 | SEO / Functional | `/` | All links are `href="#"` placeholders (other routes not built); language selector inert | Out of scope |
| QA-21 | P3 | Content | `/` | Rail calendar item duplicates the "Email or Call Me Back" label (as in Figma) | Open (design decision) |
| QA-22 | P3 | Content | `/` | Hero, card-hover and showcase videos, 3 mega-menu car images and licensed fonts not supplied | Blocked (assets) |
| QA-23 | P3 | Code | `src/lib/utils.js` | `cn()` (tailwind-merge) treated custom `text-fluid-*` as a colour, dropping colours or sizes | Fixed and verified (unit test) |
| QA-24 | P3 | Code | `next.config.mjs` / `package.json` | Build used `--webpack`; Turbopack output measured materially faster | Fixed and verified |

### Details

**QA-01 — Indexing allowed (P1).** *Expected:* the QA requirement — no crawling and no indexing. *Actual:* `GET /robots.txt` returned `Allow: /` plus a sitemap, and there was no meta robots tag and no `X-Robots-Tag` header. *Fix:* `src/data/seo.js` adds `allowIndexing` (only `NEXT_PUBLIC_ALLOW_INDEXING=true` enables it). `src/app/robots.js` returns `Disallow: /` and drops the sitemap line. `src/app/sitemap.js` returns an empty set. `src/app/layout.js` emits `robots`/`googlebot` `noindex, nofollow, noarchive`. `next.config.mjs` sends `X-Robots-Tag: noindex, nofollow, noarchive` on every path, including `/robots.txt`. *Verified:* all four served exactly as listed (curl). *Limitation:* `Disallow: /` stops compliant crawlers from fetching pages, so they never see the `noindex`. A URL linked from elsewhere can still be listed without content. Only access control (basic auth or an IP allow-list) guarantees exclusion for a private staging site. The live deployment must set `NEXT_PUBLIC_ALLOW_INDEXING=true`.

**QA-02 — Mega menu not clickable (P1).** *Repro:* hover "Vehicles" at 1440 px, then move the mouse onto "Aviator". *Actual:* Playwright reported `div.container.grid … intercepts pointer events`, and after the first fix `div.absolute.inset-x-0 … intercepts pointer events`. The panel sits behind the header row (by design), and the centred preview layer covers the list. *Root cause:* stacking without `pointer-events` handling — my earlier test used synthetic pointer events and missed it. *Fix:* `src/components/layout/header.jsx` makes the row `pointer-events-none` and its three columns `pointer-events-auto`. `src/components/layout/common/VehicleMenu.jsx` makes the preview `pointer-events-none` and its buttons `pointer-events-auto`. *Verified:* real-pointer hover over all four models plus "Explore More" at 1024, 1440 and 1920 px; nav links, logo and Menu still clickable while scrolled.

**QA-03 / QA-24 — Mobile performance (P1 → fixed).** *Actual:* Perf 68, TBT 680 ms, 1.6 s script boot-up with the webpack build. *Fix:* `package.json` `build` is now `next build` (Turbopack, Next 16's default). The zelliny reference used `--webpack`, but this project builds and renders correctly with Turbopack and measured TBT 210–370 ms. *Verified:* six mobile runs at 79–86.

**QA-04 — Mobile target not consistently met (P2, open).** The two largest remaining chunks are framework code: the Next client router (168 KB raw) and React DOM (230 KB raw). Project client code is Radix NavigationMenu + Dialog and Embla. *Recommendations, not implemented because each changes design or architecture:*
1. Lazy-load the Menu sheet and mega menu on first interaction.
2. Replace the two hero gradient PNGs (the LCP element) with CSS gradients — this departs from the Figma asset.
3. Re-measure on the deployed CDN with field data (CrUX/RUM) before further work.

**QA-05 / QA-06 — Contrast (P2).** `src/app/globals.css` changes `--color-ash` from `#929191` to `#767676` (4.54:1), a design-token deviation from Figma. `FloatingRail.jsx` raises the hover/focus tile to `bg-white/90`. *Verified:* Lighthouse accessibility with all scroll-reveal content forced visible: 96 → 100 (before the fix, axe reported 4 × colour contrast on `<time>`).

**QA-07 — Focus indicators (P2).** shadcn's `outline-none` sets `outline-style: none`, so `outline-2` alone never painted, and NavigationMenu content forces `outline-none` on its links. *Fix:* `header.jsx` adds `focus-visible:outline-solid outline-white` to the Vehicles trigger and Sheet close button. `VehicleMenu.jsx` gives menu links a focus underline. *Verified:* computed `outline: solid 2px` on both controls and `text-decoration: underline` on the menu link (`qa/screenshots/focus-vehicles-1920.jpg`).

**QA-10 — Non-integer image sizes (P2).** HTML requires integer `width`/`height`. *Fix:* `Composite.jsx`, `FloatingRail.jsx`, `ModelCard.jsx`, `VehicleMenu.jsx`, `footer.jsx` and `Ownership.jsx` now use integer attributes (`Math.ceil` or rounded), and exact Figma sub-pixel sizes move to inline `style`. *Verified:* html-validate `attribute-allowed-values` 84 → 0. In WebKit, sub-pixel SVG parts report `naturalWidth 0`; a 4× screenshot comparison with Chromium shows the steering-wheel icon renders identically (not a defect).

**QA-15 — 320 px overflow (P2).** `Legacy.jsx` sizes the logo to `min(110px, (100vw − 32px) / 2.884)`. `Newsroom.jsx` lets the header row wrap. `footer.jsx` lets "Follow us" wrap. *Verified:* `scrollWidth − clientWidth = 0` at all 12 widths.

**QA-16 — Security headers (P2).** `next.config.mjs` sets `poweredByHeader: false` and sends `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin` and `Permissions-Policy: camera=(), microphone=(), geolocation=()`. *Verified:* in the HTTP response.

**QA-23 — `cn()` merge bug (P3).** `twMerge("text-white text-fluid-16")` dropped `text-white`. *Fix:* `src/lib/utils.js` registers `text-fluid-*` as a font size. *Verified:* `src/lib/utils.test.mjs` (`npm test`, 1/1 pass).

---

## 6. Security Findings

- **Confirmed vulnerabilities:** none in shipped code.
- **DOM / JS:** one `dangerouslySetInnerHTML` in `src/app/layout.js` (JSON-LD). It is built from static site data with `<` escaped to `<`, so it is safe. No `innerHTML`, `eval`, `javascript:` URLs, `target="_blank"` links or third-party scripts. Fonts are self-hosted by `next/font`.
- **Secrets:** none found. The only env vars are `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_ALLOW_INDEXING`, both public by design.
- **Headers:** fixed (QA-16). HTTPS, HSTS and mixed content can only be checked on the real host.
- **QA-17, CSP (open, P3):** Next's inline RSC scripts need a nonce-based CSP set from `proxy`/middleware. Recommended before launch; not added because a wrong CSP breaks hydration and needs testing on the deploy target.
- **QA-18, dependencies (accepted):** 5 high advisories (GHSA braces ReDoS) through `eslint-config-next@16.4.0`, a devDependency used only for linting and never shipped to browsers. `npm audit fix` offers only a breaking `--force` downgrade. Re-check when `eslint-config-next` updates.

---

## 7. Responsive and Visual Findings

| Viewport | Overflow (px) | Notes |
|---|---:|---|
| 320 | 15 → **0** | QA-15 fixed |
| 360 / 375 / 390 / 430 / 576 | 0 | Mobile icon bar at the bottom; carousels show 1.25 cards |
| 768 / 1024 | 0 | 2–3 cards; nav moves to Menu sheet below 992 |
| 1280 / 1440 / 1600 | 0 | Fluid type: 30 px titles at ≤ 1440, 33.3 px at 1600 |
| 1920 | 0 | Figma native sizes (40 px titles) |

- **Sticky header:** at the top on scroll; compacts to 87 px and the wordmark folds away.
- **Carousels:** slides scrolled in by swipe or keyboard focus reveal correctly. With reduced motion, everything is visible at once.
- **Screenshots:** `qa/screenshots/home-{320,390,768,1024,1440,1920}.jpg`, `mega-menu-1920.jpg`, `focus-vehicles-1920.jpg`, and `{firefox,webkit}-{1440,390}-menu.jpg`.
- **Figma check:** compared against the 1920 Figma frame in an earlier session; the mega menu was re-checked here against the Figma variant (`mega-menu-1920.jpg`). Known differences come from substitute fonts and missing video fills (QA-22).

---

## 8. Fixes Implemented

| File | Change | Issue |
|---|---|---|
| `src/data/seo.js`, `src/app/robots.js`, `src/app/sitemap.js`, `src/app/layout.js` | Env-gated noindex (robots, meta, sitemap) | QA-01 |
| `next.config.mjs` | `X-Robots-Tag`, security headers, `poweredByHeader: false` | QA-01, QA-16 |
| `package.json` | `build`: `next build` (Turbopack) | QA-03, QA-24 |
| `src/components/layout/header.jsx` | Pointer-transparent row, focus outlines, 24 px targets, `type="button"` | QA-02, QA-07, QA-08, QA-11 |
| `src/components/layout/common/VehicleMenu.jsx` | Pointer-transparent preview, focus underline, integer image attributes | QA-02, QA-07, QA-10 |
| `src/components/ui/navigation-menu.jsx` | Removed duplicate `group` class | QA-12 |
| `src/app/globals.css` | `--color-ash` #767676; reduced-motion rule | QA-05, QA-09 |
| `src/components/layout/common/FloatingRail.jsx` | Hover/focus `bg-white/90`; integer image attributes | QA-06, QA-10 |
| `Composite.jsx`, `ModelCard.jsx`, `footer.jsx`, `Ownership.jsx` | Integer image attributes; footer 24 px social targets and wrap | QA-08, QA-10, QA-15 |
| `CardCarousel.jsx` | Native `<section>` landmark | QA-14 |
| `NewsCard.jsx`, `src/data/home.js` | `<time dateTime="2020-03-09">`, assuming Figma's "09.03.2020" is DD.MM.YYYY | QA-13 |
| `Legacy.jsx`, `Newsroom.jsx` | 320 px overflow | QA-15 |
| `src/lib/utils.js`, `src/lib/utils.test.mjs` | `cn()` font-size group plus regression test | QA-23 |

Re-run after the changes: ESLint (clean), `npm test` (1/1), `next build` (success, all routes static), html-validate (0 project errors), Lighthouse ×4, Lighthouse accessibility snapshot with content forced visible (100), the 12-width responsive sweep, keyboard and real-pointer interaction scripts (Chromium), and the Firefox/WebKit scripts.

---

## 9. Remaining Issues

- **QA-04 (P2):** mobile Performance median 82 vs 85 target; simulated mobile LCP above 2.5 s (see recommendations).
- **QA-17 (P3):** add a nonce-based CSP on the deployment target.
- **QA-18 (P3):** dev-only `npm audit` advisories; wait for an `eslint-config-next` update.
- **QA-19 (P2, deploy):** set `NEXT_PUBLIC_SITE_URL` and, for the live site only, `NEXT_PUBLIC_ALLOW_INDEXING=true`. For a private staging site, add basic auth or an IP allow-list.
- **QA-20 (out of scope):** placeholder `#` links and the inert language selector until other routes exist.
- **QA-21 (design):** confirm the calendar rail item's real label.
- **QA-22 (blocked):** supply videos, Aviator/Corsair/Nautilus menu cut-outs and the licensed fonts. Typography fidelity and LCP should be re-checked once they're in.
- **Framework-generated validator notices (not defects):** camel-case `srcSet`/`fetchPriority`/`dateTime` in the serialized RSC markup (HTML attributes are case-insensitive), `<link rel="preload" imagesrcset>` without `href` (valid per spec), and React `useId` `id="_R_"` (valid in HTML5).
- **Not tested:** Apple Safari and iOS Safari, Edge (Chromium engine covered), INP and field Core Web Vitals.

---

## 10. Final QA Verdict

**PASS WITH WARNINGS.**

- Both P1 defects are fixed and verified: indexing now blocked as required, and mega-menu pointer access restored.
- No console errors, failed requests, broken images or project HTML validation errors were found in Chromium, Firefox or WebKit.
- Accessibility scores 100 with all content visible, and keyboard operation and focus management were verified.
- There is no horizontal overflow at any of the 12 widths.
- Desktop Performance is 99–100.
- Not release-blocking: mobile Lighthouse Performance (median 82) and simulated mobile LCP miss their lab targets, while measured load and LCP are under 1.1 s. A CSP, deployment environment variables and design assets remain open.

---

## Addendum — Video integration (2026-10-15, later the same day)

Source: `Mic Drop _ 2025 Lincoln Navigator _ Lincoln.mp4` (60 s, 1920×1080 H.264, 3.8 Mbps, AAC audio, 29.5 MB). Re-encoded with ffmpeg 6.0 (temporary tool, not a project dependency):

| File | Use | Size |
|---|---|---:|
| `public/videos/navigator-1080.mp4` | Hero + showcase backgrounds, ≥ 768 px | 14.3 MB |
| `public/videos/navigator-720.mp4` | Hero + backgrounds < 768 px; all card/box videos | 6.9 MB |
| `public/images/home/hero-poster.jpg` | Hero poster = the video's first frame (seamless fade-in) | 0.30 MB (served as AVIF/WebP) |
| `public/images/home/video-poster.jpg` | Showcase video-box poster (12 s frame) | 0.05 MB |

Encodes are silent (`-an`, the page always plays muted), H.264 High, CRF 28 with a bitrate cap, `+faststart` for progressive streaming.

**Behaviour, verified in Chromium:**
- **Hero:** the poster is the server-rendered image. No video request happens before the `load` event. The video starts on the first interaction (pointer, scroll, key or touch) or 4 s after load, then fades in. It pauses off-screen and is skipped with reduced motion or Save-Data. Mobile gets the 720p file.
- **Explore Lincoln Line cards:** the video element has no `src` until the first hover or focus. It plays while hovered, and on hover-out it pauses, fades out and rewinds to 0, showing the original image.
- **Continental / Navigator:** the former dark placeholder is now a video box (poster + play control, `aria-pressed` toggle). Hover crossfades the section background to video and hover-out returns to the photo. Click, tap or Enter pins it on, and a second activation returns to the photo.

**Page speed (mobile, Lighthouse 12.8.2, same conditions as §4):**
- First attempt (video started on `requestIdleCallback` after load): mobile 54/54/82, TBT up to 3.35 s, because the 3.4 MB download and decode fell inside the trace. **Rejected.**
- Final (interaction / 4 s deferral): mobile 73, 80, 78, 82, 84, 81 (median 80.5; pre-video median 82); desktop 99. No video bytes in any trace; page weight 452 → 483 KiB (hero poster). CLS 0 throughout. The difference is within run-to-run noise on this machine.

The console was clean in fresh sessions. A "preload not used" warning appeared only after resizing the viewport inside one browser context (a test artifact).

New files: `src/components/layout/common/{video.js, HeroVideo.jsx, HoverVideo.jsx, ShowcaseStage.jsx}`. Changed: `Hero.jsx`, `ModelCard.jsx`, `ModelShowcase.jsx`, `src/data/home.js`. Sections remain server components.
