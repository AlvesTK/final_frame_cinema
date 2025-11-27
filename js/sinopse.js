import {filmes} from '../js/filmes.js';

const id = Number(localStorage.getItem("filmeSelecionado"));
const filme = filmes.find(f => f.id === id);
const voltar = document.getElementById("btn-voltar");
const proximo = document.getElementById("btnComprarIngresso");
const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
const resumoComp = JSON.parse(sessionStorage.getItem('resumoComp'));

voltar.addEventListener("click", ()=>{
    delete resumoComp.filme;
    sessionStorage.setItem('resumoComp', JSON.stringify(resumoComp));
    location.href = '../main/home.html';
});

proximo.addEventListener("click", ()=>{
    if (!usuarioLogado){
        alert("Você não está logado. Crie uma conta ou entre com uma conta existente antes de prosseguir.");
        return;
    }
    else{
        location.href = '../main/escolha_horario.html';
    }
})

if (filme){
    document.getElementById("titulo").textContent = filme.titulo;
    document.getElementById("duracao").textContent = filme.duracao;
    document.getElementById("genero").textContent = filme.genero;
    document.getElementById("classificacao").textContent = filme.classificacao;
    document.getElementById("sinopse").textContent = filme.sinopse;
    document.getElementById("capa").src = filme.capa;
}