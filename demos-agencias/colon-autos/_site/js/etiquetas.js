(function () {
  function num(t) { var n = parseInt(String(t).replace(/\D/g, ''), 10); return isNaN(n) ? null : n; }
  var limite = new Date().getFullYear() - 5;
  document.querySelectorAll('ul.cars > li.car').forEach(function (li) {
    if (li.querySelector('.car-tag')) return;
    var anio = null, km = null;
    li.querySelectorAll('.car-s p').forEach(function (p) {
      var s = p.querySelector('small'), b = p.querySelector('b');
      if (!s || !b) return;
      var k = s.textContent.trim();
      if (/^a.o$/i.test(k)) anio = num(b.textContent);
      if (/^kil/i.test(k)) km = num(b.textContent);
    });
    var t = null;
    if (km === 0) t = '0 km';
    else if (km !== null && km < 50000) t = 'Bajo km';
    else if (anio !== null && anio >= limite) t = 'Modelo reciente';
    var fig = li.querySelector('.car-ph');
    if (!t || !fig) return;
    var s = document.createElement('span');
    s.className = 'car-tag';
    s.textContent = t;
    fig.appendChild(s);
  });
})();