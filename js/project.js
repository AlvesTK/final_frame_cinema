 const assentos = document.querySelectorAll(".assento");
  const totalSelecionados2 = document.getElementById("totalSelecionados2");
  const totalPagar = document.getElementById("totalPagar");
  const qtdAssentosResumo = document.getElementById("qtdAssentos");
  const valorAssentosResumo = document.getElementById("valorAssentos");
  const valorAcompanhamentos = document.getElementById("valorAcompanhamentos");
  const totalGeral = document.getElementById("totalGeral");

  const btnConfirmar = document.getElementById("btnConfirmar");
  const btnFinalizar = document.getElementById("btnFinalizar");

  let qtd = 0;
  let valorAssentos = 0;
  let valorExtra = 0;

  assentos.forEach(assento => {
    assento.addEventListener("click", () => {
      if (!assento.classList.contains("ocupado")) {
        assento.classList.toggle("selecionado");
        qtd = document.querySelectorAll(".assento.selecionado").length;
        valorAssentos = qtd * 20;
        totalSelecionados2.textContent = qtd;
        totalPagar.textContent = valorAssentos.toFixed(2);
      }
    });
  });

  function mostrarAcompanhamentos() {
    const setor = document.getElementById("SetordeAssentos");
    if (setor) setor.classList.add("hidden");

    if (qtdAssentosResumo) qtdAssentosResumo.textContent = qtd;
    if (valorAssentosResumo) valorAssentosResumo.textContent = valorAssentos.toFixed(2);
    if (totalGeral) totalGeral.textContent = valorAssentos.toFixed(2);
    if (valorAcompanhamentos) valorAcompanhamentos.textContent = valorExtra.toFixed(2);

    alert(`Resumo:\nAssentos selecionados: ${qtd}\nTotal assentos: R$ ${valorAssentos.toFixed(2)}`);
  }

  function finalizarCompra() {
    const totalText = totalGeral ? totalGeral.textContent : valorAssentos.toFixed(2);
    alert("Compra finalizada! \n\nTotal: R$ " + totalText);
    location.reload();
  }

  btnConfirmar.addEventListener("click", mostrarAcompanhamentos);
  btnFinalizar.addEventListener("click", finalizarCompra);