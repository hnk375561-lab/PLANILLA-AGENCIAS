# Estado de la prospección

**Cada sesión empieza leyendo este archivo y termina actualizándolo.** Lo hace la IA; el dueño del proyecto no completa nada acá (ver `docs/OPERACION-IA.md`).

- **Última actualización:** 2026-11-06 (sesión 8: afinado de Instagram, mapas, WhatsApp y mensajes)
- **Zona objetivo:** Entre Ríos y Litoral. Se empieza por Concepción del Uruguay y se completa con ciudades cercanas (Colón, Gualeguaychú, Concordia, Paraná). Decidido por la IA el 2026-11-06.
- **Meta:** 10 agencias con demo generada y mensaje listo, más candidatas de reserva. **Avance: 10 de 10 agencias activas con demo generada** (Chita, Autocam y Guarischi salieron de la lista, ver tabla).

## Criterios

Ver "Cómo elegir las agencias" en `docs/OPERACION-IA.md`.

## Agencias

Estados posibles: `candidata` → `datos completos` → `demo generada` → `mensaje listo` → `enviada` → `respondió` / `sin respuesta` / `descartada`.

| # | Agencia | Ciudad | Estado | Fuente de los datos | Notas |
|---|---|---|---|---|---|
| 1 | Guarischi Automotores | Concepción del Uruguay | **descartada** | zonaauto.com.ar + búsqueda 2026-11-06 | Ya tiene sitio propio (guarischiautomotores.com, no verificable por robots.txt pero aparece en búsqueda con contenido de empresa familiar). Mismo criterio que Autocam: no contactar. |
| 2 | Chita Automotores | Concepción del Uruguay | **contactada por el dueño** | zonaauto.com.ar (ficha de 2024-02-19) | El dueño ya le escribió por su cuenta y quedó en responderle. **No volver a escribirle ni generar otra demo**; el dueño avisa en el chat si responde. |
| 3 | Autocam - Autos y Pick Ups | Concepción del Uruguay | **descartada** | zonaauto.com.ar + Facebook /autocamcdelu | El dueño cree que ya tenía sitio web (sin verificar). No contactar. |
| 4 | Lucar's Automotores | Concepción del Uruguay | demo generada | Instagram @lucars.automotores + La Guía Local + Facebook | **Instagram confirmado.** Dirección en conflicto entre 3 fuentes: Isaías Torres 88 (Instagram y La Guía Local, **la cargada**), Belgrano y Carosini (Facebook), Galarza 1330 (argentino.com.ar, ficha vieja). Móvil +54 9 3442 60-1236 publicado en Facebook (sin confirmar como WhatsApp). Sin sitio propio: buen prospecto. |
| 5 | Uruguay Autos | Concepción del Uruguay | demo generada | Facebook /uruguayautos | Bv. Sansoni 2080. Tel fijo 3442 440880. Ya tiene sitio Wix: prioridad media. |
| 6 | MC Automotores | Gualeguaychú | demo generada | Facebook /mcautomotoresgualeguaychu + findglocal | Av. Primera Junta 465 (esq. Clavarino). Móvil +54 9 3446 61-4193 (sin confirmar como WhatsApp). 11.5K seguidores en Facebook. **Instagram confirmado: @mcautomotores_** (bio con Gualeguaychú y el mismo teléfono). |
| 7 | Litoral Motors Gualeguaychú | Gualeguaychú | demo generada | Facebook /p/Litoral-Motors-Gualeguaychú-100064005251017 | Urquiza 1506. Móvil +54 9 3446 65-9678 (sin confirmar). Instagram no encontrado tras 2 búsquedas (sesión 6). |
| 8 | LF Autos | Gualeguaychú | demo generada | Facebook /p/LF-Autos-100063696782670 | Av. Del Valle 1425. Tel 3446-376659 (sin confirmar). Instagram no encontrado tras 2 búsquedas (sesión 6). |
| 9 | Eskina Autos | Gualeguaychú | demo generada | Instagram @eskinaautos + Waze + 3 directorios | 25 de Mayo 1370 (un directorio viejo dice 1398). **Instagram confirmado.** Coordenadas reales de Waze. Móvil +5493446585488 publicado en su bio (sin confirmar como WhatsApp). 11K seguidores. |
| 10 | Regner Automotores | Paraná | demo generada | Instagram @regner_automotores + guiadeparana.com | Av. Francisco Ramírez 5102. **Instagram confirmado.** Tel fijo 0343 435 5947. Más de 30 años. Coordenadas reales (Plus Code 47WX6FJG+PG de Mapcarta/OpenStreetMap). |
| 11 | Colon Autos | Colón | demo generada | Facebook /Colonautos | San Martín 1109. Tel fijo +54 3447 45-3127. 3.7K likes. **Instagram confirmado: @colon_autos** (bio con San Martín 1109 y el mismo teléfono). |
| 12 | Centro Automotores Colón | Colón | demo generada | Facebook /CentroAutomotoresColon | Gral. Paz 28. Tel fijo +54 3447 42-3880. 1.2K likes. Instagram no encontrado (@centro.automotores es de otra ciudad). |
| 13 | La Esquina Automotores | Concordia | demo generada | Facebook /laesquinaautos + firmania.com.ar + cylex.com.ar | San Lorenzo Este 149. Tel fijo 0345 422-6413. Datos de directorios de ~2024, sin verificar con el negocio. 1.7K likes. Instagram no encontrado. Coordenadas aprox. |
| – | Automotores La Tortuga | Colón | candidata (reserva) | Facebook /ltcolon | San Martín 1147. Tel +54 3447 44-5855. 11.9K likes pero es servicio oficial Chevrolet: probablemente más grande. |
| – | Dt Automotores | Concordia | candidata (reserva) | gtm.com.ar | Monseñor Tavella 2484. Faltan contacto y redes. |
| – | MB Automotores | Concordia | descartada | morettobarnada.com.ar | Tiene sitio propio. |
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

- 2026-11-06 (sesión 5): al clonar el repo se vio que los 3 archivos de la sesión 4 habían quedado sueltos en la raíz y que `generar-demos.mjs` no excluía `prospeccion/` (las 10 demos fallaban en el chequeo anti-fugas). Se corrigió el script (excluye `prospeccion/` y las copias sueltas de la raíz), se reubicaron los archivos y las 10 demos se regeneraron 10/10 sin errores. Todavía no se subió nada a Cloudflare ni se envió ningún mensaje.

- 2026-11-06 (sesión 6): se buscaron los Instagram de las 8 agencias que faltaban. Confirmados 3: Lucar's, MC y Colon Autos. No hay perfil propio para Uruguay Autos, Litoral Motors, LF Autos (el `@lfautos_ok` es de Villa Adelina) ni Centro Automotores Colón (el `@centro.automotores` es de Córdoba). Se descubrió que Guarischi tiene sitio propio y se la sacó de las activas (9/10). No se encontraron coordenadas exactas: las demos siguen apuntando al centro de la ciudad salvo Eskina. Todavía no se subió nada a Cloudflare ni se envió ningún mensaje.

- 2026-11-06 (sesión 7): se investigó Concordia y se sumó La Esquina Automotores como décima agencia (MB Automotores se descartó por tener sitio propio; MC Automotores Concordia no se usó porque el nombre choca con MC de Gualeguaychú en el chequeo anti-fugas). **10 demos activas generadas sin errores.** Todavía no se subió nada a Cloudflare ni se envió ningún mensaje.

- 2026-11-06 (sesión 8): afinado. Se reintentó el Instagram de Uruguay Autos, Litoral Motors, LF Autos, Centro Automotores Colón y La Esquina: sin perfil propio en ninguna (3 búsquedas para Uruguay Autos, 2 para el resto). **Regner pasó a coordenadas reales** (Plus Code de Mapcarta decodificado). Para las otras 8 no hay coordenadas exactas en ninguna fuente accesible (Colon Autos, MC y las demás no figuran en OpenStreetMap; Waze solo da puntos de calle): se dejan en el centro de la ciudad, salvo Eskina que ya tenía las reales. Se decidió sobre WhatsApp: se muestra en la demo solo en 4 agencias cuyo móvil (+54 9) publica el propio negocio (Lucar's, MC, Litoral Motors, Eskina), con la leyenda de demo; para eso hay que correr con `--mostrar-whatsapp`. Se creó `prospeccion/mensajes-personalizados.md` con un mensaje por agencia, canal sugerido y seguimiento.

## Lecciones de la investigación (para no repetir errores)

- Mercado Libre y Facebook bloquean el acceso automatizado (`web_fetch` falla): de Facebook solo sirven los fragmentos que devuelve `web_search`.
- Para dirección de una agencia puntual funcionó: `<nombre> <ciudad> Entre Ríos concesionaria dirección guía teléfono <tel de su bio>` en modo `extended` (devuelve Waze, directorios y coordenadas). Mapcarta y Facebook bloquean `web_fetch`.
- Coordenadas exactas: buscar `<nombre> - Mapa - Concesionaria de autos - <ciudad>, Provincia de Entre Ríos, Argentina` devuelve fichas de Mapcarta; el fragmento trae un Plus Code (ej. `47WX6FJG+PG`) que se decodifica exacto. Solo sirve si el negocio está en OpenStreetMap (Regner sí; las demás no). Los Waze `live-map` dan solo puntos de calle, no de local.
- Búsqueda que funcionó: `automotores autos usados <ciudad> Entre Ríos venta de autos Facebook Instagram permutas financiación` con modo `extended` (devuelve fichas de Facebook con dirección y teléfono). Buscar la dirección de una agencia puntual (`<nombre> dirección calle teléfono`) devuelve ruido: no repetirlo; probar `<nombre> <ciudad> instagram` o directorios tipo findglocal.
- Las búsquedas de Instagram de agencias chicas suelen devolver perfiles de **otros negocios** con nombre parecido (ej. `@autocamuy` es de Uruguay, no de Concepción del Uruguay). Un handle solo se carga si el perfil menciona la ciudad o la dirección de la agencia.
- Las fichas de zonaauto.com.ar son de febrero de 2024: pueden estar desactualizadas. Se cargan con esa fecha y se verifican con el Facebook de la agencia cuando existe.
- No hay herramienta para geocodificar direcciones (no se pueden construir URLs de OpenStreetMap). Las coordenadas cargadas son las del centro de la ciudad; el mapa de la demo apunta ahí y no a la agencia exacta.
- Un teléfono con formato fijo (3442 44xxxx) no se carga como WhatsApp. Sin Instagram cargado, la plantilla deja enlaces a la portada de Instagram: conviene encontrar el perfil real antes de enviar.

## Próximo paso

1. El dueño corre `npm run demos -- prospeccion/agencias.csv --mostrar-whatsapp --deploy` (si no quiere botones de WhatsApp en las demos, quita `--mostrar-whatsapp`).
2. Revisar `prospeccion/mensajes.md` (se regenera con los links reales) y usar `prospeccion/mensajes-personalizados.md` como texto a enviar, de a uno, cambiando la URL si el deploy devolvió otra.
3. La IA redacta las respuestas y el único seguimiento a los 5-7 días.
4. Si se quieren mapas exactos en las 8 agencias restantes: el dueño o una sesión con acceso a Google Maps copia lat/lng; no es obligatorio.

## Pendientes que solo puede hacer el dueño (por límite técnico de la IA)

- Pasar el repo a privado en GitHub (hoy es público).
- `npx wrangler login` una vez, para que `--deploy` publique las demos.
- Enviar los mensajes desde sus cuentas de WhatsApp o Instagram.
