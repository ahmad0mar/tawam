import fs from 'fs';
import path from 'path';

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const lines = match[1].split(/\r?\n/);
  const data = {};
  let currentKey = null;

  for (const line of lines) {
    const kv = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (kv) {
      currentKey = kv[1];
      let val = kv[2].trim();
      if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      data[currentKey] = val;
    } else if (line.trim().startsWith('-') && currentKey) {
      if (!Array.isArray(data[currentKey])) data[currentKey] = [];
      let item = line.trim().slice(1).trim();
      if (item.startsWith("'") && item.endsWith("'")) item = item.slice(1, -1);
      data[currentKey].push(item);
    }
  }
  return data;
}

async function validate() {
  console.log('Running Content & Geographic Data Validation...');

  const statesJsonPath = path.resolve(process.cwd(), 'src/data/geo/states.json');
  if (!fs.existsSync(statesJsonPath)) {
    console.error('ERROR: src/data/geo/states.json not found!');
    process.exit(1);
  }

  const statesData = JSON.parse(fs.readFileSync(statesJsonPath, 'utf-8'));
  const statesMap = new Map();
  for (const s of statesData) {
    statesMap.set(s.slug, s);
  }

  const collegesDir = path.resolve(process.cwd(), 'src/data/colleges');
  if (!fs.existsSync(collegesDir)) {
    console.error('ERROR: src/data/colleges directory not found!');
    process.exit(1);
  }

  const collegeFiles = fs.readdirSync(collegesDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  console.log(`Found ${collegeFiles.length} colleges to validate.\n`);

  let errorCount = 0;
  let warnCount = 0;

  for (const file of collegeFiles) {
    const filePath = path.join(collegesDir, file);
    const text = fs.readFileSync(filePath, 'utf-8');
    const data = parseFrontmatter(text);

    if (!data) {
      console.error(`[ERROR] ${file}: Missing or unparseable frontmatter.`);
      errorCount++;
      continue;
    }

    const { name, state_slug, city_slug, state, city, type, cover_image } = data;

    // 1. Required fields
    if (!name || !state || !city || !type) {
      console.error(`[ERROR] ${file}: Missing required fields (name, state, city, type).`);
      errorCount++;
    }

    // 2. Type validation
    if (!['Government', 'Private', 'Deemed'].includes(type)) {
      console.error(`[ERROR] ${file}: Invalid type "${type}". Must be Government, Private, or Deemed.`);
      errorCount++;
    }

    // 3. Geographic validation
    const stateObj = statesMap.get(state_slug);
    if (!stateObj) {
      console.error(`[ERROR] ${file}: state_slug "${state_slug}" not found in states.json.`);
      errorCount++;
    } else {
      const cityObj = stateObj.cities.find((c) => c.slug === city_slug);
      if (!cityObj) {
        console.warn(`[WARN] ${file}: city_slug "${city_slug}" not registered under ${stateObj.name} in states.json.`);
        warnCount++;
      }
    }

    // 4. Slug check: filename without extension should match city or accepted city alias
    const fileSlug = file.replace(/\.(md|mdx)$/, '');
    const cityAliases = {
      mumbai: ['mumbai', 'bombay'],
      bangalore: ['bangalore', 'bengaluru'],
      chennai: ['chennai', 'madras'],
      kolkata: ['kolkata', 'calcutta'],
    };
    const acceptedSlugs = cityAliases[city_slug] || [city_slug];
    const hasCityMatch = acceptedSlugs.some((alias) => fileSlug.includes(alias));

    if (!hasCityMatch) {
      console.warn(`[WARN] ${file}: Slug "${fileSlug}" does not include city_slug "${city_slug}".`);
      warnCount++;
    }

    // 5. Image check
    if (cover_image) {
      const resolvedImg = cover_image.replace(/^~/, 'src');
      const imgPath = path.resolve(process.cwd(), resolvedImg);
      if (!fs.existsSync(imgPath)) {
        console.error(`[ERROR] ${file}: Referenced cover_image does not exist: ${resolvedImg}`);
        errorCount++;
      } else {
        const stats = fs.statSync(imgPath);
        if (stats.size > 500 * 1024) {
          console.warn(
            `[WARN] ${file}: Image ${resolvedImg} is large (${(stats.size / 1024).toFixed(1)} KB > 500 KB limit).`
          );
          warnCount++;
        }
      }
    }
  }

  console.log(`\nValidation complete: ${errorCount} errors, ${warnCount} warnings.`);
  if (errorCount > 0) {
    process.exit(1);
  }
}

validate().catch(console.error);
