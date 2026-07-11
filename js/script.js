(function () {
  'use strict';

  var menuToggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('menu');

  // Se algum dos elementos não existir no HTML, encerra sem quebrar o resto do site
  if (!menuToggle || !menu) {
    return;
  }

  // Estado inicial explícito para leitores de tela
  menuToggle.setAttribute('aria-expanded', 'false');

  function abrirMenu() {
    menuToggle.classList.add('active');
    menu.classList.add('show');
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  function fecharMenu() {
    menuToggle.classList.remove('active');
    menu.classList.remove('show');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  function menuEstaAberto() {
    return menu.classList.contains('show');
  }

  menuToggle.addEventListener('click', function () {
    if (menuEstaAberto()) {
      fecharMenu();
    } else {
      abrirMenu();
    }
  });

  // Fecha o menu ao clicar em um link (evita menu aberto "grudado" no mobile)
  menu.addEventListener('click', function (event) {
    if (event.target.closest('a')) {
      fecharMenu();
    }
  });

  // Fecha o menu ao clicar/tocar fora dele
  document.addEventListener('click', function (event) {
    if (!menuEstaAberto()) {
      return;
    }
    var cliqueDentro = menu.contains(event.target) || menuToggle.contains(event.target);
    if (!cliqueDentro) {
      fecharMenu();
    }
  });

  // Fecha o menu com a tecla Esc (acessibilidade via teclado)
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menuEstaAberto()) {
      fecharMenu();
      menuToggle.focus();
    }
  });
})();
