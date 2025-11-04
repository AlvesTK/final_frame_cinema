SENHA_TESTE = '12345678';
globalThis.SENHA_TESTE = SENHA_TESTE; // apenas para teste — não persista

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (senha === SENHA_TESTE) {
        sessionStorage.setItem('usuarioLogado', usuario);
        sessionStorage.setItem('logado', 'true');
        location.href = 'home.html';
    } else {
        alert('Usuário ou senha incorretos');
    }
});