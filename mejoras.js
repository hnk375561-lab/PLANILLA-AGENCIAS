/* mejoras.js · permuta en 3 pasos y skeletons de carga.
   (El estado "Abierto ahora" del header lo pinta horarios.js: el chip lleva data-live / data-estado-t / data-estado-d.)
   Mejora progresiva: si algo no coincide, no toca nada. Sin red, sin cookies. */
(function () {
  'use strict';
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* ---------- skeletons: brillo hasta que carga la foto ---------- */
  function esqueletos() {
    $$('.car-ph img').forEach(function (img) {
      var h = img.closest('.car-ph');
      if (!h || img.complete) return;
      h.classList.add('sk');
      var f = function () { h.classList.remove('sk'); };
      img.addEventListener('load', f, { once: true });
      img.addEventListener('error', f, { once: true });
    });
  }

  /* ---------- permuta en 3 pasos (sobre el formulario "Datos de tu usado") ---------- */
  function permuta() {
    var f = $('form.cv-form[aria-label="Datos de tu usado"]');
    if (!f || f.hasAttribute('data-wiz')) return;
    var grid = $('.cv-grid', f);
    if (!grid) return;
    var campos = Array.prototype.filter.call(grid.children, function (c) { return c.classList.contains('cv-f'); });
    if (campos.length !== 9 || !$('#u-mm', f)) return;   /* estructura distinta: no se toca */
    var TIT = ['Tu auto', 'Cómo está', 'Qué querés'];
    var PASO = [1, 1, 1, 2, 2, 2, 3, 3, 3];
    campos.forEach(function (c, i) { c.setAttribute('data-paso', PASO[i]); });
    f.setAttribute('data-wiz', '1');

    var st = document.createElement('ol');
    st.className = 'wz-st';
    st.setAttribute('aria-label', 'Pasos');
    TIT.forEach(function (t, i) {
      var li = document.createElement('li'), b = document.createElement('button');
      b.type = 'button'; b.className = 'wz-b'; b.setAttribute('data-ir', String(i + 1));
      var n = document.createElement('span'); n.className = 'wz-n'; n.setAttribute('aria-hidden', 'true'); n.textContent = String(i + 1);
      var s = document.createElement('span'); s.className = 'wz-t'; s.textContent = t;
      b.appendChild(n); b.appendChild(s); li.appendChild(b); st.appendChild(li);
    });
    grid.parentNode.insertBefore(st, grid);

    var nav = document.createElement('div');
    nav.className = 'wz-nav';
    nav.innerHTML = '<button type="button" class="cv-btn cv-btn--g wz-prev">Atrás</button>' +
      '<button type="button" class="cv-btn cv-btn--main wz-next">Siguiente</button>' +
      '<p class="wz-fin" hidden>Listo: abajo se arma tu mensaje para copiar.</p>' +
      '<p class="wz-live" role="status" aria-live="polite"></p>';
    grid.parentNode.insertBefore(nav, grid.nextSibling);
    var prev = $('.wz-prev', nav), next = $('.wz-next', nav), fin = $('.wz-fin', nav), live = $('.wz-live', nav);
    var paso = 1;

    function ir(n, foco) {
      if (n < 1 || n > 3 || n === paso && foco === undefined) return;
      if (n > paso) {   /* para avanzar hace falta, al menos, marca y modelo */
        var mm = $('#u-mm', f);
        if (!mm.value.trim()) { if (paso !== 1) ir(1, true); mm.focus(); if (mm.reportValidity) mm.reportValidity(); return; }
      }
      paso = n;
      f.setAttribute('data-paso-act', String(n));
      campos.forEach(function (c) {
        if (+c.getAttribute('data-paso') === n) c.removeAttribute('data-wz-off'); else c.setAttribute('data-wz-off', '');
      });
      $$('.wz-b', st).forEach(function (b) {
        var k = +b.getAttribute('data-ir');
        b.classList.toggle('on', k === n);
        b.classList.toggle('ok', k < n);
        if (k === n) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
      });
      prev.hidden = n === 1; next.hidden = n === 3; fin.hidden = n !== 3;
      live.textContent = 'Paso ' + n + ' de 3: ' + TIT[n - 1];
      if (foco) {
        var el = campos.filter(function (c) { return +c.getAttribute('data-paso') === n; })[0];
        var i = el && el.querySelector('input:not([type=hidden]),select,textarea,button');
        if (i) i.focus({ preventScroll: true });
      }
    }

    f.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('.wz-next,.wz-prev,.wz-b');
      if (!b || !f.contains(b)) return;
      if (b.classList.contains('wz-next')) ir(paso + 1, true);
      else if (b.classList.contains('wz-prev')) ir(paso - 1, true);
      else ir(+b.getAttribute('data-ir'), true);
    });
    f.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' || paso === 3) return;
      var t = e.target;
      if (!t || t.tagName !== 'INPUT') return;
      e.preventDefault();   /* Enter avanza de paso en vez de enviar/copiar el formulario a medias */
      ir(paso + 1, true);
    });
    ir(1, false);
  }

  function iniciar() { esqueletos(); permuta(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
