import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const images = [
  // 1. Initial Homepage Hero: Stunning modern architectural estate with great lighting and right-side composition
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
    dest: 'public/assets/images/hero/hero-architectural.jpg'
  },
  // 2. Aurelia Monolith Towers: Striking modern commercial corporate glass skyscraper
  {
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85',
    dest: 'public/assets/images/projects/monolith.jpg'
  },
  // 3. The Aurelia Solarium: Biophilic luxury estate development
  {
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
    dest: 'public/assets/images/projects/solarium.jpg'
  },
  // 4. Aurelia Botanica Residences: Cascading garden condominium luxury architecture
  {
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=85',
    dest: 'public/assets/images/projects/botanica.jpg'
  },
  // 5. Aurelia Waterscape: Waterfront luxury villas
  {
    url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=85',
    dest: 'public/assets/images/projects/waterscape.jpg'
  }
];

function download(url, destPath) {
  return new Promise((resolve, reject) => {
    const fullPath = path.resolve(projectRoot, destPath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });

    const file = fs.createWriteStream(fullPath);
    const request = (targetUrl) => {
      https.get(targetUrl, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          return request(response.headers.location);
        }
        if (response.statusCode !== 200) {
          file.close();
          try { fs.unlinkSync(fullPath); } catch {}
          return reject(new Error(`Status ${response.statusCode} for ${targetUrl}`));
        }
        response.pipe(file);
        file.on('finish', () => {
          file.close(() => resolve(destPath));
        });
      }).on('error', (err) => {
        file.close();
        try { fs.unlinkSync(fullPath); } catch {}
        reject(err);
      });
    };
    request(url);
  });
}

async function run() {
  console.log(`Downloading ${images.length} targeted images...`);
  for (const item of images) {
    try {
      await download(item.url, item.dest);
      console.log(`Success: ${item.dest}`);
    } catch (err) {
      console.error(`Error ${item.dest}:`, err.message);
    }
  }
  console.log('Complete.');
}

run();
