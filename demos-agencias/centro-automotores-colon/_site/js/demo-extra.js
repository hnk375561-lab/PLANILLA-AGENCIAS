/* demo-extra v2: avisos de demo. Sin dependencias, no toca las plantillas. */
(function () {
  'use strict';
  if (window.__demoExtra) return;
  window.__demoExtra = 'v2';

  var FONT = 'system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif';
  var PRICE = /(ARS|USD|US\$|U\$S|\$)\s*\d[\d.,]*/i;
  var IS_FICHA = /\/u\//.test(location.pathname);
  var WARN = '<svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false"><path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>';

  /* Paleta: ambar #f2a900, tinta #1b1405, papel #fff3cf, fondo oscuro #241800 */
  var css = [
    '.dx-skip,.dx-skip *{font-family:' + FONT + ' !important;box-sizing:border-box;text-transform:none;letter-spacing:normal}',
    '.dx-ico{display:inline-flex;flex:none;font-size:1.25em;line-height:1}',

    /* franja superior */
    '.dx-top{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;background:#f2a900;color:#1b1405;padding:8px 14px;font-size:14px;line-height:1.35;font-weight:500;text-align:center}',
    '.dx-top b{font-weight:800}',
    '.dx-link{appearance:none;border:0;background:none;color:inherit;font:inherit !important;font-weight:700;text-decoration:underline;text-underline-offset:3px;cursor:pointer;padding:2px 4px}',

    /* marca de agua */
    '.dx-marca{position:fixed;inset:0;pointer-events:none;z-index:2147482000;background-repeat:repeat}',

    /* barra inferior flotante */
    '.dx-bar{position:fixed;left:12px;right:92px;bottom:12px;z-index:2147482500;display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;background:#241800;color:#fff3cf;border:1.5px solid #f2a900;box-shadow:0 8px 28px rgba(0,0,0,.45);font-size:14px;line-height:1.4}',
    '.dx-bar .dx-ico{color:#f2a900;font-size:24px}',
    '.dx-bar-t{flex:1;min-width:0}',
    '.dx-bar-t b{color:#ffd35c;font-weight:800}',
    '.dx-bar button{flex:none;appearance:none;border:0;border-radius:8px;background:#f2a900;color:#1b1405;padding:9px 14px;font-size:13px;font-weight:800;cursor:pointer}',
    '.dx-bar button:hover{background:#ffc233}',
    '.dx-bar button:focus-visible,.dx-link:focus-visible,.dx-box button:focus-visible{outline:3px solid #fff;outline-offset:2px}',
    '@media (max-width:680px){.dx-bar{left:8px;right:76px;bottom:8px;padding:9px 10px;font-size:12.5px;gap:8px}.dx-long{display:none}.dx-bar button{padding:8px 10px;font-size:12px}}',

    /* pie */
    '.dx-pie{padding:22px 18px;background:#241800;color:#fff3cf;font-size:13.5px;line-height:1.6;text-align:center;border-top:3px solid #f2a900}',
    '.dx-pie b{color:#ffd35c;font-size:15px}',

    /* cartel sobre cada foto */
    '.dx-badge{position:absolute;z-index:6;display:inline-flex;align-items:center;gap:6px;max-width:calc(100% - 20px);padding:6px 10px 6px 8px;border-radius:7px;background:#241800;color:#fff3cf;border:1.5px solid #f2a900;box-shadow:0 2px 10px rgba(0,0,0,.55);font-size:12.5px;line-height:1;font-weight:700;white-space:nowrap;pointer-events:none}',
    '.dx-badge .dx-ico{color:#f2a900;font-size:15px}',
    '.dx-badge.dx-lg{font-size:15px;padding:9px 14px 9px 11px}',
    '.dx-badge.dx-lg .dx-ico{font-size:19px}',
    '.dx-p-tc{top:10px;left:50%;transform:translateX(-50%)}',
    '.dx-p-tr{top:10px;right:10px}',
    '.dx-p-br{bottom:10px;right:10px}',
    '.dx-p-bl{bottom:10px;left:10px}',

    /* franja dentro de cada tarjeta */
    '.dx-strip{display:flex;align-items:center;gap:8px;margin:10px 12px 12px;padding:9px 11px;border-radius:8px;background:#241800;border:1px solid #f2a900;color:#ffe9a8;font-size:12.5px;line-height:1.35;font-weight:600}',
    '.dx-strip .dx-ico{color:#f2a900;font-size:17px}',

    /* ficha abierta */
    '.dx-ficha{display:flex;flex:none;gap:12px;align-items:flex-start;margin:14px 0;padding:14px 16px;border-radius:10px;background:#fff3cf;color:#3a2800;border-left:6px solid #f2a900;font-size:14px;line-height:1.5;width:100%;grid-column:1/-1}',
    '.dx-ficha .dx-ico{color:#b97a00;font-size:26px;margin-top:1px}',
    '.dx-ficha b{display:block;font-size:16px;font-weight:800;color:#1b1405;margin-bottom:2px}',

    /* notas junto a horario, direccion, resenas */
    '.dx-nota{display:flex;flex:none;align-items:center;gap:8px;margin:8px 0;padding:8px 11px;border-radius:8px;background:#fff3cf;color:#3a2800;border:1px solid #f2a900;font-size:13px;line-height:1.4;font-weight:600;width:100%;max-width:100%;grid-column:1/-1}',
    '.dx-nota .dx-ico{color:#b97a00;font-size:17px}',

    /* telefono visible */
    '.dx-inline{display:inline-block;margin-left:8px;padding:2px 7px;border-radius:5px;background:#f2a900;color:#1b1405;font-size:11.5px;line-height:1.5;font-weight:800;vertical-align:middle;white-space:nowrap}',

    /* formularios */
    '.dx-form{display:flex;flex:none;gap:8px;align-items:center;margin:12px 0;padding:10px 12px;border-radius:8px;background:#fff3cf;color:#3a2800;border:1px dashed #b97a00;font-size:13px;line-height:1.4;font-weight:600;width:100%;grid-column:1/-1}',
    '.dx-form .dx-ico{color:#b97a00;font-size:17px}',

    /* ventana de aviso */
    '.dx-ov{position:fixed;inset:0;z-index:2147483600;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(10,8,2,.8);overflow:auto;animation:dxIn .35s ease both}',
    '.dx-box{width:100%;max-width:640px;max-height:calc(100vh - 32px);display:flex;flex-direction:column;background:#fffaf0;color:#2a1d00;border-radius:14px;overflow:hidden;box-shadow:0 24px 70px rgba(0,0,0,.6);font-size:15px;line-height:1.5;animation:dxUp .4s ease both}',
    '.dx-head{display:flex;gap:14px;align-items:center;padding:18px 22px;background:#241800;color:#fff3cf;border-bottom:4px solid #f2a900;flex:none}',
    '.dx-head .dx-ico{color:#f2a900;font-size:36px}',
    '.dx-head h2{margin:0;font-size:22px;line-height:1.2;font-weight:800;color:#fff}',
    '.dx-head p{margin:3px 0 0;font-size:14px;color:#f5deaa}',
    '.dx-body{padding:18px 22px 6px;overflow:auto}',
    '.dx-lead{margin:0 0 14px;color:#3a2c0b}',
    '.dx-grp{margin:0 0 10px;padding:12px 14px;border-radius:10px;background:#fff;border:1px solid #ecd9a3;border-left-width:6px}',
    '.dx-grp.a{border-left-color:#f2a900}',
    '.dx-grp.b{border-left-color:#d97706}',
    '.dx-grp.c{border-left-color:#b91c1c}',
    '.dx-grp h3{margin:0;font-size:15.5px;font-weight:800;color:#1b1405}',
    '.dx-grp .dx-sub{margin:1px 0 6px;font-size:13px;color:#6b5a2e}',
    '.dx-grp ul{margin:0;padding-left:18px;font-size:14px;color:#2a1d00}',
    '.dx-grp li{margin:2px 0}',
    '.dx-do{margin:14px 0 10px;padding:12px 14px;border-radius:10px;background:#241800;color:#fff3cf;font-size:14px}',
    '.dx-do b{color:#ffd35c}',
    '.dx-foot{padding:12px 22px 18px;flex:none}',
    '.dx-box button{display:block;width:100%;appearance:none;border:0;border-radius:9px;background:#f2a900;color:#1b1405;padding:14px 16px;font-size:16px;font-weight:800;cursor:pointer}',
    '.dx-box button:hover{background:#ffc233}',
    '@keyframes dxIn{from{opacity:0}to{opacity:1}}',
    '@keyframes dxUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}',
    '@media (prefers-reduced-motion:reduce){.dx-ov,.dx-box{animation:none}}',
    '@media (max-width:520px){.dx-head{padding:14px 16px}.dx-head h2{font-size:18px}.dx-body{padding:14px 16px 4px}.dx-foot{padding:10px 16px 16px}}'
  ].join('\n');

  var st = document.createElement('style');
  st.setAttribute('data-dx', '1');
  st.textContent = css;
  document.head.appendChild(st);

  var svg = "<svg xmlns='http://www.w3.org/2000/svg' width='560' height='340'><text x='280' y='185' text-anchor='middle' transform='rotate(-24 280 170)' font-family='Arial,Helvetica,sans-serif' font-size='30' font-weight='700' fill='rgba(150,150,150,0.13)'>Demo sin verificar</text></svg>";

  document.title = '[DEMO] ' + document.title.replace(/^\[DEMO\]\s*/, '');

  /* ---------- utilidades ---------- */
  function mk(tag, cls, html) {
    var e = document.createElement(tag);
    e.className = (cls ? cls + ' ' : '') + 'dx-skip';
    if (html) e.innerHTML = html;
    return e;
  }
  function ico() { return '<span class="dx-ico">' + WARN + '</span>'; }
  function visible(e) {
    if (!e || !e.getClientRects().length) return false;
    var cs = getComputedStyle(e);
    return cs.visibility !== 'hidden' && cs.display !== 'none' && +cs.opacity !== 0;
  }
  function isFixed(e) {
    for (var i = 0; i < 6 && e && e !== document.body; i++, e = e.parentElement) {
      if (getComputedStyle(e).position === 'fixed') return true;
    }
    return false;
  }
  function flowSafe(p) {
    var cs = getComputedStyle(p), d = cs.display;
    if (d === 'block' || d === 'flow-root' || d === 'grid' || d === 'inline-grid') return true;
    if (d === 'flex' || d === 'inline-flex') {
      return cs.flexDirection.indexOf('column') === 0 || cs.flexWrap !== 'nowrap';
    }
    return false;
  }
  /* sube hasta un bloque cuyo contenedor acepte un hermano a todo el ancho */
  function anchorAfter(el) {
    var a = el;
    for (var i = 0; i < 8 && a && a !== document.body; i++, a = a.parentElement) {
      var p = a.parentElement;
      if (!p) return null;
      if (/^(UL|OL|TABLE|TBODY|THEAD|TR|DL|SELECT|BUTTON|A)$/.test(p.tagName)) continue;
      var d = getComputedStyle(a).display;
      if (!/^(block|flex|grid|flow-root|list-item)$/.test(d)) continue;
      if (a.getBoundingClientRect().width < 160) continue;
      if (flowSafe(p)) return a;
    }
    return null;
  }

  /* ---------- estructura general ---------- */
  var bar, gap;
  function estructura() {
    if (!document.querySelector('.dx-top')) {
      document.body.insertBefore(
        mk('div', 'dx-top', ico() + '<span><b>Propuesta de demostración.</b> Contenido de ejemplo y datos pendientes de su confirmación.</span><button type="button" class="dx-link" data-dx-open>Ver detalle</button>'),
        document.body.firstChild);
    }
    if (!document.querySelector('.dx-marca')) {
      var m = mk('div', 'dx-marca');
      m.style.backgroundImage = 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
      document.body.appendChild(m);
    }
    if (!document.querySelector('.dx-pie')) {
      document.body.appendChild(mk('div', 'dx-pie',
        '<b>Propuesta de demostración para Centro Automotores Colón.</b><br>Los vehículos, precios, fotos y equipamiento son de ejemplo y se reemplazan por su stock real al publicar. El horario, el teléfono, el WhatsApp, la dirección y las reseñas los tomé de fuentes públicas y quedan a su confirmación.'));
    }
    if (!document.querySelector('.dx-bar')) {
      bar = mk('div', 'dx-bar',
        ico() + '<span class="dx-bar-t"><b>Propuesta de demostración.</b><span class="dx-long"> Autos, precios y fotos son de ejemplo. Horario, teléfono, WhatsApp, dirección y reseñas quedan a su confirmación.</span></span><button type="button" data-dx-open>Ver qué revisar</button>');
      bar.setAttribute('role', 'note');
      document.body.appendChild(bar);
    }
    if (!document.querySelector('.dx-gap')) {
      gap = mk('div', 'dx-gap');
      document.body.appendChild(gap);
    }
    bar = document.querySelector('.dx-bar');
    gap = document.querySelector('.dx-gap');
    if (bar && gap) gap.style.height = (bar.offsetHeight + 24) + 'px';
  }

  /* oculta la barra vieja del script anterior (demo-aviso.js), que queda tapada por esta */
  function ocultarViejo() {
    var k = document.body.children;
    for (var i = 0; i < k.length; i++) {
      var e = k[i];
      if (/^(SCRIPT|STYLE|NOSCRIPT)$/.test(e.tagName) || e.classList.contains('dx-skip') || e.getAttribute('data-dx-old')) continue;
      var t = (e.textContent || '').replace(/\s+/g, ' ');
      if (t.length < 400 && /versi[oó]n de demostraci[oó]n/i.test(t)) {
        var pos = getComputedStyle(e).position;
        if (pos === 'fixed' || pos === 'sticky') {
          e.setAttribute('data-dx-old', '1');
          e.style.setProperty('display', 'none', 'important');
        }
      }
    }
  }

  /* ---------- ventana de detalle ---------- */
  function abrirInfo() {
    if (document.querySelector('.dx-ov')) return;
    var ov = mk('div', 'dx-ov');
    var b = mk('div', 'dx-box',
      '<div class="dx-head">' + ico() + '<div><h2>Propuesta de demostración</h2><p>Versión preliminar preparada para Centro Automotores Colón.</p></div></div>' +
      '<div class="dx-body">' +
      '<p class="dx-lead">Armé esta página para que vea cómo puede presentarse su agencia en internet. Es una versión de trabajo: parte del contenido es de ejemplo y parte lo tomé de fuentes públicas. Esto es lo que debe revisar:</p>' +
      '<div class="dx-grp a"><h3>Contenido de ejemplo</h3><p class="dx-sub">Se reemplaza por su stock real al publicar.</p><ul>' +
      '<li>Vehículos y unidades publicadas</li><li>Fotos</li><li>Precios y monedas</li><li>Año, kilometraje, color y equipamiento</li><li>Disponibilidad</li></ul></div>' +
      '<div class="dx-grp b"><h3>Datos a confirmar por usted</h3><p class="dx-sub">Los obtuve de fuentes públicas. Revíselos y dígame qué corregir.</p><ul>' +
      '<li>Horario de atención</li><li>Teléfono y WhatsApp</li><li>Dirección y mapa</li><li>Reseñas y puntaje</li></ul></div>' +
      '<div class="dx-grp c"><h3>Funciones de demostración</h3><p class="dx-sub">Todavía no están conectadas a su agencia.</p><ul>' +
      '<li>Formularios de consulta, visita, financiación y tasación: en esta versión no le llegan. Al publicar, los conecto a su WhatsApp y correo.</li><li>Condiciones de financiación y valuación de usados: son ilustrativas y las ajusto a sus condiciones reales.</li></ul></div>' +
      '<div class="dx-do">' +
      '<b>Próximo paso: lo que necesito de usted para publicar</b>' +
      '<div style="margin-top:8px">Estimado/a titular de Centro Automotores Colón: para entregarle un sitio 100 % funcional, con información exacta y listo para publicar, necesito que me haga llegar el material que detallo a continuación. Con él, reemplazo todo el contenido de ejemplo por datos reales y verificados.</div>' +
      '<div style="margin-top:8px"><b>Importante:</b> todo lo que solicito es para lograr una publicación óptima y profesional, pero nada es excluyente. Si no cuenta con alguno de los datos, no pasa absolutamente nada: publico con lo que haya y lo completamos más adelante, cuando usted quiera.</div>' +
      '<div style="margin-top:12px"><b>1. Stock de vehículos</b> (una ficha por unidad)<ul style="margin:6px 0 0;padding-left:20px"><li>Marca, modelo, versión y año.</li><li>Kilometraje (0 km o usado), color, combustible, transmisión y motorización.</li><li>Equipamiento y estado general, con las observaciones que correspondan (service al día, único dueño, detalles a informar).</li><li>Precio final y moneda (pesos o dólares), y si la unidad es financiable o acepta permuta.</li><li>Situación documental que desee informar.</li><li>Fotos propias: lo ideal son 8 por unidad, horizontales y con buena luz (frente, laterales, parte trasera, interior, tablero con kilometraje, motor y baúl).</li><li>Disponibilidad actual y qué unidades quiere destacar en la portada.</li></ul><div style="margin-top:6px;font-style:italic">Aclaración: 8 fotos es lo recomendable, no un requisito. Si de una unidad tiene 2, 4 o 6, se sube igual y se ve bien; lo mismo si le faltan datos de la ficha. Puede enviarlo en una planilla (Excel o Google Sheets) o en una lista ordenada; yo lo estructuro.</div><div style="margin-top:6px"><b>Puedo encargarme yo (opcional):</b> la carga inicial de todo el stock, la redacción de las descripciones y la edición y mejora de las fotos que usted ya tenga.</div></div>' +
      '<div style="margin-top:12px"><b>2. Datos oficiales de la agencia</b><ul style="margin:6px 0 0;padding-left:20px"><li>Razón social, nombre comercial y datos fiscales o legales que deban figurar.</li><li>Dirección exacta y un punto de referencia para el mapa.</li><li>Horario de atención por día, incluyendo sábados, feriados y horarios especiales.</li><li>Teléfono, WhatsApp y correo electrónico que desea publicar.</li><li>Redes sociales y enlaces oficiales.</li><li>Logotipo en la mejor calidad disponible (idealmente vectorial o PNG grande) y colores de marca.</li></ul><div style="margin-top:6px;font-style:italic">Aclaración: si algún dato todavía no está definido, lo dejo oculto y se agrega cuando usted lo decida. Si solo cuenta con un logo de baja calidad, puedo reconstruirlo o mejorarlo (servicio opcional).</div></div>' +
      '<div style="margin-top:12px"><b>3. Recepción de consultas</b><ul style="margin:6px 0 0;padding-left:20px"><li>WhatsApp y correo donde recibirá las consultas, pedidos de visita, solicitudes de financiación y tasaciones.</li><li>Persona o personas que las atenderán y el tiempo de respuesta que puede cumplir.</li><li>Una vez conectados los formularios, haré envíos de prueba con usted para confirmar que llegan.</li></ul><div style="margin-top:6px"><b>Puedo encargarme yo (opcional):</b> configurar mensajes automáticos de respuesta, ordenar las consultas recibidas y enviarle un resumen mensual de cuántas llegaron y por qué unidades.</div></div>' +
      '<div style="margin-top:12px"><b>4. Financiación y tasación de usados</b><ul style="margin:6px 0 0;padding-left:20px"><li>Condiciones reales: entidades, entrega mínima, plazos y cuotas. Si prefiere no publicar cifras, indíquemelo y dejo “Consulte financiación”.</li><li>Criterio con el que recibe y valúa usados en parte de pago.</li></ul><div style="margin-top:6px;font-style:italic">Aclaración: sin estos datos quito los cálculos ilustrativos para no publicar valores que luego no pueda cumplir. No es obligatorio ofrecer financiación en el sitio.</div><div style="margin-top:6px"><b>Puedo encargarme yo (opcional):</b> actualizar las condiciones y cuotas cada vez que cambien.</div></div>' +
      '<div style="margin-top:12px"><b>5. Visitas</b><ul style="margin:6px 0 0;padding-left:20px"><li>Días y horarios disponibles, cupo por franja y si cada visita requiere su confirmación previa.</li></ul><div style="margin-top:6px"><b>Puedo encargarme yo (opcional):</b> administrar la agenda de visitas y avisarle de cada turno solicitado.</div></div>' +
      '<div style="margin-top:12px"><b>6. Presentación y reseñas</b><ul style="margin:6px 0 0;padding-left:20px"><li>Historia de la agencia, años de trayectoria y el texto con el que desea presentarse.</li><li>Su autorización para mostrar las reseñas públicas, o las que prefiera incluir.</li></ul><div style="margin-top:6px;font-style:italic">Aclaración: si no tiene un texto armado, lo redacto yo a partir de la información pública y se lo presento para su aprobación.</div><div style="margin-top:6px"><b>Puedo encargarme yo (opcional):</b> optimizar y mantener su ficha de Google (horarios, fotos, publicaciones) para que la agencia aparezca mejor en las búsquedas.</div></div>' +
      '<div style="margin-top:12px"><b>7. Aspectos legales</b><ul style="margin:6px 0 0;padding-left:20px"><li>Responsable y correo de contacto para la política de privacidad.</li><li>Leyendas que su actividad exija, como la vigencia de los precios y las condiciones de venta. Si lo desea, consúltelas con su contador o asesor.</li></ul></div>' +
      '<div style="margin-top:12px"><b>8. Publicación y mantenimiento</b><ul style="margin:6px 0 0;padding-left:20px"><li>Si ya posee un dominio propio (por ejemplo, nombre.com.ar) o prefiere que lo gestione yo.</li><li>Quién se encargará de subir y dar de baja las unidades en adelante (altas, bajas, cambios de precio y de fotos), y con qué frecuencia.</li></ul><div style="margin-top:6px;font-style:italic">Aclaración: un sitio de venta de vehículos solo rinde si su stock está siempre al día. Si ya cuenta con una persona o un equipo que lo hará, perfecto: le dejo todo explicado y documentado. Si prefiere no ocuparse, puedo hacerlo yo (ver el punto siguiente).</div></div>' +
      '<div style="margin-top:12px"><b>9. Servicios mensuales que puedo asumir por usted (todos opcionales)</b><div style="margin-top:6px">Estoy 100 % dispuesto a encargarme de lo que usted prefiera delegar, sea simple o exigente, mediante un abono mensual a convenir. Puede contratar un solo servicio o varios, y puede sumar o quitar según su necesidad:</div><ul style="margin:6px 0 0;padding-left:20px"><li><b>Gestión de stock:</b> alta y baja de unidades, cambios de precio, edición de datos y fotos, y destacados de portada.</li><li><b>Contenido:</b> redacción de descripciones, edición y mejora de fotos, y banners de promociones u ofertas del mes.</li><li><b>Atención del sitio:</b> mensajes automáticos, revisión de que los formularios lleguen y resumen mensual de consultas.</li><li><b>Visitas y financiación:</b> agenda de turnos y actualización de cuotas y condiciones.</li><li><b>Presencia en Google:</b> ficha de empresa, horarios, fotos y publicaciones.</li><li><b>Soporte técnico:</b> dominio, alojamiento, certificado de seguridad, correo con su dominio, copias de seguridad y resolución de cualquier falla.</li><li><b>Cambios y mejoras:</b> modificaciones de diseño, secciones nuevas o funciones adicionales, cotizadas por trabajo.</li><li><b>Informe mensual:</b> visitas al sitio, unidades más consultadas y recomendaciones.</li></ul><div style="margin-top:6px">Cada servicio puede cotizarse por separado o integrarse en un único abono mensual. Le preparo una propuesta clara, con el valor de cada ítem, sin compromiso.</div></div>' +
      '<div style="margin-top:14px"><b>Cómo continuamos:</b> puede enviarme todo por el mismo medio por el que recibió esta propuesta, en el formato que le resulte más cómodo (planilla, fotos, texto o mensajes de voz); yo lo ordeno. Puede hacerlo por partes: lo más útil para empezar es el stock y los datos de contacto. Con el material recibido, cargo el contenido real, conecto y pruebo cada formulario, y le presento la versión final para que la revise y la apruebe antes de publicarla. Nada de lo anterior es obligatorio: usted decide qué hacer por su cuenta y qué delegarme.</div>' +
      '</div>' +
      '</div>');
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-modal', 'true');
    b.setAttribute('aria-label', 'Propuesta de demostración');
    var foot = document.createElement('div');
    foot.className = 'dx-foot';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Ver la demo';
    function cerrar() {
      try { sessionStorage.setItem('dx-ok', '1'); } catch (e) {}
      ov.remove();
      document.removeEventListener('keydown', esc, true);
    }
    function esc(ev) { if (ev.key === 'Escape') cerrar(); }
    btn.onclick = cerrar;
    ov.addEventListener('click', function (ev) { if (ev.target === ov) cerrar(); });
    document.addEventListener('keydown', esc, true);
    foot.appendChild(btn);
    b.appendChild(foot);
    ov.appendChild(b);
    document.body.appendChild(ov);
    btn.focus();
  }
  document.addEventListener('click', function (ev) {
    if (ev.target.closest && ev.target.closest('[data-dx-open]')) abrirInfo();
  });
  /* "Ver stock" y similares: en la misma pagina, ir directo a #unidades sin recargar ni repetir la animacion de entrada */
  document.addEventListener('click', function (ev) {
    if (ev.defaultPrevented || ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
    var a = ev.target.closest && ev.target.closest('a');
    if (!a || a.closest('.dx-skip')) return;
    var href = a.getAttribute('href') || '';
    var txt = (a.textContent || '').toLowerCase();
    if (!(/#unidades$/.test(href) || /ver (el )?stock|ver unidades|ver autos|ver veh[ií]culos/.test(txt))) return;
    var dest = document.getElementById('unidades');
    if (!dest) return;
    var u;
    try { u = new URL(a.href, location.href); } catch (e) { return; }
    var limpio = function (p) { return p.replace(/index\.html$/, '').replace(/\/$/, ''); };
    if (u.origin !== location.origin || limpio(u.pathname) !== limpio(location.pathname)) return;
    ev.preventDefault();
    ev.stopImmediatePropagation();
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    dest.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    try { history.replaceState(null, '', '#unidades'); } catch (e) {}
  }, true);
  function inicio() {
    try { if (sessionStorage.getItem('dx-ok')) return; } catch (e) {}
    abrirInfo();
  }

  /* ---------- cartel sobre las fotos ---------- */
  function inUnit(img) {
    if (IS_FICHA) return true;
    if (img.closest('dialog,[role="dialog"],[aria-modal="true"],[class*="modal"],[class*="lightbox"],[class*="visor"]')) return true;
    var c = img.parentElement;
    for (var k = 0; k < 7 && c && c !== document.body; k++, c = c.parentElement) {
      var t = c.textContent || '';
      if (t.length > 1800) break;
      if (PRICE.test(t)) return true;
    }
    return false;
  }
  function frameOf(img) {
    var r = img.getBoundingClientRect(), best = null, a = img;
    for (var i = 0; i < 4; i++) {
      var p = a.parentElement;
      if (!p || p === document.body) break;
      var pr = p.getBoundingClientRect();
      if (Math.abs(pr.width - r.width) <= 8 && Math.abs(pr.height - r.height) <= 8) best = p; else break;
      a = p;
    }
    var host = best || img.parentElement;
    if (host && host.tagName === 'PICTURE') host = host.parentElement;
    return host;
  }
  function overlaps(a, b) {
    return !(a.right <= b.left + 2 || a.left >= b.right - 2 || a.bottom <= b.top + 2 || a.top >= b.bottom - 2);
  }
  /* prueba cuatro esquinas y se queda con la primera que no tapa nada */
  function place(badge, host, img) {
    var hr = host.getBoundingClientRect(), area = hr.width * hr.height, others = [];
    var all = host.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      var e = all[i];
      if (e === badge || e === img || e.contains(img) || e.contains(badge) || badge.contains(e)) continue;
      var r = e.getBoundingClientRect();
      if (r.width < 4 || r.height < 4 || r.width * r.height > area * 0.6) continue;
      var hasText = e.children.length === 0 && (e.textContent || '').trim().length > 0;
      if (hasText || /^(IMG|SVG|CANVAS|VIDEO|BUTTON|A)$/i.test(e.tagName)) others.push(r);
    }
    var pos = ['dx-p-tc', 'dx-p-tr', 'dx-p-br', 'dx-p-bl'];
    for (var p = 0; p < pos.length; p++) {
      badge.classList.remove('dx-p-tc', 'dx-p-tr', 'dx-p-br', 'dx-p-bl');
      badge.classList.add(pos[p]);
      var br = badge.getBoundingClientRect(), libre = true;
      for (var j = 0; j < others.length; j++) if (overlaps(br, others[j])) { libre = false; break; }
      if (libre) return;
    }
    badge.classList.remove('dx-p-tr', 'dx-p-br', 'dx-p-bl');
    badge.classList.add('dx-p-tc');
  }
  function esCarta(img) {
    var c = img, i;
    for (i = 0; i < 9 && c && c !== document.body; i++, c = c.parentElement) {
      if (c.tagName === 'LI' || c.tagName === 'ARTICLE') break;
    }
    if (!c || (c.tagName !== 'LI' && c.tagName !== 'ARTICLE')) return null;
    var w = c.getBoundingClientRect().width;
    var enLista = c.closest('#cars,.cars') || (c.parentElement && c.parentElement.children.length >= 3 && w >= 180 && w <= 480);
    if (!enLista || !PRICE.test(c.textContent || '')) return null;
    return c;
  }
  function badges() {
    var imgs = document.querySelectorAll('img');
    for (var i = 0; i < imgs.length; i++) {
      var im = imgs[i];
      if (im.getAttribute('data-dx-b') || im.closest('header,nav,footer,.dx-skip')) continue;
      var r = im.getBoundingClientRect();
      if (r.width < 140 || r.height < 90 || !visible(im)) continue;
      if (!inUnit(im)) continue;
      var host = frameOf(im);
      if (!host || host.querySelector(':scope > .dx-badge')) { im.setAttribute('data-dx-b', '1'); continue; }
      im.setAttribute('data-dx-b', '1');
      if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
      var big = r.width >= 560;
      var small = r.width < 220;
      var badge = mk('span', 'dx-badge' + (big ? ' dx-lg' : ''), ico() + (small ? 'Ejemplo' : 'Ejemplo, sin verificar'));
      host.appendChild(badge);
      place(badge, host, im);

      var card = esCarta(im);
      if (card && !card.querySelector('.dx-strip')) {
        card.appendChild(mk('div', 'dx-strip', ico() + '<span>Unidad de ejemplo: foto, precio y datos sin verificar.</span>'));
      }
    }
  }

  /* ---------- aviso en cada ficha ---------- */
  function fichaEl() {
    return mk('div', 'dx-ficha', ico() +
      '<div><b>Ficha de ejemplo, datos sin verificar</b>La foto, el precio, el año, el kilometraje, el equipamiento y la disponibilidad son de muestra. No es una oferta, una reserva ni stock real.</div>');
  }
  function ponerFicha(root) {
    var h = root.querySelector('h1,h2,h3');
    var a = h ? anchorAfter(h) : null;
    var n = fichaEl();
    if (a) a.insertAdjacentElement('afterend', n);
    else root.insertBefore(n, root.firstChild);
  }
  function fichas() {
    if (IS_FICHA && !document.querySelector('.dx-ficha')) {
      var main = document.querySelector('main') || document.body;
      ponerFicha(main);
    }
    var sel = 'dialog[open],[role="dialog"],[aria-modal="true"],[class*="modal"],[class*="lightbox"],[class*="visor"],[class*="drawer"],[class*="ficha"],[class*="detalle"],[class*="overlay"]';
    var ds = document.querySelectorAll(sel);
    for (var i = 0; i < ds.length; i++) {
      var d = ds[i];
      if (d.closest('.dx-skip') || d.querySelector('.dx-ficha') || d.querySelector('#cars') || d.contains(document.querySelector('main'))) continue;
      if (d.parentElement && d.parentElement.closest('[data-dx-m]')) continue;
      var r = d.getBoundingClientRect();
      if (r.width < 300 || r.height < 260 || !visible(d)) continue;
      var t = d.textContent || '';
      if (t.length > 5000 || !PRICE.test(t)) continue;
      if (!(d.matches('dialog,[role="dialog"],[aria-modal="true"]') || isFixed(d))) continue;
      d.setAttribute('data-dx-m', '1');
      ponerFicha(d);
    }
  }

  /* ---------- telefono y whatsapp ---------- */
  function contacto() {
    var ls = document.querySelectorAll('a[href^="tel:"],a[href*="wa.me"],a[href*="whatsapp"]');
    for (var i = 0; i < ls.length; i++) {
      var a = ls[i];
      if (a.getAttribute('data-dx-c') || a.closest('.dx-skip')) continue;
      a.setAttribute('data-dx-c', '1');
      a.title = 'Dato sin confirmar con la agencia';
      var txt = (a.textContent || '').trim();
      /* solo etiqueta si el enlace muestra el numero escrito; los botones no se tocan */
      if (/\d[\d\s\-().]{5,}\d/.test(txt) && txt.length < 30 && getComputedStyle(a).position !== 'fixed') {
        a.insertAdjacentElement('afterend', mk('span', 'dx-inline', 'sin confirmar'));
      }
    }
  }

  /* ---------- formularios ---------- */
  function forms() {
    var fs = document.querySelectorAll('form');
    for (var i = 0; i < fs.length; i++) {
      var f = fs[i];
      if (f.getAttribute('data-dx-f') || f.closest('.dx-skip')) continue;
      f.setAttribute('data-dx-f', '1');
      var n = mk('div', 'dx-form', ico() + '<span>Formulario de demostración: no lo uses para consultas reales. No está verificado que llegue a la agencia.</span>');
      var cs = getComputedStyle(f);
      if ((cs.display === 'flex' || cs.display === 'inline-flex') && cs.flexDirection.indexOf('column') !== 0 && cs.flexWrap === 'nowrap') {
        var a = anchorAfter(f);
        if (a) a.insertAdjacentElement('afterend', n);
      } else {
        f.appendChild(n);
      }
    }
  }

  /* ---------- notas junto a horario, direccion y resenas ---------- */
  var NOTAS = [
    { k: 'h', max: 110, re: /\d{1,2}(:\d{2})?\s*[–—-]\s*\d{1,2}:\d{2}|\bL\s?[-–]\s?V\b|lunes a viernes/i,
      txt: 'Horario sin confirmar con la agencia. Puede cambiar: consultá antes de ir.' },
    { k: 'd', max: 90, re: /(\bAv\.?|Avenida|Calle|Bv\.?|Bulevar|Ruta)\s+\S+.*\d{2,4}|[A-ZÁÉÍÓÚÑ][\wáéíóúñ.]+(\s+[A-ZÁÉÍÓÚÑ][\wáéíóúñ.]+){0,3}\s+\d{1,5}\b.*(Concepci[oó]n|Uruguay|Entre R[ií]os)|^\s*(direcci[oó]n|ubicaci[oó]n)\s*:?\s*$/i,
      txt: 'Dirección sin confirmar con la agencia. Verificala antes de ir.' },
    { k: 'r', max: 70, re: /rese[ñn]as?|opiniones|★|\b\d[.,]\d\s*(\/\s*5|estrellas)/i,
      txt: 'Reseñas y puntaje de fuentes públicas, sin verificar con la agencia.' }
  ];
  var cuenta = { h: 0, d: 0, r: 0 };
  var ultimaNota = 0;
  function notas() {
    var ahora = Date.now();
    if (ahora - ultimaNota < 1500) return;
    ultimaNota = ahora;
    var els = document.body.querySelectorAll('p,li,span,div,a,small,strong,b,h2,h3,h4,dd,dt,td,address,time,label');
    for (var i = 0; i < els.length; i++) {
      var e = els[i];
      if (e.children.length || e.getAttribute('data-dx-s')) continue;
      var s = (e.textContent || '').trim();
      if (s.length < 3 || s.length > 110) continue;
      for (var n = 0; n < NOTAS.length; n++) {
        var N = NOTAS[n];
        if (cuenta[N.k] >= 2 || s.length > N.max || !N.re.test(s)) continue;
        if (e.closest('.dx-skip,header,nav,dialog,[role="dialog"]')) continue;
        e.setAttribute('data-dx-s', '1');
        var a = anchorAfter(e);
        if (!a || a.getAttribute('data-dx-n') || (a.nextElementSibling && a.nextElementSibling.classList.contains('dx-nota'))) continue;
        a.setAttribute('data-dx-n', '1');
        a.insertAdjacentElement('afterend', mk('div', 'dx-nota', ico() + '<span>' + N.txt + '</span>'));
        cuenta[N.k]++;
        break;
      }
    }
  }

  /* ---------- ciclo ---------- */
  function run() {
    if (!document.body) return;
    try {
      estructura();
      ocultarViejo();
      badges();
      fichas();
      contacto();
      forms();
      notas();
    } catch (err) {
      if (window.console) console.warn('demo-extra:', err);
    }
  }
  var tm;
  function pronto() { clearTimeout(tm); tm = setTimeout(run, 250); }

  /* espera a que termine la animacion de entrada del sitio antes de mostrar nada */
  var INTRO = /preload|prelude|loader|splash|curtain|cortina|entrada|intro-?(screen|overlay|anim)/i;
  function introActiva() {
    var vw = innerWidth, vh = innerHeight;
    var els = document.body.querySelectorAll(':scope > *, :scope > * > *');
    for (var i = 0; i < els.length; i++) {
      var e = els[i];
      if (e.classList.contains('dx-skip')) continue;
      var sig = (e.id || '') + ' ' + (typeof e.className === 'string' ? e.className : '');
      if (!INTRO.test(sig)) continue;
      var cs = getComputedStyle(e);
      if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity < 0.05) continue;
      var r = e.getBoundingClientRect();
      if (r.width >= vw * 0.5 && r.height >= vh * 0.5 && (cs.position === 'fixed' || cs.position === 'absolute')) return true;
    }
    return false;
  }
  function animando() {
    if (!document.getAnimations) return false;
    var as = document.getAnimations();
    for (var i = 0; i < as.length; i++) {
      var a = as[i];
      if (a.playState !== 'running') continue;
      try {
        var t = a.effect && a.effect.getComputedTiming();
        if (t && isFinite(t.endTime) && t.endTime > 0) return true;
      } catch (e) {}
    }
    return false;
  }
  function esperarEntrada(cb) {
    var t0 = Date.now(), calmos = 0, hecho = false;
    var cargado = document.readyState === 'complete';
    var tLoad = cargado ? Date.now() : 0;
    window.addEventListener('load', function () { cargado = true; tLoad = Date.now(); });
    var iv = setInterval(function () {
      if (hecho) return;
      var ahora = Date.now();
      var calmo = cargado && !introActiva() && !animando();
      calmos = calmo ? calmos + 1 : 0;
      if ((calmos >= 4 && ahora - tLoad > 1500) || ahora - t0 > 9000) {
        hecho = true;
        clearInterval(iv);
        cb();
      }
    }, 200);
  }

  function arrancar() {
    run();
    inicio();
    new MutationObserver(pronto).observe(document.body, { childList: true, subtree: true });
    window.addEventListener('resize', pronto);
    window.addEventListener('scroll', pronto, { passive: true });
    setInterval(function () { if (!document.hidden) run(); }, 1500);
  }
  function start() { esperarEntrada(arrancar); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
