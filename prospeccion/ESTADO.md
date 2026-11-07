# Estado de la prospección

**Cada sesión empieza leyendo este archivo y termina actualizándolo.** Lo hace la IA; el dueño del proyecto no completa nada acá (ver `docs/OPERACION-IA.md`).

- **Última actualización:** 2026-11-06 (sesión 13: datos de Google Maps cargados)
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
| 4 | Lucar's Automotores | Concepción del Uruguay | demo generada | Instagram @lucars.automotores + La Guía Local + Facebook | **Instagram confirmado.** Dirección en conflicto entre 3 fuentes: Isaías Torres 88 (Instagram y La Guía Local, **la cargada**), Belgrano y Carosini (Facebook), Galarza 1330 (argentino.com.ar, ficha vieja). Móvil +54 9 3442 60-1236 publicado en Facebook (sin confirmar como WhatsApp). Sin sitio propio: buen prospecto. **Se mudó más de una vez** (Galarza 1330 → Belgrano y Carosini → Isaías Torres 88, la actual según su propia bio de Instagram). **Sin horario confiable:** argentino.com.ar da lun-vie y sáb 7:30-12:30 y 15:30-19:30 pero atado a Galarza 1330 y con ~20 meses; no se carga. Teléfono: el 3442 60-1236 es el mismo móvil de WhatsApp (Facebook y La Guía Local); no se carga como fijo porque `tel:+54 3442…` no marcaría un móvil. Un email personal de Gmail figura en su Facebook: **no se carga** (regla 5). No se publica con --deploy hasta tener horario. |
| 5 | Uruguay Autos | Concepción del Uruguay | demo generada | Facebook /uruguayautos | Bv. Sansoni 2080. Tel fijo 3442 440880. Ya tiene sitio Wix: prioridad media. |
| 6 | MC Automotores | Gualeguaychú | demo generada | Facebook /mcautomotoresgualeguaychu + findglocal | Av. Primera Junta 465 (esq. Clavarino). Móvil +54 9 3446 61-4193 (sin confirmar como WhatsApp). 11.5K seguidores en Facebook. **Instagram confirmado: @mcautomotores_** (bio con Gualeguaychú y el mismo teléfono). |
| 7 | Litoral Motors Gualeguaychú | Gualeguaychú | demo generada | Facebook /p/Litoral-Motors-Gualeguaychú-100064005251017 | Urquiza 1506. Móvil +54 9 3446 65-9678 (sin confirmar). Instagram no encontrado tras 2 búsquedas (sesión 6). |
| 8 | LF Autos | Gualeguaychú | demo generada | Facebook /p/LF-Autos-100063696782670 | Av. Del Valle 1425. Tel 3446-376659 (sin confirmar). Instagram no encontrado tras 2 búsquedas (sesión 6). |
| 9 | Eskina Autos | Gualeguaychú | demo generada | Instagram @eskinaautos + Waze + 3 directorios | 25 de Mayo 1370 (un directorio viejo dice 1398). **Instagram confirmado.** Coordenadas reales de Waze. Móvil +5493446585488 publicado en su bio (sin confirmar como WhatsApp). 11K seguidores. |
| 10 | Regner Automotores | Paraná | demo generada | Instagram @regner_automotores + guiadeparana.com | Av. Francisco Ramírez 5102. **Instagram confirmado.** Tel fijo 0343 435-5947 (cargado; aparece en guiadeparana.com, de-venta.com.ar y unoclasificados). **Conflicto:** la Cámara de Concesionarios (ccaentrerios.org, 2026) y un listado BNA/FACCARA de 2019 dan 0343 435-3549: puede ser una segunda línea; confirmar con la agencia. **Sin horario en ninguna fuente pública: no se publica con --deploy hasta tenerlo.** Sin WhatsApp (solo fijos). No tiene sitio propio (el "visitá mi web" de de-venta.com.ar apunta a su stock en ese portal). Más de 30 años. Coordenadas reales (Plus Code 47WX6FJG+PG de Mapcarta/OpenStreetMap). |
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

- 2026-11-06 (sesión 9): se reintentó sacar coordenadas exactas (Colon Autos, Uruguay Autos) con 3 búsquedas: solo devuelven el centro de la ciudad, igual que en las sesiones 6 y 8. Se detectó que en 8 demos el botón "Abrir en Google Maps" / "Cómo llegar" llevaba a un pin de OpenStreetMap en el centro de la ciudad. **Corregido en `scripts/generar-demos.mjs`**: ahora el enlace es una búsqueda de Google Maps por nombre + dirección (Google la resuelve al local); con la columna nueva `coordenadas_exactas = si` del CSV (Eskina y Regner) va al pin exacto. **Limitación que sigue:** el mapa interactivo embebido (Leaflet) de las otras 8 todavía centra en la ciudad. 10/10 demos regeneradas sin errores. Todavía no se subió nada a Cloudflare ni se envió ningún mensaje. Pendiente antes de publicar como web real: stock, precios y fotos propios de cada agencia (hoy son 12 autos de ejemplo con fotos de relleno).

- 2026-11-06 (sesión 10): **Eskina Autos cargada completa con datos reales y fuente.** WhatsApp +54 9 3446 58-5488 (Instagram bio + Waze + 2 directorios; el 5486 de cataloxy es un error de tipeo). Teléfono fijo 03446 43-6304 (bio de Instagram). Horario L-V 9-12:30 y 16:30-20:30, S 9-13, domingo cerrado (Waze, zonaauto, cataloxy; guiabbb dice sábado 9-12:30, se tomó la mayoría). Facebook /ESKINAAUTOS. Coordenadas Waze (worldplaces da -33.01002,-58.52557, a ~40 m: consistente). **Hallazgo grave:** las 10 demos anteriores mostraban el horario de EJEMPLO de la plantilla ("L-V 9-13 y 15-19"), que es inventado. La plantilla no permite ocultar el horario (menú, sección "Horarios y ubicación" y pie dependen de él), así que `generar-demos.mjs` ahora lee la columna `horario` del CSV y **`--deploy` NO publica las agencias sin horario real** (se fuerza con `--permitir-horario-ejemplo`). Columnas nuevas del CSV: `telefono`, `horario` (formato `1-5=09:00-12:30,16:30-20:30;6=09:00-13:00`), `coordenadas_exactas`. **No se cargó:** reseñas de Google (4.5 con 109 opiniones es de un espejo de hace ~20 meses, sin enlace ni fecha vigente: la regla 10 lo impide); email (ninguno institucional encontrado); stock (los avisos de Mercado Libre del buscador mezclan otros vendedores: no se pueden atribuir a Eskina). Siguen faltando stock, precios y fotos propios, hoy de ejemplo.

- 2026-11-06 (sesión 11): **Regner Automotores** investigada a fondo (3 búsquedas). Se cargó el teléfono fijo con formato `0343 435-5947`; se documentó el conflicto con 0343 435-3549. Horario: no existe en fuentes públicas (la web DeVenta, Guía de Paraná, unoclasificados, CCA y el listado BNA no lo traen; el Instagram tampoco), así que **Regner no se publica hasta tener horario real**, que solo puede dar la agencia. Se ajustó `generar-demos.mjs` (la columna `telefono` ahora va ya formateada, porque Paraná usa código de área de 3 dígitos y Gualeguaychú de 4) y se **acotó `validate-dealership.mjs`**: antes prohibía cualquier enlace `tel:` en agencias sin WhatsApp y a la vez lo exigía cuando hay `phoneTel`; ahora `wa.me` sigue bloqueado sin WhatsApp confirmado y `tel:` se permite solo si hay teléfono cargado con fuente (`phoneFuente`). 10/10 demos regeneradas sin errores. Quedan listas para publicar: solo Eskina.

- 2026-11-06 (sesión 12): **Lucar's Automotores** investigada (1 búsqueda). Dirección actual confirmada por su Instagram (Isaías Torres 88). No se pudo cargar horario: el único específico es de una dirección anterior. Nada nuevo para cargar; sigue bloqueada para `--deploy`. **Conclusión de método:** el horario es lo único que la IA no consigue por búsqueda para las agencias chicas (solo Eskina lo tenía, por Waze y zonaauto). 8 de 10 demos dependen de eso. Opciones: (a) pedirlo a cada agencia junto con stock y fotos, o (b) hacer el horario opcional en la plantilla (menú, sección Horarios, pie y `js/horarios.js` / `js/visita-horarios.js`), que es un cambio grande que hay que probar en navegador.

- 2026-11-07 (sesión 13): **Se usó la herramienta `places_search` (fichas de Google Maps), que da horario, coordenadas, enlace de la ficha, puntaje y cantidad de opiniones.** No devuelve teléfonos ni WhatsApp. Fichas encontradas y cargadas (consultadas 2026-11-07): **Eskina** (4.5, 115 op.; horario confirma las otras fuentes), **MC Automotores** (4.6, 22; coords reales -33.0018201,-58.5218749; L 9-13 y 17-21, M-V 9-13 y 17-20, S 9-13), **Colon Autos** (4.8, 17; coords -32.2304584,-58.1527556; la ficha dice Av. San Martín y J. Conte Grand, se mantiene 1109 de su bio; L-V 9-13 y 16:30-20:30, S 9-13), **La Esquina Automotores** (coords -31.385878,-58.0130641; L-V 8-12:30 y 16-20:30, S 8-12:30; 5.0 con 1 sola opinión: no se publica), **Regner** (4.5, 26; coords -31.7681287,-60.5236025; Mar-Vie 8-12 y 16-20, S 9-12:30; **el lunes aparece como "8AM-12AM", ambiguo: no se carga el horario hasta aclararlo**). **LF Autos**: solo un punto de dirección de Google (-33.0152565,-58.5258619), sin horario. **Sin ficha en Google (varias consultas):** Lucar's, Uruguay Autos, Litoral Motors, Centro Automotores Colón. Las reseñas se publican solo con puntaje, cantidad, fecha y enlace (regla 10) y solo si hay 10 o más opiniones. Columnas nuevas del CSV: `google_maps`, `google_puntaje`, `google_cantidad`, `google_fecha`; `generar-demos.mjs` usa el enlace de la ficha para "Cómo llegar". Se corrigió `validate-dealership.mjs`: la condición que habilita las reseñas estaba invertida (`!publicadas`), por lo que publicar reseñas siempre fallaba; ahora exige publicadas + enlace + fecha + puntaje + cantidad. **Listas para publicar (horario real): Eskina, MC Automotores, Colon Autos, La Esquina.** Candidatas con ficha completa en Google que podrían reemplazar a las 4 sin ficha (falta verificar que no tengan sitio propio): Rivas Auto (Gualeguaychú, 4.8, 76 op.), Malliet Automotores y Denonicars Automotores (Colón, 4.7 con 84 y 5.0 con 72).

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
