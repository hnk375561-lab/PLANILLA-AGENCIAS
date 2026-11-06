#!/usr/bin/env node
/* Genera una demo personalizada por agencia a partir de un CSV.

   Uso:
     npm run demos -- agencias.csv [--out ../demos-agencias] [--prefijo demo] [--mostrar-whatsapp] [--deploy]

   CSV (primera fila = encabezados; separador coma; obligatorios: nombre, ciudad y direccion):
     nombre,ciudad,provincia,direccion,whatsapp,instagram,acento,lat,lng,email,facebook,sigla,contacto

   Qué hace, por cada agencia:
     1. Copia la plantilla limpia (sin .git, node_modules ni otras demos) a <out>/<slug>/
     2. Corre scripts/nuevo-cliente.mjs con sus datos (acento, imágenes de relleno con su nombre, build)
     3. Carga como "restos prohibidos" los nombres de TODAS las otras agencias y corre audit-copy:
        si el nombre de otra agencia aparece en esta demo, la demo se marca como fallida.
     4. Arma _site/ (lista blanca: sin data/, scripts/ ni docs/)
     5. Con --deploy: sube _site/ a Cloudflare Pages (wrangler direct upload) y guarda la URL.
   Al final escribe <out>/mensajes.md (texto para cada agencia) y <out>/resumen.csv.

   Notas:
     - Sin --mostrar-whatsapp, el sitio oculta los botones de WhatsApp (el número queda "sin confirmar", regla 1 de CLAUDE.md).
       Con la bandera se muestran, solo para la demo: usalo cuando el número sea el de la agencia o uno tuyo.
     - Lo que el CSV no trae (WhatsApp, mail, Instagram, Facebook) se quita en vez de dejar los datos de ejemplo.
       Sin lat/lng el mapa apunta a Buenos Aires (ejemplo): cargalas buscando la dirección en openstreetmap.org.
     - Todas las demos salen con noindex (publicIndexing=false). No se tocan fotos ni stock reales.
     - --deploy necesita `npx wrangler login` o CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID en el entorno. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------- argumentos ----------
const argv = process.argv.slice(2);
const flags = {}; const pos = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith('--')) {
    const k = argv[i].slice(2);
    flags[k] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : 'true';
  } else pos.push(argv[i]);
}
const csvPath = pos[0];
if (!csvPath) { console.error('Uso: npm run demos -- agencias.csv [--out dir] [--prefijo demo] [--mostrar-whatsapp] [--deploy]'); process.exit(1); }
const outDir = path.resolve(flags.out || path.join(root, '..', 'demos-agencias'));
const prefijo = (flags.prefijo || 'demo').toLowerCase().replace(/[^a-z0-9-]/g, '');
const mostrarWA = flags['mostrar-whatsapp'] === 'true';
const deploy = flags.deploy === 'true';

// ---------- CSV ----------
function parseCSV(text) {
  const rows = []; let row = []; let cell = ''; let q = false;
  text = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(cell); rows.push(row); row = []; cell = ''; }
    else cell += c;
  }
  if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((x) => x.trim() !== ''));
}
const rows = parseCSV(fs.readFileSync(path.resolve(csvPath), 'utf8'));
if (rows.length < 2) { console.error('El CSV necesita encabezados y al menos una agencia.'); process.exit(1); }
const head = rows[0].map((h) => h.trim().toLowerCase());
if (!head.includes('nombre')) { console.error('Falta la columna "nombre".'); process.exit(1); }
const agencias = rows.slice(1).map((r) => Object.fromEntries(head.map((h, i) => [h, (r[i] || '').trim()])));

// ---------- utilidades ----------
const slugify = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const log = (...m) => console.log(...m);
const problemas = [];
const usados = new Set();
for (const a of agencias) {
  let s = slugify(a.nombre) || 'agencia'; let n = 2; const base = s;
  while (usados.has(s)) s = `${base}-${n++}`;
  usados.add(s); a.slug = s;
  a.proyecto = `${prefijo}-${s}`.slice(0, 58).replace(/-+$/, '');
  a.errores = [];
  if (!a.ciudad) a.errores.push('falta ciudad');
  if (!a.direccion) a.errores.push('falta direccion (la plantilla la muestra en el pie y en el mapa)');
  if (a.whatsapp) { a.whatsapp = a.whatsapp.replace(/[\s+()-]/g, ''); if (!/^\d{10,15}$/.test(a.whatsapp)) a.errores.push('whatsapp inválido (solo dígitos con código de país, ej. 5493445000000)'); }
  if (a.acento && !/^#[0-9a-f]{6}$/i.test(a.acento)) a.errores.push('acento inválido (formato #rrggbb)');
  if ((a.lat && !a.lng) || (!a.lat && a.lng)) a.errores.push('lat y lng van juntas');
  if (a.lat && (isNaN(Number(a.lat)) || isNaN(Number(a.lng)))) a.errores.push('lat/lng no numéricas');
}

const copyFilter = (src) => {
  const rel = path.relative(root, src);
  if (!rel) return true;
  const top = rel.split(path.sep)[0];
  if (['.git', 'node_modules', '_site'].includes(top)) return false;
  if (path.resolve(src) === outDir || path.resolve(src).startsWith(outDir + path.sep)) return false;
  return true;
};

fs.mkdirSync(outDir, { recursive: true });
const nodeModules = path.join(root, 'node_modules');
if (!fs.existsSync(nodeModules)) { console.error('Falta node_modules: corré `npm install` primero (se usa sharp para las imágenes).'); process.exit(1); }

// ---------- una demo ----------
function generar(a) {
  const dir = path.join(outDir, a.slug);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.cpSync(root, dir, { recursive: true, filter: copyFilter });
  fs.symlinkSync(nodeModules, path.join(dir, 'node_modules'), 'dir');
  const url = `https://${a.proyecto}.pages.dev`;

  const args = ['scripts/nuevo-cliente.mjs', '--nombre', a.nombre, '--previewurl', url];
  const map = { ciudad: 'ciudad', provincia: 'provincia', direccion: 'direccion', whatsapp: 'whatsapp', instagram: 'instagram', acento: 'acento', lat: 'lat', lng: 'lng', email: 'email', facebook: 'facebook', sigla: 'sigla' };
  for (const [col, flag] of Object.entries(map)) if (a[col]) args.push(`--${flag}`, a[col]);
  execFileSync('node', args, { cwd: dir, stdio: 'pipe' });

  const f = path.join(dir, 'data/dealership.json');
  const D = JSON.parse(fs.readFileSync(f, 'utf8'));
  // Datos que el CSV no trae: se quitan los de ejemplo de la plantilla (nunca se inventan).
  if (!a.whatsapp) Object.assign(D.contact, { whatsApp: null, whatsAppDisplay: null, whatsAppConfirmed: false, whatsAppConfirmadoNota: 'Sin WhatsApp cargado en la demo.' });
  if (!a.email) D.contact.email = null;
  if (!a.facebook) D.contact.facebook = 'https://www.facebook.com/';   // la plantilla exige un enlace; sin dato real apunta a la portada de Facebook
  if (!a.instagram) D.contact.instagram = '';
  // WhatsApp visible solo para la demo (opcional)
  if (mostrarWA && a.whatsapp) { D.contact.whatsAppConfirmed = true; D.contact.whatsAppConfirmadoNota = 'DEMO: número cargado para la maqueta, no confirmado por el dueño.'; }
  // Nombres de las OTRAS agencias = prohibidos en esta demo
  D.publicacion.restosProhibidos = agencias.filter((o) => o !== a).map((o) => o.nombre);
  fs.writeFileSync(f, JSON.stringify(D, null, 2) + '\n');
  execFileSync('node', ['scripts/build-index.mjs'], { cwd: dir, stdio: 'pipe' });

  // Chequeos de la propia plantilla
  execFileSync('node', ['scripts/validate-dealership.mjs'], { cwd: dir, stdio: 'pipe' });
  execFileSync('node', ['scripts/audit-copy.mjs', '--prohibidos'], { cwd: dir, stdio: 'pipe' });

  // Chequeos propios: nada de la plantilla ni del ejemplo en el HTML final
  const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
  const sobras = ['Tu Agencia', 'contacto@example.com', '5491100000000', 'tuagencia', 'Av. Ejemplo 1234', 'Tu Ciudad'].filter((t) => html.includes(t) && !(t === '5491100000000' && a.whatsapp === t) && !(t === 'Tu Ciudad' && a.ciudad === t));
  if (sobras.length) throw new Error(`quedaron restos de la plantilla en index.html: ${sobras.join(', ')}`);
  if (!html.includes(a.nombre)) throw new Error('el nombre de la agencia no aparece en index.html');
  if (!/noindex/.test(html)) throw new Error('falta noindex en index.html');

  // _site/ con lista blanca. CF_PAGES_URL reescribe og:image/og:url como en un build de Cloudflare.
  execFileSync('node', ['scripts/build-site.mjs'], { cwd: dir, stdio: 'pipe', env: { ...process.env, CF_PAGES_URL: url } });
  return { dir, url };
}

function subir(a, dir) {
  const r = spawnSync('npx', ['--yes', 'wrangler', 'pages', 'deploy', '_site', `--project-name=${a.proyecto}`, '--branch=main', '--commit-dirty=true'], { cwd: dir, encoding: 'utf8' });
  const out = `${r.stdout || ''}\n${r.stderr || ''}`;
  if (r.status !== 0) {
    // Primera vez: el proyecto puede no existir todavía
    if (/not found|does not exist|8000007/i.test(out)) {
      const c = spawnSync('npx', ['--yes', 'wrangler', 'pages', 'project', 'create', a.proyecto, '--production-branch=main'], { cwd: dir, encoding: 'utf8' });
      if (c.status !== 0) throw new Error(`no se pudo crear el proyecto Cloudflare: ${(c.stderr || c.stdout || '').trim().split('\n').slice(-2).join(' ')}`);
      return subir(a, dir);
    }
    throw new Error(`wrangler falló: ${out.trim().split('\n').slice(-3).join(' ')}`);
  }
  const m = out.match(/https:\/\/[a-z0-9.-]+\.pages\.dev/gi);
  return m ? m[m.length - 1] : null;
}

// ---------- corrida ----------
const resultados = [];
for (const a of agencias) {
  log(`\n▶ ${a.nombre} (${a.slug})`);
  if (a.errores.length) { log(`  ✗ omitida: ${a.errores.join('; ')}`); resultados.push({ a, ok: false, error: a.errores.join('; ') }); continue; }
  try {
    const { dir, url } = generar(a);
    let urlFinal = url; let desplegada = false;
    if (deploy) { const u = subir(a, dir); if (u) urlFinal = u; desplegada = true; }
    log(`  ✓ demo lista en ${dir}${desplegada ? `\n  ✓ publicada: ${urlFinal}` : ''}`);
    resultados.push({ a, ok: true, dir, url: urlFinal, desplegada });
  } catch (e) {
    const msg = (e.stderr ? e.stderr.toString() : '') || e.message;
    log(`  ✗ falló: ${msg.trim().split('\n').slice(-3).join(' | ')}`);
    resultados.push({ a, ok: false, error: msg.trim().split('\n').slice(-1)[0] });
  }
}

// ---------- mensajes y resumen ----------
const mensaje = (a, url) => {
  const saludo = a.contacto ? `Hola ${a.contacto}, ¿cómo estás?` : 'Hola, ¿cómo andan?';
  return `${saludo} Soy Santiago. Armé una maqueta de cómo podría verse el sitio web de ${a.nombre}${a.ciudad ? ` (${a.ciudad})` : ''}: catálogo con filtros, ficha por unidad, comparador, financiación, horarios y botón de WhatsApp. Es una demo sin costo, con datos de ejemplo, para que la veas desde el celular:\n\n${url}\n\nSi te gusta, la adaptamos con su stock, sus fotos y sus datos reales. ¿Te la puedo mostrar en una llamada de 10 minutos?`;
};
const ok = resultados.filter((r) => r.ok);
const md = ['# Mensajes para las agencias', '', deploy ? '' : '> Las URLs son las **previstas**: todavía no se subieron a Cloudflare (corré con `--deploy` o subí `_site/` de cada carpeta).', '']
  .concat(ok.flatMap((r) => [`## ${r.a.nombre}`, '', `Demo: ${r.url}`, '', '```', mensaje(r.a, r.url), '```', '']))
  .concat(resultados.filter((r) => !r.ok).length ? ['## Omitidas / fallidas', '', ...resultados.filter((r) => !r.ok).map((r) => `- ${r.a.nombre}: ${r.error}`), ''] : []);
fs.writeFileSync(path.join(outDir, 'mensajes.md'), md.join('\n'));
const csvq = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
fs.writeFileSync(path.join(outDir, 'resumen.csv'), ['nombre,estado,url,carpeta,detalle'].concat(resultados.map((r) => [r.a.nombre, r.ok ? (r.desplegada ? 'publicada' : 'generada') : 'fallida', r.url || '', r.dir || '', r.error || ''].map(csvq).join(','))).join('\n') + '\n');

log(`\nListo: ${ok.length}/${resultados.length} demos. Mensajes en ${path.join(outDir, 'mensajes.md')}`);
if (ok.length !== resultados.length) process.exit(1);
