# Glitzy Game Studios website

A React/TypeScript studio website built with Vite, with pre-rendered HTML for each public page. All six game descriptions live in `src/content.ts`; selected short copy, alternative blurbs, full descriptions, and artwork mappings are kept separately. The existing Echoes app stays on Railway.

## Local development

Requires Node.js 22.12+ or a compatible newer release.

```sh
npm ci
npm run dev
```

On Windows PowerShell with restricted script execution, use `npm.cmd` instead of `npm`.

## Build and check

```sh
npm run build
npx playwright install chromium
npm test
npm run preview
```

Build output is `dist/`. Real HTML pages support direct navigation and readable content before JavaScript loads. Filtering and the mobile menu are progressively hydrated. The Play Beta link is centralized as `BETA_URL` in `src/content.ts`.

## Deployment

### Railway (recommended for this project)

Create a separate Railway service from this GitHub repository. Railway detects `Dockerfile` and `railway.json`, builds the pre-rendered site, and starts the production Express server. The server listens on Railway's `PORT`, serves each generated page, returns the custom 404 with HTTP 404, and exposes `/health` for deployment checks. It also supplies compression and security headers.

Generate a Railway domain under service Settings → Networking. Set `SITE_URL` to the full public website URL and redeploy to generate canonical URLs and the sitemap (the Docker build also accepts `RAILWAY_PUBLIC_DOMAIN` as a fallback). Use a separate service from Echoes; the website's Play Beta links continue pointing to the existing app.

For a local production check after building, run `npm start` and visit `http://localhost:3000`.

### Other static hosts

For Cloudflare Pages or another static host, use build command `npm run build`, output directory `dist`, and Node.js 24. Set `SITE_URL` to the final absolute studio URL at build time to generate canonical URLs, social image URLs, and a sitemap. No Claude, Supabase, or Railway credentials belong in this website.

The site has not been published. `public/_headers` supplies Cloudflare-compatible security and cache headers; configure equivalents on other hosts. Serve the generated directory index pages and use `404.html` for unknown paths. Do not rewrite every request to the homepage: routes have their own generated HTML.

Echoes currently opens at `https://echoes-of-history-production.up.railway.app/`. When the studio domain is ready, add `play.<studio-domain>` to the existing Railway service, validate the app's origin-dependent settings and account flows, then update `BETA_URL`. No application backend changes are included here.

## Artwork and content

`scripts/asset-map.json` maps each web asset to its source path in the supplied Dropbox archive. `public/assets` contains responsive WebP derivatives and a favicon; the original images stay outside the published output. Local extracted masters are ignored under `.asset-masters/`. To regenerate derivatives after extracting the mapped images as `<key>.png`, run `node scripts/optimize-assets.mjs`.

Fonts are bundled locally through Fontsource: DM Sans, Space Grotesk, and Instrument Serif. There are no runtime requests to Google Fonts, trackers, signup forms, or fabricated social/contact links. The studio page illustration is labeled as artwork, and game presentation images are not claimed to be verified gameplay screenshots.

User-supplied copy is used for all six games. The Scribbylinth spelling follows the supplied description, despite the source asset folder using Scribblynth. HTML entities and stray formatting from pasted descriptions have been removed. Card blurbs use one selected short description; the remaining alternatives are preserved in the content file. Release dates and unconfirmed availability for the other games are not invented.

Before public launch, supply the final domain and any real contact details to add, review selected release assets, and test the live Echoes account/play journey. The site links to the app's existing invitation flow; it does not collect feedback or signup information itself.
