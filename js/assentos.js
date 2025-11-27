document.addEventListener("DOMContentLoaded", () => {
  const assentos = document.querySelectorAll(".assento");
  const btnConfirmar = document.getElementById("btnConfirmar");
  const voltar = document.getElementById("btn-voltar");
  let resumoComp = JSON.parse(sessionStorage.getItem("resumoComp")) || {};
  let historico = JSON.parse(sessionStorage.getItem("historicoCompras")) || [];

  let Rnome = document.getElementById("nome");
  let Rfilme = document.getElementById("filme");
  let Rassentos = document.getElementById("assento");
  let Rhorario = document.getElementById("horario");
  let Ringresso = document.getElementById("ingresso");
  let RqtdIng = document.getElementById("qtdIng");
  let RintMeia = document.getElementById("Int-meia");
  let RprcFinal = document.getElementById("total");

  if (!Array.isArray(resumoComp.assentos)) {
    resumoComp.assentos = [];
  }
  let limite = Number(resumoComp.qtd) || 0;

  const popup = document.getElementById("popup");

  assentos.forEach((assento) => {
    assento.addEventListener("click", () => {
      if (assento.classList.contains("ocupado")) return;
      const nomeAssento = assento.getAttribute("data-seat");

      if (assento.classList.contains("selecionado")) {
        assento.classList.remove("selecionado");
        resumoComp.assentos = resumoComp.assentos.filter((a) => a !== nomeAssento);
        sessionStorage.setItem("resumoComp", JSON.stringify(resumoComp));
        return;
      }

      if (resumoComp.assentos.length >= limite) {
        alert(`Você só pode escolher ${limite} assento(s).`);
        return;
      }

      assento.classList.add("selecionado");
      resumoComp.assentos.push(nomeAssento);
      sessionStorage.setItem("resumoComp", JSON.stringify(resumoComp));
    });
  });

  btnConfirmar.addEventListener("click", () => {
    if (!resumoComp.assentos.length) {
      alert("Selecione pelo menos um assento antes de finalizar.");
      return;
    } else if (
      !resumoComp.nome ||
      !resumoComp.filme ||
      !resumoComp.horario ||
      !resumoComp.ingresso ||
      !resumoComp.qtd ||
      !resumoComp.intMei
    ) {
      alert("É preciso estar logado e seguir todas as etapas para concluir.");
      return;
    }
    popup.style.display = "flex";

    let qtd = resumoComp.assentos.length;
    const tipoIngresso = resumoComp.intMei.toLowerCase();
    const categoria = resumoComp.ingresso.toLowerCase();

    let precoFinal = 0;
    let prcMeiaPadrao = 20, prcIntPadrao = 40, prcMeiaVip = 45, prcIntVip = 90;

    Rnome.textContent = resumoComp.nome;
    Rfilme.textContent = resumoComp.filme;
    Rassentos.textContent = resumoComp.assentos.join(", ");
    Rhorario.textContent = resumoComp.horario;
    Ringresso.textContent = resumoComp.ingresso;
    RqtdIng.textContent = resumoComp.qtd;
    RintMeia.textContent = resumoComp.intMei;

    precoFinal = categoria === "vip"
      ? (tipoIngresso === "inteira" ? prcIntVip * qtd : prcMeiaVip * qtd)
      : (tipoIngresso === "inteira" ? prcIntPadrao * qtd : prcMeiaPadrao * qtd);

    resumoComp.precoFinal = precoFinal;
    RprcFinal.textContent = precoFinal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  });

  document.getElementById("finaliza-popup").onclick = () => {
    historico.push({
      nome: resumoComp.nome,
      filme: resumoComp.filme,
      assentos: [...resumoComp.assentos],
      horario: resumoComp.horario,
      ingresso: resumoComp.ingresso,
      intMei: resumoComp.intMei,
      qtd: resumoComp.assentos.length,
      precoFinal: resumoComp.precoFinal
    });

    sessionStorage.setItem('historicoCompras', JSON.stringify(historico));
    sessionStorage.removeItem('resumoComp');
    location.href = '../main/home.html';
  };

  document.getElementById("close-popup").onclick = () => (popup.style.display = "none");

  voltar.addEventListener("click", () => {
    if (Array.isArray(resumoComp.assentos) && resumoComp.assentos.length > 0) {
      let confirmaVolta = prompt("Atenção! Voltar irá desfazer as alterações. Deseja voltar? Digite (s) para 'sim' e (n) para não.");
      if (!confirmaVolta) return;
      confirmaVolta = confirmaVolta.trim().toLowerCase();
      if (confirmaVolta === "s") {
        delete resumoComp.assentos;
        sessionStorage.setItem("resumoComp", JSON.stringify(resumoComp));
        location.href = "../main/ingresso.html";
      } else if (confirmaVolta === "n") {
        return;
      } else {
        alert("Inválido. Digite somente 's' ou 'n'.");
      }
    } else {
      location.href = "../main/ingresso.html";
    }
  });
});