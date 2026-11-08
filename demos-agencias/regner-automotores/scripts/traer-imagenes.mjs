// Trae imágenes públicas de cada agencia listada en prospeccion/agencias.csv.
// Uso:  node scripts/traer-imagenes.mjs [--csv prospeccion/agencias.csv] [--out ../demos-agencias]
//                                       [--max 12] [--min-ancho 700] [--browser] [--solo "Nombre"]
// Fuentes por agencia: columnas facebook, fuente, web (opcional) y sitio/instagram si están.
// Guarda en <out>/<slug>/images/reales/ (webp) + fotos-origen.json (URL de cada foto, fecha).
import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto';
import sharp from 'sharp';

const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i < 0 ? d : (process.argv[i + 1]?.startsWith('--') || i + 1 >= process.argv.length ? true : process.argv[i + 1]); };
const CSV = arg('csv', 'prospeccion/agencias.csv'), OUT = arg('out', '../demos-agencias');
const MAX = +arg('max', 12), MIN_W = +arg('min-ancho', 700), BROWSER = !!arg('browser', false), SOLO = arg('solo', null);
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

function parseCSV(t) { // CSV con comillas
  const rows = []; let r = [], f = '', q = false;
  for (let i = 0; i < t.length; i++) { const c = t[i];
    if (q) { if (c === '"') { if (t[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true; else if (c === ',') { r.push(f); f = ''; }
    else if (c === '\n') { r.push(f); rows.push(r); r = []; f = ''; } else if (c !== '\r') f += c; }
  if (f || r.length) { r.push(f); rows.push(r); }
  const [h, ...b] = rows; return b.filter(x => x.length > 1).map(x => Object.fromEntries(h.map((k, i) => [k.trim(), (x[i] || '').trim()])));
}
const slug = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const urlsDe = a => [...new Set(['web', 'sitio', 'facebook', 'fuente'].flatMap(k => (a[k] || '').split(/[;\s]+/)).map(u => u.replace(/\(.*$/, '').trim()).filter(u => /^https?:\/\//.test(u)))];
const abs = (u, base) => { try { return new URL(u.replace(/&amp;/g, '&'), base).href; } catch { return null; } };

function extraer(html, base) {
  const out = new Set();
  const add = u => { const x = u && abs(u.trim(), base); if (x && !/^data:/.test(x) && !/\.(svg|gif|ico)(\?|$)/i.test(x) && !/(logo|icon|sprite|avatar|emoji|pixel|blank)/i.test(x)) out.add(x); };
  for (const m of html.matchAll(/<meta[^>]+(?:property|name)=["'](?:og:image(?::secure_url)?|twitter:image)["'][^>]*content=["']([^"']+)/gi)) add(m[1]);
  for (const m of html.matchAll(/<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["'](?:og:image|twitter:image)["']/gi)) add(m[1]);
  for (const m of html.matchAll(/<img[^>]+>/gi)) { const t = m[0];
    for (const k of ['data-src', 'data-original', 'data-lazy-src', 'src']) { const v = t.match(new RegExp(k + '=["\']([^"\']+)', 'i')); if (v) add(v[1]); }
    const ss = t.match(/srcset=["']([^"']+)/i); if (ss) { const best = ss[1].split(',').map(s => s.trim().split(/\s+/)).sort((a, b) => parseInt(b[1] || 0) - parseInt(a[1] || 0))[0]; if (best) add(best[0]); } }
  for (const m of html.matchAll(/url\(["']?([^"')]+\.(?:jpe?g|png|webp)[^"')]*)/gi)) add(m[1]);
  for (const m of html.matchAll(/"(?:image|contentUrl|thumbnailUrl|uri|src)"\s*:\s*"(https?:[^"]+\.(?:jpe?g|png|webp)[^"]*)"/gi)) add(m[1].replace(/\\\//g, '/').replace(/\\u0026/g, '&'));
  return [...out];
}

async function paginaHTML(url) {
  if (BROWSER) {
    const { chromium } = await import('playwright');
    const b = await chromium.launch(); const p = await b.newPage({ userAgent: UA, viewport: { width: 1366, height: 900 } });
    try { await p.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
      for (let i = 0; i < 8; i++) { await p.mouse.wheel(0, 1500); await p.waitForTimeout(600); }
      return await p.content(); } finally { await b.close(); }
  }
  const r = await fetch(url, { headers: { 'user-agent': UA, 'accept-language': 'es-AR,es;q=0.9' }, redirect: 'follow', signal: AbortSignal.timeout(30000) });
  if (!r.ok) throw new Error('HTTP ' + r.status); return await r.text();
}

const agencias = parseCSV(fs.readFileSync(CSV, 'utf8')).filter(a => a.nombre && (!SOLO || a.nombre.toLowerCase().includes(String(SOLO).toLowerCase())));
const resumen = [];
for (const a of agencias) {
  const dir = path.join(OUT, slug(a.nombre), 'images', 'reales'); fs.mkdirSync(dir, { recursive: true });
  const fuentes = urlsDe(a), vistos = new Set(), guardadas = [], log = [];
  console.log(`\n== ${a.nombre} (${fuentes.length} fuentes)`);
  for (const f of fuentes) {
    if (guardadas.length >= MAX) break;
    let cand = [];
    try { cand = extraer(await paginaHTML(f), f); log.push(`${f}: ${cand.length} candidatas`); }
    catch (e) { log.push(`${f}: ERROR ${e.message}`); console.log('  ✗', f, e.message); continue; }
    for (const u of cand) {
      if (guardadas.length >= MAX) break;
      try {
        const r = await fetch(u, { headers: { 'user-agent': UA, referer: f }, signal: AbortSignal.timeout(30000) });
        if (!r.ok || !(r.headers.get('content-type') || '').startsWith('image/')) continue;
        const buf = Buffer.from(await r.arrayBuffer()); const hash = crypto.createHash('md5').update(buf).digest('hex');
        if (vistos.has(hash)) continue; vistos.add(hash);
        const meta = await sharp(buf).metadata(); if ((meta.width || 0) < MIN_W) continue;
        const n = String(guardadas.length + 1).padStart(2, '0');
        await sharp(buf).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(dir, `foto-${n}.webp`));
        await sharp(buf).rotate().resize({ width: 640, withoutEnlargement: true }).webp({ quality: 72 }).toFile(path.join(dir, `foto-${n}-sm.webp`));
        guardadas.push({ archivo: `foto-${n}.webp`, origen: u, pagina: f, ancho: meta.width, alto: meta.height, descargada: new Date().toISOString().slice(0, 10) });
        console.log('  ✓', n, meta.width + 'x' + meta.height);
      } catch { /* siguiente */ }
    }
  }
  fs.writeFileSync(path.join(dir, 'fotos-origen.json'), JSON.stringify({ agencia: a.nombre, fotos: guardadas, log }, null, 2));
  resumen.push({ agencia: a.nombre, fotos: guardadas.length, fuentes: fuentes.length });
}
console.table(resumen);
console.log('Las agencias con 0 fotos: probá --browser, o agregá su sitio/ML/Instagram a la columna "web".');
