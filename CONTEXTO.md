# CONTEXTO — PLANILLA-AGENCIAS (leer primero, 1 minuto)

> Orden de lectura: **este archivo** → `CLAUDE.md` (reglas) → `prospeccion/ESTADO.md` (dónde quedamos; **solo local**, ver §8) → `docs/OPERACION-IA.md` (cómo se trabaja). `docs/DEPLOY-CLOUDFLARE.md` solo si hay que publicar.
> Última actualización: 2026-11-08.

## 1. Qué es
Plantilla de sitio estático (sin framework) para **agencias de autos usados** de Argentina. Con ella se generan **demos personalizadas** con datos públicos de cada agencia; el dueño las ofrece **1 a 1** por WhatsApp/Instagram. Fase actual: prospección en Entre Ríos / Litoral.

## 2. Personas y forma de trabajo
- **Dueño:** Santiago Solis. Español rioplatense. Trabaja en **PowerShell, Windows**.
- **Formato de respuesta:** comandos exactos para pegar en PowerShell, de a un bloque; scripts que **abortan sin tocar nada** si algo no coincide; después de desplegar, **verificación estricta** (ver §9).
- **IA:** investiga, elige agencias, carga datos con fuente, genera/edita/revisa demos, redacta mensajes, mantiene docs. No le pide al dueño nada que pueda averiguar.
- **Dueño (solo gestos físicos):** enviar mensajes, `wrangler login`, pegar respuestas de agencias, pegar comandos.
- **No hay memoria entre sesiones.** Lo que no queda escrito acá o en `ESTADO.md` se pierde.

## 3. Dónde está todo
| Qué | Ruta |
|---|---|
| Repo GitHub, rama `main`. **PÚBLICO por decisión del dueño** | `github.com/hnk375561-lab/PLANILLA-AGENCIAS` |
| Copia local del repo | `C:\Users\santi\Downloads\repo-nuevo` |
| Carpeta original de trabajo | `C:\Users\santi\Downloads\PLANILLA-AGENCIAS-main\` |
| Demos de agencias (trabajo actual) | `...\PLANILLA-AGENCIAS-main\demos-agencias\` |
| Backups (**NO están en el repo**) | `demos-agencias-backup`, `demos-agencias-backup-final` |
| Plantilla (carpeta anidada) | `...\PLANILLA-AGENCIAS-main\PLANILLA-AGENCIAS-main\` |

**La raíz del repo es la PLANTILLA** (css, js, data, scripts, docs, `CLAUDE.md`, `package.json`). `demos-agencias/` contiene las agencias.

| Ruta | Para qué |
|---|---|
| `CLAUDE.md` | Reglas de contenido (Regla 0 + 11 que valida `npm test`) |
| `docs/OPERACION-IA.md` · `docs/DEPLOY-CLOUDFLARE.md` | Modelo de trabajo · publicación |
| `prospeccion/ESTADO.md` | **Memoria viva. SOLO LOCAL (no se sube)** |
| `prospeccion/agencias.csv` | Datos de prospectos. **SOLO LOCAL** |
| `prospeccion/mensajes.md` | Mensajes listos. **SOLO LOCAL** |
| `data/dealership.json` · `vehicles.json` · `pendientes.json` | Datos del sitio, stock, bloqueantes de producción |
| `scripts/build-index.mjs` | Genera 4 páginas, `robots.txt`, `site.webmanifest`, `u/<id>/` |
| `scripts/build-site.mjs` | Arma `_site/` (lista blanca pública) |
| `scripts/generar-demos.mjs` | Genera una demo por agencia (excluye `prospeccion/`) |

## 4. Plantilla
Las páginas salen de `data/dealership.json` y `data/vehicles.json` con `npm run build`. `npm run site` arma `_site/`. En la plantilla **no se edita a mano** index / `u/` / `units.min.json`.

| Comando | Qué hace |
|---|---|
| `npm run build && npm test` | Reconstruye y valida reglas (obligatorio tras tocar `data/` o `scripts/`) |
| `npm run site` | Arma `_site/` |
| `npm run demos` | Genera demos desde `prospeccion/agencias.csv` |
| `npm run placeholders` | Imágenes de relleno (únicas permitidas en demos) |
| `npm run test:prod` | Chequeo de salida a producción (hoy no aplica) |

## 5. Agencias demo (`demos-agencias/`)
Carpetas (10): `colon-autos`, `lucar-s-automotores`, `centro-automotores-colon`, `eskina-autos`, `la-esquina-automotores`, `lf-autos`, `litoral-motors-gualeguaychu`, `mc-automotores`, `regner-automotores`, `uruguay-autos`. Extras: `_avisos`, `_fotos`, `_backups`.
Cada una tiene `_site/` (lo publicado), `data/` (`vehicles.json`, `dealership.json`; unidades en `_site/js/units.min.json`) y su propio `.gitignore`.
Reconciliación (2026-11-08): **La Esquina Automotores** es una agencia de **Concordia** (San Lorenzo Este 149) con demo pero **sin fila en `agencias.csv`**; **Guarischi** está en el CSV pero **no tiene demo**. No son la misma agencia. Pendiente: sumar La Esquina al CSV con fuente y generar la demo de Guarischi (con backup).

## 6. Despliegue (Cloudflare Pages, **sin Git conectado**, subida directa)
Desde `demos-agencias\<agencia>\_site`:

`npx wrangler pages deploy . --project-name=demo-<agencia>`

Proyectos: `demo-colon-autos`, `demo-lucar-s-automotores`, `demo-uruguay-autos`, `demo-regner-automotores`, `demo-litoral-motors-gualeguaychu`, `demo-lf-autos`, `demo-la-esquina-automotores`, `demo-centro-automotores-colon`, `demo-mc-automotores`, `demo-eskina-autos`.
- `uruspot` es **otro proyecto: no tocar**.
- Wrangler debe decir `Uploaded N files` con **N ≥ 1** si algo cambió; `0` = el archivo local no cambió.
- ⚠️ `demo-colon-autos` (Colón Autos) **≠** `demo-centro-automotores-colon`.

## 7. Estado al 2026-11-08 (trabajo de UI)
- **Textos de aviso:** en Colón y Lucar pasaron de "sin verificar" a "a confirmar por usted" (`_site/js/demo-extra.js`). Colón coincide con Lucar en 10 de 11 textos; "No constituye una oferta ni una reserva." es solo de Colón (pendiente: dejarla o quitarla).
- **Etiquetas de estado en tarjetas:** "0 km", "Bajo km" (< 50.000 km), "Modelo reciente" (año actual − 5 o más nuevo). Archivos: `_site/js/etiquetas.js`, `_site/css/etiquetas.css`, enlazados en `_site/index.html`. **Desplegado en Colón y Lucar. Pendiente: replicar en las otras 8.**
- **Las tarjetas del listado NO se dibujan por JS:** están en `index.html` como `<li class="car">` con `.car-ph` (foto) y `.car-s` (año y km). `secciones.js` las lee con `data-t`.
- **Ya existe en Colón (no volver a proponer):** comparador, galería con visor, mapa Leaflet, horarios con "Abierto ahora / Cerrado ahora" (`horarios.js`), reserva de visita, WhatsApp con mensajes armados (`wa-mensajes.js`), favoritos, compartir, simulador de cuotas, filtros año/km, autos similares, GSAP, preloader, JSON-LD AutoDealer.
- **Faltan:** tasación en pasos (solo hay texto), "Abierto ahora" en el header, JSON-LD `Vehicle` por unidad, skeletons de carga.

## 8. ⚠️ Advertencias críticas
1. **Repo público = no subir datos de prospectos.** `prospeccion/ESTADO.md`, `agencias.csv` y `mensajes.md` están en `.gitignore` y se sacaron del índice de git el 2026-11-08; **las versiones anteriores siguen en el historial público de GitHub**. Verificar con `git ls-files prospeccion` (debe salir vacío). Consecuencia: **una sesión nueva no recibe `ESTADO.md` al clonar; el dueño lo pega en el chat.**
2. **`_site` es edición manual.** Los cambios se hicieron directo en `_site` por consola. El código fuente de cada agencia puede no tenerlos y `npm run site` los **sobrescribiría**. **Decisión pendiente:** `_site` oficial o llevar los cambios al fuente. Hasta decidir: no correr `npm run site` sobre una agencia sin backup.
3. Esto contradice la regla 3 de `CLAUDE.md`; vale para la plantilla, no para las demos mientras no se decida lo anterior.
4. Cada agencia tenía `/_site/` en su `.gitignore`; se quitó **solo en `repo-nuevo`** para que se respalde (y, al ser repo público, esas demos quedan públicas: solo datos públicos de ejemplo, sin fotos reales).
5. **Fotos reales en las demos:** `demos-agencias/_fotos/<agencia>/` tiene fotos descargadas de Facebook el 2026-11-08 (origen en `fotos-origen.json`) y están en el repo público. Contradice la regla 6 de `CLAUDE.md` y `docs/OPERACION-IA.md` (solo relleno en prospección). **Decisión pendiente del dueño:** sacarlas, reemplazarlas por relleno, o conseguir autorización y cambiar la regla.

## 9. Trampas de PowerShell (ya pasaron)
- Bloques largos pegados pueden trabarse con `>>`: **Ctrl+C** y pegar de a uno.
- Verificar textos con tildes/ñ: bajar bytes y decodificar UTF-8 (`$r.RawContentStream.ToArray()`); si no, los conteos dan 0 falsos.
- Comparar carpetas con **`git status`**, no `robocopy`.
- **No ocultar errores** con `2>$null`.
- `Permission denied` en `.git/objects`: reintentar (antivirus).
- `gh repo edit` da 403 con el token actual (sin permiso de admin): el repo se queda público.

## 10. Reglas que más se rompen
1. **Cero datos inventados**; sin fuente (URL + fecha) no se carga.
2. **Sin datos personales** (dueños, familia, vendedores); teléfono/WhatsApp solo del negocio.
3. **Sin fotos ni stock reales** en demos: solo relleno.
4. **Demo = `noindex`** mientras `publicIndexing` sea `false`.
5. **Mensajes 1 a 1**, con "demo con datos de ejemplo" y línea de baja; un solo seguimiento a los 5–7 días.
6. **Chita (contactada por el dueño) y Autocam (descartada): no tocar.**
7. **Nada de prospectos en git** (repo público).

## 11. Decidir sin preguntar
| Situación | Qué hacer |
|---|---|
| Falta un dato | 2–4 búsquedas distintas; si no, vacío + nota en `ESTADO.md`; seguir |
| Fuentes contradictorias | La más reciente y oficial (perfil propio); anotar discrepancia |
| Teléfono de formato fijo (3442 44xxxx) | No cargar como WhatsApp |
| Móvil publicado por el negocio | Cargar como "sin confirmar como WhatsApp" |
| Handle de Instagram dudoso | Solo si la bio menciona la ciudad o la dirección |
| Falta cuenta/credencial | Decirlo y dar el comando exacto de una línea |
| Algo solo lo sabe el dueño | Una pregunta corta, no más |

## 12. Al cerrar cada sesión
1. Actualizar `prospeccion/ESTADO.md` (local) y la fecha de este archivo.
2. Resumir al dueño: qué se hizo + el único gesto que le toca. Recordarle guardar `ESTADO.md` actualizado (no está en GitHub).