# Lincoln — Project Notes for AI Sessions

Lincoln Oman (Arabian Car Marketing) marketing site. Read this file before any work. It records how the project is built, what was decided with the client, and the mistakes not to repeat. The global handbook (`D:\wamp\www\AI_Build\Frontend-Engineering-Handbook\`) still applies; this file adds project specifics and wins where they differ.

---

## 1. Sources

- **Figma (desktop MCP):** file `OkUg80rVzYiTTuoGb0uigM`. The Figma desktop app must have this file in the active tab, or the MCP errors.
  - **Home frame:** `251:244` (1920 × 8793, flat — no section frames; read it via `get_design_context`).
  - **Hover/animation variants** are on the "Animations" page (`0:1`):
    - Model cards: `148:441/399/413/427` (Default → Variant2).
    - Buttons: `113:1791/1818/1840/1877/1881/1914`, `290:1070` (hover = fill `#314148`, white text).
    - Legacy logo: `47:57` (emblem → full wordmark).
    - Floating rail: `93:573` (each tile slides its label out).
  - **Vehicles mega menu:** component `676:9667` (closed `676:9666` → open `676:9883`), shown in frame `676:6635`.
  - **Other page frames** (not built yet): About Us `251:804`, Lincoln Certified `273:791`, Owners `290:1095`, Vehicle Model `467:1494`, Special Offers `348:1193`, Offer Details `467:10696`, Gallery `383:3452`, Newsroom `290:1528`, Newsroom Details `290:2108`, Contact Us `392:4064`, Request a Quote `671:10148`, Book a Test Drive `672:10645`.
- **Reference project for structure and patterns:** `D:\wamp\www\AI_Build\zelliny`.
- **QA workflow:** "run QA test" → `Frontend-Engineering-Handbook/FRONTEND-QA-TEST.md`. The last report is `FRONTEND-QA-REPORT.md` (+ `qa/screenshots/`).

## 2. Stack and commands

- Next.js 16.4 App Router (Turbopack), React 19.3, plain JS/JSX, Tailwind v4 (no config file — tokens in `src/app/globals.css`), shadcn/ui on `radix-ui`, Embla 8, lucide-react.
- `npm run dev` · `npm run build` (Turbopack — **not** `--webpack`; Turbopack measured mobile Lighthouse 68 → ~82) · `npm start` · `npm run lint` · `npm test` (`node --test src/lib`).
- Only **one** `next dev` per project is allowed. If it says "Another next dev server is already running", use the reported URL (the user often has one on **:3001**). Don't kill the user's server without asking. Port 3100 belongs to zelliny's server.
- The dev server can be reaped when memory is low — report it and don't auto-restart. Use a production build (`next build && next start -p 3300`) for Lighthouse, and stop it afterwards.

## 3. Architecture (follow it, don't reinvent)

```
src/app/page.js                 thin: composes sections with data from src/data/home.js
src/app/layout.js               metadata, JSON-LD, Header/Footer/FloatingRail/RevealObserver
src/data/{home,site,seo}.js     all content (CMS-shaped); site.js = header/footer/rail/menu
src/components/sections/home/*  one server component per section — NEVER "use client"
src/components/layout/common/*  shared pieces + the small client leaves
src/components/ui/*             shadcn primitives (button cva, sheet, navigation-menu)
```

- **Client components are leaves only:** CardCarousel (Embla), HeaderShell (scroll flag), VehicleMenu, RevealObserver, HeroVideo, HoverVideo, ShowcaseStage. Server content goes in as `children`. Check: `grep -rl '"use client"' src/components/sections` must be empty.
- **Carousels:** "Explore Lincoln Line" and "Lincoln Newsroom" use `CardCarousel` (Embla). Don't set overflow on the track yourself.
- **Scroll animation:** add `data-reveal` (fade-up) or `data-observe` (custom CSS) to elements. One `RevealObserver` (IntersectionObserver + MutationObserver) marks `data-visible`. CSS hides elements only under `@media (scripting: enabled) and (prefers-reduced-motion: no-preference)`. Stagger with `style={{ "--reveal-delay": "0.1s" }}`.
- **Hover/focus states:** use the custom variant `group-hocus:` (hover + focus-visible together) on `group` cards.
- **Buttons:** `ButtonLink` + `buttonVariants` (`light` / `dark`, size `lg`) — outline, filled slate on hover.
- **Multi-part Figma icons** (steering wheel, "Crafted by" logo) use `Composite` with part positions taken from Figma.

## 4. Styling rules

- **Breakpoints/container:** the global table (576/768/992/1200/1440/1600/1920) via literal `@media (min-width…)` and the `container` utility. Don't add new breakpoints.
- **Laptop scaling:** `--rr = clamp(0.75px, 100vw/1920, 1px)`.
  - From `xl` up, size things as `xl:text-fluid-N` (40 → 30 at 1440) or `xl:mt-[calc(N*var(--rr))]`.
  - 1920+ keeps the Figma px exactly; ≤ 1440 is ¾. Body text never drops below 14 px.
- **Spacing tokens:** `py-(--section-space)` for white sections and `py-(--band-space)` for full-bleed colour bands.
- **Colours (`@theme inline`):**
  - ink `#1b1b1b`, coal `#141211`, night `#231f20`, slate `#314148`, steel `#485b65`, silver `#c3c3c3`, ember `#e8634b`.
  - **ash is `#767676`, not Figma's `#929191`** (contrast fix — keep it).
- **Fonts:** Libre Caslon Text (display) + Figtree (sans) are **stand-ins** for the licensed LincolnMillerB / Lincoln Proxima Nova / Xenon Nue. Swap them in `src/app/fonts.js` via `next/font/local` when the files arrive.

## 5. Media and performance rules (client requirement: video must not affect page speed)

- **Videos** live in `public/videos/navigator-{1080,720}.mp4` (re-encoded from the client's 29.5 MB clip: no audio, H.264 CRF 28, `+faststart`). Sources are `{ mobile, desktop }` → `pickVideoSource`.
- **Hero:** the server-rendered poster image (`hero-poster.jpg` = first frame) is the LCP. `HeroVideo` sets `src` only on the first interaction or 4 s after `load`. **Starting it on idle-after-load dropped mobile Lighthouse to 54** — don't do that.
- **Model cards:** `HoverVideo` gets no `src` until the first hover/focus. On hover-out it pauses, fades out and rewinds to 0.
- **Showcase (Continental / Navigator):** `ShowcaseStage` + `ShowcaseVideoCard`. Hover swaps the section background to the video; click/tap/Enter pins it (`aria-pressed`); a second activation returns to the photo.
- All videos respect `prefers-reduced-motion` and Save-Data (`videoAllowed()`), are muted, use `playsInline`, and pause off-screen.
- Every slot uses the one Navigator clip for now; swap per model in `src/data/home.js`.
- **Images:** `next/image` everywhere, AVIF/WebP enabled. HTML `width`/`height` must be **integers** — put exact sub-pixel Figma sizes in `style`.
- **Lighthouse baseline** (mobile, simulated): ~80–86, noisy on this machine. Desktop 99–100. Always run ≥ 3 mobile passes and report the median with conditions.

## 6. SEO and indexing

- **Default is NO indexing** (QA requirement): `robots.txt` Disallow, meta `noindex, nofollow, noarchive`, `X-Robots-Tag` header, empty sitemap.
- The live deployment must set `NEXT_PUBLIC_ALLOW_INDEXING=true` and `NEXT_PUBLIC_SITE_URL=<domain>` (canonical/OG/sitemap fall back to localhost).
- Lighthouse SEO 69 is expected while noindex — don't "fix" it by removing noindex.
- Security headers are set in `next.config.mjs` (`poweredByHeader: false`). A CSP is still open (needs a nonce via proxy/middleware).

## 7. Client decisions and Figma deviations (already agreed — don't re-ask)

- **Explore model cards:** hover = Figma Variant2 (gradient, 3 specs, "—+") plus video.
- **Newsroom cards:** hover = "Read More" pill on the image (Figma card 2).
- **Header:** sticky — transparent over the hero, then solid `bg-night/95` and compact (wordmark folds away) after 10 px of scroll.
- **Vehicles mega menu:** opens on hover (shadcn NavigationMenu).
- **Mobile (no mobile design exists):** nav moves into the Menu Sheet with vehicle sub-links; the floating rail becomes a bottom icon bar below 768 px.
- **Removed from Figma:** the duplicate 4th footer address line.
- **Kept as designed but flagged** (awaiting the client):
  - The rail calendar label duplicates "Email or Call Me Back".
  - All four model cards show Navigator's specs.
  - All links are `#` placeholders; the language selector is inert.
- **Still missing assets:** licensed fonts; Aviator/Corsair/Nautilus mega-menu car cut-outs (only Navigator exists); per-model videos.

## 8. Mistakes made here — never repeat

1. **Testing hover with synthetic events.** Mega-menu items looked fine with `dispatchEvent` but a real mouse couldn't reach them (the header row and preview layer covered them). Always verify with real Playwright `hover`/`click`, and use `pointer-events-none` on overlay layers with `pointer-events-auto` on their controls.
2. **shadcn CLI imports `cn` from the npm package `cn`.** After `npx shadcn add`, fix the import to `@/lib/utils` and `npm uninstall cn`.
3. **tailwind-merge doesn't know custom utilities.** `text-fluid-*` was treated as a colour and silently dropped classes. Register new custom utilities in `src/lib/utils.js` (see its test).
4. **shadcn `outline-none` sets outline-style none,** so `focus-visible:outline-2` showed nothing. Add `focus-visible:outline-solid`. NavigationMenu content forces `outline-none` on links, so use an underline focus cue there.
5. **Radix NavigationMenu wraps the list in a `position:relative` div,** so absolute content can't span the header. The mega panel uses `md:fixed` inside the header.
6. **Radix Slot (`asChild`) concatenates classes without twMerge.** Put override classes on the shadcn wrapper (e.g. `NavigationMenuLink className=…`), not on the child `Link`.
7. **The Radix trigger inherits shadcn's `text-sm`** — add `text-[length:inherit]`. It also renders `<button>` without `type`, so add `type="button"`.
8. **Lighthouse accessibility "100" was misleading:** axe skipped the content hidden by `data-reveal`. Re-audit with all reveals forced visible (initScript setting `data-visible`).
9. **Figma colours can fail WCAG** (`#929191` was 3.14:1). Check contrast of small text and darken minimally, and tell the client.
10. **The reveal observer only watched nodes present at mount** — React remounts left content hidden. The MutationObserver in `RevealObserver` fixes this; keep it.
11. **Fixed widths overflowed at 320 px** (Legacy logo, header rows, footer rows). Run the 12-width overflow sweep (320 → 1920) after layout changes; use `flex-wrap` and `min()` sizing.
12. **Tooling on Windows:**
    - Never `cd` into `.next` (it locks the build).
    - `npm i` in a folder without `package.json` walks up to `C:\Users\INTERSMART\package.json` — install temp tools with `--prefix <scratchpad dir>` or download binaries directly.
    - `chrome.exe --version` launches a browser; read the version from the Lighthouse JSON instead.
    - Playwright MCP screenshots may only be saved inside the project; delete `.playwright-mcp/` afterwards.
13. **WebKit reports `naturalWidth 0` for sub-pixel SVGs** — not broken. Compare screenshots before "fixing".
14. **Never use the Figma screenshot as an asset;** download every asset via `get_design_context` URLs (`http://localhost:3845/assets/...`). Video fills can't be exported — ask the client.

## 9. Working preferences (user)

- **Never guess:** read Figma/code first, and flag (not silently fix) Figma mistakes.
- **Keep token usage low:** reuse assets, components and patterns; don't re-fetch Figma data that's already noted here.
- **Component-based and server-first** (handbook "SSR" rules); minimal client JS.
- **Smooth, subtle, section-based scroll animations;** hover states follow the Figma prototypes.
- **Verify in a real browser** (1920 / 1440 / 390 + the overflow sweep) and run lint + build before calling work done. Report test results honestly with numbers.
