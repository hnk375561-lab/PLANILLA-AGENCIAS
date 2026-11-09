/* Demo · js/pulido.js
   1) «Abierto ahora / Cerrado ahora» en el header (lee window.drEstado de horarios.js).
   2) JSON-LD Vehicle por unidad (desde js/units.min.json; precios y datos de EJEMPLO, demo noindex).
   3) Skeletons: fotos de tarjetas y mapa mientras cargan.
   4) «Tu usado» en 3 pasos (Atrás / Siguiente) sobre el formulario existente. Sin JS: se ve todo junto.
   5) Enlaces internos (#...) nunca abren pestaña nueva.
   Sin red salvo units.min.json propio. Sin cookies. */
(function () {
  'use strict';
  var d = document;
  function $(s, r) { return (r || d).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); }

  /* 5) anclas internas sin target=_blank */
  $$('a[href^="#"][target="_blank"]').forEach(function (a) {
    a.removeAttribute('target'); a.removeAttribute('rel');
  });

  /* 1) Abierto ahora en el header */
  (function () {
    var hc = $('.site-header .hc');
    if (!hc || typeof window.drEstado !== 'function') return;
    var a = d.createElement('a');
    a.className = 'dx-open'; a.href = '#horarios';
    a.innerHTML = '<i class="dx-dot" aria-hidden="true"></i><span class="dx-open-t"></span>';
    hc.insertBefore(a, hc.firstChild);
    var t = $('.dx-open-t', a);
    function pintar() {
      var e; try { e = window.drEstado(); } catch (x) { return; }
      if (!e) return;
      a.classList.toggle('is-open', !!e.abierto);
      a.classList.toggle('is-closed', !e.abierto);
      t.textContent = e.titulo;
      a.title = e.txt || e.titulo;
      a.setAttribute('aria-label', (e.txt || e.titulo) + '. Ver horarios');
    }
    pintar();
    setInterval(pintar, 30000);
  })();

  /* 2) JSON-LD Vehicle */
  (function () {
    var ctx = {};
    try { ctx = JSON.parse(($('#cat-ctx') || {}).textContent || '{}'); } catch (e) {}
    var base = location.origin + location.pathname.replace(/[^\/]*$/, '');
    function abs(p) { return p ? base + String(p).replace(/^\.?\//, '').replace(/\?.*$/, '') : undefined; }
    fetch('js/units.min.json', { credentials: 'omit' }).then(function (r) { return r.ok ? r.json() : []; }).then(function (u) {
      if (!u || !u.length || $('script[data-vehicle-ld]')) return;
      var g = u.filter(function (x) { return !x.vendida; }).map(function (x) {
        var o = {
          '@type': 'Vehicle',
          name: x.titulo,
          brand: { '@type': 'Brand', name: x.marca },
          model: x.modelo,
          vehicleModelDate: String(x.anio),
          itemCondition: 'https://schema.org/UsedCondition',
          mileageFromOdometer: { '@type': 'QuantitativeValue', value: x.km, unitCode: 'KMT' }
        };
        if (x.version) o.vehicleConfiguration = x.version;
        if (x.combustible) o.fuelType = x.combustible;
        if (x.transmision) o.vehicleTransmission = x.transmision;
        if (x.color) o.color = x.color;
        if (x.carroceria) o.bodyType = x.carroceria;
        if (x.media && x.media[0] && x.media[0].src) o.image = abs(x.media[0].src);
        if (x.precio && x.precio.monto) {
          o.offers = {
            '@type': 'Offer', price: x.precio.monto, priceCurrency: x.precio.moneda,
            priceValidUntil: undefined,
            availability: 'https://schema.org/InStock',
            seller: { '@type': 'AutoDealer', name: ctx.nombre }
          };
          delete o.offers.priceValidUntil;
        }
        o.description = 'Unidad de ejemplo de la demo: datos y precio a confirmar por la agencia.';
        return o;
      });
      var s = d.createElement('script');
      s.type = 'application/ld+json'; s.setAttribute('data-vehicle-ld', '');
      s.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': g });
      d.head.appendChild(s);
    }).catch(function () {});
  })();

  /* 3) Skeletons */
  (function () {
    $$('.car-ph').forEach(function (f) {
      var im = $('img', f);
      if (!im || im.complete) return;
      f.classList.add('dx-sk');
      function listo() { f.classList.remove('dx-sk'); }
      im.addEventListener('load', listo, { once: true });
      im.addEventListener('error', listo, { once: true });
    });
    var m = $('#mapa');
    if (m) {
      m.classList.add('dx-sk-map');
      var fin = function () { m.classList.remove('dx-sk-map'); };
      if ($('.leaflet-container', m)) { fin(); }
      else {
        var mo = new MutationObserver(function () { if ($('.leaflet-container', m)) { fin(); mo.disconnect(); } });
        mo.observe(m, { childList: true, subtree: true });
        setTimeout(fin, 15000);
      }
    }
  })();

  /* 4) Tu usado en pasos */
  (function () {
    var sec = $('#tu-usado'); if (!sec) return;
    var form = $('form.cv-form', sec), grid = form && $('.cv-grid', form);
    if (!grid) return;
    var campo = function (id) { var e = $('#' + id, grid); return e ? e.closest('.cv-f') : null; };
    var pasos = [
      { t: 'Tu usado', ids: ['u-mm', 'u-an', 'u-km', 'u-co', 'u-tr'] },
      { t: 'Cómo está', ids: ['u-es', 'u-in'] },
      { t: 'Para cerrar', ids: ['u-un', 'u-no'] }
    ].map(function (p) { p.el = p.ids.map(campo).filter(Boolean); return p; });
    if (pasos.some(function (p) { return !p.el.length; })) return;
    var resto = [$('[data-burbuja]', form)].filter(Boolean);
    var n = 0;

    var nav = d.createElement('div'); nav.className = 'dx-steps';
    nav.innerHTML = '<ol class="dx-st-l" aria-label="Pasos">' + pasos.map(function (p, i) {
      return '<li data-i="' + i + '"><span>' + (i + 1) + '</span>' + p.t + '</li>';
    }).join('') + '</ol><div class="dx-st-b"><button type="button" class="cv-btn cv-btn--g dx-back">Atrás</button>' +
      '<button type="button" class="cv-btn cv-btn--g cv-btn--main dx-next">Siguiente</button></div>' +
      '<p class="dx-st-e" role="alert" hidden></p>';
    grid.parentNode.insertBefore(nav, grid);
    var back = $('.dx-back', nav), next = $('.dx-next', nav), err = $('.dx-st-e', nav);
    form.classList.add('dx-wiz');

    function ir(i) {
      n = Math.max(0, Math.min(pasos.length - 1, i));
      pasos.forEach(function (p, k) { p.el.forEach(function (e) { e.hidden = k !== n; }); });
      resto.forEach(function (e) { e.classList.toggle('dx-off', n !== pasos.length - 1); });
      $$('.dx-st-l li', nav).forEach(function (li, k) {
        li.classList.toggle('is-on', k === n); li.classList.toggle('is-ok', k < n);
        if (k === n) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
      });
      back.hidden = n === 0; next.hidden = n === pasos.length - 1; err.hidden = true;
    }
    next.addEventListener('click', function () {
      if (n === 0) {
        var mm = $('#u-mm'); if (mm && !mm.value.trim()) {
          err.textContent = 'Contanos al menos la marca y el modelo para seguir.'; err.hidden = false; mm.focus(); return;
        }
      }
      ir(n + 1);
      var h = $('.cv-head', form); if (h && h.scrollIntoView) h.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
    back.addEventListener('click', function () { ir(n - 1); });
    $$('[data-ejemplo]', form).forEach(function (b) { b.addEventListener('click', function () { setTimeout(function () { ir(pasos.length - 1); }, 0); }); });
    ir(0);
  })();
})();
