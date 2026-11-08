#!/usr/bin/env node
// Pone las fotos reales de cada agencia en SU demo (y solo en la suya).
// Uso:  node scripts/aplicar-fotos.mjs [--csv prospeccion/agencias.csv] [--out ../demos-agencias]
//                                      [--solo "Nombre"] [--sin-generar]
// Pasos por agencia:
//  1. Resguarda sus fotos (<out>/<slug>/images/reales) en <out>/_fotos/<slug> (generar-demos borra la carpeta de la demo).
//  2. Genera las demos (npm run demos) salvo que uses --sin-generar.
//  3. Reemplaza las imágenes de relleno (hero, stock, anillo, bg, fondos, og) por recortes de las fotos reales,
//     conservando nombre, formato y medidas de cada archivo: ningún HTML ni JSON cambia.
//  4. Regenera _site/ (lo que se sube a Cloudflare). Las fotos originales NO viajan en _site.
// Agencias sin fotos reales: quedan con las imágenes de relleno.
import fs from 'node:fs'; import path from 'node:path';
import { fileURLToPath } from 'node:url'; import { spawnSync } from 'node:child_process';
import sharp from 'sharp';
sharp.cache(false);   // Windows: sin caché, sharp no deja archivos trabados

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf('--' + k); return i < 0 ? d : (argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : true); };
const CSV = path.resolve(root, arg('csv', 'prospeccion/agencias.csv')), OUT = path.resolve(root, arg('out', '../demos-agencias'));
const SOLO = arg('solo', null), SIN_GENERAR = !!arg('sin-generar', false);
const slug = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
function parseCSV(t) { const rows = []; let r = [], f = '', q = false; t = t.replace(/^\uFEFF/, '');
  for (let i = 0; i < t.length; i++) { const c = t[i];
    if (q) { if (c === '"' && t[i + 1] === '"') { f += '"'; i++; } else if (c === '"') q = false; else f += c; }
    else if (c === '"') q = true; else if (c === ',') { r.push(f); f = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && t[i + 1] === '\n') i++; r.push(f); rows.push(r); r = []; f = ''; } else f += c; }
  if (f || r.length) { r.push(f); rows.push(r); }
  const [h, ...b] = rows.filter(x => x.some(y => y.trim())); return b.map(x => Object.fromEntries(h.map((k, i) => [k.trim().toLowerCase(), (x[i] || '').trim()]))); }

const agencias = parseCSV(fs.readFileSync(CSV, 'utf8')).filter(a => a.nombre);
const lista = agencias.filter(a => !SOLO || a.nombre.toLowerCase().includes(String(SOLO).toLowerCase()));
const fotosDir = a => path.join(OUT, '_fotos', slug(a.nombre));

// 1. resguardo
for (const a of lista) {
  const reales = path.join(OUT, slug(a.nombre), 'images', 'reales');
  if (fs.existsSync(reales)) { fs.mkdirSync(fotosDir(a), { recursive: true }); fs.cpSync(reales, fotosDir(a), { recursive: true }); }
}
// 2. generar demos
if (!SIN_GENERAR) {
  console.log('▶ Generando demos…');
  const extra = SOLO ? [] : [];
  const r = spawnSync('node', ['scripts/generar-demos.mjs', CSV, '--out', OUT, ...extra], { cwd: root, stdio: 'inherit' });
  if (r.status !== 0) console.log('⚠ generar-demos terminó con avisos (revisá arriba); sigo con las demos que se generaron.');
}
// 3 y 4. aplicar
const IMG = /\.(webp|jpe?g|png)$/i, CARPETAS = ['hero', 'stock', 'anillo', 'bg', 'fondos', 'og'];
const resumen = [];
for (const a of lista) {
  const demo = path.join(OUT, slug(a.nombre)); const src = fotosDir(a);
  const fotos = fs.existsSync(src) ? fs.readdirSync(src).filter(f => /^foto-\d+\.webp$/.test(f)).sort().map(f => path.join(src, f)) : [];
  if (!fs.existsSync(path.join(demo, 'images', 'hero'))) { resumen.push({ agencia: a.nombre, estado: 'sin demo generada', reemplazadas: 0 }); continue; }
  fs.rmSync(path.join(demo, 'images', 'reales'), { recursive: true, force: true });
  if (!fotos.length) { resumen.push({ agencia: a.nombre, estado: 'sin fotos: queda el relleno', reemplazadas: 0 }); continue; }
  /* PARCHE-CALIDAD: solo fotos verticales para unidades/portada/anillo; las apaisadas (banners) solo para og */
  const meta = await Promise.all(fotos.map(async (x) => ({ x, m: await sharp(x).metadata() })));
  const V = meta.filter((o) => o.m.height >= o.m.width * 1.1).map((o) => o.x);
  const A = meta.filter((o) => o.m.width > o.m.height * 1.3).map((o) => o.x);
  const pool = V.length ? V : fotos; const n = pool.length; let cuenta = 0; const claves = new Map();
  console.log('  ' + a.nombre + ': ' + V.length + ' verticales, ' + A.length + ' apaisadas (banner)');
  const idxPorClave = k => { if (!claves.has(k)) claves.set(k, claves.size); return claves.get(k); };
  const elegir = (carpeta, nombre) => {
    const base = nombre.replace(IMG, '');
    let m = base.match(/^demo(\d+)-(?:p(\d+)|card)(?:-thumb)?$/);
    if (carpeta === 'stock' && m) return ((+m[1] - 1) * 4 + (m[2] ? +m[2] - 1 : 0)) % n;
    m = base.match(/^u-demo(\d+)$/); if (m) return ((+m[1] - 1) * 4) % n;
    m = base.match(/^(?:hero|anillo)-(\d+)/); if (m) return (+m[1] - 1 + (carpeta === 'anillo' ? 4 : 0)) % n;
    if (carpeta === 'og') return 0;
    return idxPorClave(carpeta + base.replace(/-(sm|\d{3,4}w?)$/, '')) % n;
  };
  const archivos = [...CARPETAS.flatMap(c => { const d = path.join(demo, 'images', c); return fs.existsSync(d) ? fs.readdirSync(d).filter(f => IMG.test(f)).map(f => [c, path.join(d, f), f]) : []; }),
    ...(fs.existsSync(path.join(demo, 'images', 'og-dr.jpg')) ? [['og', path.join(demo, 'images', 'og-dr.jpg'), 'og-dr.jpg']] : [])];
  for (const [c, ruta, nombre] of archivos) {
    try {
      const original = fs.readFileSync(ruta);   // en memoria: así el archivo no queda abierto y se puede reescribir
      const { width, height, format } = await sharp(original).metadata();
      const elegida = (c === 'og' && A.length) ? A[0] : pool[elegir(c, nombre)];
      const fb = fs.readFileSync(elegida); let p;
      if (width > height * 1.2 && c !== 'og') {   /* hueco apaisado: foto ENTERA sobre su propio fondo desenfocado, sin cortar el auto */
        const fg = await sharp(fb).rotate().resize({ width, height, fit: 'inside' }).toBuffer();
        p = sharp(fb).rotate().resize(width, height, { fit: 'cover' }).blur(30).modulate({ brightness: 0.55 }).composite([{ input: fg, gravity: 'center' }]);
      } else p = sharp(fb).rotate().resize(width, height, { fit: 'cover', position: sharp.strategy.attention });
      p = format === 'jpeg' ? p.jpeg({ quality: 92, mozjpeg: true }) : format === 'png' ? p.png() : p.webp({ quality: 92, effort: 5, smartSubsample: true });
      const buf = await p.toBuffer(); const tmp = ruta + '.tmp';
      fs.writeFileSync(tmp, buf); fs.renameSync(tmp, ruta); cuenta++;
    } catch (e) { console.log('  ✗', nombre, e.message); }
  }
  const proyecto = `demo-${slug(a.nombre)}`.slice(0, 58).replace(/-+$/, '');
  const b = spawnSync('node', ['scripts/build-site.mjs'], { cwd: demo, encoding: 'utf8', env: { ...process.env, CF_PAGES_URL: `https://${proyecto}.pages.dev` } });
  resumen.push({ agencia: a.nombre, estado: b.status === 0 ? 'ok' : 'fotos puestas, _site falló', reemplazadas: cuenta });
}
console.table(resumen);
console.log(`Listo. Abrí cada demo con:  cd ${OUT}\\<agencia> ; node scripts/serve.mjs  (http://localhost:8080)`);
