import express from 'express';
import compression from 'compression';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const app = express();
app.disable('x-powered-by');
app.use(compression());
app.use((_req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'DENY',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://echoes-of-history-production.up.railway.app; base-uri 'self'; frame-ancestors 'none'; form-action 'self'",
  });
  next();
});
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use(express.static(root, {
  setHeaders(res, file) {
    res.setHeader('Cache-Control', file.endsWith('.html') ? 'no-cache' : 'public, max-age=86400');
  },
}));
app.use((_req, res) => res.status(404).sendFile(path.join(root, '404.html')));
const server = app.listen(Number(process.env.PORT || 3000), '0.0.0.0', () => {
  console.log(`Studio website listening on port ${process.env.PORT || 3000}`);
});
process.on('SIGTERM', () => server.close(() => process.exit(0)));
