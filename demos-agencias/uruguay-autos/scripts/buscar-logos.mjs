// Baja el logo (imagen de perfil) de cada agencia desde su Facebook/Instagram y lo aplica.
// Uso:  node scripts/buscar-logos.mjs            -> solo descarga a Descargas\logos-auto para que los revises
//       node scripts/buscar-logos.mjs --aplicar  -> aplica los logos que haya en esa carpeta
// Opciones: --todas (incluye eskina-autos)
import fs from 'node:fs'; import path from 'node:path'; import os from 'node:os';
import { spawnSync } from 'node:child_process'; import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEMOS = path.resolve(root, '..', 'demos-agencias');
const LOGOS = path.join(os.homedir(), 'Downloads', 'logos-auto');
const aplicar = process.argv.includes('--aplicar'), todas = process.argv.includes('--todas');
fs.mkdirSync(LOGOS, { recursive: true });
const UA = 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)';
const ext = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' };
const existente = (slug) => fs.readdirSync(LOGOS).find((f) => f.startsWith(slug + '.'));

async function ogImage(url) {
  const r = await fetch(url, { headers: { 'user-agent': UA, 'accept-language': 'es-AR,es;q=0.9' }, redirect: 'follow', signal: AbortSignal.timeout(20000) });
  const h = await r.text();
  const m = /<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']+)["']/i.exec(h) || /<meta[^>]+content=["']([^"']+)["'][^>]*property=["']og:image["']/i.exec(h);
  return m ? m[1].replace(/&amp;/g, '&') : null;
}
async function bajar(imgUrl, slug) {
  const r = await fetch(imgUrl, { headers: { 'user-agent': UA }, signal: AbortSignal.timeout(20000) });
  const t = (r.headers.get('content-type') || '').split(';')[0];
  const buf = Buffer.from(await r.arrayBuffer());
  if (!ext[t] || buf.length < 3000) throw new Error('no es una imagen valida (' + t + ', ' + buf.length + ' bytes)');
  const f = path.join(LOGOS, slug + ext[t]); fs.writeFileSync(f, buf); return f;
}
const resumen = [];
for (const slug of fs.readdirSync(DEMOS)) {
  const dir = path.join(DEMOS, slug), dj = path.join(dir, 'data', 'dealership.json');
  if (slug.startsWith('_') || !fs.existsSync(dj)) continue;
  if (slug === 'eskina-autos' && !todas) continue;
  let estado = '';
  try {
    if (!aplicar) {
      if (existente(slug)) { estado = 'ya estaba: ' + existente(slug); }
      else {
        const c = JSON.parse(fs.readFileSync(dj, 'utf8')).contact || {};
        const ig = c.instagram ? (c.instagram.startsWith('http') ? c.instagram : 'https://www.instagram.com/' + c.instagram.replace(/^@/, '') + '/') : null;
        const fuentes = [c.facebook, ig].filter(Boolean);
        if (!fuentes.length) estado = 'SIN Facebook ni Instagram cargados: bajalo a mano';
        for (const u of fuentes) {
          try { const img = await ogImage(u); if (!img) continue; const f = await bajar(img, slug); estado = 'OK ' + path.basename(f) + ' (de ' + new URL(u).hostname + ')'; break; }
          catch (e) { estado = 'fallo ' + new URL(u).hostname + ': ' + e.message; }
        }
        if (!estado) estado = 'no se encontro imagen: bajalo a mano';
      }
    } else {
      const f = existente(slug);
      if (!f) { estado = 'sin logo en ' + LOGOS; }
      else {
        const b = spawnSync('node', ['scripts/aplicar-logos.mjs', '--solo', slug, '--logo', path.join(LOGOS, f)], { cwd: root, encoding: 'utf8' });
        estado = (b.status === 0 ? 'aplicado' : 'ERROR') + ' · ' + ((b.stdout || '') + (b.stderr || '')).split('\n').filter((l) => /ok|fallo|aviso|Error/i.test(l)).slice(0, 2).join(' ').trim();
      }
    }
  } catch (e) { estado = 'error: ' + e.message; }
  resumen.push({ agencia: slug, estado });
}
console.table(resumen);
console.log(aplicar ? 'Listo. Revisa cada agencia en el navegador (Ctrl+Shift+R).' : 'Revisa las imagenes en ' + LOGOS + ' y despues corre: node scripts/buscar-logos.mjs --aplicar');