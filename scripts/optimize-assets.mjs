import sharp from 'sharp';
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const map = JSON.parse(await readFile('scripts/asset-map.json', 'utf8'));
await mkdir('public/assets', { recursive: true });
for (const name of Object.keys(map)) {
  const input = path.join('.asset-masters', `${name}.png`);
  for (const width of [640, 1280, 1920]) {
    await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public/assets/${name}-${width}.webp`);
  }
}
await sharp('.asset-masters/studio-emblem.png').resize(64, 64, { fit: 'contain', background: '#09090c' }).png().toFile('public/assets/favicon.png');
console.log(`Optimized ${Object.keys(map).length} source images.`);
