/* CADY VAPE — site interactions: 21+ age gate, mobile nav, product filter */
(function () {
  // Age gate: shown once per browser session
  var gate = document.getElementById('age-gate');
  var enterBtn = document.getElementById('age-enter');
  var exitBtn = document.getElementById('age-exit');
  var denied = document.getElementById('age-denied');
  try {
    if (sessionStorage.getItem('cady-age-ok') === '1' && gate) {
      gate.classList.add('hidden');
    }
  } catch (e) { /* storage unavailable: gate stays visible */ }
  if (enterBtn) {
    enterBtn.addEventListener('click', function () {
      try { sessionStorage.setItem('cady-age-ok', '1'); } catch (e) {}
      if (gate) gate.classList.add('hidden');
    });
  }
  if (exitBtn) {
    exitBtn.addEventListener('click', function () {
      if (denied) denied.style.display = 'block';
      if (enterBtn) enterBtn.style.display = 'none';
      exitBtn.textContent = 'Exit site';
      exitBtn.addEventListener('click', function () {
        window.location.href = 'https://www.google.com';
      }, { once: true });
    });
  }

  // Mobile nav toggle
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // Product filter (homepage)
  var filterBtns = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.product-card');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      cards.forEach(function (card) {
        var cat = card.getAttribute('data-category') || '';
        card.style.display = (f === 'all' || cat === f) ? '' : 'none';
      });
    });
  });
})();
