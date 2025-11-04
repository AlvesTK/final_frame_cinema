const id = Number(localStorage.getItem("filmeSelecionado"));
const filme = filmes.find(f => f.id === id);

if (filme){
    document.getElementById("titulo").textContent = filme.titulo;
    document.getElementById("duracao").textContent = filme.duracao;
    document.getElementById("genero").textContent = filme.genero;
    document.getElementById("classificacao").textContent = filme.classificacao;
    document.getElementById("sinopse").textContent = filme.sinopse;
    document.getElementById("capa").src = filme.capa;
}