# Tawam Travels — College Data & Geographic Architecture Guide

This guide explains how to add, edit, and manage colleges, states, and cities in the Tawam Travels website.

---

## 1. How the System Works

Every college page (`/colleges/[slug]`), state directory (`/colleges-in/[state]`), and city directory (`/colleges-in/[city]`) is generated automatically from content files:

- **State & City Master List**: `src/data/geo/states.json` (all 28 Indian States & 8 Union Territories with official ISO 3166-2:IN codes).
- **College Files**: `src/data/colleges/<slug>.md`
- **College Cover Images**: `src/assets/images/colleges/<slug>/cover.webp` (16:10 aspect ratio, max 500 KB).
- **CSV Import Spreadsheet**: `data/colleges-template.csv`

---

## 2. Option A: Adding Colleges via Spreadsheet (Recommended for Bulk Data)

You can manage colleges in Microsoft Excel or Google Sheets and import them in one command:

1. Open `data/colleges-template.csv` in Excel or Google Sheets.
2. Fill in the columns:
   - **`name`**: Full institution name (e.g. `Vellore Institute of Technology`).
   - **`short_name`**: Common acronym (e.g. `VIT Vellore`).
   - **`slug`**: URL slug (must include the city to prevent collision, e.g. `vellore-institute-of-technology-vellore`).
   - **`state`**: State name exactly as in `states.json` (e.g. `Tamil Nadu`).
   - **`city`**: City name (e.g. `Vellore`).
   - **`type`**: `Government`, `Private`, or `Deemed`.
   - **`established`**: Year of establishment (e.g. `1984`).
   - **`nirf_rank`**: Ranking notice (e.g. `11 (Engineering, 2024)`).
   - **`naac_grade`**: NAAC rating (e.g. `A++`).
   - **`streams`**: Semicolon-separated streams (e.g. `Engineering;Management;Sciences`).
   - **`accepted_exams`**: Semicolon-separated exams (e.g. `VITEEE;JEE Main`).
   - **`average_package`**: Text (e.g. `₹9.23 LPA`).
   - **`highest_package`**: Text (e.g. `₹1.02 CPA`).
   - **`top_recruiters`**: Semicolon-separated company names (e.g. `Microsoft;Amazon;Google;TCS`).
   - **`address`**: Physical campus address with pincode.
   - **`website`**: Official university URL.
   - **`featured`**: `true` or `false`.
3. Save as CSV to `data/colleges-template.csv`.
4. Run the import script:
   ```bash
   npm run import:colleges
   ```
5. Place the college cover image in `src/assets/images/colleges/<slug>/cover.webp`.
6. Run content validation:
   ```bash
   npm run validate:content
   ```

---

## 3. Option B: Adding a College via Markdown File

To add an individual college manually:

1. Create a new file: `src/data/colleges/<college-name>-<city>.md`
2. Example frontmatter template:

```yaml
---
name: 'Vellore Institute of Technology'
short_name: 'VIT Vellore'
slug: 'vellore-institute-of-technology-vellore'
state: 'Tamil Nadu'
state_code: 'IN-TN'
state_slug: 'tamil-nadu'
city: 'Vellore'
city_slug: 'vellore'
type: 'Deemed'
established: 1984
nirf_rank: '11 (Engineering, 2024)'
naac_grade: 'A++'
affiliation: 'Deemed to be University (UGC MHRD)'
streams:
  - 'Engineering'
  - 'Management'
courses_offered:
  - name: 'B.Tech Computer Science and Engineering'
    slug: 'btech-computer-science'
    level: 'Undergraduate'
    duration: '4 Years'
    annual_fee: '₹1,98,000 – ₹4,90,000 / year'
    seats: 1200
    cutoff_summary: 'VITEEE Rank 1 to 7,500'
accepted_exams:
  - 'VITEEE'
  - 'JEE Main'
campus_size: '372 Acres'
hostel_available: true
average_package: '₹9.23 LPA'
highest_package: '₹1.02 CPA'
top_recruiters:
  - 'Microsoft'
  - 'Amazon'
address: 'Katpadi, Vellore, Tamil Nadu 632014'
website: 'https://vit.ac.in'
featured: true
cover_image: '~/assets/images/colleges/vellore-institute-of-technology-vellore/cover.webp'
imageAlt: 'Vellore Institute of Technology campus view in Vellore'
description: 'VIT Vellore is one of India’s top private engineering universities.'
last_updated: '2026-11-24'
---
## About the Institution
Body text describing the university...
```

---

## 4. Geographic & Navigation Rules

1. **State & City URLs**:
   - `/colleges-in/<state-slug>` (e.g. `/colleges-in/tamil-nadu`, `/colleges-in/karnataka`)
   - `/colleges-in/<city-slug>` (e.g. `/colleges-in/vellore`, `/colleges-in/bangalore`)
2. **City Links are Always Clickable**:
   - Every college card features direct clickable links to its city (`/colleges-in/vellore`) and state (`/colleges-in/tamil-nadu`).
3. **Collision Avoidance**:
   - All college slugs must contain the city name (e.g. `rv-college-of-engineering-bangalore`, `vit-vellore`).
