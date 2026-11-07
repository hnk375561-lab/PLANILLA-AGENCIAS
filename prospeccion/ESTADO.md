# Estado de la prospección

**Cada sesión empieza leyendo este archivo y termina actualizándolo.** Lo hace la IA; el dueño del proyecto no completa nada acá (ver `docs/OPERACION-IA.md`).

- **Última actualización:** 2026-11-06
- **Zona objetivo:** pendiente. La IA la decide en la primera sesión de prospección y la anota acá.
- **Meta:** 10 agencias con demo generada y mensaje listo, más candidatas de reserva.

## Criterios

Ver "Cómo elegir las agencias" en `docs/OPERACION-IA.md`.

## Agencias

Estados posibles: `candidata` → `datos completos` → `demo generada` → `mensaje listo` → `enviada` → `respondió` / `sin respuesta` / `descartada`.

| # | Agencia | Ciudad | Estado | Fuente de los datos | Notas |
|---|---|---|---|---|---|
| | _(vacía: la IA la completa)_ | | | | |

## Bitácora

- 2026-11-06: se creó el generador de demos (`npm run demos`), se arreglaron los nombres con `&` y se definió el modelo "la IA hace todo". Todavía no se investigó ninguna agencia.

## Próximo paso

1. Decidir la zona y anotarla arriba.
2. Investigar agencias con `web_search` y completar `prospeccion/agencias.csv` (con `fuente` y `notas`).
3. Correr `npm run demos -- prospeccion/agencias.csv`, revisar cada demo y dejar `mensajes.md` listo.
4. Decirle al dueño el único gesto que le toca (por ejemplo, enviar los mensajes o hacer el login de Cloudflare).

## Pendientes que solo puede hacer el dueño (por límite técnico de la IA)

- Pasar el repo a privado en GitHub (hoy es público).
- `npx wrangler login` una vez, para que `--deploy` publique las demos.
- Enviar los mensajes desde sus cuentas de WhatsApp o Instagram.
