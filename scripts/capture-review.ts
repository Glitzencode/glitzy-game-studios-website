import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

await mkdir('test-results/visual', { recursive: true });
const browser = await chromium.launch();
for (const [name, width, height, route] of [
  ['home-desktop', 1440, 1000, '/'],
  ['home-mobile', 390, 844, '/'],
  ['echoes-desktop', 1440, 1000, '/games/echoes-of-history/'],
  ['beta-mobile', 390, 844, '/beta/echoes-of-history/'],
] as const) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto(`http://127.0.0.1:4173${route}`, { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    for (const image of document.images) { image.loading = 'eager'; await image.decode().catch(() => {}); }
    await document.fonts.ready;
  });
  await page.screenshot({ path: `test-results/visual/${name}.png`, fullPage: true });
  await page.close();
}
await browser.close();
console.log('Saved desktop and mobile screenshots to test-results/visual.');
