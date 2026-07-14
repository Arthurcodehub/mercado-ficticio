function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function criarCardHTML(produto) {
  const precoFormatado = formatarPreco(produto.preco);
  const precoOriginalHTML = produto.precoOriginal
    ? `<del aria-label="Preço original">${formatarPreco(produto.precoOriginal)}</del> `
    : '';

  return `
    <article class="card" aria-label="${produto.nome} - ${precoFormatado}">
      <h3>${produto.nome}</h3>
      <img src="${produto.imagem}" alt="${produto.alt}" width="200" height="150" loading="lazy">
      <p class="preco-desconto" aria-label="Preço">${precoOriginalHTML}${precoFormatado}</p>
      <p>${produto.descricao}</p>
      <button class="botao" type="button" data-produto-id="${produto.id}" aria-label="Comprar ${produto.nome}">Comprar</button>
    </article>
  `;
}

function renderizarProdutos() {
  const containerDestaque = document.getElementById('lista-produtos');
  const containerOfertas = document.getElementById('lista-ofertas');
  if (!containerDestaque || !containerOfertas) return;

  const destaques = produtos.filter((p) => p.categoria === 'destaque');
  const ofertas = produtos.filter((p) => p.categoria === 'oferta');

  containerDestaque.innerHTML = destaques.map(criarCardHTML).join('');
  containerOfertas.innerHTML = ofertas.map(criarCardHTML).join('');
}

document.addEventListener('DOMContentLoaded', renderizarProdutos);

const produtos = [
  {
    id: 'notebook',
    nome: 'Notebook',
    preco: 3499.90,
    precoOriginal: null,
    imagem: 'img/notebook.png',
    alt: 'Notebook com alta performance',
    descricao: 'Alto desempenho.',
    categoria: 'destaque'
  },
  {
    id: 'teclado',
    nome: 'Teclado Mecânico',
    preco: 299.90,
    precoOriginal: 349.90,
    imagem: 'img/teclado.png',
    alt: 'Teclado Mecânico com design ergonômico',
    descricao: 'Conforto e precisão.',
    categoria: 'oferta'
  },
  {
    id: 'mouse',
    nome: 'Mouse Ergonômico',
    preco: 149.90,
    precoOriginal: null,
    imagem: 'img/mouse.png',
    alt: 'Mouse Ergonômico para melhor conforto',
    descricao: 'Mais saúde no seu trabalho.',
    categoria: 'destaque'
  },
  {
    id: 'microfone',
    nome: 'Microfone Dedicado',
    preco: 399.90,
    precoOriginal: null,
    imagem: 'img/microfone.png',
    alt: 'Microfone Dedicado para áudio profissional',
    descricao: 'Qualidade no áudio.',
    categoria: 'destaque'
  },
  {
    id: 'monitor',
    nome: 'Monitor Curvo',
    preco: 2199.99,
    precoOriginal: 2599.99,
    imagem: 'img/monitor.jpg',
    alt: 'Monitor Curvo para maior produtividade',
    descricao: 'Tamanho e produtividade.',
    categoria: 'oferta'
  },
  {
    id: 'fone',
    nome: 'Fone Intrauricular',
    preco: 199.90,
    precoOriginal: null,
    imagem: 'img/fone.png',
    alt: 'Fone Intrauricular com som cristalino',
    descricao: 'Saúde para os ouvidos.',
    categoria: 'destaque'
  }
];