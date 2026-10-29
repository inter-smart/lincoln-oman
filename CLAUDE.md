# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Lincoln — Project Notes for AI Sessions

**Next.js here is not the Next.js you know** (`AGENTS.md`): read the relevant guide in `node_modules/next/dist/docs/` before writing Next-specific code.

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
  - **On Node 22 `npm test` fails with `MODULE_NOT_FOUND`** (the directory is read as a file). Run all tests with `node --test "src/lib/**/*.test.*"` and one with `node --test src/lib/meta-tags.test.js`. Tests only cover pure `src/lib` code (no `server-only`, no `@/` alias in the files under test).
  - Env vars (`.env.local`): `CMS_API_URL`, `CMS_API_TOKEN` (server-only bearer token), `CMS_MEDIA_HOST` (adds the CMS image host to `next/image` `remotePatterns`). A missing URL/token fails the request with an `ApiError`, not at import. Forms also need `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` + `RECAPTCHA_SECRET_KEY` (reCAPTCHA v3; without the site key submit shows a "spam check" error).
- Only **one** `next dev` per project is allowed. If it says "Another next dev server is already running", use the reported URL (the user often has one on **:3001**). Don't kill the user's server without asking. Port 3100 belongs to zelliny's server.
- The dev server can be reaped when memory is low — report it and don't auto-restart. Use a production build (`next build && next start -p 3300`) for Lighthouse, and stop it afterwards.

## 3. Architecture (follow it, don't reinvent)

```
src/app/<route>/page.js         server page: fetch via apiGet, pass backend objects to section components
src/app/layout.js               JSON-LD, Header/Footer/FloatingRail/RevealObserver
src/lib/api/{get,post,http}.js  apiGet / apiPost -> send (the only code that reads the token)
src/lib/api/request.js          pure helpers (ApiError, buildUrl, unwrapEnvelope) — testable
src/lib/meta-tags.js            metadataFromTags: banner.other_meta_tags -> Metadata fields (used by buildMetadata)
src/lib/seo.js                  buildMetadata(): title/description/keywords + canonical
src/lib/{owners-sections,split-media-html,list-items}.js   pure CMS-HTML parsers (unit-tested)
src/data/{site,seo,owners,legal}.js   header/footer/rail/menu content, SEO defaults, static labels
src/components/sections/<page>/*      one server component per section — NEVER "use client"
src/components/layout/common/*        shared pieces (InnerBanner, Breadcrumb, EnquiryForm) + small client leaves
src/components/ui/*                   shadcn primitives (button cva, sheet, navigation-menu)
```

### Data layer (PHP CMS API)

- **API-driven routes:** `/` (`/home`), `/about`, `/newsroom` and `/newsroom/[slug]` (`/news/${slug}`), `/lincoln-certified`, `/owners`, `/contact-us` (components take the backend blocks as-is: `ContactIntro data={contact_cms} form={…}`, `ContactLocations contact_addresses`, `DepartmentContact data={contact_cms} department_contacts`; `description` and `working_hours_description` are CMS HTML; `ContactIntro` is shared with request-a-quote / book-a-test-drive, whose local data uses the same `description` / `enquiry_title` names), `/gallery` (`/galleries`; one video item + image items, tile sizes repeat a fixed pattern in `GalleryGrid`), `/special-offers` (location filter `?location_id=<id>`, "Load More" link `?page=N` = pages 1..N) and `/special-offers/[slug]` (`/special-offers/${slug}`; meta fields come in a top-level `meta_tags` block, title falls back to the offer title), `/privacy-policy` and `/terms-and-conditions` (`/policies/${slug}`; HTML in `policy.content`, meta fields sit on `policy` itself, banner in `policy.banner`; the breadcrumb is local in `src/data/legal.js`). The rest (vehicles, request-a-quote, book-a-test-drive) still use static `metadata` and `src/data/*` content. To integrate one, copy the pattern below (`src/app/owners/page.js` is the most complete example).
- **Layout data:** `layout.js` fetches `/site-settings` (`address` HTML, `phone_number`, `email`; `whatsapp_number` and `map_link` are placeholders and unused) with `revalidate: 3600`, so the static routes stay static. It never calls `notFound()`: on failure `settings` is `null` and the footer omits those details. The footer renders `address` as HTML; the JSON-LD uses `addressLines()` (`src/lib/address-lines.js`). Nav, rail, footer link columns and social links stay in `src/data/site.js`.
- **Flow:** the page calls `apiGet("/endpoint")` (`src/lib/api/get.js`; paths are plain strings in the page) → `send` (`http.js`, `server-only`, the only code that reads the token; unwraps the `data` envelope) → the page hands the raw backend objects to the section components. **No mappers, no constants files:** components read the backend field names directly (`section.title`, `section.button_name`, `slide.media_type`, `news.published_on` …). To see the shape, `console.log` the page data or curl the endpoint with the bearer token. **Exception:** when the CMS sends one rich-text blob that must become several layout blocks (Owners), a pure parser in `src/lib` does the splitting (`ownersSections`, `splitMediaHtml`, `listItems`) and has a `*.test.js`. Keep such parsers free of `server-only` and `@/` imports so `node --test` can run them.
- **Page pattern:** `const getX = cache(() => apiGet("/x"))` at the top of the page (so `generateMetadata` and the page share one fetch), then destructure the response and pass e.g. `<Legacy data={home_cms.section_two} />`. `apiGet` never throws: it returns `{ data, error }` (error is the `ApiError`, also logged with `console.error`). Every page starts with `if (error || !data) notFound()` (in both `generateMetadata` and the page), so any API failure shows the 404 page. A missing field inside a successful response is not guarded. `apiPost` still throws (form errors need `error.details`).
- **Rich-text fields arrive as HTML** (`description`): render with `dangerouslySetInnerHTML` on the element that already carries the classes. Home `section_five` description carries Tailwind classes inside the CMS HTML, so those classes are safelisted with `@source inline(...)` in `globals.css` — keep them in sync with the CMS. `section_six` (Ownership) is different: `Ownership.jsx` keeps its own `<ul>/<li>` markup and takes only each `<li>`'s content from the CMS list (bullet `<img>`s are stripped; the component draws the bullet).
- Values the API doesn't send (labels like "View More" / "Read More", `/vehicles/${slug}`, `/newsroom/${slug}` links) are written inline in the component. `REVALIDATE` is `0` (go-live values 3600/900/300 are noted in `get.js`).
- Backend links come through untouched (the CMS sends `/contact`, absolute URLs …): fix them in the CMS, not in the code.

### Forms (react-hook-form + zod + reCAPTCHA v3)

- Schemas: `src/lib/validation/{patterns,fields,forms}.js` (pure, tested). One schema per form key: `contact`, `offer`, `quote`, `testDrive`. Free text is **rejected** (not stripped) when it holds HTML, script URLs, template/SQL/shell syntax or control chars (`isPlainText`). Phone = E.164 style, normalised.
- Client: `FormShell` (`useForm`, `mode: "onChange"`, loads the reCAPTCHA script lazily, shows status) + field leaves in `FormFields.jsx`. `EnquiryForm` (pill variant, `data.formKey`) and `ContactIntro` (underline variant, `data.form.formKey`) stay server components.
- Server: `src/app/actions/forms.js` `submitForm(formKey, values, token)` re-validates, verifies the token (`src/lib/recaptcha.js`, score ≥ 0.5, action = form key), maps UI names to the Laravel payload and `apiPost`s. Per-endpoint field names differ (`phone_number`, `vehicle_id`, consent flags): change them only in that file. 422 `errors` are mapped back onto fields.
- Vehicle dropdowns come from `GET /vehicle-models` (`withVehicleOptions`). Owners (`owners`) and Special Offers list (`offers`) forms post to `/page-enquiries` (name, email, subject, message + `type` `owners`/`offer`); the offer detail form posts to `/special-offer-enquiries`.
- `src/app/book-a-test-drive/thank-you` exists but is not linked from the form yet.

### Adding an API page (checklist)

1. `const getX = cache(() => apiGet("/x"))` in `src/app/<route>/page.js`; start `generateMetadata` and the page with `if (error || !data) notFound()`.
2. `generateMetadata` → `buildMetadata({ title, description, keywords, otherMetaTags }, "/route")` from the `banner` block (for detail pages the block is `news.meta_tags`).
3. Render `<InnerBanner data={{ title: banner.banner_title, media: { url: banner.banner, alternativeText: banner.banner_alt_text } }} />`, `<Breadcrumb />`, then the section components.
4. Hide a section when the CMS sends it empty (see `hasContent`/`textOf` in the Owners page) instead of rendering an empty shell.
5. Static labels, breadcrumbs and form copy the API doesn't send go in `src/data/<page>.js`.

### Page metadata

- The `banner` block carries `meta_title`, `meta_description`, `meta_keywords`, `other_meta_tags`. Every head tag comes from `generateMetadata() → buildMetadata({ title, description, keywords, otherMetaTags }, "/path")` (`src/lib/seo.js`); pages render nothing for metadata in the body. `buildMetadata` also sets `alternates.canonical` (and `og:url`) to the absolute URL of the page (`siteUrl` + path).
- `other_meta_tags` is a raw HTML string from the CMS. `metadataFromTags()` (`src/lib/meta-tags.js`, tested) maps what Next can render: `name=` metas → `other`, `og:image*` → `openGraph.images`, `twitter:image/site/creator` → `twitter`, `<link rel=alternate hreflang>` → `alternates.languages`. **Everything else is dropped** (JSON-LD, `itemprop`, other `property=` tags: Next's `metadata.other` only writes `name=`). Tags `buildMetadata` already sets (title, description, og:url/site_name/locale/type, twitter:card), `robots` and canonical are ignored, so the CMS can't override noindex or add a second canonical.
- **Known gap:** `layout.js` has no `export const metadata` since `e13d6d5` (`metadataBase`, title template, canonical, robots noindex meta are gone; `X-Robots-Tag` and `robots.txt` still enforce noindex). The unused `title`/`description`/`allowIndexing` imports there are leftovers. Don't assume the noindex *meta* tag exists.

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
- **Reviewer's responsive ladder (commit `6ae8ceb`): follow it on every new section.** Full tables and review in `POST-BUILD-CHANGES.md`.
  - **Type:** title 24 → sm 28 → md 30 → xl fluid-40. Body `text-sm` → sm 15 → xl fluid-16. Footer/meta 14 → sm 16. Pin the final Figma px at `2xl`/`3xl` only when it differs from the fluid value.
  - **Gaps:** mobile ≈ half of desktop, with steps at sm/lg/xl/2xl (e.g. `pt-10 sm:pt-[50px] lg:pt-[70px] xl:pt-[calc(113*var(--rr))] 2xl:pt-[90px]`). List gaps `gap-2.5 sm:gap-[19px]`.
  - **Radius:** `rounded-[10px] sm:rounded-[15px] 2xl:rounded-[20px]`.
  - **Code:** run Prettier (`prettier-plugin-tailwindcss`) before committing. Prefer Tailwind scale classes (`mt-10`, `left-5`) for on-scale values. Size icon boxes with `aspect-W/H w-* h-auto` + `size-full object-contain`. Never commit commented-out JSX.
- **Fonts:** Libre Caslon Text (display) + Figtree (sans) are **stand-ins** for the licensed LincolnMillerB / Lincoln Proxima Nova / Xenon Nue. Swap them in `src/app/fonts.js` via `next/font/local` when the files arrive.

## 5. Media and performance rules (client requirement: video must not affect page speed)

- **Videos** live in `public/videos/navigator-{1080,720}.mp4` (re-encoded from the client's 29.5 MB clip: no audio, H.264 CRF 28, `+faststart`). Sources are `{ mobile, desktop }` → `pickVideoSource`.
- **Hero:** the server-rendered poster image (`hero-poster.jpg` = first frame) is the LCP. `HeroVideo` sets `src` only on the first interaction or 4 s after `load`. **Starting it on idle-after-load dropped mobile Lighthouse to 54** — don't do that.
- **Model cards:** `HoverVideo` gets no `src` until the first hover/focus. On hover-out it pauses, fades out and rewinds to 0.
- **Showcase (Continental / Navigator):** `ShowcaseStage` + `ShowcaseVideoCard`. Hover swaps the section background to the video; click/tap/Enter pins it (`aria-pressed`); a second activation returns to the photo.
- All videos respect `prefers-reduced-motion` and Save-Data (`videoAllowed()`), are muted, use `playsInline`, and pause off-screen.
- Every slot uses the one Navigator clip for now; the home/about videos now come from the API (`video` fields).
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
