import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const colleges = [
  {
    slug: 'vellore-institute-of-technology-vellore',
    name: 'Vellore Institute of Technology',
    subtitle: 'Vellore, Tamil Nadu • NAAC A++ • NIRF #11',
    initials: 'VIT',
    gradient1: '#011B4A',
    gradient2: '#0F3A80',
    accent: '#D08701',
  },
  {
    slug: 'christian-medical-college-vellore',
    name: 'Christian Medical College',
    subtitle: 'Vellore, Tamil Nadu • NIRF #3 (Medical) • Est. 1900',
    initials: 'CMC',
    gradient1: '#011B4A',
    gradient2: '#164E63',
    accent: '#D08701',
  },
  {
    slug: 'rv-college-of-engineering-bangalore',
    name: 'RV College of Engineering',
    subtitle: 'Bengaluru, Karnataka • NAAC A+ • Est. 1963',
    initials: 'RVCE',
    gradient1: '#011B4A',
    gradient2: '#1E3A8A',
    accent: '#D08701',
  },
  {
    slug: 'indian-institute-of-management-bangalore',
    name: 'IIM Bangalore',
    subtitle: 'Bengaluru, Karnataka • NIRF #2 (Management)',
    initials: 'IIMB',
    gradient1: '#011B4A',
    gradient2: '#312E81',
    accent: '#D08701',
  },
  {
    slug: 'all-india-institute-of-medical-sciences-new-delhi',
    name: 'AIIMS New Delhi',
    subtitle: 'New Delhi, Delhi • NIRF #1 (Medical) • Est. 1956',
    initials: 'AIIMS',
    gradient1: '#011B4A',
    gradient2: '#064E3B',
    accent: '#D08701',
  },
  {
    slug: 'indian-institute-of-technology-bombay',
    name: 'IIT Bombay',
    subtitle: 'Mumbai, Maharashtra • NIRF #3 (Engineering) • Est. 1958',
    initials: 'IITB',
    gradient1: '#011B4A',
    gradient2: '#1E1B4B',
    accent: '#D08701',
  },
  {
    slug: 'national-institute-of-technology-tiruchirappalli',
    name: 'National Institute of Technology',
    subtitle: 'Tiruchirappalli, Tamil Nadu • NIRF #9 • Est. 1964',
    initials: 'NITT',
    gradient1: '#011B4A',
    gradient2: '#1E3A8A',
    accent: '#D08701',
  },
];

async function generateImages() {
  const baseDir = path.join(process.cwd(), 'src/assets/images/colleges');

  for (const c of colleges) {
    const collegeDir = path.join(baseDir, c.slug);
    fs.mkdirSync(collegeDir, { recursive: true });

    const svg = `
    <svg width="1280" height="800" viewBox="0 0 1280 800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${c.gradient1}"/>
          <stop offset="60%" stop-color="${c.gradient2}"/>
          <stop offset="100%" stop-color="#011333"/>
        </linearGradient>
        <radialGradient id="glow" cx="80%" cy="20%" r="50%">
          <stop offset="0%" stop-color="${c.accent}" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="${c.gradient1}" stop-opacity="0"/>
        </radialGradient>
        <pattern id="campusGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" stroke-width="1" stroke-opacity="0.04"/>
        </pattern>
      </defs>

      <!-- Background -->
      <rect width="1280" height="800" fill="url(#bgGrad)"/>
      <rect width="1280" height="800" fill="url(#campusGrid)"/>
      <rect width="1280" height="800" fill="url(#glow)"/>

      <!-- Architectural decorative arcs -->
      <g stroke="#FFFFFF" stroke-opacity="0.08" fill="none" stroke-width="2">
        <circle cx="1080" cy="400" r="280"/>
        <circle cx="1080" cy="400" r="220"/>
        <circle cx="1080" cy="400" r="160"/>
        <line x1="800" y1="400" x2="1280" y2="400"/>
        <line x1="1080" y1="120" x2="1080" y2="680"/>
      </g>

      <!-- Campus Monogram Emblem -->
      <g transform="translate(100, 240)">
        <rect width="130" height="130" rx="24" fill="${c.accent}" fill-opacity="0.15" stroke="${c.accent}" stroke-width="2"/>
        <text x="65" y="80" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="44" font-weight="bold" fill="${c.accent}">
          ${c.initials}
        </text>
      </g>

      <!-- Content text -->
      <text x="100" y="440" font-family="'Playfair Display', Georgia, serif" font-size="52" font-weight="bold" fill="#FFFFFF">
        ${c.name}
      </text>

      <text x="100" y="495" font-family="'Inter', Helvetica, sans-serif" font-size="22" font-weight="500" fill="#E8EEF9" letter-spacing="0.5">
        ${c.subtitle}
      </text>

      <!-- Badge Strip -->
      <g transform="translate(100, 540)">
        <rect width="180" height="42" rx="21" fill="#FFFFFF" fill-opacity="0.12"/>
        <text x="90" y="27" text-anchor="middle" font-family="'Inter', sans-serif" font-size="15" font-weight="600" fill="#FFFFFF">
          Verified Admission
        </text>
      </g>
      <g transform="translate(300, 540)">
        <rect width="200" height="42" rx="21" fill="${c.accent}" fill-opacity="0.2" stroke="${c.accent}" stroke-width="1"/>
        <text x="100" y="27" text-anchor="middle" font-family="'Inter', sans-serif" font-size="15" font-weight="600" fill="#FFF6DF">
          Tawam Counselling
        </text>
      </g>

      <!-- Bottom overlay gradient for cards/heros -->
      <rect y="640" width="1280" height="160" fill="url(#bgGrad)" fill-opacity="0.7"/>
    </svg>
    `;

    const outputPath = path.join(collegeDir, 'cover.webp');
    await sharp(Buffer.from(svg)).webp({ quality: 85 }).toFile(outputPath);

    console.log(`Generated: ${outputPath} (${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB)`);
  }
}

generateImages().catch(console.error);
