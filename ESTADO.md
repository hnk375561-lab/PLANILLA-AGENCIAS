# Estado de la prospección

**Cada sesión empieza leyendo este archivo y termina actualizándolo.** Lo hace la IA; el dueño del proyecto no completa nada acá (ver `docs/OPERACION-IA.md`).

- **Última actualización:** 2026-11-06 (sesión 4: Colón, Paraná y cierre de las 10)
- **Zona objetivo:** Entre Ríos y Litoral. Se empieza por Concepción del Uruguay y se completa con ciudades cercanas (Colón, Gualeguaychú, Concordia, Paraná). Decidido por la IA el 2026-11-06.
- **Meta:** 10 agencias con demo generada y mensaje listo, más candidatas de reserva. **Avance: 10 de 10 agencias activas con demo generada** (Chita y Autocam salieron de la lista, ver tabla).

## Criterios

Ver "Cómo elegir las agencias" en `docs/OPERACION-IA.md`.

## Agencias

Estados posibles: `candidata` → `datos completos` → `demo generada` → `mensaje listo` → `enviada` → `respondió` / `sin respuesta` / `descartada`.

| # | Agencia | Ciudad | Estado | Fuente de los datos | Notas |
|---|---|---|---|---|---|
| 1 | Guarischi Automotores | Concepción del Uruguay | demo generada | zonaauto.com.ar (ficha de 2024-02-19) | J. J. Bruno 2580. Tel fijo 3442 442080. Sin Instagram encontrado. |
| 2 | Chita Automotores | Concepción del Uruguay | **contactada por el dueño** | zonaauto.com.ar (ficha de 2024-02-19) | El dueño ya le escribió por su cuenta y quedó en responderle. **No volver a escribirle ni generar otra demo**; el dueño avisa en el chat si responde. |
| 3 | Autocam - Autos y Pick Ups | Concepción del Uruguay | **descartada** | zonaauto.com.ar + Facebook /autocamcdelu | El dueño cree que ya tenía sitio web (sin verificar). No contactar. |
| 4 | Lucar's Automotores | Concepción del Uruguay | demo generada | Facebook /lucarsautomotores | Belgrano y Carosini. Móvil +54 9 3442 60-1236 publicado por el negocio (sin confirmar como WhatsApp). Sin sitio propio: buen prospecto. |
| 5 | Uruguay Autos | Concepción del Uruguay | demo generada | Facebook /uruguayautos | Bv. Sansoni 2080. Tel fijo 3442 440880. Ya tiene sitio Wix: prioridad media. |
| 6 | MC Automotores | Gualeguaychú | demo generada | Facebook /mcautomotoresgualeguaychu + findglocal | Av. Primera Junta 465 (esq. Clavarino). Móvil +54 9 3446 61-4193 (sin confirmar como WhatsApp). 11.5K seguidores en Facebook. Sin Instagram encontrado. |
| 7 | Litoral Motors Gualeguaychú | Gualeguaychú | demo generada | Facebook /p/Litoral-Motors-Gualeguaychú-100064005251017 | Urquiza 1506. Móvil +54 9 3446 65-9678 (sin confirmar). Sin Instagram encontrado. |
| 8 | LF Autos | Gualeguaychú | demo generada | Facebook /p/LF-Autos-100063696782670 | Av. Del Valle 1425. Tel 3446-376659 (sin confirmar). Sin Instagram encontrado. |
| 9 | Eskina Autos | Gualeguaychú | demo generada | Instagram @eskinaautos + Waze + 3 directorios | 25 de Mayo 1370 (un directorio viejo dice 1398). **Instagram confirmado.** Coordenadas reales de Waze. Móvil +5493446585488 publicado en su bio (sin confirmar como WhatsApp). 11K seguidores. |
| 10 | Regner Automotores | Paraná | demo generada | Instagram @regner_automotores + guiadeparana.com | Av. Francisco Ramírez 5102. **Instagram confirmado.** Tel fijo 0343 435 5947. Más de 30 años. Coordenadas aprox. |
| 11 | Colon Autos | Colón | demo generada | Facebook /Colonautos | San Martín 1109. Tel fijo +54 3447 45-3127. 3.7K likes. Sin Instagram encontrado. |
| 12 | Centro Automotores Colón | Colón | demo generada | Facebook /CentroAutomotoresColon | Gral. Paz 28. Tel fijo +54 3447 42-3880. 1.2K likes. Sin Instagram encontrado. |
| – | Automotores La Tortuga | Colón | candidata (reserva) | Facebook /ltcolon | San Martín 1147. Tel +54 3447 44-5855. 11.9K likes pero es servicio oficial Chevrolet: probablemente más grande. |
| – | Núñez Automotores | Colón | candidata (sin datos) | infoisinfo-ar.com | San Martín 770. Faltan contacto y redes. |
| – | UG car store | Gualeguaychú | candidata (falta dirección) | Facebook /ugcarstore | 5.9K likes. Falta dirección y teléfono. |
| – | DSJ Autos | Gualeguaychú | candidata (falta dirección) | Facebook /dsjautos | 312 likes. Falta dirección y teléfono. |
| – | Garage Autos | Gualeguaychú | candidata (reserva) | Facebook /Garage.Autos.Gchu | Luis N. Palma 1063. Móvil +54 9 3446 41-1859. Solo 24 likes: prospecto débil. |
| – | Galarza Hogar Automotores | Concepción del Uruguay | candidata (reserva) | zonaauto.com.ar | 9 de Julio 1689. Ya tiene sitio propio (galarzahogarautomotores.com.ar): prioridad baja. |
| – | Fernando Poerio Automotores | Concepción del Uruguay | candidata (sin datos) | gtm.com.ar (listado) | Falta dirección, contacto y redes. |
| – | Automotores Las Lomas | Concepción del Uruguay | candidata (sin datos) | gtm.com.ar (listado) | Falta dirección, contacto y redes. |

Descartadas a propósito: Banchik (sitio corporativo propio, concesionario oficial Peugeot/Hyundai), Folmer (concesionario oficial Renault), Rudas (concesionario oficial Chevrolet).

## Contactos ya hechos por el dueño

Cuando el dueño cuenta en el chat que escribió a una agencia o que esta respondió, la IA lo anota acá y en la tabla, y no vuelve a generar demo ni mensaje para ella.

- Chita Automotores: contactada por el dueño, esperando respuesta (2026-11-06).

## Bitácora

- 2026-11-06: se creó el generador de demos (`npm run demos`), se arreglaron los nombres con `&` y se definió el modelo "la IA hace todo". Todavía no se investigó ninguna agencia.

- 2026-11-06 (sesión 2): se investigó Concepción del Uruguay con `web_search` y `web_fetch` sobre zonaauto.com.ar y páginas de Facebook. Se cargaron 5 agencias en `prospeccion/agencias.csv` y se generaron las 5 demos sin errores (`npm run demos`). Todavía no se subió nada a Cloudflare ni se envió ningún mensaje.

- 2026-11-06 (sesión 2, corrección): el dueño informó que ya contactó a Chita (espera respuesta) y que Autocam ya tendría sitio. Se sacaron del CSV y de `mensajes.md`. Quedan 3 agencias activas (Guarischi, Lucar's, Uruguay Autos); faltan 7.

- 2026-11-06 (sesión 3): se investigó Gualeguaychú. Se sumaron 3 agencias con datos completos (MC, Litoral Motors, LF Autos) y 4 candidatas con datos incompletos. Se corrigió un bug de `generar-demos.mjs`: copiaba `prospeccion/` dentro de cada demo y el chequeo anti-fugas bloqueaba todo; ahora esa carpeta se excluye. 6/6 demos generadas.

- 2026-11-06 (sesión 4): se investigó Colón y Paraná. Se sumaron 4 agencias (Eskina con Instagram, dirección y coordenadas confirmados; Regner con Instagram confirmado; Colon Autos; Centro Automotores Colón). Con eso hay **10 agencias activas con demo generada (10/10 sin errores)**. Todavía no se subió nada a Cloudflare ni se envió ningún mensaje.

## Lecciones de la investigación (para no repetir errores)

- Mercado Libre y Facebook bloquean el acceso automatizado (`web_fetch` falla): de Facebook solo sirven los fragmentos que devuelve `web_search`.
- Para dirección de una agencia puntual funcionó: `<nombre> <ciudad> Entre Ríos concesionaria dirección guía teléfono <tel de su bio>` en modo `extended` (devuelve Waze, directorios y coordenadas). Mapcarta y Facebook bloquean `web_fetch`.
- Búsqueda que funcionó: `automotores autos usados <ciudad> Entre Ríos venta de autos Facebook Instagram permutas financiación` con modo `extended` (devuelve fichas de Facebook con dirección y teléfono). Buscar la dirección de una agencia puntual (`<nombre> dirección calle teléfono`) devuelve ruido: no repetirlo; probar `<nombre> <ciudad> instagram` o directorios tipo findglocal.
- Las búsquedas de Instagram de agencias chicas suelen devolver perfiles de **otros negocios** con nombre parecido (ej. `@autocamuy` es de Uruguay, no de Concepción del Uruguay). Un handle solo se carga si el perfil menciona la ciudad o la dirección de la agencia.
- Las fichas de zonaauto.com.ar son de febrero de 2024: pueden estar desactualizadas. Se cargan con esa fecha y se verifican con el Facebook de la agencia cuando existe.
- No hay herramienta para geocodificar direcciones (no se pueden construir URLs de OpenStreetMap). Las coordenadas cargadas son las del centro de la ciudad; el mapa de la demo apunta ahí y no a la agencia exacta.
- Un teléfono con formato fijo (3442 44xxxx) no se carga como WhatsApp. Sin Instagram cargado, la plantilla deja enlaces a la portada de Instagram: conviene encontrar el perfil real antes de enviar.

## Próximo paso

1. Buscar los Instagram reales de las 8 agencias que aún no lo tienen (Guarischi, Lucar's, Uruguay Autos, MC, Litoral Motors, LF Autos, Colon Autos, Centro Automotores Colón). Usar `<nombre> <ciudad> instagram` y aceptar un handle solo si la bio menciona la ciudad o la dirección.
2. Sumar coordenadas reales (Waze o Mapcarta vía `web_search`) para las agencias con centro de ciudad aproximado.
3. Cuando el dueño tenga `wrangler login`, correr `npm run demos -- prospeccion/agencias.csv --deploy` para tener los links reales y regenerar `mensajes.md`.
4. El dueño envía los mensajes (1 a 1, con línea de baja). La IA redacta las respuestas y el único seguimiento a los 5-7 días.

## Pendientes que solo puede hacer el dueño (por límite técnico de la IA)

- Pasar el repo a privado en GitHub (hoy es público).
- `npx wrangler login` una vez, para que `--deploy` publique las demos.
- Enviar los mensajes desde sus cuentas de WhatsApp o Instagram.
