# Guía de mantenimiento — Plantilla de sitios para agencias

## Regla 0 — Modelo de trabajo (leer antes que nada)

**Toda investigación, búsqueda de agencias, recolección de datos, armado de demos y redacción de mensajes la hace la IA, al 100%.** El dueño del proyecto no busca, no carga datos y no decide detalles; no se le pide que lo haga. Si falta un dato, la IA lo busca (varias consultas distintas); si no aparece, lo deja vacío y documentado, sin inventarlo y sin pedírselo al dueño. Como no hay memoria entre sesiones, el estado vive en `prospeccion/ESTADO.md`: se lee al empezar y se actualiza al terminar. Detalle, límites técnicos y reglas de contacto: `docs/OPERACION-IA.md`.

Cómo se leen las reglas siguientes durante la **prospección** (demos sin contacto previo con la agencia): "confirmación del dueño" se reemplaza por **fuente pública del propio negocio, citada**, y las preguntas al dueño de las reglas 4 y 5 las resuelve la IA con la fuente más reciente y oficial, anotando la discrepancia. Nada se presenta como confirmado por la agencia hasta que ella lo confirme. Las demos de prospección usan imágenes de relleno, nunca fotos ni stock reales.

Reglas que valida `npm test` y que hay que respetar con cada cliente:

1. **Cero datos inventados.** Teléfono, WhatsApp, horarios, precios, kilometrajes, servicios y reseñas solo se publican con confirmación del dueño o con fuente citada en `data/`.
2. **Todo dato nuevo se registra** en `data/dealership.json` o `data/vehicles.json`.
3. **El sitio se genera.** Las 4 páginas, `robots.txt`, `site.webmanifest` y las páginas `u/<id>/` salen de `scripts/build-index.mjs`. Se cambia `data/` o `scripts/` y se corre `npm run build && npm test`. No se edita el HTML a mano.
4. **Conflictos entre fuentes** (dos direcciones, dos teléfonos): no se resuelven por cuenta propia; se documentan en `data/dealership.json` y se pregunta al dueño.
5. **Datos personales:** no cargar datos del dueño, su familia ni de vendedores individuales sin indicación expresa. El email y el WhatsApp se publican solo si son institucionales y están confirmados.
6. **Fotos:** de unidades, personas o local, solo con autorización escrita del dueño. Las imágenes de relleno (`npm run placeholders`) son para demos; en producción `npm run test:prod` exige fuente o autorización registrada por cada foto.
7. **Demo vs. producción:** mientras `publicacion.publicIndexing` sea `false`: `noindex`, `Disallow: /` y aviso de demo. Para salir: dominio, aprobación del dueño, `data/pendientes.json` en cero bloqueantes y `npm run test:prod` en verde.
8. **Stock:** `data/vehicles.json` con fecha de relevamiento. Precios y disponibilidad se confirman con la agencia; el sitio lo dice.
9. **Servicios:** solo los de `services.published`. Tasación, garantía y gestoría no se prometen sin confirmación.
10. **Reseñas:** solo puntaje y cantidad de Google, con fecha y enlace.
11. **Nada de otro cliente.** Al reutilizar la plantilla, cargar los nombres del cliente anterior en `publicacion.restosProhibidos` (data/dealership.json): `npm test` falla si queda alguno en el proyecto.
