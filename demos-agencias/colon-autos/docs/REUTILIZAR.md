# Reutilizar la plantilla para un cliente nuevo

## 1. Datos del cliente (`data/dealership.json`)
- `identity`: `tradeName`, `legalName`, `marcaCorta` (1–3 letras para el sello de cada sección y el pin del mapa).
- `location`: dirección, ciudad, provincia y `coordenadas` (lat/lng; se sacan buscando la dirección en openstreetmap.org). `mapsUrl` es el enlace a su ficha de Google Maps.
- `contact`: `whatsApp` (solo dígitos con código de país, ej. `5491122334455`), `whatsAppDisplay`, `email`, `instagram`, `facebook`, `stockUrl` (enlace a su listado externo, ej. Mercado Libre; si no tiene queda un ancla interna). Poner `whatsAppConfirmed: true` **solo** cuando el dueño lo confirmó.
- `hours`, `services.published`, `reviews`, `presentacion` (el dato destacado de «Nosotros»).
- `publicacion`: `previewUrl` (URL de la demo, necesaria para la vista previa en WhatsApp), `publicIndexing` (false = demo con noindex), `restosProhibidos` (nombres de clientes anteriores).

## 2. Stock (`data/vehicles.json`)
Una entrada por unidad (ver las 12 de ejemplo). Las fotos van en `images/stock/` y se declaran en `fotos[]` con `src`, `thumb`, `card` (solo la primera), `width` y `height`. `scripts/make-images.mjs` convierte fotos originales a las variantes que usa el sitio. Cada vez que cambia el stock: `npm run build && npm run og:units && npm test`.

El stock se carga a mano: el sitio no se sincroniza con Mercado Libre ni con nada. Para clientes con stock que cambia por semana, cobrar el mantenimiento o armar una planilla que se convierta a este JSON.

## 3. Imágenes
`npm run placeholders` genera todas las imágenes de relleno (portadas, anillo, fondos, logos, íconos, og y fotos de las unidades de ejemplo). Reemplazarlas **con los mismos nombres** por las del cliente, con su autorización escrita. Los logos del cliente van en `images/logo*.png`, `logo-emblema.png`, `logo-prelude.webp` e `icon-*.png`.

## 4. Color
`npm run tema -- "#hex"` cambia el acento (y sus variantes claro/oscuro/transparentes) en todo el CSS y JS. Los negros, blancos y plata del diseño no cambian; si el cliente quiere otra base, editar `css/dr-identidad.css`.

## 5. Antes de publicar
1. `npm test` en verde y revisar el sitio en celular.
2. Resolver `data/pendientes.json` (WhatsApp confirmado, fotos autorizadas, dominio, aprobación del dueño).
3. `publicacion.publicIndexing: true`, `siteUrl` con el dominio y `npm run test:prod`.
4. Desplegar con `docs/DEPLOY-CLOUDFLARE.md` (o Netlify con el `netlify.toml` incluido).

## 6. Texto de marca dentro del código
El nombre y la sigla del cliente llegan a los CSS y JS por variables que inyecta el build (`--marca-nombre`, `window.DR_NOMBRE`, `window.DR_MARCA`, `window.DR_CIUDAD`). No hay que buscar y reemplazar nada a mano. `scripts/rebrand.mjs` sigue disponible para cambios de texto puntuales.
