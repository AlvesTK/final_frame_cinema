// carrinho.js - Módulo de Funções

/**
 * Pega um dado específico do localStorage usando o prefixo 'compra_'.
 * @param {string} chave - A chave para buscar (ex: 'filme_nome').
 * @returns {string | null} O valor salvo ou null se não existir.
 */
export function getDado(chave) {
    // Busca a chave completa no localStorage (ex: 'compra_filme_nome')
    return localStorage.getItem(`compra_${chave}`);
}

/**
 * Função opcional para limpar os dados após a finalização da compra.
 */
export function limparCompra() {
    const chaves = ['usuario', 'filme_nome', 'filme_id', 'sessao', 'assentos', 'alimentos'];
    chaves.forEach(chave => {
        localStorage.removeItem(`compra_${chave}`);
    });
    alert("Compra finalizada e dados temporários limpos!");
}