#!/usr/bin/env node
/* Cambia el color de acento de TODO el sitio (CSS, JS, generador) de una vez.
   Uso:  npm run tema -- "#0a66ff"          (después:  npm run placeholders -- --nombre "Mi Agencia" && npm run build)
         npm run tema -- "#0a66ff" --dry    (muestra cuántos reemplazos haría, sin tocar nada)
   Cambia el rojo de acento y sus variantes (claro, oscuro, transparencias). Los negros, blancos y plata del diseño no se tocan.
   El acento vigente queda en data/tema.json, así que se puede volver a ejecutar con otro color las veces que haga falta. */
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [hex, ...flags] = process.argv.slice(2); const dry = flags.includes('--dry');
if (!/^#[0-9a-f]{6}$/i.test(hex || '')) { console.error('Uso: npm run tema -- "#rrggbb" [--dry]'); process.exit(1); }
const tf = path.join(root, 'data/tema.json'), T = JSON.parse(fs.readFileSync(tf, 'utf8'));
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const toHsl = ([r, g, b]) => { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2; let h = 0, s = 0; if (mx !== mn) { const d = mx - mn; s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h /= 6; } return [h, s, l]; };
const fromHsl = ([h, s, l]) => { const f = (p, q, t) => { t = (t + 1) % 1; return t < 1 / 6 ? p + (q - p) * 6 * t : t < .5 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; }; if (!s) return [l, l, l].map((v) => Math.round(v * 255)); const q = l < .5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q; return [f(p, q, h + 1 / 3), f(p, q, h), f(p, q, h - 1 / 3)].map((v) => Math.round(v * 255)); };
const hx = (c) => '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('');
const shade = (c, dl, ds = 0) => { const [h, s, l] = toHsl(c); return fromHsl([h, Math.min(1, Math.max(0, s + ds)), Math.min(.95, Math.max(.05, l + dl))]); };
const base = rgb(hex), luz = shade(base, +.12, +.14), osc = shade(base, -.17, +.1), pin = shade(base, -.03), o2 = shade(base, -.27), o3 = shade(base, -.38);
const nuevo = [hex.toLowerCase(), hx(luz), hx(osc), hx(pin), `rgba(${base}`, `rgba(${pin}`, `rgba(${o2}`, `rgba(${o3}`];
const files = []; for (const d of ['css', 'js']) for (const f of fs.readdirSync(path.join(root, d))) if (/\.(css|js)$/.test(f)) files.push(`${d}/${f}`);
files.push('scripts/estilos.css', 'scripts/build-index.mjs');
const total = {};
for (const f of files) {
  const p = path.join(root, f); let s = fs.readFileSync(p, 'utf8'), t = s;
  T.familia.forEach(([from], i) => { const re = new RegExp(from.replace(/[()]/g, '\\$&'), 'gi'); t = t.replace(re, () => { total[from] = (total[from] || 0) + 1; return `\u0000${i}\u0000`; }); });
  t = t.replace(/\u0000(\d)\u0000/g, (_, i) => nuevo[+i]);
  if (t !== s && !dry) fs.writeFileSync(p, t);
}
for (const [a, n] of Object.entries(total)) console.log(String(n).padStart(5), '×', a);
if (!dry) { T.acento = hex.toLowerCase(); T.familia = nuevo.map((v) => [v, v]); fs.writeFileSync(tf, JSON.stringify(T, null, 2) + '\n'); }
console.log(`${dry ? '[simulacro] ' : ''}acento ${hex}. Después: npm run placeholders -- --acento ${hex} && npm run build`);
