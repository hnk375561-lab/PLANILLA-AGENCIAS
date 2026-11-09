// Uso:  node aplicar-mejoras.mjs <carpeta-de-la-agencia>      (la que contiene _site)
// Hace backup, agrega mejoras.css/js, el chip "Abierto ahora" del header y el JSON-LD Vehicle por unidad.
// Aborta SIN tocar nada si algún anclaje del index.html no coincide. Se puede correr más de una vez.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const aqui = path.dirname(fileURLToPath(import.meta.url));
const agencia = path.resolve(process.argv[2] || '');
const site = path.join(agencia, '_site');
const fail = (m) => { console.error('ABORTADO (no se tocó nada): ' + m); process.exit(1); };
if (!process.argv[2] || !fs.existsSync(path.join(site, 'index.html'))) fail('pasá la carpeta de la agencia (debe tener _site\\index.html).');

const idxPath = path.join(site, 'index.html');
let html = fs.readFileSync(idxPath, 'utf8');
const unitsPath = path.join(site, 'js', 'units.min.json');
if (!fs.existsSync(unitsPath)) fail('falta js/units.min.json');
const units = JSON.parse(fs.readFileSync(unitsPath, 'utf8'));

const once = (s) => html.split(s).length - 1;
const A_CSS = '<link rel="stylesheet" href="css/etiquetas.css"></head>';
const A_NAV = '<button class="menu-toggle" type="button"';
const A_JS = '<script src="js/etiquetas.js" defer></script></body>';
const yaCSS = html.includes('css/mejoras.css'), yaChip = html.includes('class="hdr-est"'), yaJS = html.includes('js/mejoras.js');
if (!yaCSS && once(A_CSS) !== 1) fail('no encuentro el enlace a etiquetas.css (anclaje CSS).');
if (!yaChip && once(A_NAV) !== 1) fail('no encuentro el botón de menú del header.');
if (!yaJS && once(A_JS) !== 1) fail('no encuentro el cierre con etiquetas.js.');
if (!/<script type="application\/ld\+json">/.test(html)) fail('no hay JSON-LD base.');
if (!html.includes('data-semana')) fail('no hay horarios (data-semana).');

// JSON-LD de las unidades
let dealer = {};
try { dealer = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]); } catch { fail('JSON-LD base ilegible.'); }
const vend = dealer.name ? { '@type': 'AutoDealer', name: dealer.name } : undefined;
const limpio = (o) => JSON.parse(JSON.stringify(o));
const graph = units.filter((u) => u && !u.vendida && u.titulo).map((u) => limpio({
  '@type': 'Vehicle',
  name: u.titulo,
  brand: u.marca ? { '@type': 'Brand', name: u.marca } : undefined,
  model: u.modelo || undefined,
  vehicleModelDate: u.anio ? String(u.anio) : undefined,
  mileageFromOdometer: typeof u.km === 'number' ? { '@type': 'QuantitativeValue', value: u.km, unitCode: 'KMT' } : undefined,
  fuelType: u.combustible || undefined,
  vehicleTransmission: u.transmision || undefined,
  color: u.color || undefined,
  bodyType: u.carroceria || undefined,
  description: 'Unidad de ejemplo de una demo. Precio y disponibilidad a confirmar con la agencia.',
  offers: u.precio && u.precio.monto ? { '@type': 'Offer', price: u.precio.monto, priceCurrency: u.precio.moneda || 'USD', seller: vend } : undefined,
}));
if (!graph.length) fail('no hay unidades para el JSON-LD.');
const ld = '<!--ld-vehicle--><script type="application/ld+json">' +
  JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c') + '</script><!--/ld-vehicle-->';

// backup (index, css, js) fuera de _site
const sello = new Date().toISOString().replace(/[:T]/g, '-').slice(0, 19);
const bk = path.join(path.dirname(agencia), '_backups', path.basename(agencia) + '-mejoras-' + sello);
fs.mkdirSync(bk, { recursive: true });
fs.copyFileSync(idxPath, path.join(bk, 'index.html'));
for (const d of ['css', 'js']) fs.cpSync(path.join(site, d), path.join(bk, d), { recursive: true });
console.log('Backup en: ' + bk);

// parches
if (!yaCSS) html = html.replace(A_CSS, '<link rel="stylesheet" href="css/etiquetas.css"><link rel="stylesheet" href="css/mejoras.css"></head>');
if (!yaChip) html = html.replace(A_NAV, '<span class="hdr-est" data-live><b data-estado-t></b><small data-estado-d hidden></small></span>' + A_NAV);
if (!yaJS) html = html.replace(A_JS, '<script src="js/etiquetas.js" defer></script><script src="js/mejoras.js" defer></script></body>');
if (html.includes('<!--ld-vehicle-->')) {
  html = html.replace(/<!--ld-vehicle-->[\s\S]*?<!--\/ld-vehicle-->/, () => ld);
} else {
  const i = html.indexOf('<script type="application/ld+json">');
  const j = html.indexOf('</script>', i) + '</script>'.length;
  html = html.slice(0, j) + ld + html.slice(j);
}
fs.writeFileSync(idxPath, html);
fs.copyFileSync(path.join(aqui, 'mejoras.css'), path.join(site, 'css', 'mejoras.css'));
fs.copyFileSync(path.join(aqui, 'mejoras.js'), path.join(site, 'js', 'mejoras.js'));
console.log(`OK ${path.basename(agencia)}: chip del header, ${graph.length} Vehicle en JSON-LD, permuta en pasos y skeletons.`);
