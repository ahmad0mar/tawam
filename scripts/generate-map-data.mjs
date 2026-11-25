import fs from 'node:fs';

const svgPath = fs.existsSync('india.svg') ? 'india.svg' : '../india.svg';
const svgContent = fs.readFileSync(svgPath, 'utf8');

const statesJson = JSON.parse(fs.readFileSync('src/data/geo/states.json', 'utf8'));

// Code alias map: SVG ID -> ISO Code in states.json
const svgIdToIso = {
  INAN: 'IN-AN',
  INTG: 'IN-TG',
  INAP: 'IN-AP',
  INAR: 'IN-AR',
  INAS: 'IN-AS',
  INBR: 'IN-BR',
  INCH: 'IN-CH',
  INCT: 'IN-CG',
  INDH: 'IN-DH',
  INDL: 'IN-DL',
  INGA: 'IN-GA',
  INGJ: 'IN-GJ',
  INHR: 'IN-HR',
  INHP: 'IN-HP',
  INJH: 'IN-JH',
  INKA: 'IN-KA',
  INKL: 'IN-KL',
  INMP: 'IN-MP',
  INMH: 'IN-MH',
  INMN: 'IN-MN',
  INML: 'IN-ML',
  INMZ: 'IN-MZ',
  INNL: 'IN-NL',
  INOR: 'IN-OD',
  INPY: 'IN-PY',
  INPB: 'IN-PB',
  INRJ: 'IN-RJ',
  INSK: 'IN-SK',
  INTN: 'IN-TN',
  INTR: 'IN-TR',
  INUP: 'IN-UP',
  INUT: 'IN-UK',
  INWB: 'IN-WB',
  INLD: 'IN-LD',
  INJK: 'IN-JK',
  INLA: 'IN-LA',
};

const regex = /<path([^>]+)>/g;
let match;
const pathMap = {};

while ((match = regex.exec(svgContent)) !== null) {
  const attrs = match[1];
  const idMatch = attrs.match(/id="([^"]+)"/);
  const dMatch = attrs.match(/d="([^"]+)"/);
  if (idMatch && dMatch) {
    const svgId = idMatch[1];
    const iso = svgIdToIso[svgId] || `IN-${svgId.slice(2)}`;
    pathMap[iso] = dMatch[1];
  }
}

// Check that every state in states.json has a matching path
const matched = [];
const missing = [];
for (const state of statesJson) {
  if (pathMap[state.code]) {
    matched.push({
      code: state.code,
      name: state.name,
      slug: state.slug,
      d: pathMap[state.code],
    });
  } else {
    missing.push(state.code);
  }
}

console.log(`Matched: ${matched.length} / ${statesJson.length}`);
if (missing.length > 0) {
  console.error('Missing states:', missing);
  process.exit(1);
}

// Generate src/data/geo/indiaMapPaths.ts
const tsContent = `// Generated India State Map SVG Paths
// Standard Mercator projection, viewBox: "0 0 1000 1000"
export interface IndiaMapStatePath {
  code: string;
  name: string;
  slug: string;
  d: string;
}

export const INDIA_MAP_VIEWBOX = '0 0 1000 1000';

export const INDIA_STATE_PATHS: IndiaMapStatePath[] = ${JSON.stringify(matched, null, 2)};
`;

fs.writeFileSync('src/data/geo/indiaMapPaths.ts', tsContent, 'utf8');
console.log('Successfully generated src/data/geo/indiaMapPaths.ts');
