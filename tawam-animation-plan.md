# Tawam Travels: Animation Plan (version 2)

**Goal:** make the site eye-catching and animated, but only where motion helps. Everything else stays still, fast and readable.

**Who this is for:** you (to approve), and whoever or whichever AI builds it (to follow, phase by phase).

---

## 0. What changed in this version

You asked for four things and sent new references. All are now in the plan.

| You asked for | Where it is now |
|---|---|
| A better map: states should **pop up** instead of just turning orange | Section 7 (map spec) |
| A **loading animation** | Section 8 (loading spec). I had advised against a preloader; since you want one, it is designed to stay short and fast |
| An animation when you **click the map** | Section 7.3 |
| An animation when you **go to another page** | Section 9 (page transition spec) |
| New references (India Escapes mockup, Columbus Travel, Nexola, Vita) | Section 3 |

**One bug found that blocks page transitions:** clicking a state on the map currently reloads the whole page (`window.location.href` in `IndiaMap.astro`, 3 places). A full reload skips the site's smooth page-change system, so no transition could ever play from the map. Phase 0 fixes this.

---

## 1. The one-minute version

- **Keep the brand rules.** Navy and gold, Playfair Display + Inter, no new colours, one gold animated thing per screen. Motion is added on top; it does not change the look.
- **One signature moment: the India map.** States lift off the page like physical tiles when you hover or tap them, with a soft shadow. Clicking gives a ripple, the side panel swaps smoothly, and the page changes with a curtain transition.
- **A short, honest loading screen** on the home page, once per visit.
- **Build it with light tools.** CSS first, the project's existing scripts second, a tiny library only if needed. Do **not** copy Vue Bits components wholesale (section 5).
- **Work in 7 phases** (0 to 6), each testable on its own.
- **Phones come first.** Most visitors will be on mid-range Android phones over mobile data, so speed matters more than flash.

---

## 2. What I looked at (and what I could not)

| Source | What I got | Limit |
|---|---|---|
| Your project zip | Read the code: config, `TAWAM_PROJECT_PLAN.md`, in-repo design skill, Hero, IndiaMap (markup and script), Stats, Intersect, Layout, Logo, pages list | I did **not** run the site, so I have not seen how it looks now. Some bugs from your earlier screenshots may already be fixed |
| Your image (India Escapes mockup) | I could see it fully | It is a static picture, so I can read the layout and style but not the motion |
| columbus-travel.com | Page structure and text: layered hero with three cloud images, "Scroll" cue, count-up numbers (430, 60,000, 50 million), services switcher, office locations | Text only; I could not see the animation itself |
| nexola.framer.website | Page structure: big repeated wordmark, a pair of "unrevealed" and "revealed" team photos, counters starting at 0, numbered stacked service blocks (01 to 04), "Press to play" showreel, FAQ accordion, tabs | Text only; motion is inferred from layer names and structure, not observed |
| vita-travel.webflow.io | **Nothing.** The site blocks automated access, and searches only returned unrelated Webflow templates | Please send a screenshot or screen recording, or tell me what you like about it |
| vue-bits.dev | The page loads with JavaScript, so only the title came through. I used the Vue Bits GitHub README: 90+ animated components, licence "MIT + Commons Clause" | Could not browse the individual demos |
| awwwards.com/websites/animation | Only a short intro (CSS3, SVG, Canvas, WebGL, Web Animations API) | No list of specific winning sites. "Awwwards-style" in this plan is my general knowledge of that category |

---

## 3. What to take from your references

### 3.1 India Escapes mockup (your image)

It is a travel brand, so we borrow the structure, not the content or palette.

| What I see | Idea for Tawam | Notes |
|---|---|---|
| Hero with a huge serif headline, and **four photo cards overlapping the bottom of the hero** | Four stream cards (Medical, Engineering, Management, Professional) rise into place after the headline, then lift on hover. They double as navigation | **Changes the hero layout**, so it needs your approval. Use the images you already assigned to courses |
| Alternating light and dark bands | Mostly light sections, plus **one navy band** per page for the admission journey | The plan says "light theme only", meaning no dark mode toggle. A navy band uses the brand navy; I need your OK to add one mid-page |
| 10-day itinerary as a **vertical timeline** with dots and offset photos | "Your admission journey": Counselling, Shortlisting, Application, Admission. A line draws down as you scroll and each step lights up | Only valid because it is a real sequence. You need to supply the step text |
| Four "What's included" cards in a row | Existing Features cards with a short staggered reveal | |
| Glass-style form card over a photo at the bottom | Contact call-to-action band: form card fades up over a campus photo | Form backend is the other developer's job |
| Handwritten script accents ("Same Land, A Million Emotions") | **Skip.** Your plan allows Playfair Display and Inter only | Adding a script font would break the brand rules |
| Cream backgrounds | **Do not copy.** Use your own `#F4F8FD` blue tint and `#FFF6DF` warm tint | Cream with a serif is also a very common "AI template" look |
| Faint line-art monuments behind sections | Optional: faint campus or globe line art that drifts slightly as you scroll | Needs artwork; low priority |

### 3.2 Columbus Travel

| Idea | Tawam version |
|---|---|
| Hero built from layers (background plus three cloud images) | Soft mist layers that **move with scroll** (not on a timer), giving depth to the hero photo. Can be done with CSS gradients, no extra images |
| "Scroll" cue under the hero | Small down-arrow cue that fades out once you scroll. Not looping |
| Count-up numbers | Existing `countUp` in Stats |
| Service list where each item swaps a large image | Disciplines section: hover or tap a stream to swap the photo beside it |

### 3.3 Nexola

| Idea | Tawam version |
|---|---|
| Counters that start at 0 | Same count-up |
| Two images ("unrevealed" and "revealed") | Image reveal: on a stream card, a sharper photo wipes over a muted one on hover. Optional |
| Numbered, stacked service blocks that slide over each other | Disciplines as **sticky stacked cards** (pure CSS `position: sticky`). Optional, mobile needs care |
| FAQ accordion | Smooth open and close on the FAQ and on the map's collapsible lists |
| Big repeated wordmark | **Skip.** Wrong tone for an education counsellor |

### 3.4 Vue Bits: use the ideas, not the package

Vue Bits is for **Vue**. Your site is **Astro with no Vue**, so using it means adding a Vue integration and shipping the Vue runtime. Many effects also pull in GSAP, OGL or three.js, which is a poor trade for phones on mobile data. The licence allows use on your site but not reselling the components. So: **borrow the patterns and rebuild them small.**

| Vue Bits / React Bits idea | Use? | Our version |
|---|---|---|
| SplitText | **Yes, hero only** | Headline reveals line by line, once |
| CountUp | **Yes** | Existing `countUp` |
| ShinyText / shine sweep | **Yes, hover only** | Soft light sweep on the gold button |
| Magnet | **Maybe**, desktop only | Main call-to-action button only |
| AnimatedContent / FadeContent | **Partly** | Covered by the existing Intersect system |
| AnimatedList | **Yes** | Staggered cards |
| StarBorder, ClickSpark, TiltedCard, MagicBento, Ballpit, MetaBalls | **No** | Too decorative for an education brand |
| Aurora, Galaxy, Beams, Silk, Particles, Lightning, LiquidChrome, Hyperspeed, GridDistortion | **No** | WebGL backgrounds: heavy on phones, clash with navy and gold |
| GlitchText, ScrambleText, DecryptedText, FallingText | **No** | Wrong tone for parents and students |
| Cursor effects | **No** | No cursor on phones |

### 3.5 General patterns

| Pattern | Use? | Note |
|---|---|---|
| Staggered headline reveal | Yes (hero) | The one orchestrated page-load moment |
| Scroll-linked line or progress | Yes | Admission journey, blog reading progress |
| Image zoom on hover inside a frame | Yes | College and blog cards |
| Preloader | **Yes, short version** | Section 8 |
| Page transitions | **Yes, noticeable but quick** | Section 9 |
| Parallax | Only scroll-linked, gently | Hero mist and photo drift. Never on a timer |
| Scroll-jacking or smooth-scroll libraries | **No** | Fights native scrolling on phones; accessibility problems |
| Full-screen WebGL or 3D | **No** | Weight and brand reasons above |
| Custom cursor | **No** | Useless on phones |

---

## 4. What the project already has

| Existing piece | Where | What it means |
|---|---|---|
| Reveal-on-scroll system | `common/Intersect.astro` and `intersect:` classes (23 files) | Reuse and tune |
| Fade-up animation | `--animate-fade` in `tailwind.css` | The generic "everything fades up" effect. Keep for a few things, remove from most |
| Page transitions | `<ClientRouter />` in `layouts/Layout.astro` | Already on. Gets the curtain in Phase 1 |
| Link prefetching | `prefetch` in `astro.config.ts` | Pages already load fast; do not slow them |
| Count-up numbers | `countUp` option in `widgets/Stats.astro` | **The Stats widget is not used on any page yet.** Phase 4 must either use it or add count-up to the home page's existing trust strip |
| Reduced-motion support | 36 uses of `motion-safe` / `motion-reduce` | Keep the pattern |
| Map hover, tooltip, side panel | `widgets/IndiaMap.astro` | Rebuilt in Phase 3 |
| Floating WhatsApp button | `common/WhatsAppFloating.astro` | Hover scale only; gets one attention pulse |
| Logo as a PNG | `assets/images/brand/tawam-travels-logo.png` | Used on the loading screen |

**Problems found in the existing code (fixed in Phase 0 or 3):**

1. **Map clicks reload the whole page** (`window.location.href`, 3 places). Must use the router's `navigate()` so transitions play.
2. **The map colours states with inline JavaScript styles** (`style.fill = '#D08701'`). That is the "turns orange" behaviour you want replaced, and those inline styles must go.
3. **Reveal items start hidden with a class that did not depend on JavaScript** (`motion-safe:md:opacity-0`, 32 uses). Checked in Phase 0: with JavaScript fully off they still fade in on load, so content was not permanently hidden, but a half-failed script could have left items hidden. Phase 0 added a `js:` guard as a safety net.
4. **Faded card text** from your earlier screenshots: I found no reveal classes on those cards, so the cause may be a colour or opacity class. Re-check in the browser.
5. **No central motion rules**: durations and easings are scattered.
6. **No city coordinates in the data.** Pins or pulsing dots on cities are not possible until coordinates are added. This plan does not depend on them.

---

## 5. Design rules (the guardrails)

1. **No new colours.** Only the tokens in `TAWAM_PROJECT_PLAN.md` section 1. **At most one gold animated thing per screen.**
2. **One signature moment.** The map. Everything else is smaller.
3. **Motion must mean something.** Show what changed, guide the eye to the main action, or confirm a click.
4. **Do not fade-up every section.** It is the most recognisable "template" tell.
5. **Never animate reading content.** Body text, fee and cutoff tables, forms, legal pages stay still.
6. **Animate only `transform` and `opacity`** (small exceptions are marked in the specs). Never width, height, top or left.
7. **Play once.** Reveals run once per page visit.
8. **Respect reduced motion.** Anyone with animations turned off gets the final state instantly.
9. **Content must be visible without JavaScript.** Hide-then-reveal applies only after JS confirms it is running.
10. **Hover is never the only way.** Everything must also work with keyboard focus and a tap.
11. **No endless loops.** Nothing repeats for more than 5 seconds unless the visitor can pause it (accessibility rule WCAG 2.2.2). Scroll-linked motion is fine because it stops when the visitor stops.

### Motion tokens (defined in Phase 0, in `src/assets/styles/tailwind.css`)

Prefixed `--aw-` so they cannot clash with Tailwind's own `--ease-*` theme names.

| Token | Value | Used for |
|---|---|---|
| `--aw-motion-fast` | 150ms | Hover colour changes, press |
| `--aw-motion-base` | 250ms | Card lift, links, panel swap |
| `--aw-motion-slow` | 600ms | Reveals |
| `--aw-motion-hero` | 900ms max | Hero headline |
| `--aw-ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Everything entering |
| `--aw-ease-pop` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | **Only** the map pop (slight overshoot, like a tile popping up) |
| `--aw-reveal-distance` | 12px | Small slide on reveals |
| `--aw-stagger` | 60ms, max 4 steps | Matches the existing Intersect script |

### Performance budget

- Mobile Lighthouse performance **90 or higher**; largest content paint **under 2.5s** on a throttled mid-range phone; **no layout shift** from animations.
- Extra JavaScript for animation: **under 15 KB gzipped** on first load.
- The loading screen must not make the real page slower; it is measured separately (section 8).
- Test in Chrome DevTools: mobile device, 4x CPU slowdown, Slow 4G.

---

## 6. Technical approach (order of preference)

1. **Plain CSS** for hovers, transitions and scroll-linked effects (`animation-timeline: view()`). Scroll-driven animation works in Chrome/Edge and recent Safari; Firefox has lagged, so check caniuse.com and always add a fallback (content simply shows in its final state).
2. **The existing Intersect script** and small custom elements for reveal, map and curtain logic.
3. **A tiny library only if needed** (for example Motion, a few KB). **GSAP** only if truly needed; it became free including plugins in 2025, but confirm the licence on gsap.com and measure the size first. Pin an exact version at least two weeks old.
4. **Vue islands (Vue Bits itself): last resort.**

**Compatibility:** the site uses `ClientRouter`, so scripts must re-run after client-side navigation (`astro:page-load`, or custom elements like `Intersect.astro`). Test by clicking through pages, not only reloading. Check the Astro docs for your installed version before relying on event names.

---

## 7. The map (signature moment)

### 7.1 Current behaviour

States are paths inside one SVG group. On hover, JavaScript sets the fill to gold and the side panel updates. On desktop click, the browser navigates (full reload). On touch: first tap selects, second tap navigates.

### 7.2 New hover and select: "pop-up tiles"

| Element | Behaviour |
|---|---|
| **Hovered state** | Lifts about 6px and scales to about 1.035, with a soft navy drop shadow underneath. **Keeps its blue density colour** (slightly brighter). No gold fill |
| **Neighbouring states** | Dim slightly (about 85% opacity) so the lifted one stands out |
| **Selected state** (hover on desktop, tap on mobile, focus with keyboard) | Same lift, plus a thin **gold outline**. That outline is the one gold element on the map |
| **Easing** | `--aw-ease-pop` over about 220ms for the lift; 150ms to settle back |
| **Tooltip** | Keeps following the cursor; fades and scales in (120ms) |
| **States with 0 colleges** | Smaller lift (about 3px), same outline, so they feel lighter |
| **Reduced motion** | No lift or scale. Outline and shadow only |

**How to build it so it does not flicker (important):**

- SVG draws later elements on top, and moving a path under the cursor can make hover flicker at its edges. So **do not move the real path.**
- Keep the real paths static as the invisible hit area. Add a second group on top (`pointer-events: none`) that holds a **clone** (`<use href="#state-path-...">`) of the hovered or selected state, and animate that clone: `transform: translateY(-6px) scale(1.035)` with `transform-box: fill-box` and `transform-origin: center bottom`.
- Apply the shadow (`filter: drop-shadow`) to that one clone only, never to all 36 paths.
- Remove the inline `style.fill` / `style.stroke` code and the `.state-path:hover` shadow rule.

### 7.3 New click animation

Desktop, in order (total about 350ms before navigation):

1. **Press**: the lifted state dips (scale 0.99) for 90ms.
2. **Ripple**: a thin ring grows from the click point (radius 0 to about 60, opacity 0.5 to 0, 500ms). This ring is the gold element at that moment.
3. **Panel swap**: side panel text fades out (120ms) and the new text fades in with an 8px slide (200ms). Staggered: title, count, college cards.
4. **Navigate** through the router (`navigate(url)` from `astro:transitions/client`), which triggers the curtain in section 9.

Rules: do not intercept Ctrl, Cmd or middle clicks (they must open normally); keep the existing mobile behaviour (first tap selects with the same pop and ripple, second tap navigates); keyboard Enter behaves like a click.

### 7.4 Map entrance (first scroll into view)

States fade in as a wave from south to north (**opacity only**, per-state delay), once. Then the map stays still until touched.

**Done when:** hover feels smooth with no flicker at borders; no state ever turns solid orange; touch and keyboard work; reduced motion shows the finished map with outline and shadow only.

---

## 8. Loading animation (spec)

**Why my advice changed:** a preloader can slow the first view and annoy returning visitors. Since you want one, this version limits the downside.

**Concept: "take-off."** Full-screen navy. The Tawam Travels logo fades in and scales from 96% to 100%. A thin gold line draws left to right beneath it (the logo's swoosh idea; this is the one gold element). Then the screen lifts upward like a curtain, revealing the hero, whose headline animation starts at that moment.

**Rules**

| Rule | Detail |
|---|---|
| **Home page only** | Visitors landing from Google on a college or blog page should not wait behind an intro |
| **Once per visit** | Remember in `sessionStorage` (wrapped in try/catch). A tiny inline script in `<head>` adds a flag class so repeat visits never flash the overlay |
| **Short** | Target about 1.2s on a fast connection. It ends when the page is actually ready (logo, fonts, hero image), with a **hard cap of 2.5s** |
| **Fail-safe without JavaScript** | A CSS-only timer hides the overlay after 2.5s even if scripts fail |
| **Reduced motion** | No loading screen at all |
| **No hidden content** | The overlay sits on top; the page underneath is real HTML, so search engines and screen readers are not blocked. The overlay is `aria-hidden` |
| **Cheap to draw** | Pure HTML and CSS, the logo already in the project, `transform` and `opacity` only (the gold line is `scaleX`) |
| **Never on page changes** | Moving between pages uses the curtain in section 9, not this |

**Done when:** on throttled mobile, the hero is visible by 2.5s at the latest; a second visit in the same session shows no loading screen; with JavaScript off, the site is usable within 2.5s.

---

## 9. Page-to-page animation (spec)

**Concept: navy curtain.** When you click a link, a navy panel with a thin gold leading edge sweeps up over the **main content** (about 220ms). The new page loads underneath, then the panel lifts away (about 280ms). Total about 500ms on a fast connection. The header and WhatsApp button stay in place.

| Detail | Choice |
|---|---|
| **How** | Hook into the router's `astro:before-preparation` event, run the cover animation, then let loading continue; reveal on `astro:page-load`. Check the Astro docs for your installed version to confirm event names and how to delay the loader |
| **Real loading wins** | If the next page takes longer than the cover, the panel waits (with a thin progress shimmer) instead of flashing a blank page. Cap: if more than 3s, show the page as it is |
| **Back and forward buttons** | A shorter, simple fade (about 150ms) so going back feels instant |
| **Same page or hash links** | No curtain |
| **Reduced motion** | Instant swap, no curtain |
| **Gold** | Only the 3px leading edge. No other gold on screen during the transition |
| **Persist** | Header and WhatsApp button marked to persist across pages so they do not re-render |

**Done when:** clicking through 10 pages in a row never flashes white, never replays the loading screen, and back and forward feel instant.

---

## 10. Where to animate: the full map

| # | Where | Effect | Trigger | Phase | Effort |
|---|---|---|---|---|---|
| 1 | **Loading screen** (home, once per visit) | Section 8 | Page load | 1 | M |
| 2 | **Page changes** | Navy curtain, section 9 | Navigation | 1 | M |
| 3 | **Home hero** | Headline reveals line by line (about 700ms), subtitle and buttons follow, background photo settles from 1.06 to 1 scale. Optional mist layers drift with scroll | Page load (after loading screen) | 2 | M |
| 4 | **Hero stream cards** (from your mockup; needs approval) | Four cards rise into place with 60ms steps, then lift on hover | After headline | 2 | M |
| 5 | **Gold buttons** | Light sweep on hover; slight press-down | Hover / press | 2 | S |
| 6 | **Header** | Thin shadow and slightly more solid background after scrolling; nav underline slides in | Scroll / hover | 2 | S |
| 7 | **India map** | Section 7: entrance wave, pop-up tiles, click ripple, panel swap | Scroll, hover, tap, click | 3 | L |
| 8 | **Stats / trust strip** | Numbers count up once | Scroll into view | 4 | S |
| 9 | **College cards** | Photo zoom 4% in its frame, lift 4px, arrow nudge | Hover and focus | 4 | S |
| 10 | **Disciplines** | Staggered reveal; optional hover image swap or sticky stacked cards (from Columbus and Nexola) | Scroll / hover | 4 | M |
| 11 | **Admission journey** (navy band, real sequence only) | Line draws down as you scroll; each step lights up | Scroll-linked | 4 | M |
| 12 | **Blog and guide cards** | Image hover zoom only. **No entrance animation** | Hover | 4 | S |
| 13 | **FAQ and collapsible lists** | Smooth open and close | Click / tap | 4 | S |
| 14 | **Contact call-to-action band** | Form card fades up once; main button has a subtle magnetic pull (desktop only) | Scroll / pointer | 4 | S |
| 15 | **Floating WhatsApp button** | One gentle pulse about 8s after load, then never again | Time, once | 4 | S |
| 16 | **College detail page** | Metrics count up; sticky section menu highlights the section you are reading | Scroll | 5 | M |
| 17 | **Blog post page** | Thin reading-progress bar at top (scroll-linked) | Scroll | 5 | S |
| 18 | **Contact form** | Clear focus rings; success message slides in once the backend exists | Focus / submit | 5 | S |
| 19 | **Announcement bar, footer, fee tables, cutoff tables, legal pages, body text** | **No animation** | n/a | n/a | n/a |

Effort: S = under half a day, M = about a day, L = 1 to 2 days.

---

## 11. The phases

### Phase 0: Foundations (do first)

1. Re-check the earlier screenshot bugs in this version (faded card text, navy block under photos, "Browse Colleges" visibility). Fix any that remain.
2. Add the motion tokens from section 5.
3. Make hide-then-reveal safe: an `html.js` flag, and hide reveal targets only under it. Remove unguarded `motion-safe:md:opacity-0` patterns.
4. Add one global reduced-motion rule.
5. **Replace the three `window.location.href` calls in `IndiaMap.astro`.** _(Done in Phase 0 with a real-link click so the router handles it, because that script is an inline script and cannot import `navigate()`. Phase 3 rebuilds the script and may switch to `navigate()`.)_
6. List every `intersect:` and `animate-fade` use as keep, remove or replace.

**Done when:** with JavaScript off all text and images show; with reduced motion on nothing animates; map clicks go through the router; no faded or half-hidden text.

### Phase 1: Loading screen and page transitions

Sections 8 and 9. **Done when** both "Done when" lines in those sections pass.

### Phase 2: Hero, buttons, header

Rows 3 to 6. Split the hero title into lines at build time. Hero headline animation must not push largest content paint later by more than about 100ms; otherwise fall back to a subtitle-only fade. Stream cards (row 4) only after you approve the layout change.

### Phase 3: The map

Section 7 in full. **Do this carefully; it is the signature piece.**

### Phase 4: Sections

Rows 8 to 15. No section animates twice; no more than one reveal group per section; no gold animation competing with another on the same screen.

### Phase 5: Detail pages

Rows 16 to 18.

### Phase 6: Polish and testing

1. Performance check with throttling; remove anything that fails the budget.
2. Test on a real mid-range Android phone if possible, plus iPhone Safari, desktop Chrome and Firefox.
3. Reduced-motion, keyboard-only and screen-reader pass.
4. The "take one thing away" test: for each page, remove one animation; if the page is better, leave it removed.
5. Final `npm run build` and `npm run check`.

---

## 12. Prompts to paste to your AI

### Master prompt (paste at the start of every phase)

```
We are adding animation to the Tawam Travels site (Astro 7 + Tailwind 4). Follow tawam-animation-plan.md, but only the phase I name.

Rules:
- Obey TAWAM_PROJECT_PLAN.md and .agents/skills/frontend-design.md. No new colours or fonts; at most one gold animated element per screen; no dark mode.
- Animate only transform and opacity (exceptions are marked in the plan). Use the motion tokens from Phase 0.
- Respect prefers-reduced-motion. Content must be visible with JavaScript off.
- Reuse src/components/common/Intersect.astro and the existing ClientRouter. Scripts must still work after client-side page navigation.
- Do not add Vue, React, GSAP or any package without asking me first and telling me its size.
- Do not change text content, routes, data or images.
- Before coding, show me a 5-line plan. After coding, run the build and report: files changed, what animates where, and anything you skipped.
```

### Phase 0

```
Do Phase 0 of tawam-animation-plan.md. 1) Check for faded or half-hidden text on /blog, /exams and the home page and fix the cause. 2) Add the motion tokens. 3) Add an html.js flag and make every hide-then-reveal class depend on it (Hero, Stats and others). 4) Add a global prefers-reduced-motion rule. 5) In src/components/widgets/IndiaMap.astro replace the three window.location.href calls with navigate() from astro:transitions/client. 6) Give me the keep/remove/replace list of every intersect: and animate-fade usage. Do not add any new animation yet.
```

### Phase 1

```
Do Phase 1: the loading screen (section 8) and the page transition (section 9). Loading screen: home page only, once per session via sessionStorage in try/catch, navy overlay with the existing logo fading in and a thin gold line drawing under it, then lifting like a curtain; 2.5s hard cap with a CSS-only fail-safe; none for reduced motion. Page transition: navy curtain over the main content using the ClientRouter events for my installed Astro version (check the docs), short fade for back/forward, header and WhatsApp button persist. Tell me mobile Lighthouse numbers before and after.
```

### Phase 2

```
Do Phase 2: hero headline line-by-line reveal (split lines at build time), hero background settle from 1.06 to 1 scale once, gold button light sweep on hover only, header shadow and nav underline on scroll/hover. Keep the headline under 900ms and tell me LCP before and after; if LCP worsens by more than ~100ms fall back to a subtitle-only fade. Do NOT build the hero stream cards yet.
```

### Phase 3

```
Do Phase 3: rebuild the India map interaction exactly as in section 7 of the plan. Keep the real paths static as hit areas; add a pointer-events:none top group holding a <use> clone of the hovered/selected state that lifts (translateY -6px, scale 1.035, transform-box fill-box, drop-shadow on that one clone only). States keep their blue colour; only the selected one gets a thin gold outline; neighbours dim to ~85%. Remove all inline style.fill/stroke code and the .state-path:hover shadow. Add the click sequence (press, gold ripple from click point, panel swap, then navigate()). Do not intercept ctrl/cmd/middle clicks. Keep mobile first-tap-select, second-tap-go. Add the south-to-north entrance wave (opacity only, once). Reduced motion: outline and shadow only. Test hover along state borders for flicker.
```

### Phase 4

```
Do Phase 4: countUp in Stats; college card hover (image zoom 4% inside frame, 4px lift, arrow nudge); one staggered reveal on the disciplines grid; smooth open/close on FAQ and collapsible lists; scroll-linked line only on a genuine step sequence; magnetic effect on the main CTA (pointer devices only); one-time WhatsApp pulse 8s after load. Blog and guide cards get hover zoom only, no entrance animation.
```

### Phase 5

```
Do Phase 5: count-up metrics and a sticky section menu with active highlight on college detail pages, and a thin reading-progress bar on blog posts (scroll-linked). Verify by clicking through 10 pages including the curtain transition.
```

### Phase 6

```
Do Phase 6: run the mobile performance check with 4x CPU slowdown and Slow 4G, report numbers against the budget in the plan, remove anything that fails, then run npm run build and npm run check. List what I should test on a real phone.
```

---

## 13. Decisions I need from you

| Question | My recommendation |
|---|---|
| Loading screen on the **home page only**, once per visit? | Yes. Showing it on every page would frustrate visitors who arrive from Google |
| OK to add the four **stream cards overlapping the hero** (from your mockup)? | Yes, but it changes the layout, so it is your call |
| OK to add **one navy band** (admission journey) mid-page? | Yes, if you can supply the four steps as real content |
| Skip the handwritten script font from the mockup? | Yes, your brand plan allows Playfair Display and Inter only |
| Is **vita-travel.webflow.io** something you want me to learn from? | I could not open it. Send a screenshot or a screen recording, or say what you like about it |
| Skip Vue Bits as a package and only borrow ideas? | Yes |

---

## 14. Not in this plan

Backend work (contact form, real domain, form-success data) belongs to the other developer. Image fixes (watermarked and mismatched photos, real college photos) are separate from motion and should be finished before Phase 4, because hover zooms need real photos to look good. City pins on the map would need city coordinates added to the data; not included here.
