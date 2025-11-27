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


const horarios = document.querySelectorAll(".botoes-horario button");
function configSelecao(botoes){
  botoes.forEach(btn=> {
    btn.addEventListener("click", ()=>{
      botoes.forEach(b=> b.classList.remove("selected"));

      btn.classList.add("selected");

      let resumoComp = JSON.parse(sessionStorage.getItem('resumoComp')) || {};
      resumoComp.horario = btn.textContent.trim();

      sessionStorage.setItem('resumoComp', JSON.stringify(resumoComp));
    });
  });
}

configSelecao(horarios);

const voltar = document.getElementById("btn-voltar");

voltar.addEventListener("click", function(e){
  e.preventDefault();

  let resumoComp = JSON.parse(sessionStorage.getItem('resumoComp')) || {};
  if (resumoComp.horario && resumoComp.horario.trim() !== ""){
    let confirmaVolta = prompt("Atenção! Voltar irá desfazer as alterações. Deseja voltar? Digite (s) para 'sim' e (n) para não.");
  
    if(!confirmaVolta){
    return;
    }
    confirmaVolta = confirmaVolta.trim().toLowerCase();
  
    if (confirmaVolta === 's'){
      resumoComp.horario = "";
      sessionStorage.setItem('resumoComp', JSON.stringify(resumoComp));
      location.href = "../main/sinopse.html";
    } else if(confirmaVolta === 'n'){
      return;
    } else{
      alert("Inválido. Digite somente 's' ou 'n'.");
      return;
  }

  } else {
    location.href = '../main/sinopse.html';
  }
});


const proximo = document.getElementById("confirma-btn");

proximo.addEventListener("click", function(e){
  e.preventDefault();

  const resumoComp = JSON.parse(sessionStorage.getItem('resumoComp')) || {};


  if(resumoComp.horario && resumoComp.horario.trim() !== ""){
    location.href = '../main/ingresso.html';
  } else{
    alert("Selecione um horário antes de avançar.");
  }
});