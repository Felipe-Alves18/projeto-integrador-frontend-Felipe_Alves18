const produtos = [
  { nome: "Camiseta Básica", preco: 79.9, estoque: 20 },
  { nome: "Calça Jeans", preco: 189.9, estoque: 8 },
  { nome: "Jaqueta", preco: 349.9, estoque: 3 },
  { nome: "Boné", preco: 49.9, estoque: 15 },
  { nome: "Tênis", preco: 259.9, estoque: 5 },
  { nome: "Meia", preco: 19.9, estoque: 0 },
];

console.log(produtos);

function precoComDesconto(preco, desconto = 10) {
  return preco - (preco * desconto) / 100;
}

console.log(precoComDesconto(100));      // esperado: 90
console.log(precoComDesconto(100, 25));  // esperado: 75
console.log(precoComDesconto(189.9));    // esperado: 170.91

function valorEmEstoque(preco, quantidade = 1) {
  return preco * quantidade;
}

console.log(valorEmEstoque(10, 3));  // esperado: 30
console.log(valorEmEstoque(10));     // esperado: 10

function classificarEstoque(quantidade) {
  if (quantidade === 0) {
    return "esgotado";
  } else if (quantidade <= 5) {
    return "baixo";
  } else {
    return "ok";
  }
}

console.log(classificarEstoque(0));   // esperado: esgotado
console.log(classificarEstoque(3));   // esperado: baixo
console.log(classificarEstoque(20));  // esperado: ok

const comDesconto = produtos.map((produto) => {
  return {
    nome: produto.nome,
    preco: precoComDesconto(produto.preco),
    estoque: produto.estoque,
  };
});

const estoqueBaixo = comDesconto.filter((produto) => {
  return classificarEstoque(produto.estoque) === "baixo";
});

const valorTotalEstoque = produtos.reduce((total, produto) => {
  return total + valorEmEstoque(produto.preco, produto.estoque);
}, 0);

console.log(comDesconto);
console.log(estoqueBaixo);
console.log(valorTotalEstoque);

function criarCabecalho() {
  const cabecalho = document.createElement("thead");
  const linha = document.createElement("tr");

  ["Produto", "Preço", "Estoque", "Situação"].forEach((titulo) => {
    const celula = document.createElement("th");
    celula.textContent = titulo;
    linha.append(celula);
  });

  cabecalho.append(linha);
  return cabecalho;
}

function criarLinhaProduto(produto) {
  const situacao = classificarEstoque(produto.estoque);
  const linha = document.createElement("tr");
  linha.classList.add(situacao);

  const valores = [
    produto.nome,
    `R$ ${produto.preco.toFixed(2)}`,
    produto.estoque,
    situacao,
  ];

  valores.forEach((valor) => {
    const celula = document.createElement("td");
    celula.textContent = valor;
    linha.append(celula);
  });

  return linha;
}

const areaResultado = document.querySelector("#resultado");

if (areaResultado === null) {
  console.error("Seção #resultado não encontrada");
} else {
  const tabela = document.createElement("table");
  const corpo = document.createElement("tbody");

  produtos.forEach((produto) => {
    corpo.append(criarLinhaProduto(produto));
  });

  tabela.append(criarCabecalho(), corpo);
  areaResultado.append(tabela);

  const resumo = document.createElement("p");
  resumo.classList.add("resumo");
  resumo.textContent = `Valor total em estoque: R$ ${valorTotalEstoque.toFixed(2)} | Itens com estoque baixo: ${estoqueBaixo.length}`;
  areaResultado.append(resumo);
}
const titulo = document.querySelector("h1");
const botaoTitulo = document.querySelector("#botao-titulo");

if (titulo === null || botaoTitulo === null) {
  console.error("Título ou botão não encontrado");
} else {
  botaoTitulo.addEventListener("click", () => {
    titulo.classList.add("azul");
  });
}