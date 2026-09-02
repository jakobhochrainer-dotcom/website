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
      '.feature, .cards .card, .teaser-grid .teaser, .sponsor-tier .sponsor-slot, .gallery-grid .gallery-item'
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

  var galleryItems = Array.prototype.slice.call(document.querySelectorAll('.gallery-grid .gallery-item'));
  if (galleryItems.length) {
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML =
      '<button class="lightbox-close" aria-label="Schließen">&times;</button>' +
      '<button class="lightbox-prev" aria-label="Zurück">&#8249;</button>' +
      '<img alt="">' +
      '<button class="lightbox-next" aria-label="Weiter">&#8250;</button>';
    document.body.appendChild(lightbox);
    var lbImg = lightbox.querySelector('img');
    var current = 0;

    function show(i) {
      current = (i + galleryItems.length) % galleryItems.length;
      var item = galleryItems[current];
      lbImg.src = item.querySelector('img').src;
      lbImg.alt = item.getAttribute('data-alt') || '';
    }
    function open(i) {
      show(i);
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    galleryItems.forEach(function (item, i) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        open(i);
      });
    });
    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', function () { show(current - 1); });
    lightbox.querySelector('.lightbox-next').addEventListener('click', function () { show(current + 1); });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }
});
