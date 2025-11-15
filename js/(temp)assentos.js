// assentos.js - gerencia seleção e redirecionamento para snekbar.html
document.addEventListener("DOMContentLoaded", () => {
  const assentos = document.querySelectorAll(".assento");
  const totalSelecionados = document.getElementById("totalSelecionados");
  const totalPagar = document.getElementById("totalPagar");
  const btnConfirmar = document.getElementById("btnConfirmar");

  let qtd = 0;
  let valorAssentos = 0;
  const preco = 20.0;

  // clique nos assentos
  assentos.forEach(assento => {
    assento.addEventListener("click", () => {
      if (assento.classList.contains("ocupado")) return;
      assento.classList.toggle("selecionado");

      qtd = document.querySelectorAll(".assento.selecionado").length;
      valorAssentos = qtd * preco;

      totalSelecionados.textContent = qtd;
      totalPagar.textContent = valorAssentos.toFixed(2);
    });
  });

  // confirmar -> FINALIZAR e ir para snekbar.html passando seats e total
  btnConfirmar.addEventListener("click", () => {
    if (qtd === 0) {
      alert("Selecione pelo menos um assento antes de finalizar.");
      return;
    }

    const selecionados = Array.from(document.querySelectorAll(".assento.selecionado"))
      .map(b => b.getAttribute("data-seat"))
      .filter(Boolean);

    const seatsParam = encodeURIComponent(selecionados.join(","));
    const totalParam = encodeURIComponent(valorAssentos.toFixed(2));

    // redireciona para a página do snack bar (troque o caminho se quiser)
    window.location.href = `/snekbar.html?seats=${seatsParam}&total=${totalParam}`;
  });
});