(function () {
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('main-nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      burger.setAttribute('aria-label', open ? 'Открыть меню' : 'Закрыть меню');
      nav.classList.toggle('is-open', !open);
    });
  }

  var range = document.getElementById('pk-budget');
  var out = document.getElementById('pk-budget-out');
  if (range && out) {
    var fmt = function () {
      out.textContent = Number(range.value).toLocaleString('ru-RU').replace(/\u00A0/g, ' ') + ' ₽';
    };
    range.addEventListener('input', fmt);
    fmt();
  }

  var buttons = document.querySelectorAll('.faq-item__btn');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      var panel = document.getElementById(this.getAttribute('aria-controls'));
      this.setAttribute('aria-expanded', String(!expanded));
      if (panel) panel.hidden = expanded;
    });
  }
})();