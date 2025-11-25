let usuarioAtual = JSON.parse(sessionStorage.getItem('usuarioLogado'));


const form = document.getElementById("perfilForm");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");

const editarbtn = document.getElementById("edt-perfil");
const salvaEdit = document.getElementById("confirma-edt");
const cancelar = document.getElementById("cancela-edt");
const excluir = document.getElementById("apagaConta");

nomeInput.readOnly = true;
emailInput.readOnly = true;
senhaInput.readOnly = true;

if ((usuarioAtual && nomeInput) && (usuarioAtual && emailInput) && (usuarioAtual && senhaInput)){
    nomeInput.value = usuarioAtual.nome;
    emailInput.value = usuarioAtual.email;
    senhaInput.value = usuarioAtual.senha;
}


editarbtn.addEventListener("click", function(e){
    e.preventDefault();

    // tornando os campos editáveis
    nomeInput.readOnly = false;
    emailInput.readOnly = false;
    senhaInput.readOnly = false;

    //mostra botao salvar
    salvaEdit.style.display = 'flex';
    cancelar.style.display = "flex";
    excluir.style.display = "flex";

});

cancelar.addEventListener("click", function(e){
    e.preventDefault();

    if ((usuarioAtual && nomeInput) && (usuarioAtual && emailInput) && (usuarioAtual && senhaInput)){
    nomeInput.value = usuarioAtual.nome;
    emailInput.value = usuarioAtual.email;
    senhaInput.value = usuarioAtual.senha;
    }

    nomeInput.readOnly = true;
    emailInput.readOnly = true;
    senhaInput.readOnly = true;

    salvaEdit.style.display = 'none';
    cancelar.style.display = "none";
    excluir.style.display = "none";


});

// excluindo perfil
excluir.addEventListener("click", function(e){
    e.preventDefault();

    const alertaOpc = prompt("Atenção! Deseja realmente excluir a conta? digite (\'s\') para confirmar ou (\'n\') para cancelar exclusão");

    if (!alertaOpc){
        return;
    } else if(alertaOpc.toLowerCase()==='s'){
        const userAtual = JSON.parse(sessionStorage.getItem('usuarioLogado'));
        let users = JSON.parse(localStorage.getItem('users')) || [];

        users = users.filter(u=> u.email !== userAtual.email);

        localStorage.setItem('users', JSON.stringify(users));

        sessionStorage.removeItem('usuarioLogado');
        sessionStorage.removeItem('Logado');

        alert("Conta excluída com sucesso.");
        location.href = '/main/login.html';


    } else if(alertaOpc.toLowerCase()==='n'){
        alert("Exclusão cancelada");
        return;
    } else{
        return;
    }




})

// atualizando perfil
form.addEventListener("submit", function(e){
    e.preventDefault();

    const novoNome = nomeInput.value.trim();
    const novoEmail = emailInput.value.trim();
    const novaSenha = senhaInput.value.trim();

    if(!novoNome || !novoEmail || !novaSenha){
        alert("Preencha todos os campos!");
        return;
    }

    const emailAnt = usuarioAtual.email;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userMatch = users.find(u => u.email === emailAnt);
    if (userMatch){
        userMatch.nome = novoNome;
        userMatch.email = novoEmail;
        userMatch.senha = novaSenha;
    }

    localStorage.setItem("users", JSON.stringify(users));

    usuarioAtual = { nome: novoNome, email: novoEmail, senha: novaSenha };
    sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtual));

    alert("Perfil atualizado com sucesso");

    salvaEdit.style.display = "none";
    cancelar.style.display = "none";
    excluir.style.display = "none";

    nomeInput.value = usuarioAtual.nome;
    emailInput.value = usuarioAtual.email;
    senhaInput.value = usuarioAtual.senha;

    nomeInput.readOnly = true;
    emailInput.readOnly = true;
    senhaInput.readOnly = true;




});