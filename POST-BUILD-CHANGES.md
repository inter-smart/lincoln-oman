# Post-build changes — review and rules for future builds

Source: commit `6ae8ceb` (abish, 2026-10-21), "Refactor components…; add Prettier…; include Lincoln logo SVG".
Compared against the AI build (`d989334`). About 60 % of the diff is Prettier reformatting (class sorting, wrapped JSX). The rest is real changes to size, spacing and radius, listed below.

Breakpoints used here: base < 576 · `sm` 576 · `md` 768 · `lg` 992 · `xl` 1200 · `2xl` 1440 · `3xl` 1600 · `4xl` 1920.

---

## 1. What changed

### 1.1 Font sizes: smaller on mobile, stepped at `sm`, capped at `2xl`/`3xl`

The AI build used one size below `xl` and scaled fluidly from `xl` up. The reviewer added a **mobile step down**, a **`sm` step** and **fixed caps at `2xl`/`3xl`**.

| Element | Before (AI build) | After (reviewer) |
|---|---|---|
| `.title` utility (all section h2) | 28 → md 30 → xl fluid 40 | **24** → sm 28 → md 30 → xl fluid 40 |
| Body paragraphs (Legacy, ModelShowcase) | 15 → xl fluid-16 | **14 (`text-sm`)** → sm 15 → xl fluid-16 |
| Ownership list items | 19 → xl fluid-25 | **14** → sm 16 → xl fluid-25 → **2xl 19** |
| ModelCard name | 19 → xl fluid-25 | **18 (`text-lg`)** → xl fluid-25 → **2xl 19** |
| ModelCard specs | 13 → 3xl 14 | **10** → 2xl 13 → 3xl 14 |
| NewsCard title | 18 → xl fluid-23 | **14** → sm 15 → xl fluid-23 → **3xl 18** |
| NewsCard "Read more" | 14 | **13** → sm 14 |
| Footer column headings, address, legal row | 16 (inherited) | **14** → sm 16 |
| Footer links | 16 (inherited) | **14** → sm 16 (now inside `linkHover`, with `leading-[1.2] font-normal text-white`) |

Pattern: **base (< 576) = 14 px body / 24 px title; `sm` brings back the tablet size; `xl` stays fluid; `2xl`/`3xl` pins the final Figma px.**

### 1.2 Gaps and spacing: tighter on mobile

| Where | Before | After |
|---|---|---|
| Footer top padding | 90 → xl calc(113) | **40** → sm 50 → lg 70 → xl calc(113) → 2xl 90 |
| Footer link list gap | 19 | **10 (`gap-2.5`)** → sm 19 |
| Footer bottom row margin | 60 | **40 (`mt-10`)** → sm 60 |
| NewsCard "Read more" margin | 18 | **10 (`mt-2.5`)** → sm 18 |
| ModelShowcase media gap | xl calc(43·rr) | **xl 20 (`gap-5`) → 2xl 45 (`gap-11.25`)** |
| ModelCard specs row | top 77 % | **73 %** → 2xl 77 % |
| ModelCard name | left 25 | **20 (`left-5`)** → 2xl 25 |
| Legacy logo height | min(110, (100vw−32)/2.884) | min(110, **(100vw−100)**/2.884) — narrower on phones |

### 1.3 Corner radius: stepped too

Cards and media went from a fixed `rounded-[20px]` to **10 → sm 15 → 2xl/3xl 20** (ModelCard: 2xl; ModelShowcase media: 3xl).

### 1.4 Coding style

- **Prettier + `prettier-plugin-tailwindcss`** (`.prettierrc.json`, pointed at `globals.css`), so class order is now sorted automatically. Long JSX props wrap one per line.
- **Tailwind's spacing scale over arbitrary px** where a value exists: `left-5`, `mt-10`, `gap-2.5`, `w-7.5`, `w-33.75`, `right-6.25`. The existing `[..px]` values were left alone.
- **`aspect-W/H` + `w-*` + `h-auto`** to size icon/logo wrappers, with the image as `size-full object-contain` inside (ModelCard plus icon, Logo).
- `&&` JSX wrapped in parentheses; imports reordered.

### 1.5 Logo

`Logo.jsx` now renders `public/images/lincoln-logo.svg` (135 × 120) at `w-33.75 aspect-135/120`. The old two-crop PNG markup is commented out.

---

## 2. Review: problems to fix or confirm

1. **Regression: the compact header no longer folds away the wordmark.** The `group-data-scrolled/header:grid-rows-[0fr]` span is inside the commented-out block, so the logo stays full size after scrolling. That breaks an agreed client decision (CLAUDE.md §7). Fix: put the fold back on the SVG's wordmark half, or confirm with the client that it was dropped on purpose.
2. **`lincoln-logo.svg` is a PNG inside an SVG wrapper** (`data:image/png` pattern fill). It is 13.8 KB against 9.7 KB for `logo.png`, and it is not vector, so it won't be sharper. Get a real vector export from Figma, or keep the PNG.
3. **`alt="Lincoln Logo"` inside a link that has `aria-label="Lincoln home"`.** The aria-label wins, so the alt is redundant, and "Logo" is noise for screen readers. Use `alt=""` inside the labelled link.
4. **Commented-out code is committed** (Logo.jsx and the duplicate outlined-word `<p>` in ModelShowcase.jsx). Delete it; git keeps the history.
5. **`xl:text-fluid-25 2xl:text-[19px]` is almost a no-op.** fluid-25 is 18.75 px for 1200–1439, and from 2xl it pins 19. So the old 25 px at 1920 is gone. If Figma says 19, replace both with `text-[19px]` (or `xl:text-fluid-19`). If it says 25, the cap is wrong. **Check against Figma** (ModelCard name, Ownership items).
6. **NewsCard title `3xl:text-[18px]` overrides `xl:text-fluid-23`** at ≥ 1600, so 1920 shows 18 instead of 23. Same question: check against Figma.
7. **Body text under 14 px:** ModelCard specs are 10 px below 1440 and NewsCard "Read more" is 13 px below 576. That breaks the project rule "body text never below 14 px". Specs are short labels (10 px is legible but small); confirm with the reviewer or go to `text-xs` (12).
8. **ModelShowcase gap `xl:gap-5 2xl:gap-11.25`** is a hard jump from 20 to 45 at 1440, where `calc(43*var(--rr))` used to scale smoothly. Figma says 43, not 45.
9. **Prettier is not installed locally**: `npx prettier --check src` fails with "Cannot find package 'prettier-plugin-tailwindcss'". Run `npm install`. Lint is clean (1 old warning in `postcss.config.mjs`).

---

## 3. Rules for future builds (this project and the next pages)

**Font-size ladder.** Always write all steps, not just base + `xl`:

| Role | base (< 576) | `sm` 576 | `md` 768 | `lg` 992 | `xl` 1200 | `2xl` 1440 / `3xl` 1600 |
|---|---|---|---|---|---|---|
| Section title (`.title`) | 24 | 28 | 30 | 30 | fluid-40 | (fluid reaches 40 at 1920) |
| Hero / showcase display | 28 / 32 | — | 30 / 44 | — | fluid-40 / fluid-60 | — |
| Lead/body paragraph | 14 (`text-sm`) | 15 | 15 | 15 | fluid-16 | — |
| List items / card names (Figma ~19) | 14–18 | 16 | — | — | fluid-N | pin Figma px at `2xl` |
| Card title (Figma 18) | 14 | 15 | — | — | fluid-N | pin at `3xl` |
| Small links / meta | 13–14 | 14–16 | — | — | — | — |
| Footer text | 14 | 16 | — | — | — | — |

- Mobile (< 576) sizes run about 15–20 % below tablet. Bring them back at `sm`.
- Use `xl:text-fluid-N` only when N is the 1920 Figma value. Don't stack a `2xl` px cap that cancels it (see review item 5).
- Keep body ≥ 14 px; any exception (micro-labels) must be confirmed.

**Gaps and spacing.**
- Every large vertical gap gets a mobile value about half of desktop, with steps at `sm`/`lg`. Example: footer `pt-10 sm:pt-[50px] lg:pt-[70px] xl:pt-[calc(113*var(--rr))] 2xl:pt-[90px]`.
- List gaps: mobile 10 (`gap-2.5`) → `sm` design value.
- Absolute offsets inside cards: mobile 20 (`left-5`) → `2xl` Figma value.

**Radius.** Cards and media: `rounded-[10px] sm:rounded-[15px] 2xl:rounded-[20px]`.

**Code style.**
- Run `npx prettier --write` on changed files before committing (the Tailwind plugin sorts classes).
- Prefer Tailwind scale classes (`mt-10`, `gap-2.5`, `left-5`) when the px value is on the 4 px / 0.25-step scale; keep `[Npx]` for off-scale Figma values.
- Size icon/logo boxes with `aspect-W/H w-* h-auto` and put the image in as `size-full object-contain`.
- Don't commit commented-out JSX.
- Plain `@media (min-width…)` in CSS utilities (as in `.title`); no breakpoint mixins/variables.
