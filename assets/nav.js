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
});
