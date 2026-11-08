#!/usr/bin/env node
// Pone el logo real de cada agencia en SU demo (reemplaza el circulo con iniciales).
// Uso:  node scripts/aplicar-logos.mjs [--out ../demos-agencias] [--solo "Eskina"] [--logo "C:\ruta\logo.png"] [--modo circulo|insignia]
// El logo se busca en <out>/_fotos/<agencia>/logo.(png|jpg|jpeg|webp). Con --logo (y --solo) se copia ahi primero.
// Conserva nombre, formato y medida de cada archivo de images/ (logo, logo-sm, logo-circle, logo-emblema, icon-*, logo-prelude) y rehace favicon.svg.
import fs from 'node:fs'; import path from 'node:path';
import { fileURLToPath } from 'node:url'; import { spawnSync } from 'node:child_process';
import sharp from 'sharp';
sharp.cache(false);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf('--' + k); return i < 0 ? d : (argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : true); };
const OUT = path.resolve(root, arg('out', '../demos-agencias'));
const SOLO = arg('solo', null), LOGO = arg('logo', null), MODO = String(arg('modo', 'auto'));
const norm = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const OBJETIVOS = ['logo.png', 'logo-sm.png', 'logo-circle.png', 'logo-emblema.png', 'icon-180.png', 'icon-192.png', 'icon-512.png', 'logo-prelude.webp'];

const agencias = fs.readdirSync(OUT, { withFileTypes: true })
  .filter(d => d.isDirectory() && !d.name.startsWith('_') && fs.existsSync(path.join(OUT, d.name, 'images')))
  .map(d => d.name).filter(n => !SOLO || n.includes(norm(SOLO)));
if (!agencias.length) { console.log('No encontre ninguna demo' + (SOLO ? ' que coincida con "' + SOLO + '"' : '') + ' en ' + OUT); process.exit(1); }
if (LOGO && agencias.length !== 1) { console.log('--logo necesita --solo con UNA sola agencia. Coinciden: ' + agencias.join(', ')); process.exit(1); }

async function insignia(logoBuf, S, acento, modo) {
  const aro = Math.max(2, Math.round(S * 0.045));
  const svg = (inner) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}">${inner}</svg>`);
  const fondo = svg(`<circle cx="${S / 2}" cy="${S / 2}" r="${S / 2}" fill="#0a0a0c"/>`);
  const anillo = svg(`<circle cx="${S / 2}" cy="${S / 2}" r="${S / 2 - aro / 2}" fill="none" stroke="${acento}" stroke-width="${aro}"/>`);
  let dentro;
  if (modo === 'circulo') {
    const D = S - aro;
    const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${D}" height="${D}"><circle cx="${D / 2}" cy="${D / 2}" r="${D / 2}" fill="#fff"/></svg>`);
    dentro = await sharp(logoBuf).rotate().resize(D, D, { fit: 'cover' }).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
  } else {
    const B = Math.round(S * 0.6);
    dentro = await sharp(logoBuf).rotate().resize({ width: B, height: B, fit: 'inside' }).png().toBuffer();
  }
  return sharp({ create: { width: S, height: S, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: fondo }, { input: dentro, gravity: 'center' }, { input: anillo }]);
}

const resumen = [];
for (const slug of agencias) {
  const demo = path.join(OUT, slug), fdir = path.join(OUT, '_fotos', slug);
  if (LOGO) {
    if (!fs.existsSync(LOGO)) { console.log('No existe el archivo: ' + LOGO); process.exit(1); }
    fs.mkdirSync(fdir, { recursive: true });
    for (const e of ['png', 'jpg', 'jpeg', 'webp']) fs.rmSync(path.join(fdir, 'logo.' + e), { force: true });
    fs.copyFileSync(LOGO, path.join(fdir, 'logo' + path.extname(LOGO).toLowerCase()));
  }
  const f = ['png', 'jpg', 'jpeg', 'webp'].map(e => path.join(fdir, 'logo.' + e)).find(p => fs.existsSync(p));
  if (!f) { resumen.push({ agencia: slug, estado: 'sin logo (poner _fotos/' + slug + '/logo.png)', archivos: 0 }); continue; }
  const logoBuf = fs.readFileSync(f); const meta = await sharp(logoBuf).metadata();
  const r = meta.width / meta.height;
  const modo = MODO === 'auto' ? (r > 0.85 && r < 1.18 ? 'circulo' : 'insignia') : MODO;
  let acento = '#e10600';
  try { const m = /--rojo\s*:\s*(#[0-9a-fA-F]{3,8})/.exec(fs.readFileSync(path.join(demo, 'css', 'site.css'), 'utf8')); if (m) acento = m[1]; } catch (e) {}
  if (Math.min(meta.width, meta.height) < 512) console.log('  aviso ' + slug + ': el logo mide ' + meta.width + 'x' + meta.height + ' (conviene 512 px o mas para icon-512)');
  let n = 0;
  for (const nombre of OBJETIVOS) {
    const ruta = path.join(demo, 'images', nombre); if (!fs.existsSync(ruta)) continue;
    try {
      const { width, height } = await sharp(fs.readFileSync(ruta)).metadata();
      const S = Math.min(width, height);
      let p = await insignia(logoBuf, S, acento, modo);
      p = nombre.endsWith('.webp') ? p.webp({ quality: 95, effort: 5 }) : p.png({ compressionLevel: 9 });
      const buf = await p.toBuffer(); fs.writeFileSync(ruta + '.tmp', buf); fs.renameSync(ruta + '.tmp', ruta); n++;
    } catch (e) { console.log('  x', nombre, e.message); }
  }
  try {   // favicon.svg: PNG embebido de 128 px
    const fav = await (await insignia(logoBuf, 128, acento, modo)).png().toBuffer();
    fs.writeFileSync(path.join(demo, 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><image width="64" height="64" xlink:href="data:image/png;base64,${fav.toString('base64')}"/></svg>`); n++;
  } catch (e) { console.log('  x favicon.svg', e.message); }
  const proyecto = ('demo-' + slug).slice(0, 58).replace(/-+$/, '');
  const b = spawnSync('node', ['scripts/build-site.mjs'], { cwd: demo, encoding: 'utf8', env: { ...process.env, CF_PAGES_URL: `https://${proyecto}.pages.dev` } });
  resumen.push({ agencia: slug, estado: (b.status === 0 ? 'ok' : 'logo puesto, _site fallo') + ' (modo ' + modo + ')', archivos: n });
}
console.table(resumen);
console.log('Listo. Recarga con Ctrl+Shift+R (el navegador cachea los logos).');