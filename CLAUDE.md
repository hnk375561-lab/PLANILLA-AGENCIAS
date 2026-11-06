# Guía de mantenimiento — Plantilla de sitios para agencias

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
