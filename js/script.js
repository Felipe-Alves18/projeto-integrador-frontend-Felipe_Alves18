const produtos = [
  { nome: "Camisa Básica Premium", preco: 49.9, categoria: "camisas", desconto: 0.1 },
  { nome: "Camisa Oversized", preco: 79.9, categoria: "camisas", desconto: 0.15 },
  { nome: "Moletom Canguru", preco: 129.9, categoria: "moletons", desconto: 0.2 },
  { nome: "Boné Aba Curva", preco: 39.9, categoria: "acessorios", desconto: 0.05 },
  { nome: "Jaqueta Corta-Vento", preco: 189.9, categoria: "jaquetas", desconto: 0.1 }
];

function calcularPrecoPromocional(preco, desconto = 0.1) {
  return preco * (1 - desconto);
}

function classificarFaixa(preco) {
  if (preco < 60) return "essencial";
  if (preco < 120) return "intermediario";
  return "premium";
}

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const processados = produtos.map(function (p) {
  const precoPromocional = calcularPrecoPromocional(p.preco, p.desconto);
  return { ...p, precoPromocional, faixa: classificarFaixa(precoPromocional) };
});

const essenciais = processados.filter((p) => p.faixa === "essencial");

const total = processados.reduce((soma, p) => soma + p.precoPromocional, 0);
const media = total / processados.length;

function criarCelula(tag, texto) {
  const celula = document.createElement(tag);
  celula.textContent = texto;
  return celula;
}

function criarLinha(item) {
  const tr = document.createElement("tr");
  tr.classList.add(`faixa-${item.faixa}`);
  tr.append(criarCelula("td", item.nome), criarCelula("td", formatarPreco(item.preco)));
  return tr;
}

const resultado = document.querySelector("#resultado");

if (resultado) {
  const cabecalho = document.createElement("tr");
  cabecalho.append(criarCelula("th", "Produto"), criarCelula("th", "Preço Original"));

  const thead = document.createElement("thead");
  thead.append(cabecalho);

  const linhas = processados.map(criarLinha);
  const tbody = document.createElement("tbody");
  tbody.append(...linhas);

  const tabela = document.createElement("table");
  tabela.classList.add("tabela-produtos");
  tabela.append(thead, tbody);

  const botao = document.createElement("button");
  botao.id = "btn-alternar";
  botao.textContent = "Aplicar Descontos";

  const resumo = document.createElement("p");
  resumo.classList.add("resumo");
  resumo.textContent = `${processados.length} produtos | preço médio com desconto: ${formatarPreco(media)} | faixa essencial: ${essenciais.length}`;

  botao.addEventListener("click", function () {
    cabecalho.append(criarCelula("th", "Preço Promocional"));

    linhas.forEach(function (tr, i) {
      tr.children[1].classList.add("preco-antigo");
      const forte = document.createElement("strong");
      forte.textContent = formatarPreco(processados[i].precoPromocional);
      const td = document.createElement("td");
      td.append(forte);
      tr.append(td);
    });

    botao.disabled = true;
    botao.textContent = "Descontos aplicados";
  });

  resultado.append(tabela, botao, resumo);
}