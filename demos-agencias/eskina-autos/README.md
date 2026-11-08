# Plantilla de sitios para agencias de autos

Sitio estático (sin framework) pensado para agencias de autos y motos: portada con carrusel, recorrido horizontal del stock, anillo de interiores, catálogo con filtros, comparador, ficha por unidad con revelado, financiación y servicios, horarios en vivo, reserva de visita, mapa y WhatsApp. Es el diseño y el código del sitio de una agencia real, **sin ninguno de sus datos, fotos ni identidad**: todo el contenido es de ejemplo.

> **Modelo de trabajo (para personas y para IA, leer primero):** la investigación, la búsqueda de agencias, los datos, las demos y los mensajes los hace la IA al 100%; el dueño del proyecto no busca ni carga nada. Reglas y límites en [`CLAUDE.md`](CLAUDE.md) y [`docs/OPERACION-IA.md`](docs/OPERACION-IA.md). El estado de la prospección (qué se hizo y qué sigue) está en [`prospeccion/ESTADO.md`](prospeccion/ESTADO.md): las sesiones de IA no tienen memoria, así que ese archivo es la memoria.

Las páginas se generan desde `data/dealership.json` y `data/vehicles.json` con `npm run build`. No se editan a mano.

## Empezar con un cliente nuevo

```bash
npm install
npm run nuevo -- --nombre "Autos del Sur" --ciudad "Rosario" --provincia "Santa Fe" \
  --direccion "Av. Pellegrini 1234" --whatsapp 5493410000000 --instagram autosdelsur --acento "#0a66ff"
npm run dev            # http://localhost:8080
```

`nuevo` carga los datos básicos, cambia el color de acento, regenera las imágenes de relleno con el nombre del cliente y compila. Después hay que revisar `data/dealership.json` (horarios, servicios, redes) y cargar el stock. Guía completa: `docs/REUTILIZAR.md`.

| Comando | Qué hace |
|---|---|
| `npm run build` | Regenera index, reserva, privacidad, 404, `u/<id>/` y `js/units.min.json` |
| `npm test` | Valida datos y corre las pruebas de interfaz (requiere Playwright con Chromium) |
| `npm run test:prod` | Puerta de salida a producción (falla con datos o fotos de ejemplo) |
| `npm run dev` | Servidor local en http://localhost:8080 |
| `npm run site` | Arma `_site/` con solo los archivos públicos |
| `npm run placeholders` | Regenera imágenes de relleno (`-- --acento "#hex" --nombre "Nombre"`) |
| `npm run tema -- "#hex"` | Cambia el color de acento de todo el sitio |
| `npm run nuevo -- …` | Configura un cliente nuevo (ver arriba) |
| `npm run demos -- prospeccion/agencias.csv` | Genera una demo personalizada por agencia (carpeta, `_site/`, `mensajes.md`); con `--deploy` las sube a Cloudflare Pages |

## Qué se arma solo

Portada (hasta 10 unidades), anillo de interiores (hasta 10), recorrido horizontal (hasta 12 tarjetas, de a 6) y unidad destacada salen automáticamente de las primeras unidades de `data/vehicles.json`. Funciona con cualquier cantidad de unidades desde 1; con pocas, esas secciones muestran menos tarjetas. Si querés fijarlas a mano, `historias.recorrido.tarjetas` y `historias.destacada` en `data/dealership.json` tienen prioridad.

## Prospección con demos

`prospeccion/agencias.csv` lista las agencias (columnas: `nombre, ciudad, provincia, direccion, whatsapp, instagram, acento, lat, lng, email, facebook, sigla, contacto, fuente, notas`; obligatorios `nombre`, `ciudad` y `direccion`; `fuente` y `notas` no se usan al generar). `npm run demos` crea una carpeta por agencia fuera del repo (`../demos-agencias`), verifica que no se filtre nada de otra agencia y escribe `mensajes.md`. Quien investiga y completa todo esto es la IA (ver `docs/OPERACION-IA.md`).
