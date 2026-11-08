# Modelo de trabajo: la IA hace todo

> **Leer en cada sesión.** Las IA no tienen memoria entre sesiones: la memoria del proyecto es `CONTEXTO.md`, `CLAUDE.md`, este archivo y `prospeccion/ESTADO.md` (este último solo local).

## TL;DR
1. Leé `CONTEXTO.md` → `CLAUDE.md` → `prospeccion/ESTADO.md` y seguí desde "Próximo paso" **sin preguntar qué sigue**.
2. Investigá, cargá datos **con fuente**, generá y revisá demos, redactá mensajes.
3. Lo que no podés ejecutar (enviar, loguear, push): dejá archivo + texto exacto + comando de una línea y pedí solo el gesto.
4. Antes de cerrar, actualizá `ESTADO.md`.

## Quién hace qué
**El dueño (Santiago Solis) no investiga, no busca agencias, no carga datos ni decide detalles.** Nunca se le pide que "busque", "pase" o "confirme" algo que la IA pueda averiguar sola.

**La IA, sin pedir ayuda:**
1. Decidir zona y criterios y anotarlos en `ESTADO.md`.
2. Investigar y elegir agencias (`web_search` + `web_fetch`; varias consultas distintas por agencia).
3. Recolectar datos públicos con **fuente (URL) y fecha**: nombre comercial, ciudad, provincia, dirección, Instagram, Facebook, teléfono/WhatsApp **institucional publicado por el negocio**, color de marca (de su logo o perfil) y coordenadas.
4. Armar `prospeccion/agencias.csv` y generar demos con `npm run demos` (`scripts/generar-demos.mjs`).
5. Revisar cada demo: compila, pasa `validate-dealership` y `audit-copy`, sin datos de otra agencia ni restos de plantilla.
6. Redactar `mensajes.md` y el único seguimiento permitido.
7. Mantener `ESTADO.md`, `CONTEXTO.md` y estos documentos.
8. Editar y mejorar las demos (UI, textos) y preparar el comando de despliegue para el dueño.

## Límites técnicos (no son reparto de trabajo)
| La IA no puede… | Entonces deja listo… | Y le pide al dueño… |
|---|---|---|
| Enviar WhatsApp/Instagram/mail | Texto exacto en `mensajes.md` | Pegar y enviar |
| Login en Cloudflare / crear cuentas | `npx wrangler login` | Aprobar el login |
| `push` / acceder a archivos locales | Comandos git exactos en PowerShell | Pegarlos |
| Ver respuestas de agencias | La plantilla de respuesta | Pegar la respuesta en el chat |
| Geocodificar direcciones | Coordenadas vía Waze/directorios con `web_search` | Nada |

**No se promete lo que la IA no puede ejecutar.** Si un paso depende de una cuenta o credencial que la sesión no tiene, se dice claro y se da el comando.

**Formato con el dueño:** comandos exactos para **PowerShell (Windows)**, un bloque por vez; scripts que abortan sin tocar nada si algo no coincide; verificación estricta tras desplegar (ver `CONTEXTO.md` §9).

## Reglas de investigación (obligatorias)
- **Fuentes:** solo información pública del propio negocio (Google Maps, sitio, Instagram, Facebook, Mercado Libre, directorios). **Sin fuente no se carga.**
- **Cero datos inventados.** Si tras varios intentos distintos no aparece, queda **vacío**, se anota en `ESTADO.md` y se sigue. No se adivina ni se deduce un Instagram, teléfono o dirección.
- **Personas:** sin datos personales de dueños, familiares o vendedores. Teléfono/WhatsApp solo si es del negocio. Columna `contacto` solo si el negocio lo muestra públicamente; si no, vacía y saludo genérico.
- **Fotos y stock reales:** no en demos de prospección (solo relleno).
- **Conflictos entre fuentes:** la más reciente y oficial (su propio perfil); anotar la discrepancia en `ESTADO.md`. No se pregunta al dueño.
- **Sin contacto previo:** nada se presenta como confirmado por la agencia.

### Qué sirve y qué no al buscar (aprendido)
| Funciona | No funciona |
|---|---|
| `web_search` modo `extended`: `automotores autos usados <ciudad> Entre Ríos venta de autos Facebook Instagram permutas financiación` → fichas de Facebook con dirección y teléfono | `web_fetch` en Facebook, Mercado Libre, Mapcarta (bloqueados); de Facebook solo sirven fragmentos de `web_search` |
| `<nombre> <ciudad> Entre Ríos concesionaria dirección guía teléfono <tel de su bio>` en `extended` → Waze, directorios, coordenadas | `<nombre> dirección calle teléfono` → ruido |
| `<nombre> <ciudad> instagram`, o directorios tipo findglocal | Aceptar un handle sin que la bio mencione ciudad/dirección (ej. `@autocamuy` es de Uruguay) |

Otras reglas aprendidas: fichas de zonaauto.com.ar son de feb-2024 (cargar con esa fecha y cotejar con Facebook); teléfono de formato fijo (3442 44xxxx) no se carga como WhatsApp; sin Instagram cargado, la plantilla enlaza a la portada de Instagram, así que conviene hallar el perfil real antes de enviar.

## Reglas del contacto con las agencias
- Mensajes **uno a uno**, nunca masivos ni automáticos, **siempre con línea de baja** ("si no te interesa, decime y no te molesto más").
- Aclarar que es una **demo con datos de ejemplo**; nunca hacerse pasar por el sitio oficial.
- Elementos de cada mensaje: saludo (genérico si no hay `contacto`), qué es (demo), link de la demo, aviso de datos de ejemplo/a confirmar, línea de baja, firma del dueño.
- **Un solo seguimiento** a los 5–7 días. Si dicen que no → `descartada`, no se vuelve a escribir.
- **El dueño envía; la IA solo prepara.** Cuando pega una respuesta, la IA redacta la contestación.

## Cómo elegir agencias
**Prioridad:** chicas o medianas, con stock visible en Instagram/Facebook/Mercado Libre y **sin sitio propio** (o con uno viejo / que no carga bien en el celular).
**Descartar:** concesionarias oficiales de marca con sitio corporativo, agencias sin presencia pública verificable, las sin dirección física confirmable.
La IA elige la zona (anotada en `ESTADO.md`), arma 10 principales y deja reservas.

## Flujo de cada sesión
1. Leer `CONTEXTO.md`, `CLAUDE.md`, este archivo y `prospeccion/ESTADO.md` (el dueño lo pega si la sesión no lo tiene).
2. Continuar desde "Próximo paso" sin preguntar.
3. Trabajar: investigar, completar CSV, generar/mejorar demos, revisarlas, redactar mensajes.
4. **Antes de terminar:** entregar `ESTADO.md` actualizado completo (tabla, bitácora, próximo paso) y actualizar la fecha de `CONTEXTO.md`.
5. Resumir al dueño: qué se hizo + el único gesto que le toca.

## Estados de una agencia
`candidata` → `datos completos` → `demo generada` → `mensaje listo` → `enviada` → `respondió` / `sin respuesta` / `descartada`. Aparte: `contactada por el dueño` (no tocar).

## Privacidad
El repo es **público** por decisión del dueño. Por eso `prospeccion/ESTADO.md`, `agencias.csv` y `mensajes.md` **nunca se suben a git** (están en `.gitignore`; verificar con `git ls-files prospeccion`, debe salir vacío; las versiones anteriores siguen en el historial público). Las demos publicadas llevan solo datos públicos del negocio y relleno, nunca datos personales ni fotos reales.