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

// Feedback visual ao clicar em "Comprar"
function mostrarToast(mensagem) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = mensagem;
  container.appendChild(toast);

  // força reflow pra garantir a transição
  requestAnimationFrame(() => toast.classList.add('toast-visivel'));

  setTimeout(() => {
    toast.classList.remove('toast-visivel');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, 3000);
}

document.querySelectorAll('.card .botao').forEach((botao) => {
  botao.addEventListener('click', () => {
    const card = botao.closest('.card');
    const nomeProduto = card?.querySelector('h3')?.textContent ?? 'Produto';
    mostrarToast(`✅ ${nomeProduto} adicionado — em breve você poderá finalizar a compra!`);
  });
});

document.getElementById('btn-whatsapp')?.addEventListener('click', () => {
  mostrarToast('📱 Este é um projeto fictício — sem WhatsApp real configurado.');
});