import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const PORT = 4331;
const DIST_DIR = path.resolve('dist');
const ARTIFACT_DIR = path.resolve('C:/Users/HP-NB/.gemini/antigravity/brain/dd32daf4-25a8-44e2-838f-d074836f8aac');
const OUT_DIR = path.join(ARTIFACT_DIR, 'screenshots');
const TMP_USER_DATA = path.resolve('.chrome-tmp-v2');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}
if (!fs.existsSync(TMP_USER_DATA)) {
  fs.mkdirSync(TMP_USER_DATA, { recursive: true });
}

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath.endsWith('/')) {
    reqPath += 'index.html';
  } else if (!path.extname(reqPath)) {
    if (fs.existsSync(path.join(DIST_DIR, reqPath, 'index.html'))) {
      reqPath = path.join(reqPath, 'index.html');
    } else if (fs.existsSync(path.join(DIST_DIR, reqPath + '.html'))) {
      reqPath += '.html';
    }
  }

  const filePath = path.join(DIST_DIR, reqPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const captures = [
  // Desktop captures (1280 width)
  { name: 'desktop_homepage_hero.png', url: `http://127.0.0.1:${PORT}/`, width: 1280, height: 900 },
  { name: 'desktop_blog_listing.png', url: `http://127.0.0.1:${PORT}/blog/`, width: 1280, height: 1100 },
  { name: 'desktop_exams_listing.png', url: `http://127.0.0.1:${PORT}/exams/`, width: 1280, height: 1000 },
  { name: 'desktop_colleges_directory.png', url: `http://127.0.0.1:${PORT}/colleges/`, width: 1280, height: 1100 },
  { name: 'desktop_college_vit.png', url: `http://127.0.0.1:${PORT}/colleges/vellore-institute-of-technology-vellore/`, width: 1280, height: 1100 },

  // Mobile captures (390 width - mobile view to test circle floating button & Explore button clearance)
  { name: 'mobile_homepage_hero.png', url: `http://127.0.0.1:${PORT}/`, width: 390, height: 844 },
  { name: 'mobile_blog_listing.png', url: `http://127.0.0.1:${PORT}/blog/`, width: 390, height: 844 },
  { name: 'mobile_exams_listing.png', url: `http://127.0.0.1:${PORT}/exams/`, width: 390, height: 844 },
];

server.listen(PORT, '127.0.0.1', async () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);

  try {
    for (const c of captures) {
      const outPath = path.join(OUT_DIR, c.name);
      console.log(`Capturing ${c.name} (${c.width}x${c.height})...`);

      await execFileAsync(chromePath, [
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        '--hide-scrollbars',
        `--window-size=${c.width},${c.height}`,
        `--user-data-dir=${TMP_USER_DATA}`,
        `--screenshot=${outPath}`,
        c.url,
      ]);

      const size = fs.existsSync(outPath) ? fs.statSync(outPath).size : 0;
      console.log(`Saved: ${outPath} (${size} bytes)`);
    }
    console.log('All desktop & mobile screenshots captured successfully!');
  } catch (err) {
    console.error('Error capturing screenshot:', err);
  } finally {
    server.close();
    try {
      fs.rmSync(TMP_USER_DATA, { recursive: true, force: true });
    } catch {
      // ignore
    }
    process.exit(0);
  }
});
