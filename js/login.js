
const form = document.getElementById("loginForm");

const users = JSON.parse(localStorage.getItem("users")) || [];

localStorage.removeItem("historicoCompras");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();
    
    const usuarioLogado = users.find(u => u.email === usuario && u.senha === senha);

    if (usuarioLogado){
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        sessionStorage.setItem('logado', 'true');
        location.href = '/main/home.html';
    } else{
        alert("Erro. Usuário/senha incorretos ou não existem.\nSua primeira vez ? Crie sua conta clicando em \'Registre-se\'.");
    }
});