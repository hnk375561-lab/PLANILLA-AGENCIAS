#!/usr/bin/env node
/* Configura la plantilla para un cliente nuevo con un solo comando.
   Uso:  npm run nuevo -- --nombre "Autos del Sur" --ciudad "Rosario" --provincia "Santa Fe" --direccion "Av. Pellegrini 1234" \
                          [--cp S2000] [--partido "Rosario"] [--whatsapp 5493410000000] [--instagram autosdelsur] [--facebook https://facebook.com/x] \
                          [--email info@dominio.com] [--lat -32.95] [--lng -60.65] [--sigla AS] [--acento "#0a66ff"] [--previewurl https://demo.pages.dev] [--anterior "Nombre del cliente previo"]
   Qué hace: escribe esos datos en data/dealership.json, cambia el acento (scripts/tema.mjs), regenera las imágenes de relleno con el nombre del cliente y compila.
   Lo que NO hace (a propósito): confirmar el WhatsApp, cargar horarios ni stock reales. Eso se revisa a mano (docs/REUTILIZAR.md). */
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url'; import { execFileSync } from 'node:child_process';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const a = {}; const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) if (argv[i].startsWith('--')) { a[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : 'true'; }
if (!a.nombre) { console.error('Falta --nombre. Ver el encabezado de scripts/nuevo-cliente.mjs'); process.exit(1); }
const f = path.join(root, 'data/dealership.json'); const D = JSON.parse(fs.readFileSync(f, 'utf8'));
const prevName = D.identity.tradeName;
const sigla = (a.sigla || (a.nombre.match(/\d+|\b\p{L}/gu) || ['A']).slice(0, 3).join('')).toUpperCase();
Object.assign(D.identity, { tradeName: a.nombre, legalName: a.nombre, marcaCorta: sigla });
const L = D.location; if (a.direccion) L.address = a.direccion; if (a.ciudad) L.city = a.ciudad; if (a.provincia) L.province = a.provincia; if (a.partido) L.partido = a.partido; if (a.cp) L.postalCode = a.cp;
if (a.lat && a.lng) { L.coordenadas.lat = Number(a.lat); L.coordenadas.lng = Number(a.lng); L.coordenadas.verificacion = 'Cargadas por nuevo-cliente.mjs: verificar buscando la dirección en openstreetmap.org.'; L.mapsUrl = `https://www.openstreetmap.org/?mlat=${a.lat}&mlon=${a.lng}#map=17/${a.lat}/${a.lng}`; }
else if (a.direccion || a.ciudad) console.warn('aviso: sin --lat/--lng el mapa sigue apuntando a las coordenadas de ejemplo (Buenos Aires).');
const C = D.contact; C.nombre = a.nombre;
if (a.whatsapp) { if (!/^\d{10,15}$/.test(a.whatsapp)) { console.error('--whatsapp: solo dígitos con código de país (ej. 5493410000000)'); process.exit(1); } C.whatsApp = a.whatsapp; C.whatsAppDisplay = `+${a.whatsapp.slice(0, 2)} ${a.whatsapp.slice(2)}`; C.whatsAppConfirmed = false; C.whatsAppConfirmadoNota = 'PENDIENTE: confirmar el número con el dueño y poner whatsAppConfirmed en true.'; }
if (a.instagram) C.instagram = a.instagram.replace(/^@/, ''); if (a.facebook) C.facebook = a.facebook; if (a.email) C.email = a.email;
if (a.previewurl) D.publicacion.previewUrl = a.previewurl;
const prohib = new Set(D.publicacion.restosProhibidos || []); prohib.delete(a.nombre); if (a.anterior) prohib.add(a.anterior); else if (prevName && prevName !== 'Tu Agencia' && prevName !== a.nombre) prohib.add(prevName);
D.publicacion.restosProhibidos = [...prohib];
fs.writeFileSync(f, JSON.stringify(D, null, 2) + '\n');
const run = (...args) => execFileSync('node', args, { cwd: root, stdio: 'inherit' });
if (a.acento) run('scripts/tema.mjs', a.acento);
run('scripts/make-placeholders.mjs', '--nombre', a.nombre, ...(a.acento ? ['--acento', a.acento] : []));
run('scripts/build-index.mjs');
console.log(`\n✓ ${a.nombre} configurado. Falta revisar a mano: horarios, servicios, redes, stock y fotos reales, y confirmar el WhatsApp (${C.whatsAppConfirmed ? 'confirmado' : 'PENDIENTE'}).`);
if (D.contact.whatsAppConfirmed === false) console.log('   Mientras whatsAppConfirmed sea false, el sitio oculta los botones de WhatsApp (por la regla 1 de CLAUDE.md).');
