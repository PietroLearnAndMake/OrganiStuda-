import fs from 'fs';
import https from 'https';
import { createCanvas, loadImage } from 'canvas';

// A similar sculpture image from Unsplash that allows programmatic downloads
const url = 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1920&auto=format&fit=crop';
const sizes = [512, 192, 144, 96, 72, 48];

async function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadImage(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status code: ${res.statusCode}`));
      }
      const data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
    }).on('error', reject);
  });
}

async function generateIcons() {
  try {
    console.log('Downloading image...');
    const buffer = await downloadImage(url);
    const image = await loadImage(buffer);
    
    for (const size of sizes) {
      const canvas = createCanvas(size, size);
      const ctx = canvas.getContext('2d');
      
      // Calculate crop to center the image
      const scale = Math.max(size / image.width, size / image.height);
      const x = (size / scale - image.width) / 2;
      const y = (size / scale - image.height) / 2;
      
      ctx.scale(scale, scale);
      ctx.drawImage(image, x, y);
      
      const outBuffer = canvas.toBuffer('image/png');
      fs.writeFileSync(`./public/icon-${size}.png`, outBuffer);
      console.log(`Generated icon-${size}.png`);
    }
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
