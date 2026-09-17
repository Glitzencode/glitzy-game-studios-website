import { test, expect } from '@playwright/test';
import { routes, games, BETA_URL } from '../src/content';

test('every public page renders, has usable local assets, and fits the viewport', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400 && response.url().startsWith('http://127.0.0.1:4173')) errors.push(`${response.status()} ${response.url()}`); });
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page).toHaveTitle(/Glitzy Game Studios/);
    await page.evaluate(async () => {
      for (const image of document.images) { image.loading = 'eager'; await image.decode().catch(() => {}); }
      await document.fonts.ready;
    });
    expect(await page.locator('img').evaluateAll(images => images.every(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0))).toBeTruthy();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), route).toBeTruthy();
    await expect(page.locator('.header-cta')).toHaveAttribute('href', BETA_URL);
  }
  expect(errors).toEqual([]);
});

test('game filters reveal the correct projects and reset', async ({ page }) => {
  await page.goto('/games/');
  await expect(page.locator('.game-card')).toHaveCount(6);
  await page.getByRole('button', { name: 'Arcade & action' }).click();
  await expect(page.locator('.game-card')).toHaveCount(3);
  await expect(page.locator('.game-grid')).toContainText('Cleaning Chaos');
  await expect(page.locator('.game-grid')).not.toContainText('Echoes of History');
  await page.getByRole('button', { name: 'Stories & worlds' }).click();
  await expect(page.locator('.game-card')).toHaveCount(3);
  await expect(page.locator('.game-grid')).toContainText('The Scribbylinth');
  await page.getByRole('button', { name: /All games/ }).click();
  await expect(page.locator('.game-card')).toHaveCount(6);
  await page.locator('.game-card').first().click();
  await expect(page).toHaveURL(/\/games\/echoes-of-history\//);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Echoes of History');
});

test('beta guide explains invitations and its FAQ opens', async ({ page }) => {
  await page.goto('/beta/echoes-of-history/');
  await expect(page.getByRole('link', { name: 'Open Echoes of History' })).toHaveAttribute('href', BETA_URL);
  await page.getByText('Can I play right now?', { exact: true }).click();
  await expect(page.locator('details[open]')).toContainText('receiving access is not automatic');
});

test('mobile navigation supports menu, escape, and a real page destination', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile navigation only');
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Open navigation' });
  await toggle.click();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'The studio' }).click();
  await expect(page).toHaveURL(/\/studio\//);
});

test('long descriptions survive direct navigation and server rendering', async ({ request }) => {
  for (const game of games) {
    const response = await request.get(`/games/${game.slug}/`);
    const html = await response.text();
    expect(response.ok()).toBeTruthy();
    expect(html).toContain(game.paragraphs[0].replace(/&/g, '&amp;').replace(/'/g, '&#x27;').replace(/"/g, '&quot;'));
  }
});
