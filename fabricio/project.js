const assentos = document.querySelectorAll(".assento");
const totalSelecionados = document.getElementById("totalSelecionados");
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
      totalSelecionados.textContent = qtd;
      totalPagar.textContent = valorAssentos.toFixed(2);
    }
  });
});

function mostrarAcompanhamentos() {
  document.getElementById("SetordeAssentos").classList.add("hidden");
  document.getElementById("setorAcompanhamentos").classList.remove("hidden");

  qtdAssentosResumo.textContent = qtd;
  valorAssentosResumo.textContent = valorAssentos.toFixed(2);
  totalGeral.textContent = valorAssentos.toFixed(2);

  document.querySelectorAll("#setorAcompanhamentos input[type=checkbox]").forEach(chk => {
    chk.addEventListener("change", () => {
      if (chk.checked) {
        valorExtra += parseFloat(chk.value);
      } else {
        valorExtra -= parseFloat(chk.value);
      }
      valorAcompanhamentos.textContent = valorExtra.toFixed(2);
      totalGeral.textContent = (valorAssentos + valorExtra).toFixed(2);
    });
  });
}

function finalizarCompra() {
  alert("Compra finalizada! 🎬🍿\n\nTotal: R$ " + totalGeral.textContent);
  location.reload();
}

btnConfirmar.addEventListener("click", mostrarAcompanhamentos);
btnFinalizar.addEventListener("click", finalizarCompra);
