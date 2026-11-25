# Tawam Travels — Education Counselling Website

## Detailed Project Plan (5 Phases) + Brand & Colour System

Base: AstroWind (Astro 7 + Tailwind CSS v4) · Brand source: `Tawam_Travels_Globe_Logo.png`

---

## 0. How to read this document

| Section | What it covers                                                                             |
| ------- | ------------------------------------------------------------------------------------------ |
| 1       | Colour, type and visual system (the "how it should look" rules)                            |
| 2       | Site map and URL rules                                                                     |
| 3       | Data model (what each page is generated from)                                              |
| 4       | The five phases, each with tasks, deliverables, acceptance checks and what I need from you |
| 5       | One consolidated checklist of everything I need from you                                   |
| 6       | Open decisions and risks                                                                   |

**Already done:** the logo is at `src/assets/images/brand/tawam-travels-logo.png`; four stock photos are in `src/assets/images/random/`.

**What is already in the project (found in the zip):** besides stock AstroWind, there are already `src/data/courses` (bba, btech-computer-science, mbbs), `src/data/exams` (cuet-ug, jee-main, neet-ug), `src/components/guides/`, and blog posts on scholarships, NEET counselling and government-vs-private engineering colleges. I will reuse these where they fit rather than start from zero.

---

## 1. Colour, type and visual system

### 1.1 Where the colours come from

Sampled directly from the logo pixels (median of each region), not guessed:

| Logo element                         | Sampled colour | Role in the site                  |
| ------------------------------------ | -------------- | --------------------------------- |
| "Tawam" text, plane, "TRAVEL AGENCY" | `#011B4A`      | **Brand navy** — primary          |
| "Travels" text, swoosh               | `#D08701`      | **Brand gold** — accent           |
| Gold highlight on swoosh             | `#ECAD04`      | Gold hover / bright gold          |
| Globe, mid blue                      | `#063F8A`      | Deep ocean blue                   |
| Globe, bright blue                   | `#0572CE`      | **Ocean blue** — links, map, info |
| Globe, pale blue                     | `#BEDFF8`      | Light blue tint                   |

**Idea of the scheme:** navy carries authority and trust (headers, footer, headings, main buttons), gold carries action and warmth (the "Get Counselling" call-to-action, highlights, hover), and ocean blue is the supporting colour for links and the map. Everything else is neutral blue-tinted greys, so the site feels like one family with the logo.

### 1.2 Rules that keep it from looking sloppy

1. **Navy is the main colour; gold is rare.** Gold appears on roughly one thing per screen: the main call-to-action, a key highlight, or a hover. If gold is everywhere it stops meaning anything.
2. **Never put gold text on white.** `#D08701` on white is only 2.94:1, which fails accessibility. Gold is used as a _fill_ (with navy text on it) or as _text on navy_. If gold text on a light background is ever needed, use the darker `#8F5A00` (5.78:1).
3. **Text on gold is always navy, never white.** Navy on `#D08701` is 5.69:1; white on it would fail.
4. **No pure black, no pure grey.** Text and greys are all blue-tinted navy so they sit in the same family as the logo.
5. **No new colours.** Anything not in the tables below is not allowed. Status colours (success, error) are the only exceptions and are defined below.
6. **Orange/yellow map from your sample code is not used.** That scheme clashes with the navy/gold identity; the map uses a blue scale (section 4, Phase 4).
7. **One mode only: light.** The site has a single light theme and no dark mode or theme toggle (section 1.5).

### 1.3 Light mode tokens

These map onto AstroWind's existing `--aw-color-*` variables in `src/components/CustomStyles.astro`, so the template components pick them up automatically.

| Token                     | Value     | Used for                                         |
| ------------------------- | --------- | ------------------------------------------------ |
| `--aw-color-primary`      | `#011B4A` | Main buttons, active nav, key UI                 |
| `--aw-color-secondary`    | `#0F3A80` | Primary button hover (white text on it: 10.84:1) |
| `--aw-color-accent`       | `#D08701` | Gold fills: CTA button, badges, highlights       |
| `--aw-color-accent-hover` | `#ECAD04` | Gold hover (navy text on it: 8.39:1)             |
| `--aw-color-link`         | `#0A5BC4` | Text links (6.35:1 on white)                     |
| `--aw-color-text-heading` | `#011B4A` | Headings (16.71:1 on white)                      |
| `--aw-color-text-default` | `#2B3A5A` | Body text (11.32:1 on white)                     |
| `--aw-color-text-muted`   | `#55658A` | Captions, meta (5.81:1 on white)                 |
| `--aw-color-bg-page`      | `#FFFFFF` | Page background                                  |
| `--aw-color-bg-soft`      | `#F4F8FD` | Alternating section background (blue tint)       |
| `--aw-color-bg-warm`      | `#FFF6DF` | Rare warm highlight panels (gold tint)           |
| `--aw-color-border`       | `#D5E0F0` | Card and divider borders                         |
| `--aw-color-on-primary`   | `#FFFFFF` | Text on navy                                     |
| `--aw-color-on-accent`    | `#011B4A` | Text on gold                                     |
| `--aw-color-success`      | `#15803D` | Success (white text 5.02:1)                      |
| `--aw-color-error`        | `#B42318` | Errors (white text 6.57:1)                       |

### 1.4 Where each colour goes (page by page)

| Area                          | Background                                                       | Text                                               | Accent                                   |
| ----------------------------- | ---------------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------- |
| Announcement bar              | `#011B4A`                                                        | white                                              | gold link                                |
| Header                        | white (translucent on scroll)                                    | navy                                               | Get Counselling button in gold           |
| Hero                          | navy gradient (`#011B4A` → `#0F3A80`) or photo with navy overlay | white                                              | gold CTA + outline secondary             |
| Normal sections               | white, alternating with `#F4F8FD`                                | navy headings, `#2B3A5A` body                      | —                                        |
| Cards (college, course, blog) | white, `#D5E0F0` border                                          | navy title                                         | gold badge for "Government" / "Featured" |
| Footer                        | `#011B4A`                                                        | `#E8EEF9` text (14.34:1), muted `#A3B3D1` (7.90:1) | gold links (8.39:1)                      |
| Forms                         | white fields, `#D5E0F0` border                                   | navy                                               | focus ring `#0572CE`                     |
| Counselling CTA band          | navy or gold-tint                                                | navy / white                                       | gold button                              |

**Buttons**

- **Primary (gold):** fill `#D08701`, text `#011B4A`, hover fill `#ECAD04`. Used for "Get Counselling", "Apply", "Enquire".
- **Secondary (navy):** fill `#011B4A`, text white, hover `#0F3A80`.
- **Outline:** transparent, 1px navy border, navy text; hover fills navy-tint `#F4F8FD`.
- All buttons keep AstroWind's rounded-full shape so the template's feel is kept.

### 1.5 One theme only (light)

The site ships with a single light theme. There is **no dark mode and no sun/moon toggle**; the toggle is removed from the header. This keeps the brand consistent everywhere, because the navy logo is designed for light backgrounds, and it halves the design and testing work.

What this means in practice:

- The logo is always shown in its original colours. No reversed version is needed.
- The browser is told the site is light-only, so a visitor whose phone is set to dark mode still sees the site as designed (form fields and scrollbars stay light).
- Dark sections inside the page, such as the navy hero, announcement bar and footer, are still used on purpose as design elements. They are part of the light theme and are not a separate mode.

### 1.6 Typography

| Use               | Font                           | Why                                                                                 |
| ----------------- | ------------------------------ | ----------------------------------------------------------------------------------- |
| Headings          | **Playfair Display** (600/700) | The logo's "Tawam" is a bold high-contrast serif; this echoes it without copying it |
| Body, UI, forms   | **Inter** (400/500/600)        | Clean and very readable at small sizes, good for data-heavy college pages           |
| Numbers in tables | Inter with tabular figures     | Fees and cutoffs line up in columns                                                 |

Fonts are self-hosted (downloaded into the project) so the site is fast and does not depend on Google at load time.

### 1.7 Shape, spacing, imagery

- Radius: cards 16px, buttons fully rounded, inputs 12px.
- Shadows: one soft navy-tinted shadow (`0 8px 24px rgba(1,27,74,0.08)`), no heavy black shadows.
- Section spacing: generous (96px desktop / 56px mobile) so pages breathe.
- Photos: consistent 16:10 crops for colleges, 4:5 for portrait images. College photos get a subtle navy gradient at the bottom when text sits on them.
- Icons: Tabler set already installed in the project; one stroke weight everywhere.

---

## 2. Site map and URL rules

```
Home                         /
├── Colleges                 /colleges
│   └── College page         /colleges/[college-slug]
├── Courses                  /courses
│   └── Course page          /courses/mbbs, /courses/btech, /courses/mba ...
├── Colleges by state/city   /colleges-in/karnataka, /colleges-in/bangalore ...
├── Entrance exams           /exams/neet, /exams/jee, /exams/cet, /exams/cuet ...
├── Admission guides         /guide  (process, eligibility, documents, dates)
├── Scholarships             /scholarships   (path proposed, see section 6)
├── Blog / News              /blog  (exam dates, results, cutoffs, counselling updates)
├── About Us                 /about
└── Contact / Counselling    /contact
```

**URL rules**

- Lowercase, hyphens, no spaces: `/colleges/rv-college-of-engineering-bangalore`.
- A college slug always includes the city so two colleges with the same name never clash.
- `/colleges-in/<slug>` resolves to either a state or a city. Slugs that are both (Delhi, Chandigarh, Puducherry) need a rule; proposed: the state/UT page is `/colleges-in/delhi` and its city listing is the same page, so there is no duplicate.
- Old template routes are redirected or removed so there are no dead links.

---

## 3. Data model

Every page is generated from content files (Markdown or data files), so adding a college means adding one file, not building a page.

| Collection           | Key fields                                                                                                                                                                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **State**            | name, slug, code (e.g. `IN-KA`), cities[]                                                                                                                                                                                                                                |
| **City**             | name, slug, state                                                                                                                                                                                                                                                        |
| **College**          | name, slug, state, city, type (government / private / deemed), established year, NIRF rank, NAAC grade, affiliation, courses[] (course, duration, annual fee, seats, cutoff), address, map link, website, hostel, placements, gallery images, description, featured flag |
| **Course**           | name, slug, level (UG/PG/Diploma), duration, eligibility, entrance exams[], career paths, average fee range                                                                                                                                                              |
| **Exam**             | name, slug, conducting body, eligibility, pattern, syllabus, important dates, counselling process                                                                                                                                                                        |
| **Guide**            | title, slug, category (process / eligibility / documents / dates), steps                                                                                                                                                                                                 |
| **Scholarship**      | name, provider, eligibility, amount, deadline, applicable state/course, how to apply                                                                                                                                                                                     |
| **Post** (blog/news) | title, date, category (exam dates / results / cutoffs / counselling), cover image, body                                                                                                                                                                                  |

**Validation at build time:** a college with a missing state, unknown city, duplicate slug or missing cover image stops the build with a clear message instead of publishing a broken page.

**Image folders**

```
src/assets/images/colleges/<college-slug>/cover.jpg
src/assets/images/colleges/<college-slug>/gallery-01.jpg ...
src/assets/images/blog/<post-slug>/cover.jpg
src/assets/images/random/      (stock images, as we go)
```

---

## 4. The five phases

### Phase 1 — Brand, cleanup and skeleton

**Goal:** the site looks and reads like Tawam Travels, and every page in the site map exists (even if empty).

**Tasks**

1. Create the colour tokens from section 1 in `CustomStyles.astro` and `tailwind.css`, including the new `accent`, `on-primary` and `on-accent` tokens.
2. Rebuild button styles (gold primary, navy secondary, outline) and check contrast.
3. Make a web-optimised logo (the original is 1.2 MB) as PNG/WebP, plus a favicon, Apple touch icon and social-share (Open Graph) image.
4. Replace the logo component (it currently shows "🚀 AstroWind") with the real logo, sized properly for header and footer.
   Also remove the dark-mode system: the theme toggle in the header, the dark colour variables and the dark-mode styles, so there is one clean light theme.
5. Update `config.yaml`: site name, description, domain, social handles, Open Graph defaults, language.
6. Remove the template demo content: Homes, Landing, Pricing, template blog posts, template images, announcement bar text, GitHub star badge.
7. Rebuild header and footer navigation to match the site map in section 2.
8. Create a placeholder page for every route so nothing 404s.
9. Add fonts (Playfair Display + Inter), self-hosted.
10. Run the dev server and the build; fix any errors.

**Deliverables:** updated zip, a screenshot checklist of the header and footer.

**Done when**

- No "AstroWind" text, rocket emoji or demo content is visible anywhere.
- Every menu link opens a page.
- All text/background pairs pass contrast (4.5:1 body, 3:1 large text).
- The build completes with no errors.

**What I need from you**

- Exact business name and tagline.
- Domain name, or a note that you don't have one yet.
- Phone, WhatsApp number, email, office address, Google Maps link.
- Social links (Instagram, Facebook, YouTube, LinkedIn, X).
- Confirmation that all AstroWind demo content can be deleted.
- Confirmation: English only, or other languages later (Kannada, Hindi, Malayalam)?

---

### Phase 2 — Data structure and import pipeline

**Goal:** the content system exists and is proven with real sample data, so Phase 3 is just templates.

**Tasks**

1. Define the collections in section 3 in `content.config.ts` with strict validation.
2. Build the master list of Indian states and union territories with **current** codes. (Your sample code uses outdated ones: Orissa → Odisha `IN-OD`; Daman & Diu and Dadra & Nagar Haveli are now one UT `IN-DH`; Ladakh `IN-LA` is missing.)
3. Build the city list for each state that has colleges.
4. Create the slug and collision rules from section 2.
5. Build an **import script**: you give me a spreadsheet, it generates all the college files and checks them. This is what makes adding hundreds of colleges practical.
6. Set up the image folder convention and an image-checking step (missing cover, wrong size, oversized file).
7. Load 3–5 real sample colleges end-to-end as proof.
8. Move the existing courses, exams and relevant blog posts into the new structure.
9. Write a short "how to add a college" guide so you can do it yourself later.

**Deliverables:** the content schema, import script, sample colleges, "how to add content" guide.

**Done when**

- Adding a college takes one file or one spreadsheet row.
- Deliberately breaking a field (e.g. a wrong state) fails the build with a readable error.
- The sample colleges appear grouped correctly by state and city.

**What I need from you**

- Which fields you want on a college page (the list in section 3 is a starting point; tell me what to add or drop).
- Data as an **Excel/CSV sheet** (recommended) or page-by-page. I can send you a ready template sheet with the right columns.
- How many colleges at launch, and which states and cities.
- Whether scholarships and admission guides should also be split by state/city, or only by course/exam.
- Where the college data comes from, and confirmation that you have the right to use the photos.

---

### Phase 3 — Content pages and templates

**Goal:** every section of the site map works with real layouts, filters and search.

**Tasks**

1. **Colleges listing** (`/colleges`): card grid, filters (state, city, course, type, fee range), search, sort, pagination.
2. **College page**: hero with cover photo, quick-facts bar (type, established, NIRF, NAAC), courses and fees table, cutoffs, admission process, photo gallery with lightbox, location map, similar colleges, sticky "Enquire" button.
3. **Colleges-in pages** (`/colleges-in/<state or city>`): generated from the same college data, grouped by state and city, with an intro paragraph, college cards and nearby cities.
4. **Courses** listing and course page (eligibility, duration, fees, top colleges for it, related exams).
5. **Exams** listing and exam page (pattern, syllabus, dates, counselling steps, related courses).
6. **Admission guides** (`/guide`): process, eligibility, documents, dates, with a checklist layout.
7. **Scholarships**: listing with filters (state, course, category), detail page, deadline badges.
8. **Blog/News**: categories for exam dates, results, cutoffs, counselling updates; related posts.
9. Cross-linking: a college page links to its state page, its courses and its exams, and the reverse.
10. Breadcrumbs on every inner page.

**Deliverables:** all templates working with the sample data; a list of pages generated.

**Done when**

- Filtering and search work with no page reload errors.
- Each college page has a unique title and description for search engines.
- No page has a broken link or missing image.
- Pages look correct at 360px (small phone), 768px and 1440px.

**What I need from you**

- Courses and exams to launch with (MBBS, BTech, MBA, NEET, JEE, CET, CUET at minimum; others?).
- Real college photos, one folder per college, or approval to use placeholders for now.
- Blog and guide text, or approval for me to draft them for you to edit.
- Scholarship list with eligibility and deadlines.
- Anything you do **not** want shown (for example, no fees displayed).

---

### Phase 4 — Interactive India map and home page

**Goal:** the signature feature: scroll slightly on the home page and an interactive map lets a visitor click a state, then a city, and land on that area's colleges.

**Map behaviour**

- Sits directly below the hero so it appears after a short scroll.
- **Hover** a state: it turns gold, and a small card shows the state name and number of colleges.
- **Click** a state: goes to `/colleges-in/<state>`. A city picker for that state offers the cities (each goes to `/colleges-in/<city>`).
- **Mobile:** first tap shows the info card with a "View colleges" button (no accidental navigation); second tap or the button goes through.
- **Keyboard and screen readers:** every state is focusable, has a text label, and works with Enter.
- A plain list of states sits under the map as an alternative and for search engines.

**Map colours (blue scale by number of colleges, replacing the orange scheme)**

| State of data    | Fill                                                                  |
| ---------------- | --------------------------------------------------------------------- |
| No colleges yet  | `#E6ECF5` (with a `#9DB6DE` border so the shape is still visible)     |
| Few              | `#BEDFF8`                                                             |
| Some             | `#79ADD9`                                                             |
| Many             | `#0572CE`                                                             |
| Most             | `#063F8A`                                                             |
| Hover            | `#D08701` (gold)                                                      |
| Selected / focus | `#ECAD04` with a `#011B4A` outline                                    |
| Labels           | navy on light fills; white on `#0572CE` and darker (4.88:1 and above) |

A legend sits under the map.

**Tasks**

1. Build the map. Recommended: a **self-hosted SVG** with current state boundaries (fast, themeable, works offline, full control of borders). Alternative: Google GeoChart with the updated loader and codes; I can build either.
2. Connect it to the college counts from Phase 2 so the colours update by themselves when you add colleges.
3. Build the state/city drill-down and hover/tap cards.
4. Build the home page sections in order: hero → **map** → search bar → featured colleges → popular courses → exams → how counselling works (3 steps) → testimonials → counselling CTA band.
5. Performance check: the map must not slow the page (no large scripts loaded before it is needed).

**Deliverables:** working map + home page.

**Done when**

- Clicking each state opens the right page (all states and UTs tested).
- Works with touch, mouse and keyboard.
- Lighthouse performance and accessibility scores of 90+ on the home page.

**What I need from you**

- Decision: self-hosted SVG (recommended) or Google GeoChart.
- Confirmation to use the boundaries as officially depicted by the Government of India, including Jammu & Kashmir and Ladakh. Map borders are a sensitive and legally relevant topic in India, so this should be your explicit choice.
- Show all states (empty ones greyed) or only states that have colleges?
- Testimonials with the student's name, course and photo permission.
- Counts or claims for the home page (students counselled, colleges listed, years). I will only use figures you give me and can stand behind.

---

### Phase 5 — Counselling flow, SEO and launch

**Goal:** leads reach you reliably, search engines can find everything, and the site goes live.

**Tasks**

1. **Contact / Get Counselling page:** form (name, phone, email, course interest, preferred state, message), plus WhatsApp, call, email and office map.
2. **Lead routing:** each submission goes to your chosen destination; spam protection added.
3. **Floating WhatsApp button** and "Enquire" buttons on college pages that pre-fill the college name.
4. **About page:** story, team, certifications, why Tawam.
5. **SEO:** unique titles and descriptions for every page, sitemap, robots file, structured data (organisation, college, breadcrumbs, FAQ), canonical URLs, Open Graph images.
6. **Performance:** image compression and modern formats, lazy loading, font preloading.
7. **Quality pass:** every link, every form, every page at three screen sizes, plus a keyboard-only run.
8. **Legal pages:** privacy policy and terms (you should have these reviewed by a legal advisor).
9. **404 page** and redirects from any old URLs.
10. **Deployment:** Vercel, Netlify, or your own host; custom domain, HTTPS, analytics, and a handover guide.

**Deliverables:** live site, handover guide (how to add colleges, posts and scholarships), final zip.

**Done when**

- A test enquiry reaches you within a minute.
- Every page is in the sitemap and has no errors in a crawl.
- The final build passes all checks.

**What I need from you**

- Where leads go: email, WhatsApp, Google Sheet or a CRM.
- About-page text, team photos, registrations or certifications you hold.
- Hosting choice and domain access.
- Analytics ID (Google Analytics) if you have one.
- Privacy policy and terms text, or approval for me to draft a starting version.

---

## 5. Consolidated checklist of what I need from you

**Right now (Phase 1)**

- [ ] Exact business name and tagline
- [ ] Phone, WhatsApp, email, address, Maps link
- [ ] Social media links
- [ ] Domain name (or "not yet")
- [ ] OK to delete all AstroWind demo content
- [ ] Language: English only?

**Before Phase 2**

- [ ] Fields wanted on a college page
- [ ] Data format: Excel/CSV sheet or page-by-page
- [ ] Number of colleges and which states/cities at launch
- [ ] Should scholarships and guides be split by state/city?

**Before Phase 3**

- [ ] Courses and exams list
- [ ] College photos (folder per college) or OK with placeholders
- [ ] Blog, guide and scholarship content, or OK for me to draft
- [ ] Anything not to display (fees, cutoffs, etc.)

**Before Phase 4**

- [ ] Map type: self-hosted SVG or Google GeoChart
- [ ] Confirmation of boundary depiction (J&K, Ladakh)
- [ ] All states shown, or only states with colleges
- [ ] Testimonials and any statistics you want to show

**Before Phase 5**

- [ ] Lead destination (email / WhatsApp / Sheet / CRM)
- [ ] About text and team
- [ ] Hosting and domain access
- [ ] Analytics ID
- [ ] Privacy policy and terms

---

## 6. Open decisions and risks

| #   | Item                         | Notes                                                                                                                                                                             |
| --- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Scholarships URL**         | Your site map has no path for it; I propose `/scholarships`.                                                                                                                      |
| 2   | **State vs city slug clash** | Delhi, Chandigarh, Puducherry are both. Rule proposed in section 2.                                                                                                               |
| 3   | **Data accuracy**            | Fees, cutoffs and rankings change every year. The site needs a "last updated" date on every college and a process for refreshing it. Wrong fees on a counselling site hurt trust. |
| 4   | **Photo rights**             | College photos taken from the web may be copyrighted. Use photos supplied by the college, taken by you, or licensed.                                                              |
| 5   | **Map boundaries**           | A legal and sensitive topic in India; needs your explicit choice (Phase 4).                                                                                                       |
| 6   | **Logo file size**           | 1.2 MB; will be optimised in Phase 1.                                                                                                                                             |
| 7   | **Admission claims**         | Avoid wording like "guaranteed admission". It can be misleading and may create legal exposure.                                                                                    |
| 8   | **Lead data privacy**        | Student phone numbers and emails are personal data; the privacy policy and secure form handling matter (India's DPDP Act applies).                                                |
| 9   | **Content volume**           | The site is only as good as its data. The spreadsheet import in Phase 2 is the part that decides whether 20 or 2,000 colleges is realistic.                                       |

---

_Colour contrast figures in this document were calculated using the WCAG formula from the exact hex values listed. Brand colours were sampled from the supplied logo file._
