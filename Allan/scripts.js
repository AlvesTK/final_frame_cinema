let carrinho = [];
const listaCarrinho = document.getElementById("listaCarrinho");
const totalElemento = document.getElementById("total");
const snackbar = document.getElementById("snackbar");
const finalizarBtn = document.getElementById("finalizarBtn");

function adicionarItem(nome, preco) {
  const itemExistente = carrinho.find(item => item.nome === nome);

  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }

  atualizarCarrinho();
  mostrarSnackbar("Item adicionado ao carrinho!");
}

function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function aumentarQtd(index) {
  carrinho[index].quantidade++;
  atualizarCarrinho();
}

function diminuirQtd(index) {
  carrinho[index].quantidade--;
  if (carrinho[index].quantidade <= 0) {
    carrinho.splice(index, 1);
  }
  atualizarCarrinho();
}

function atualizarCarrinho() {
  listaCarrinho.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    li.innerHTML = `
      <div style="flex:1;">
        ${item.nome} <br>
        <small>R$ ${item.preco.toFixed(2).replace('.', ',')} cada</small>
      </div>
      <div>
        <button class="remove" onclick="diminuirQtd(${index})">−</button>
        <span>${item.quantidade}</span>
        <button class="remove" onclick="aumentarQtd(${index})">+</button>
      </div>
      <div>
        <strong>R$ ${subtotal.toFixed(2).replace('.', ',')}</strong>
        <button class="remove" onclick="removerItem(${index})">✖</button>
      </div>
    `;
    listaCarrinho.appendChild(li);
  });

  totalElemento.textContent = total.toFixed(2).replace('.', ',');
}

function mostrarSnackbar(msg) {
  snackbar.textContent = msg;
  snackbar.classList.add("show");
  setTimeout(() => snackbar.classList.remove("show"), 2000);
}

finalizarBtn.addEventListener("click", () => {
  if (carrinho.length === 0) {
    mostrarSnackbar("Carrinho vazio!");
    return;
  }

  let resumo = "Resumo do Pedido:\n\n";
  carrinho.forEach(item => {
    resumo += `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}\n`;
  });
  resumo += `\nTotal: R$ ${totalElemento.textContent}`;

  if (confirm(resumo + "\n\nConfirmar pedido?")) {
    carrinho = [];
    atualizarCarrinho();
    mostrarSnackbar("Pedido finalizado com sucesso!");
  }
});

    
