import { filmes } from '../js/filmes.js';



let resumo = JSON.parse(sessionStorage.getItem("resumoComp")) || {
    nome: "",
    filme: "",
    assento: "",
    horario: "",
    ingresso: ""
};

const id = Number(localStorage.getItem('filmeSelecionado'));
const filmeSelec = filmes.find(f => f.id === id);

const usuarioAtual = JSON.parse(sessionStorage.getItem('usuarioLogado'));
if (usuarioAtual){
    resumo.nome = usuarioAtual.nome;
}
if (filmeSelec) {
    resumo.filme = filmeSelec.titulo;
}

sessionStorage.setItem("resumoComp", JSON.stringify(resumo));