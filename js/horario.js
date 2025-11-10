// Referências
const side = document.getElementById('mySideNav');
const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const main = document.getElementById('main');

// Abrir menu
function openNav() {
  side.classList.add('open');
  main.style.marginLeft = '240px';
  openBtn.classList.add('hidden');
}

// Fechar menu
function closeNav() {
  side.classList.remove('open');
  main.style.marginLeft = '0';
  openBtn.classList.remove('hidden');
}

// Eventos
openBtn.addEventListener('click', openNav);
closeBtn.addEventListener('click', closeNav);

// Fechar ao apertar ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNav();
});
