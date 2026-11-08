# Despliegue en Cloudflare Pages

> Estado: **las demos no son publicables como sitio oficial mientras `publicIndexing` sea `false`** (`noindex` en HTML, `robots.txt` con `Disallow: /` y cabecera `X-Robots-Tag`). Una demo online con link para la agencia es lo esperado.

## Dos métodos (usar el A)
| | A. Subida directa con wrangler (**VIGENTE**) | B. Git conectado (**no se usa hoy**) |
|---|---|---|
| Para qué | Demos de agencias (`demos-agencias/<agencia>/_site`) | Plantilla / un cliente con repo propio |
| Cómo se actualiza | Comando manual por agencia | Cloudflare redepliega solo al subir al repo |
| Proyectos existentes | 10 `demo-*` (ver abajo) | ninguno |

## A. Subida directa (método vigente)
**Requisito (lo hace el dueño, una vez):** `npx wrangler login`.

Desde `C:\Users\santi\Downloads\PLANILLA-AGENCIAS-main\demos-agencias\<agencia>\_site`:

`npx wrangler pages deploy . --project-name=demo-<agencia>`

| Carpeta | Proyecto Cloudflare |
|---|---|
| `colon-autos` | `demo-colon-autos` |
| `centro-automotores-colon` | `demo-centro-automotores-colon` |
| `lucar-s-automotores` | `demo-lucar-s-automotores` |
| `uruguay-autos` | `demo-uruguay-autos` |
| `regner-automotores` | `demo-regner-automotores` |
| `litoral-motors-gualeguaychu` | `demo-litoral-motors-gualeguaychu` |
| `lf-autos` | `demo-lf-autos` |
| `la-esquina-automotores` | `demo-la-esquina-automotores` |
| `mc-automotores` | `demo-mc-automotores` |
| `eskina-autos` | `demo-eskina-autos` |

⚠️ `demo-colon-autos` (Colón Autos) **≠** `demo-centro-automotores-colon`. `uruspot` es **otro proyecto: no tocar**.

### Checklist de cada despliegue
1. Estar en la carpeta `_site` **de la agencia correcta** (`pwd` antes de correr).
2. Correr el deploy. Esperar `Uploaded N files`: **N ≥ 1** si cambió algo; **0** = el archivo local no cambió (carpeta equivocada o edición sin guardar).
3. **Verificación estricta** de lo publicado: descargar y comprobar el texto/archivo esperado. Para textos con tildes/ñ decodificar bytes UTF-8 (`$r.RawContentStream.ToArray()`); no usar `2>$null`; si un conteo da 0, sospechar de la codificación antes que del deploy.
4. Anotar en `ESTADO.md` qué se desplegó y dónde.

### Antes de desplegar
- Las `_site` de las demos tienen **ediciones manuales**; `npm run site` las puede sobrescribir (ver `CONTEXTO.md` §8). Con backup, o no se corre.
- Textos de aviso: "a confirmar por usted".
- `noindex` presente.

## B. Git conectado (alternativa, hoy sin usar)
1. (Opcional) GitHub → Settings → Change visibility → Make private. Hoy el repo es público por decisión del dueño; si se usa B, que el repo no contenga datos de prospectos.
2. Cloudflare → Workers & Pages → Create → **Pages → Connect to Git** → autorizar GitHub y elegir el repo.
3. Build: Framework preset **None**; Build command `node scripts/build-site.mjs`; Output directory `_site`; variable opcional `NODE_VERSION=20` (ya existe `.node-version`).
4. Save and Deploy → `https://<proyecto>.pages.dev`.

**Qué resuelve solo:** `og:image`/`og:url` se reescriben con `CF_PAGES_URL`; `_headers` con caché y `noindex` se genera en `_site/`; solo se publica la lista blanca de `build-site.mjs` (sin `data/`, `scripts/`, `docs/`).
**Cada cambio:** subir al repo → redepliega. Si cambió `data/` o `scripts/`: `npm run build && npm test` antes.

## Salir de demo a producción (hoy no aplica)
Requiere: dominio, aprobación del dueño de la agencia, `data/pendientes.json` sin bloqueantes (P3: dominio y aprobación), `npm run test:prod` en verde y `publicIndexing: true`. Fotos y datos con fuente o autorización escrita (reglas 6 y 7 de `CLAUDE.md`).

## Problemas frecuentes
| Síntoma | Causa probable |
|---|---|
| `Uploaded 0 files` | Carpeta equivocada o archivo no guardado/no modificado |
| Pide login | Falta `npx wrangler login` (gesto del dueño) |
| Se ve la agencia equivocada | Mezcla `demo-colon-autos` / `demo-centro-automotores-colon` |
| Cambios que desaparecen | Se corrió `npm run site` y pisó ediciones manuales |
| Verificación da 0 coincidencias con tildes | Decodificación: usar bytes UTF-8 |
| `Permission denied` en `.git/objects` | Antivirus; reintentar |