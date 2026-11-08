#!/usr/bin/env node
/* Genera TODAS las imágenes de relleno que necesita la plantilla (hero, fondos, anillo, logos, íconos, og y fotos de las unidades de ejemplo).
   Sin fotos reales de nadie: siluetas sobre degradé con el color de acento. Se reemplazan por las del cliente (con su autorización) manteniendo los mismos nombres,
   o con scripts/make-images.mjs.
   Uso:  npm install && npm run placeholders   (opcional: --acento "#0a66ff" --nombre "Mi Agencia")  */
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > -1 ? process.argv[i + 1] : d; };
const TEMA = (() => { try { return JSON.parse(fs.readFileSync(path.join(root, 'data/tema.json'), 'utf8')); } catch { return {}; } })();
const DEAL = (() => { try { return JSON.parse(fs.readFileSync(path.join(root, 'data/dealership.json'), 'utf8')); } catch { return {}; } })();
const ACC = arg('acento', TEMA.acento || '#ee1c22'), NOMBRE = arg('nombre', (DEAL.identity && DEAL.identity.tradeName) || 'Tu Agencia');
const out = (f) => { const p = path.join(root, f); fs.mkdirSync(path.dirname(p), { recursive: true }); return p; };
const CAR = (w, h, s = 0.62) => { // silueta simple de auto, centrada
  const k = Math.min(w, h * 1.9) * s / 400, cx = w / 2, cy = h * 0.56;
  return `<g transform="translate(${cx - 200 * k},${cy - 70 * k}) scale(${k})" fill="rgba(255,255,255,.16)"><path d="M20 120h360c8 0 14-6 14-14v-18c0-12-8-22-20-26l-70-18-50-34c-6-4-12-6-20-6H170c-8 0-14 3-20 8l-52 34-62 10c-12 2-20 12-20 24v22c0 8 6 14 14 14z"/><circle cx="110" cy="124" r="30" fill="rgba(255,255,255,.28)"/><circle cx="300" cy="124" r="30" fill="rgba(255,255,255,.28)"/></g>`;
};
const bg = (w, h, a = ACC, label = '', car = true, tilt = 0) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b0b0d"/><stop offset=".6" stop-color="#17181b"/><stop offset="1" stop-color="${a}" stop-opacity=".55"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/>${car ? CAR(w, h) : ''}${label ? `<text x="${w / 2}" y="${h * 0.9}" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="${Math.round(Math.min(w, h) / 24)}" font-weight="700" letter-spacing="3" fill="rgba(255,255,255,.55)">${String(label).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>` : ''}</svg>`;
const save = async (svg, f, fmt = 'webp', q = 70) => { const s = sharp(Buffer.from(svg)); await (fmt === 'png' ? s.png() : fmt === 'jpg' ? s.jpeg({ quality: 78 }) : s.webp({ quality: q })).toFile(out(f)); };
const mark = (n) => `<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${n}" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#0b0b0d" stroke="${ACC}" stroke-width="4"/><text x="50" y="62" text-anchor="middle" font-family="Exo 2,Arial,sans-serif" font-size="34" font-weight="800" fill="#fff">${(NOMBRE.match(/\b\p{L}/gu) || ['A']).slice(0, 2).join('').toUpperCase()}</text></svg>`;

// Marca
for (const [f, n] of [['logo.png', 192], ['logo-sm.png', 192], ['logo-circle.png', 192], ['icon-180.png', 180], ['icon-192.png', 192], ['icon-512.png', 512], ['logo-emblema.png', 320]]) await save(mark(n), 'images/' + f, 'png');
await save(mark(320), 'images/logo-prelude.webp');
await save(bg(1200, 630, ACC, NOMBRE.toUpperCase(), true), 'images/og-dr.jpg', 'jpg');
// Hero (10) con y sin sello de marca
for (let i = 1; i <= 10; i++) { const n = String(i).padStart(2, '0'); await save(bg(900, 1200, ACC, `FOTO DE PORTADA ${i}`), `images/hero/hero-${n}.webp`); await save(bg(621, 828, ACC, `FOTO DE PORTADA ${i}`), `images/hero/hero-${n}-sm.webp`); }
// Anillo (10)
for (let i = 1; i <= 10; i++) await save(bg(600, 800, ACC, `UNIDAD ${i}`), `images/anillo/anillo-${String(i).padStart(2, '0')}.webp`);
// Fondos
for (const n of ['busqueda', 'contacto', 'financiacion', 'guia', 'tu-usado', 'visita']) { await save(bg(1200, 900, ACC, '', false), `images/fondos/fondo-${n}.webp`); await save(bg(800, 600, ACC, '', false), `images/fondos/fondo-${n}-800.webp`); }
await save(bg(900, 1200, ACC, '', false), 'images/fondos/fondo-donde.webp'); await save(bg(600, 800, ACC, '', false), 'images/fondos/fondo-donde-600.webp');
await save(bg(2418, 800, ACC, '', false), 'images/fondos/fondo-footer.webp'); await save(bg(720, 1200, ACC, '', false), 'images/fondos/fondo-footer-800.webp');
for (let i = 1; i <= 4; i++) await save(bg(900, 900, ACC, `LOCAL ${i}`, false), `images/fondos/nosotros-frente-${i}.webp`);
for (let i = 1; i <= 6; i++) await save(bg(1200, 800, ACC, '', false), `images/bg/stock-${i}.webp`);
// Unidades de ejemplo (data/vehicles.json): p01..p0N, thumb y card
const V = JSON.parse(fs.readFileSync(path.join(root, 'data/vehicles.json'), 'utf8'));
let n = 0;
for (const a of V.autos) for (const f of a.fotos) {
  const [w, h] = [f.width, f.height], lab = `${a.marca.toUpperCase()} ${a.modelo.toUpperCase()} · FOTO`;
  await save(bg(w, h, ACC, lab), f.src); await save(bg(320, Math.round(320 * h / w), ACC, '', true), f.thumb);
  if (f.card) await save(bg(f.cardWidth, f.cardHeight, ACC, lab), f.card); n++;
}
console.log(`✓ imágenes de relleno generadas (${n} fotos de unidades). Acento ${ACC}.`);
