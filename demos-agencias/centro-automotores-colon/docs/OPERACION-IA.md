# Modelo de trabajo: la IA hace todo

**Leer esto primero, en cada sesión.** Las IA no tienen memoria entre sesiones: lo que no está escrito en este repo se pierde. La memoria del proyecto es este archivo, `CLAUDE.md` y `prospeccion/ESTADO.md`.

## Quién hace qué

**El dueño del proyecto no investiga, no busca agencias, no carga datos y no toma decisiones de detalle.** Pidió explícitamente que todo investigación, dato, selección y redacción lo haga la IA al 100%. Nunca se le pide que "busque", "pase" o "confirme" algo que la IA pueda averiguar sola.

**La IA hace, sin pedir ayuda:**

1. Decidir la zona y los criterios de prospección y anotarlos en `prospeccion/ESTADO.md`.
2. Investigar y elegir las agencias (`web_search` y `web_fetch`; varias búsquedas por agencia, con consultas distintas).
3. Recolectar los datos públicos de cada una, con fuente (URL) y fecha: nombre comercial, ciudad, provincia, dirección, Instagram, Facebook, teléfono o WhatsApp **institucional publicado por el propio negocio**, color de marca (sacado de su logo o perfil) y coordenadas (buscando la dirección en openstreetmap.org).
4. Armar `prospeccion/agencias.csv` y generar las demos con `npm run demos` (ver `scripts/generar-demos.mjs`).
5. Revisar cada demo: que compile, que pase `validate-dealership` y `audit-copy`, que no aparezcan datos de otra agencia ni restos de la plantilla.
6. Redactar los mensajes personalizados (`mensajes.md`) y el único seguimiento permitido.
7. Mantener actualizados `prospeccion/ESTADO.md` y estos documentos.

## Lo que la IA no puede hacer desde el chat (límites técnicos, no de reparto de trabajo)

- Enviar mensajes por WhatsApp, Instagram o mail desde las cuentas del dueño.
- Iniciar sesión en Cloudflare (`wrangler login` o token) ni crear cuentas.
- Hacer `push`, cambiar el repo a privado o subir archivos a GitHub sin credenciales en la sesión.
- Ver las respuestas de las agencias.

Para esos pasos la IA **deja todo listo**: el archivo, el texto exacto, el comando exacto de una línea. Le pide al dueño solo ese gesto físico (pegar, enviar, aprobar un login), sin investigación ni decisiones. Cuando el dueño pega una respuesta de una agencia, la IA redacta la contestación. No se promete lo que la IA no puede ejecutar: si un paso depende de una cuenta o credencial que la sesión no tiene, se dice claro y se indica el comando.

## Reglas de investigación (obligatorias)

- **Fuentes:** solo información pública del propio negocio (su Google Maps, sitio, Instagram, Facebook, perfil de Mercado Libre, directorios). Cada dato lleva su fuente; sin fuente no se carga.
- **Cero datos inventados** (regla 1 de `CLAUDE.md`). Si después de varios intentos distintos un dato no aparece, queda vacío en el CSV, se anota en `ESTADO.md` y se sigue con la agencia siguiente. No se adivina un Instagram, un teléfono ni una dirección, ni se deduce de otro dato.
- **Personas:** no se cargan datos personales de dueños, familiares ni vendedores. El WhatsApp o teléfono solo si es el del negocio. La columna `contacto` (nombre para el saludo) solo si el negocio lo muestra públicamente como contacto; si no, queda vacía y el mensaje sale con saludo genérico.
- **Fotos y stock reales:** no se usan en las demos de prospección. Las demos salen con imágenes de relleno (regla 6).
- **Conflictos entre fuentes:** se elige la fuente más reciente y oficial del negocio (su propio perfil) y se anota la discrepancia en `ESTADO.md`. No se le pregunta al dueño del proyecto.
- **Sin contacto previo:** mientras ninguna agencia haya respondido, los datos de las demos salen de fuentes públicas citadas. Nada se presenta como confirmado por la agencia.

## Reglas del contacto con las agencias

- Mensajes **uno a uno**, nunca masivos ni automáticos, y siempre con una línea de baja ("si no te interesa, decime y no te molesto más").
- Se aclara que es una **demo con datos de ejemplo**. Nunca se hace pasar por el sitio oficial de la agencia.
- **Un solo seguimiento** si no responden (a los 5 a 7 días). Si dicen que no, se marca como descartada y no se vuelve a escribir.
- El dueño del proyecto es quien envía; la IA solo prepara.

## Cómo elegir las agencias

Prioridad a agencias **chicas o medianas con stock visible en Instagram, Facebook o Mercado Libre y sin sitio propio** (o con uno viejo o que no carga bien en el celular). Se descartan concesionarias oficiales de marca con sitio corporativo, agencias sin presencia pública verificable y las que no tengan dirección física confirmable. La IA elige la zona (se anota en `ESTADO.md`), arma 10 agencias principales y deja candidatas de reserva.

## Flujo de cada sesión

1. Leer `CLAUDE.md`, este archivo y `prospeccion/ESTADO.md`.
2. Continuar desde "Próximo paso" sin preguntarle al dueño qué sigue.
3. Trabajar: investigar, completar `prospeccion/agencias.csv`, generar demos, revisarlas, redactar mensajes.
4. Antes de terminar: actualizar `ESTADO.md` (tabla, bitácora y próximo paso). Si no se anota, la próxima sesión no lo sabe.
5. Resumirle al dueño qué se hizo y cuál es el único gesto que le toca, si lo hay.

## Pedido de privacidad del repo

El repo debe ser **privado**: contiene la lista de agencias prospectadas y los textos de contacto. Si en una sesión se ve que es público, se avisa de inmediato.
