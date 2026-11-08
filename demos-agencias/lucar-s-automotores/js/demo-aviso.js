/* demo-aviso.js: aviso de version de demostracion para todo el sitio. Desactivar: window.DEMO_AVISO = false */
(function () {
  'use strict';
  if (window.DEMO_AVISO === false) return;

  var TITULO = 'Versi\u00f3n de demostraci\u00f3n';
  var TEXTO = 'Sitio ilustrativo: las unidades, precios y datos publicados son de ejemplo y no representan stock real.';
  var TEXTO_FICHA = 'Demo \u00b7 Contenido de ejemplo';

  var css = [
    '#demo-aviso{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;gap:10px;',
    'flex-wrap:wrap;padding:8px 14px;background:rgba(10,10,12,.94);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);',
    'border-top:1px solid rgba(255,255,255,.14);color:#e9e9ec;font:500 12px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif;',
    'letter-spacing:.01em;text-align:center;pointer-events:none}',
    '#demo-aviso b,.demo-aviso-ficha b{display:inline-block;padding:2px 8px;border-radius:999px;background:var(--rojo,#e10600);color:#fff;',
    'font-weight:700;font-size:10.5px;letter-spacing:.08em;text-transform:uppercase}',
    ':root{--demo-h:46px}body{padding-bottom:var(--demo-h)}', '.prelude__skip{bottom:calc(var(--demo-h) + 14px + env(safe-area-inset-bottom,0px))!important}', '.dr-fab{bottom:calc(var(--demo-h) + 14px + env(safe-area-inset-bottom,0px) + var(--tray-h,0px))!important}', '.tray{bottom:var(--demo-h)!important}', '.toast{bottom:calc(var(--demo-h) + 22px + var(--tray-h,0px) + env(safe-area-inset-bottom,0px))!important}',
    '@media(max-width:600px){:root{--demo-h:64px}#demo-aviso{font-size:11px;padding:7px 10px}}',
    '.demo-aviso-ficha{position:sticky;top:0;z-index:50;display:flex;align-items:center;justify-content:center;gap:8px;padding:6px 12px;',
    'background:rgba(10,10,12,.96);border-bottom:1px solid rgba(255,255,255,.14);color:#e9e9ec;',
    'font:500 11.5px/1.3 system-ui,-apple-system,"Segoe UI",sans-serif}'
  ].join('');

  function estilo() {
    if (document.getElementById('demo-aviso-css')) return;
    var s = document.createElement('style'); s.id = 'demo-aviso-css'; s.textContent = css;
    document.head.appendChild(s);
  }

  function barra() {
    if (document.getElementById('demo-aviso')) return;
    var d = document.createElement('div'); d.id = 'demo-aviso'; d.setAttribute('role', 'note');
    var b = document.createElement('b'); b.textContent = TITULO;
    var t = document.createElement('span'); t.textContent = TEXTO;
    d.appendChild(b); d.appendChild(t); document.body.appendChild(d);
  }

  function ficha() {
    var dl = document.querySelectorAll('dialog[open]');
    for (var i = 0; i < dl.length; i++) {
      if (dl[i].querySelector('.demo-aviso-ficha')) continue;
      var f = document.createElement('div'); f.className = 'demo-aviso-ficha';
      var b = document.createElement('b'); b.textContent = 'Demo';
      var t = document.createElement('span'); t.textContent = TEXTO_FICHA.replace(/^Demo \u00b7 /, '');
      f.appendChild(b); f.appendChild(t);
      dl[i].insertBefore(f, dl[i].firstChild);
    }
  }

  var pend = 0;
  function tick() { if (pend) return; pend = setTimeout(function () { pend = 0; ficha(); }, 60); }

  function iniciar() {
    estilo(); barra();
    new MutationObserver(tick).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['open'] });
    tick();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();