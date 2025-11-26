export const users = [
    {
        nome: "felipe",
        email:"felipe@gmail.com",
        senha:"felipe01"
    },
    {
        nome:"mateus",
        email:"mateus@gmail.com",
        senha:"mateus01"
    }
];
localStorage.setItem("users", JSON.stringify(users));

const form = document.getElementById("form");
const erroSenha = document.getElementById("erro-senha");


form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nomeInf = document.getElementById("nome").value.trim();
    const emailInf = document.getElementById("email").value.trim();
    const senhaInf = document.getElementById("senha").value.trim();
    const confirmarSenhaInf = document.getElementById("confirmar").value.trim();

    if(!nomeInf || !emailInf || !senhaInf || !confirmarSenhaInf){
        alert("Preencha todos os campos!");
        return;
    }


    if (senhaInf !== confirmarSenhaInf){
        erroSenha.style.display="block";
        return;
    } else{
        erroSenha.style.display="none";
    }

    const novoUsuario = {
        nome: nomeInf,
        email:emailInf,
        senha:senhaInf
    };

    const users = JSON.parse(localStorage.getItem("users")) || [];


    if(users.find(u=>u.nome === nomeInf)){
        alert("Nome de usuário já existe");
        return;
    }
    if(users.find(u=>u.email===emailInf || u.senha === senhaInf)){
        alert("Usuário já existe");
        return;
    }

    users.push(novoUsuario);
    alert("Usuário cadastrado com sucesso.");

    localStorage.setItem("users", JSON.stringify(users));
    location.href='/main/login.html';

});