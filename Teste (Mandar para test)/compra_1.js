let carrinho = [];
let total = 0;

function add_carrinho(nome,preco)
{

    carrinho.push({nome,preco});
    total += preco;
    atualizar_carrinho();

}

function atualizar_carrinho()
{
    const lista = document.getElementById('carrinho');
    const total_dinheiro = document.getElementById('total');
    lista.innerHTML = "";

    carrinho.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$${item.preco}`;
        lista.appendChild(li);

    });

    total_dinheiro.textContent = `Total: R$${total}`;

}

function finalizar_compra(){

    if(carrinho.length === 0 ){
       window.alert("Seu carrinho está vazio!")
    }

    window.alert( `Compra finalizada com sucesso! \n total : R${total}`)

    carrinho = [];
    total = 0;
    atualizar_carrinho()
}