document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var group = document.querySelector('.nav-group');
  if (toggle && group) {
    toggle.addEventListener('click', function () {
      group.classList.toggle('open');
      var expanded = group.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }
  document.querySelectorAll('.has-sub > span').forEach(function (label) {
    label.addEventListener('click', function () {
      if (window.innerWidth > 860) return;
      label.parentElement.classList.toggle('open');
    });
  });

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll(
      '.feature, .cards .card, .teaser-grid .teaser, .sponsor-tier .sponsor-slot'
    );
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 4) * 60 + 'ms';
      io.observe(el);
    });
  }
});
