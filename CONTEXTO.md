# CONTEXTO — PLANILLA-AGENCIAS (demos de sitios para agencias de autos)

Dueño: Santiago Solis. Idioma de trabajo: español rioplatense. Trabaja desde PowerShell en Windows.
Regla de trabajo: dar comandos exactos para pegar en PowerShell; los scripts abortan sin tocar nada si algo no coincide; verificar siempre con una comprobación estricta después de desplegar.

## Dónde está todo
- Repo (GitHub, hay que mantenerlo PRIVADO): github.com/hnk375561-lab/PLANILLA-AGENCIAS, rama `main`.
- Copia local de trabajo del repo: `C:\Users\santi\Downloads\repo-nuevo` (clonada y subida el 08/11/2026).
- Carpeta original de trabajo: `C:\Users\santi\Downloads\PLANILLA-AGENCIAS-main\` con `demos-agencias\` (trabajo actual), `demos-agencias-backup` y `demos-agencias-backup-final` (copias de seguridad, NO están en el repo) y una carpeta anidada `PLANILLA-AGENCIAS-main\` (la plantilla).
- La raíz del repo es la PLANTILLA (css, js, data, scripts, docs, CLAUDE.md, package.json). `demos-agencias/` contiene las agencias.

## Plantilla
Sitio estático sin framework. Las páginas se generan desde `data/dealership.json` y `data/vehicles.json` con `npm run build`. `npm run site` arma `_site/` con los archivos públicos. No editar index/u/units.min.json a mano en la plantilla.

## Agencias demo (carpeta demos-agencias/)
colon-autos, lucar-s-automotores, centro-automotores-colon, eskina-autos, la-esquina-automotores, lf-autos, litoral-motors-gualeguaychu, mc-automotores, regner-automotores, uruguay-autos. Además: `_avisos`, `_fotos`, `_backups`.
Cada agencia tiene `_site/` (lo publicado), `data/` (vehicles.json, dealership.json, units en `_site/js/units.min.json`) y su propio `.gitignore`.

## Despliegue (Cloudflare Pages, sin Git conectado)
Desde `demos-agencias\<agencia>\_site`:
`npx wrangler pages deploy . --project-name=demo-<agencia>`
Proyectos: demo-colon-autos, demo-lucar-s-automotores, demo-uruguay-autos, demo-regner-automotores, demo-litoral-motors-gualeguaychu, demo-lf-autos, demo-la-esquina-automotores, demo-centro-automotores-colon, demo-mc-automotores, demo-eskina-autos. (`uruspot` es otro proyecto, no tocar.)
Wrangler debe decir `Uploaded N files` con N >= 1 si cambió algo; `0` significa que el archivo local no cambió.
Cuidado: `demo-colon-autos` (Colón Autos) NO es `demo-centro-automotores-colon` (otra agencia).

## Estado al 08/11/2026
- Colón y Lucar: textos de aviso cambiados de "sin verificar" a "a confirmar por usted" (archivo `_site/js/demo-extra.js`). Colón quedó igualado a Lucar en 10 de 11 textos; "No constituye una oferta ni una reserva." es redacción propia, no existe en Lucar (pendiente: dejarla o quitarla).
- Etiquetas de estado en tarjetas ("0 km", "Bajo km" < 50.000 km, "Modelo reciente" = año actual − 5 o más nuevo): `_site/js/etiquetas.js` y `_site/css/etiquetas.css`, conectados en `_site/index.html`. Desplegado en Colón y Lucar. Pendiente: replicar en las otras 8 agencias.
- Las tarjetas del listado NO se dibujan por JS: vienen escritas en `index.html` como `<li class="car">` con `.car-ph` (foto) y `.car-s` (año y km). `secciones.js` las lee con `data-t`.
- Ya existen en Colón (no volver a proponer): comparador, galería con visor, mapa Leaflet, horarios con "Abierto ahora / Cerrado ahora" (`horarios.js`), reserva de visita, WhatsApp con mensajes armados (`wa-mensajes.js`), favoritos, compartir, simulador de cuotas, filtros año/km, autos similares, GSAP, preloader, JSON-LD AutoDealer.
- Faltan: tasación en pasos (solo hay menciones de texto), "Abierto ahora" en el header, JSON-LD `Vehicle` por unidad, skeletons de carga.

## Advertencia importante sobre `_site`
Las ediciones de estos días se hicieron directo en `_site` por consola. El código fuente de cada agencia (fuera de `_site`) puede NO tener esos cambios, y un `npm run site` los sobrescribiría. Definir si `_site` pasa a ser la versión oficial o si se llevan los cambios al fuente. Cada agencia tenía `/_site/` en su `.gitignore`; se quitó de la copia del repo (`repo-nuevo`) para que se respalde.

## Trampas conocidas de PowerShell (ya pasaron)
- Al pegar bloques largos se puede trabar con `>>`: Ctrl+C y pegar de a uno.
- Verificar textos publicados con tildes/ñ: bajar bytes y decodificar UTF-8 (`$r.RawContentStream.ToArray()`), si no los conteos dan 0 falsos.
- Para comparar contenido entre carpetas usar `git status`, no `robocopy` (compara fechas).
- No ocultar errores con `2>$null`.
- Error "Permission denied" en `.git/objects`: reintentar; suele ser antivirus.

## Falta completar (lo anterior a esta sesión no está acá)
Decisiones y motivos de las otras agencias, investigación comercial, `prospeccion/` y `agencias.csv` (datos de prospectos: no publicar).
