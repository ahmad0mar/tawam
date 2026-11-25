import fs from 'fs';
import path from 'path';

// Minimal robust CSV line parser handling quotes
function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const obj = {};
      headers.forEach((h, idx) => {
        obj[h.trim()] = values[idx]?.trim() || '';
      });
      rows.push(obj);
    }
  }
  return rows;
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"' || char === "'") {
      if (inQuotes && line[i + 1] === char) {
        current += char;
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function run() {
  const csvFile = process.argv[2] || 'data/colleges-template.csv';
  const csvPath = path.resolve(process.cwd(), csvFile);

  if (!fs.existsSync(csvPath)) {
    console.error(`Error: CSV file not found at ${csvPath}`);
    process.exit(1);
  }

  const statesJsonPath = path.resolve(process.cwd(), 'src/data/geo/states.json');
  const statesData = JSON.parse(fs.readFileSync(statesJsonPath, 'utf-8'));
  const validStatesMap = new Map(statesData.map((s) => [s.name.toLowerCase(), s]));

  console.log(`Reading CSV from ${csvFile}...`);
  const content = fs.readFileSync(csvPath, 'utf-8');
  const rows = parseCSV(content);

  console.log(`Found ${rows.length} college entries in CSV.`);
  const outputDir = path.resolve(process.cwd(), 'src/data/colleges');
  fs.mkdirSync(outputDir, { recursive: true });

  let successCount = 0;
  let errorCount = 0;

  for (const row of rows) {
    if (!row.name || !row.state || !row.city) {
      console.error(`[SKIP] Missing required fields (name, state, or city) in row:`, row.name || 'Unnamed');
      errorCount++;
      continue;
    }

    const stateMatch = validStatesMap.get(row.state.toLowerCase());
    if (!stateMatch) {
      console.warn(`[WARNING] State "${row.state}" is not in states.json master list.`);
    }

    const stateSlug = stateMatch?.slug || slugify(row.state);
    const stateCode = stateMatch?.code || row.state_code || '';
    const citySlug = slugify(row.city);

    // Rule: College slug always includes the city to avoid clashes
    let slug = row.slug || `${slugify(row.name)}-${citySlug}`;
    if (!slug.endsWith(citySlug) && !slug.includes(citySlug)) {
      slug = `${slug}-${citySlug}`;
    }

    const streams = row.streams
      ? row.streams
          .split(';')
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const exams = row.accepted_exams
      ? row.accepted_exams
          .split(';')
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const recruiters = row.top_recruiters
      ? row.top_recruiters
          .split(';')
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    // Check if cover image exists or placeholder
    const coverPath = `~/assets/images/colleges/${slug}/cover.webp`;

    const frontmatter = {
      name: row.name,
      short_name: row.short_name || undefined,
      slug: slug,
      state: stateMatch?.name || row.state,
      state_code: stateCode,
      state_slug: stateSlug,
      city: row.city,
      city_slug: citySlug,
      type: row.type || 'Private',
      established: row.established ? parseInt(row.established, 10) : undefined,
      nirf_rank: row.nirf_rank || undefined,
      naac_grade: row.naac_grade || undefined,
      affiliation: row.affiliation || undefined,
      streams: streams,
      accepted_exams: exams,
      campus_size: row.campus_size || undefined,
      hostel_available: row.hostel_available === 'true' || row.hostel_available === true,
      average_package: row.average_package || undefined,
      highest_package: row.highest_package || undefined,
      top_recruiters: recruiters,
      address: row.address || `${row.name}, ${row.city}, ${row.state}`,
      pincode: row.pincode || undefined,
      website: row.website || undefined,
      featured: row.featured === 'true' || row.featured === true,
      cover_image: coverPath,
      imageAlt: `${row.name} campus in ${row.city}, ${row.state}`,
      description: row.description || `${row.name} in ${row.city}, ${row.state}.`,
      last_updated: new Date().toISOString().split('T')[0],
    };

    // Serialize YAML frontmatter
    let yaml = '---\n';
    for (const [key, val] of Object.entries(frontmatter)) {
      if (val === undefined) continue;
      if (Array.isArray(val)) {
        if (val.length === 0) {
          yaml += `${key}: []\n`;
        } else {
          yaml += `${key}:\n`;
          for (const item of val) {
            yaml += `  - '${item}'\n`;
          }
        }
      } else if (typeof val === 'string') {
        yaml += `${key}: '${val.replace(/'/g, "''")}'\n`;
      } else {
        yaml += `${key}: ${val}\n`;
      }
    }
    yaml += '---\n\n';
    yaml += `## About ${row.name}\n\n${row.description || `${row.name} is a premier educational institution in ${row.city}, ${row.state}.`}\n`;

    const destFile = path.join(outputDir, `${slug}.md`);
    // Only write if file doesn't already have custom body content
    if (!fs.existsSync(destFile)) {
      fs.writeFileSync(destFile, yaml, 'utf-8');
      console.log(`[CREATED] ${destFile}`);
    } else {
      console.log(`[EXISTS] Preserving custom content for ${slug}.md`);
    }
    successCount++;
  }

  console.log(`\nImport Summary: ${successCount} processed, ${errorCount} errors.`);
}

run().catch(console.error);
