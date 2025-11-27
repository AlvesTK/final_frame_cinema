const qtd = document.getElementById("qtd-ingresso");
const tipoIng = document.getElementById("select");
let resumoComp = JSON.parse(sessionStorage.getItem('resumoComp')) || {};
const voltar = document.getElementById("btn-voltar");
const proximo = document.getElementById("confirma-btn");
const meia = document.getElementById("meia");
const inteira = document.getElementById("inteira");


qtd.addEventListener("keydown", function(e){
    e.preventDefault();
});

qtd.addEventListener("change", function(e){
    e.preventDefault();

    resumoComp.qtd = qtd.value;
    sessionStorage.setItem('resumoComp', JSON.stringify(resumoComp));
});


tipoIng.addEventListener("change", function(e){
    e.preventDefault();

    resumoComp.ingresso = tipoIng.value;
    sessionStorage.setItem('resumoComp', JSON.stringify(resumoComp));
});



function resetSelection() {
    meia.style.outline = 'none';
    meia.style.backgroundColor = '';
    inteira.style.outline = 'none';
    inteira.style.backgroundColor = '';
}

meia.addEventListener("click", function () {
    resetSelection();
    meia.style.outline = '4px solid white';
    meia.style.backgroundColor = '#0d6efd';
    
    resumoComp.intMei = "Meia";
    sessionStorage.setItem('resumoComp', JSON.stringify(resumoComp));
});

inteira.addEventListener("click", function () {
    resetSelection();
    inteira.style.outline = '4px solid white';
    inteira.style.backgroundColor = '#0d6efd';
    resumoComp.intMei = "Inteira";
    sessionStorage.setItem('resumoComp', JSON.stringify(resumoComp));
});











voltar.addEventListener("click", function(e){
    e.preventDefault();
    if(resumoComp.qtd || resumoComp.ingresso || resumoComp.intMei ){
    let confirmaVolta = prompt("Atenção! Voltar irá desfazer as alterações. Deseja voltar? Digite (s) para 'sim' e (n) para não.");
  
    if(!confirmaVolta){
    return;
    }
    confirmaVolta = confirmaVolta.trim().toLowerCase();
  
    if (confirmaVolta === 's'){
      
      delete resumoComp.qtd;
      delete resumoComp.ingresso;
      delete resumoComp.intMei;
      sessionStorage.setItem('resumoComp', JSON.stringify(resumoComp));
      location.href = "../main/escolha_horario.html";
    } else if(confirmaVolta === 'n'){
      return;
    } else{
      alert("Inválido. Digite somente 's' ou 'n'.");
      return;
  }
    } else{
        location.href = '../main/escolha_horario.html';
    }
});

proximo.addEventListener("click", function(e){
    e.preventDefault();

    if(resumoComp.intMei && resumoComp.intMei.trim() !== "" && resumoComp.qtd && resumoComp.qtd.toString().trim() !== "" && resumoComp.ingresso && resumoComp.ingresso.trim()!==''){
        location.href = '../main/assentos.html';
    } else{
        alert("Conclua todas as opções antes de prosseguir.\nINGRESSO, QUANTIDADE e se deseja MEIA ENTRADA ou INTEIRA");

    }
});