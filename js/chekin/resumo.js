// resumo.js - Lógica da Página Final

import { getDado, limparCompra } from '../carrinho.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. FUNÇÃO PARA RECUPERAR E EXIBIR OS DETALHES DO INGRESSO
    
    // Assumindo que os dados foram salvos como:
    // 'compra_filme_nome', 'compra_filme_id', 'compra_sessao', 'compra_assentos', 'compra_alimentos'

    const filmeNome = getDado('filme_nome') || 'Não Informado';
    const filmeId = getDado('filme_id') || 'N/A';
    const sessao = getDado('sessao') || 'Não Informada';
    
    document.getElementById('filme-nome').textContent = filmeNome;
    document.getElementById('filme-id').textContent = filmeId;
    document.getElementById('sessao').textContent = sessao;

    // 2. RECUPERAR E TRATAR A LISTA DE ASSENTOS
    const assentosString = getDado('assentos');
    let assentosTexto = 'Nenhum assento selecionado';
    
    if (assentosString) {
        // Transforma a string salva ("C1,C2") em lista e exibe
        assentosTexto = assentosString.split(',').join(', ');
    }
    document.getElementById('assentos').textContent = assentosTexto;


    // 3. RECUPERAR E TRATAR A LISTA DE ALIMENTOS
    const alimentosString = getDado('alimentos'); // Ex: "Pipoca Grande=1;Refrigerante=2"
    const alimentosListaUl = document.getElementById('alimentos-lista');
    
    if (alimentosString) {
        const pares = alimentosString.split(';'); // ["Pipoca Grande=1", "Refrigerante=2"]
        
        pares.forEach(par => {
            const [nome, qtd] = par.split('=');
            if (nome && qtd) {
                const li = document.createElement('li');
                li.textContent = `${qtd}x ${nome}`;
                alimentosListaUl.appendChild(li);
            }
        });
    } else {
         const li = document.createElement('li');
         li.textContent = 'Nenhum item da lanchonete.';
         alimentosListaUl.appendChild(li);
    }
    
    
    // 4. AÇÃO DE FINALIZAÇÃO (BOTÃO)
    document.getElementById('btn-finalizar').addEventListener('click', () => {
        // Simulação do envio dos dados ao servidor
        console.log("--- Dados Completos para Envio ao Servidor ---");
        console.log("Filme:", filmeNome, "Sessão:", sessao);
        console.log("Assentos:", assentosString);
        console.log("Alimentos:", alimentosString);
        
        alert("Pagamento processado com sucesso!");
        
        // Limpa os dados temporários do localStorage
        limparCompra(); 
    });
});