import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function run() {
  const brandDir = 'src/assets/images/brand';
  const faviconsDir = 'src/assets/favicons';
  const imagesDir = 'src/assets/images';
  const inputLogo = path.join(brandDir, 'tawam-travels-logo.png');

  console.log('1. Optimizing logo...');
  const logoImage = sharp(inputLogo);
  const metadata = await logoImage.metadata();
  console.log(
    `Original logo: ${metadata.width}x${metadata.height}, size: ${(fs.statSync(inputLogo).size / 1024).toFixed(1)} KB`
  );

  // WebP optimized version (width 800)
  await sharp(inputLogo)
    .resize(800, null, { fit: 'inside' })
    .webp({ quality: 90 })
    .toFile(path.join(brandDir, 'tawam-travels-logo.webp'));

  // PNG optimized version (width 800)
  await sharp(inputLogo)
    .resize(800, null, { fit: 'inside' })
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(brandDir, 'tawam-travels-logo-opt.png'));

  console.log(
    `Optimized WebP: ${(fs.statSync(path.join(brandDir, 'tawam-travels-logo.webp')).size / 1024).toFixed(1)} KB`
  );
  console.log(
    `Optimized PNG: ${(fs.statSync(path.join(brandDir, 'tawam-travels-logo-opt.png')).size / 1024).toFixed(1)} KB`
  );

  console.log('2. Generating Favicon and Apple Touch Icon...');
  // The logo has a globe on the left. Let's find the emblem or crop the left square
  // Raw bounding box was minX: 18, maxX: 1905, minY: 18, maxY: 788.
  // The height is ~770px. The globe emblem occupies the left portion (approx x: 18 to 788).
  const emblemSquare = await sharp(inputLogo).extract({ left: 18, top: 18, width: 770, height: 770 }).toBuffer();

  // Apple touch icon 180x180
  await sharp(emblemSquare)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(faviconsDir, 'apple-touch-icon.png'));

  // 32x32 PNG for favicon
  await sharp(emblemSquare)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(faviconsDir, 'favicon-32x32.png'));

  // 16x16 PNG for favicon
  await sharp(emblemSquare)
    .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(faviconsDir, 'favicon-16x16.png'));

  // Also replace favicon.ico with 32x32 png buffer or create an ico
  // A 32x32 png works as favicon.ico in modern browsers, or we can write a multi-layer ico or standard ico
  const buf32 = await sharp(emblemSquare).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(faviconsDir, 'favicon.ico'), buf32);

  // SVG Favicon using brand colours
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#011B4A"/>
  <circle cx="50" cy="50" r="42" fill="#063F8A" stroke="#0572CE" stroke-width="2"/>
  <path d="M 20,50 Q 50,20 80,50 Q 50,80 20,50 Z" fill="none" stroke="#BEDFF8" stroke-width="2.5" opacity="0.6"/>
  <ellipse cx="50" cy="50" rx="20" ry="42" fill="none" stroke="#BEDFF8" stroke-width="2" opacity="0.5"/>
  <line x1="8" y1="50" x2="92" y2="50" stroke="#BEDFF8" stroke-width="2" opacity="0.5"/>
  <path d="M 15,75 Q 45,35 85,25" fill="none" stroke="#D08701" stroke-width="5" stroke-linecap="round"/>
  <path d="M 85,25 L 75,27 L 82,35 Z" fill="#ECAD04"/>
  <text x="50" y="60" font-family="'Playfair Display', serif" font-size="28" font-weight="bold" fill="#FFFFFF" text-anchor="middle">T</text>
</svg>`;
  fs.writeFileSync(path.join(faviconsDir, 'favicon.svg'), faviconSvg);

  console.log('3. Generating Open Graph default image (1200x628)...');
  // High-res logo resized for OG card (width ~560)
  const ogLogo = await sharp(inputLogo).resize(600, null, { fit: 'inside' }).png().toBuffer();

  const ogSvg = `<svg width="1200" height="628" viewBox="0 0 1200 628" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#011B4A"/>
      <stop offset="100%" stop-color="#0F3A80"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="628" fill="url(#navyGrad)"/>
  <!-- Decorative background elements -->
  <circle cx="1100" cy="100" r="300" fill="none" stroke="#0572CE" stroke-width="1.5" opacity="0.15"/>
  <circle cx="100" cy="550" r="250" fill="none" stroke="#0572CE" stroke-width="1.5" opacity="0.15"/>
  <!-- Gold accent stripe -->
  <rect x="0" y="620" width="1200" height="8" fill="#D08701"/>
  <!-- Subtitle -->
  <text x="600" y="470" font-family="'Inter', sans-serif" font-size="34" font-weight="600" fill="#BEDFF8" text-anchor="middle" letter-spacing="1">EDUCATION COUNSELLING &amp; ADMISSIONS</text>
  <text x="600" y="525" font-family="'Inter', sans-serif" font-size="22" font-weight="400" fill="#E8EEF9" text-anchor="middle" opacity="0.9">Top Colleges &#8226; Courses &#8226; Entrance Exams &#8226; Admission Guidance</text>
</svg>`;

  const bgBuffer = Buffer.from(ogSvg);

  // Composite logo onto the 1200x628 canvas
  await sharp(bgBuffer)
    .composite([
      {
        input: ogLogo,
        top: 130,
        left: 300,
      },
    ])
    .png()
    .toFile(path.join(imagesDir, 'default.png'));

  console.log(
    `Generated default OG image: ${(fs.statSync(path.join(imagesDir, 'default.png')).size / 1024).toFixed(1)} KB`
  );
  console.log('All brand assets generated successfully!');
}

run().catch(console.error);
