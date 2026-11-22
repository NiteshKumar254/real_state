import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const imagesToDownload = [
  // Properties
  {
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/properties/penthouse-luminary-1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/properties/penthouse-luminary-2.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/properties/villa-serenity-1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/properties/villa-serenity-2.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/properties/apartment-solaris-1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/properties/apartment-solaris-2.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/properties/commercial-apex-1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/properties/commercial-apex-2.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/properties/villa-belgravia-1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/properties/villa-belgravia-2.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/properties/apartment-terrace-1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/properties/apartment-terrace-2.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/properties/plot-whispering-1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/properties/plot-whispering-2.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/properties/apartment-prism-1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/properties/apartment-prism-2.jpg'
  },

  // Projects
  {
    url: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/projects/solarium.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/projects/monolith.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/projects/botanica.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
    dest: 'public/assets/images/projects/waterscape.jpg'
  },

  // Page Heroes
  {
    url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
    dest: 'public/assets/images/hero/about-hero.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    dest: 'public/assets/images/hero/properties-hero.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
    dest: 'public/assets/images/hero/services-hero.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80',
    dest: 'public/assets/images/hero/contact-hero.jpg'
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
          fs.unlinkSync(fullPath);
          return reject(new Error(`Failed with status ${response.statusCode} for ${targetUrl}`));
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
  console.log(`Starting download of ${imagesToDownload.length} assets...`);
  for (const item of imagesToDownload) {
    try {
      await download(item.url, item.dest);
      console.log(`Downloaded: ${item.dest}`);
    } catch (err) {
      console.error(`Error downloading ${item.dest}:`, err.message);
    }
  }
  console.log('All downloads completed.');
}

run();
