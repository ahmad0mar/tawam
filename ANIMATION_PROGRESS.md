# Animation progress

Source of truth: `tawam-animation-plan.md`. Work one phase at a time; stop after each phase.

| Phase | What                              | Status              |
| ----- | --------------------------------- | ------------------- |
| 0     | Foundations                       | **Done (verified)** |
| 1     | Loading screen + page transitions | **Done**            |
| 2     | Hero, buttons, header             | **Done**            |
| 3     | The India map                     | **Done**            |
| 4     | Sections                          | **Done**            |
| 5     | Detail pages                      | **Done**            |
| 6     | Polish and testing                | **Done**            |

---

## Phase 0: what was done

1. **Motion tokens** added to `src/assets/styles/tailwind.css` (`:root`, prefixed `--aw-`: `--aw-motion-fast/base/slow/hero`, `--aw-ease-out`, `--aw-ease-pop`, `--aw-reveal-distance`, `--aw-stagger`). Prefixed because Tailwind v4 owns the `--ease-*` theme names.
2. **Global reduced-motion rule** added at the end of `tailwind.css`: with "reduce motion" on, animations jump to their end frame and transitions are instant.
3. **`js:` guard on reveal items.** New Tailwind variant `@custom-variant js (&:where(.js *))`. All 32 uses of `motion-safe:md:opacity-0` (22 files) are now `js:motion-safe:md:opacity-0`, so items only start hidden once scripts are running.
4. **`js` flag script** added to `src/layouts/Layout.astro` `<head>`. It also re-adds the class on `astro:after-swap`, because the router replaces `<html>` attributes on every client-side navigation.
5. **Map navigation:** the three `window.location.href = url` calls in `IndiaMap.astro` (desktop click, mobile second tap, keyboard Enter) now call `goTo(url)`, which clicks a temporary real link so the router handles it (soft navigation, no full reload). That script is `is:inline`, so it cannot import `navigate()`. Phase 3 rebuilds it.
6. **Plan file** `tawam-animation-plan.md` added to the project root (token names updated to the `--aw-` prefix, two findings corrected).

### Changed files

`src/assets/styles/tailwind.css`, `src/layouts/Layout.astro`, `src/components/widgets/IndiaMap.astro`, plus the 22 files where `motion-safe:md:opacity-0` became `js:motion-safe:md:opacity-0` (blog: RelatedPosts, SinglePost; ui: Timeline, WidgetWrapper; widgets: Bento, Content, FAQs, Features, Features2, Features3, Gallery, Hero, Hero2, HeroText, Integrations, Pricing, Projects, Quote, Stats, Team, Testimonials, Timeline). No text, routes, data or images were changed.

### Findings that differ from the plan

- **Faded card text / navy block under photos (earlier screenshots):** not reproducible from this version's code. Blog and guide cards use full-strength colours (`#011B4A`, `#2B3A5A`) and a 16:9 `object-cover` image box. Likely already fixed. **Needs a visual check in the browser.** No change made.
- **Hidden-until-JS risk was smaller than the plan said:** with JavaScript off, reveal items still fade in on load. The `js:` guard is a safety net.
- **`Stats` widget is not used on any page.** Phase 4's "count-up" must use it or add count-up to the home page's own trust strip.

### Reveal classes: keep / remove / replace

`WidgetWrapper` (generic fade-up on every section) is the main source of the "everything fades up" look. Nothing was changed in Phase 0; this is the list for later phases.

| Component                                                                                                              | Used by a live page?                                                       | Decision                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `ui/WidgetWrapper`                                                                                                     | Yes, via BlogLatestPosts, CallToAction, Features*, Steps, Contact and more | **Replace (Phase 4):** keep reveal on only one group per page; remove the section-level fade elsewhere |
| `widgets/Hero`                                                                                                         | Yes (home, about)                                                          | **Replace (Phase 2):** hero image block fade becomes the new hero sequence                             |
| `widgets/Features`                                                                                                     | Yes (home, Disciplines)                                                    | **Keep (Phase 4):** one staggered reveal                                                               |
| `widgets/Features2`                                                                                                    | Yes (contact)                                                              | Keep for now                                                                                           |
| `widgets/Features3`                                                                                                    | Yes (about)                                                                | Keep for now                                                                                           |
| `widgets/HeroText`                                                                                                     | Yes (contact)                                                              | Keep for now                                                                                           |
| `blog/SinglePost`, `blog/RelatedPosts`                                                                                 | Yes (blog posts)                                                           | **Remove entrance fade (Phase 4/5):** reading content stays still                                      |
| `ui/Timeline`, `widgets/Timeline`                                                                                      | Only via `Steps` (check it is rendered on the home page)                   | **Replace (Phase 4)** with the scroll-linked admission journey, if approved                            |
| `widgets/Stats`                                                                                                        | **No**                                                                     | Wire up in Phase 4 (see above)                                                                         |
| `Bento`, `Content`, `FAQs`, `Gallery`, `Hero2`, `Integrations`, `Pricing`, `Projects`, `Quote`, `Team`, `Testimonials` | **No (unused template widgets)**                                           | Leave alone; consider deleting later                                                                   |
| `common/Intersect.astro`                                                                                               | Yes (layout)                                                               | **Keep and tune**                                                                                      |

### Not verified (important)

- **This phase was NOT built or run.** The environment had no `node_modules` and no network, so `npm run build` and `npm run check` could not run. The two edited inline scripts pass a JavaScript syntax check, and a search confirms no unguarded `motion-safe:md:opacity-0` and no `window.location.href` remain in the map.
- **Before starting Phase 1, run:** `npm install`, `npm run build`, `npm run check`.
- **If the build fails or reveal animations stopped working:** the most likely cause is the `@custom-variant js` line in `tailwind.css`. Tell the next session to check that first.

### Browser checklist for Phase 0 (desktop and 360px phone width)

1. Home page: sections still fade in as you scroll (once). Hero image block still appears.
2. Click a state on the map (desktop): you go to the state page **without a white flash/full reload** (the browser tab does not show a reload).
3. On a phone-width view: first tap on a state selects it and updates the panel; second tap goes to the state page.
4. Click Home in the header after visiting another page; scroll down: the map still works and reveals still play (the `js` flag survives page changes).
5. Turn on "reduce motion" in your OS settings: nothing animates; all content is visible immediately.
6. Look at /blog and /exams: card titles dark navy, no dark block under photos. Report anything that still looks faded.

---

## Phase 1: what was done

1. **Loading screen (`src/components/common/Preloader.astro`)**:
   - Home page only (`showPreloader` prop on `Layout.astro` / `PageLayout.astro`, enabled in `src/pages/index.astro`).
   - Full-screen `#011B4A` navy overlay (`aria-hidden="true"`) with the Tawam Travels logo in a crisp white badge (so the original navy/gold logo colours remain legible), fading in and scaling `0.96 -> 1`, followed by a `3px` `#D08701` gold line drawing left-to-right (`scaleX(0) -> scaleX(1)`).
   - Once per session via `sessionStorage.getItem('aw_visited')` (wrapped in `try/catch`). An inline `<head>` script in `src/layouts/Layout.astro` sets `html.aw-preloader-skip` before first paint on repeat visits or when `prefers-reduced-motion: reduce` is enabled, and re-applies it on `astro:after-swap`.
   - Ends when fonts/page are ready (minimum ~1.05s so the sequence completes cleanly) with a **2.5s hard cap**, then lifts upward (`translateY(-100%)`) and dispatches `aw:preloader-done` for Phase 2's hero sequence.
   - Pure CSS fail-safe (`awPreloaderFailsafe` at `2.5s`) ensures the site is usable within 2.5s even if JavaScript fails or is disabled.
2. **Page transition curtain (`src/components/common/PageCurtain.astro`)**:
   - Rendered in `src/layouts/Layout.astro` with `transition:persist="aw-page-curtain"` at `z-30` (below the `z-40` header and WhatsApp button, covering `<main>` and `<footer>`).
   - Hooks into Astro's `ClientRouter` events (`astro:before-preparation`, `astro:page-load`, and `event.signal` abort): wraps `event.loader` so the fetch starts immediately in parallel with the `220ms` navy cover sweep (`3px` gold leading edge), shows a subtle gold progress shimmer if loading takes longer than `260ms`, and lifts upward (`280ms`) on `astro:page-load` (with a `3s` safety cap).
   - Back/forward navigation (`navigationType === 'traverse'`) uses a shorter `150ms` fade; same-page/hash links and `prefers-reduced-motion: reduce` skip the curtain.
3. **Persisted floating WhatsApp button (`src/components/common/WhatsAppFloating.astro`)**:
   - Added `transition:persist="aw-whatsapp-floating"` so it stays in place across page transitions alongside the persisted header.
4. **Phase 0 verification & ESLint fix (`src/layouts/Layout.astro`)**:
   - Fixed the `no-var` ESLint error (`var root` -> `const root`) in the `<head>` inline script.

### Changed / added files

- Added: `src/components/common/Preloader.astro`, `src/components/common/PageCurtain.astro`
- Edited: `src/layouts/Layout.astro`, `src/layouts/PageLayout.astro`, `src/pages/index.astro`, `src/components/common/WhatsAppFloating.astro`, `ANIMATION_PROGRESS.md`

---

## Phase 2: what was done

1. **Home hero sequence (`src/components/widgets/Hero.astro`, `src/pages/index.astro`)**:
   - Split the home hero `<h1>` into two masked lines at build time (`aw-hero-line-mask` / `aw-hero-line`, `560ms` `--aw-ease-out`, `80ms` stagger, finishing in `640ms` < `900ms`).
   - Subtitle (`180ms` delay) and action buttons (`260ms` delay) fade up `12px` (`--aw-reveal-distance`) after the headline.
   - Hero background photo settles from `scale(1.06)` to `scale(1)` once over `900ms` (`--aw-motion-hero`).
   - Waits for `aw:preloader-done` on the initial visit (or plays immediately on repeat visits / client-side navigation), guarded under `html.js` and disabled under `prefers-reduced-motion: reduce`.
   - Removed the old generic `intersect:` fade from the hero image container in `Hero.astro`.
   - Stream cards (row 4) were intentionally **not** built yet, pending layout approval.
2. **Gold button micro-interactions (`src/assets/styles/tailwind.css`)**:
   - Added a diagonal light sweep (`::after`) on `.btn-primary:hover` (`520ms` `--aw-ease-out`) and a subtle press-down (`active:scale-[0.98]`) on `.btn`.
3. **Header scroll & nav underline (`src/assets/styles/tailwind.css`)**:
   - Smoothed the header background/shadow transition on scroll (`#header.scroll`), and added a left-to-right sliding underline (`::after`, `scaleX(0) -> scaleX(1)`) on desktop top-level nav links and dropdown buttons for hover, focus-visible, and `.aw-link-active`.

### Changed files

- `src/components/widgets/Hero.astro`, `src/pages/index.astro`, `src/assets/styles/tailwind.css`, `ANIMATION_PROGRESS.md`

---

## Visual Redesign (Phases 1–7): Completed

- **Phase 1 (Tokens, Header, Hero)**: Added `--tt-*` design tokens in `CustomStyles.astro`, pill gold gradient & glass buttons in `tailwind.css` / `Button.astro`, reusable `Section.astro`, `SectionHeader.astro`, `Card.astro`, floating translucent `Header.astro`, and full-viewport `Hero.astro` with 5 landmark city glass cards.
- **Phase 2 (About Band)**: Added `AboutBand.astro` (`#FBF3E4` cream, mandala watermark, 4 icon features, soft-masked heritage photo + pull-quote).
- **Phase 3 (Dark Disciplines Band)**: Added `DisciplinesJourney.astro` (`#0B2A3A` teal-navy vertical timeline for the 4 streams with thumbnails and desktop-only vertical label).
- **Phase 4 (Top Study Destinations)**: Added `StudyDestinations.astro` (4 tall destination cards, live state counts from `colleges` + `states.json`, expandable 36-state accordion, dynamic college count on Featured Institutions).
- **Phase 5 (How It Works + Blog)**: Added `CounsellingSteps.astro` (3-step timeline with gold numbered circles and WhatsApp clearance) and restyled `BlogLatestPosts.astro` + `GridItem.astro` (`20px` rounded `16:10` cards, `Read more →`).
- **Phase 6 (CTA Inquiry + Footer)**: Added `InquiryCtaBand.astro` (dusk waterfront photo, glass inquiry form with validation + WhatsApp deep-link support) and updated `Footer.astro` + `navigation.ts` (social icons, italic tagline, copyright, legal links).
- **Phase 7 (Polish & QA)**: Polished mobile expanded header drawer, added keyboard focus-visible ring to the 36-state accordion, verified single `<h1>` per page, WebP `<Image>` optimization, lazy-loading below the fold, and `prefers-reduced-motion` support.

### Remaining TODOs (Client / Backend)

1. Fill in real phone, WhatsApp, email, office address, and social URLs in `src/data/site.ts`.
2. Wire `InquiryCtaBand.astro` and `src/pages/contact.astro` to a form backend (Formspree, Netlify Forms, or an Astro API endpoint) if email/CRM capture is needed beyond WhatsApp.
