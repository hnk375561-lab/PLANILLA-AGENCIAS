# CLAUDE.md — Reglas del proyecto (plantilla de sitios para agencias)

> Contexto general en `CONTEXTO.md`. Estado vivo en `prospeccion/ESTADO.md` (solo local). Modelo de trabajo en `docs/OPERACION-IA.md`.
> `npm test` valida las reglas 1–11. Si falla, no se sube nada.

## Regla 0 — Modelo de trabajo
**Toda investigación, búsqueda de agencias, carga de datos, armado de demos y redacción de mensajes la hace la IA al 100%.** El dueño (Santiago Solis) no busca, no carga datos ni decide detalles. Si falta un dato: varias consultas distintas; si no aparece, queda vacío y documentado, **sin inventarlo y sin pedírselo al dueño**. No hay memoria entre sesiones: se lee `prospeccion/ESTADO.md` al empezar y se actualiza al terminar.

**Lectura de las reglas durante la prospección** (demos sin contacto previo con la agencia):
| Dice la regla | En prospección se lee como |
|---|---|
| "confirmación del dueño" | **fuente pública del propio negocio, citada** (URL + fecha) |
| Preguntas al dueño (reglas 4 y 5) | Las resuelve la IA con la fuente más reciente y oficial y **anota la discrepancia** |
| Fotos / stock | **Solo imágenes de relleno**, nunca reales |
| Cualquier dato | **No se presenta como confirmado por la agencia** hasta que ella lo confirme |

**Formato con el dueño:** español rioplatense; comandos exactos para PowerShell (Windows), de a un bloque; scripts que abortan sin tocar nada si algo no coincide; verificación estricta tras desplegar.

## Reglas validadas por `npm test`
1. **Cero datos inventados.** Teléfono, WhatsApp, horarios, precios, kilometrajes, servicios y reseñas solo se publican con confirmación del dueño o **fuente citada en `data/`**.
2. **Todo dato nuevo se registra** en `data/dealership.json` o `data/vehicles.json`.
3. **El sitio se genera.** Las 4 páginas, `robots.txt`, `site.webmanifest` y `u/<id>/` salen de `scripts/build-index.mjs`. Se cambia `data/` o `scripts/` y se corre `npm run build && npm test`. **No se edita el HTML a mano en la plantilla.** *(Excepción vigente: las `_site/` de `demos-agencias/` se editaron a mano; ver `CONTEXTO.md` §8.)*
4. **Conflictos entre fuentes** (dos direcciones, dos teléfonos): no se resuelven por cuenta propia; se documentan en `data/dealership.json` y se pregunta al dueño. *(En prospección: la IA elige la más reciente y oficial y lo anota.)*
5. **Datos personales:** no cargar datos del dueño, su familia ni de vendedores individuales sin indicación expresa. Email y WhatsApp solo si son **institucionales y confirmados**.
6. **Fotos:** de unidades, personas o local, solo con autorización escrita del dueño. Las de relleno (`npm run placeholders`) son para demos; en producción `npm run test:prod` exige fuente o autorización registrada por foto.
7. **Demo vs. producción:** mientras `publicacion.publicIndexing` sea `false` → `noindex`, `Disallow: /` y aviso de demo. Para salir: dominio, aprobación del dueño, `data/pendientes.json` en cero bloqueantes y `npm run test:prod` en verde.
8. **Stock:** `data/vehicles.json` con fecha de relevamiento. Precios y disponibilidad se confirman con la agencia; el sitio lo dice.
9. **Servicios:** solo los de `services.published`. Tasación, garantía y gestoría no se prometen sin confirmación.
10. **Reseñas:** solo puntaje y cantidad de Google, con fecha y enlace.
11. **Nada de otro cliente.** Al reutilizar la plantilla, cargar los nombres del cliente anterior en `publicacion.restosProhibidos` (`data/dealership.json`): `npm test` falla si queda alguno en el proyecto.

## Antes de dar algo por terminado
- [ ] `npm run build && npm test` en verde (si se tocó `data/` o `scripts/`).
- [ ] La demo pasa `validate-dealership` y `audit-copy`; sin datos de otra agencia ni restos de plantilla.
- [ ] Cada dato nuevo tiene fuente y fecha.
- [ ] Textos de aviso dicen "a confirmar por usted" (no "sin verificar" ni nada que suene confirmado).
- [ ] Si se desplegó: `Uploaded N files` con N ≥ 1 y verificación estricta de lo publicado (bytes UTF-8, sin `2>$null`).
- [ ] `prospeccion/ESTADO.md` actualizado (local).
- [ ] `git ls-files prospeccion` vacío antes de cualquier push.

## Zonas de riesgo
- No correr `npm run site` sobre una agencia cuyo `_site` tenga ediciones manuales sin backup.
- `demo-colon-autos` ≠ `demo-centro-automotores-colon`. `uruspot` no se toca.
- Chita (contactada por el dueño) y Autocam (descartada): no generar demo ni mensaje.
- **El repo es público** por decisión del dueño: `prospeccion/ESTADO.md`, `agencias.csv` y `mensajes.md` nunca se suben.