import React from 'react';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import App from '../src/App';
import { routes, pageMeta } from '../src/content';

const template = await readFile('dist/index.html', 'utf8');
const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const siteUrl = process.env.SITE_URL?.replace(/\/$/, '');
if (siteUrl && !/^https?:\/\//.test(siteUrl)) throw new Error('SITE_URL must be an absolute http(s) URL.');
for (const route of [...routes, '/404/']) {
  const meta = pageMeta(route);
  const markup = renderToString(<App path={route} />);
  const socialImage = `${siteUrl ?? ''}/assets/${meta.image}-1280.webp`;
  const extraMeta = `\n<meta property="og:title" content="${escape(meta.title)}" />\n<meta property="og:description" content="${escape(meta.description)}" />\n<meta property="og:type" content="website" />\n${siteUrl ? `<link rel="canonical" href="${escape(siteUrl + route)}" /><meta property="og:url" content="${escape(siteUrl + route)}" /><meta property="og:image" content="${escape(socialImage)}" />` : ''}\n<meta name="twitter:card" content="summary_large_image" />`;
  let html = template.replace(/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(meta.description)}" />`)
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
    .replace('</head>', `${extraMeta}\n</head>`);
  if (route !== '/') html = html.replace(/<link rel="preload" href="\/assets\/studio-worlds-1920.webp" as="image"\s*\/>/, '');
  if (route === '/404/') html = html.replace('</head>', '<meta name="robots" content="noindex" /></head>');
  const directory = route === '/404/' ? 'dist' : path.join('dist', route);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, route === '/404/' ? '404.html' : 'index.html'), html);
}
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ''}`);
if (siteUrl) await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route => `<url><loc>${escape(siteUrl + route)}</loc></url>`).join('')}</urlset>`);
console.log(`Prerendered ${routes.length} pages and a custom 404.${siteUrl ? ' Canonicals and sitemap generated.' : ' Set SITE_URL at build time for canonical URLs and a sitemap.'}`);
