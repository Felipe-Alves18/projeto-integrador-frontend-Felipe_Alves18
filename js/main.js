const produtos = [
  { nome: "Camisa Básica Premium", preco: 49.9, categoria: "camisas", desconto: 0.1 },
  { nome: "Camisa Oversized", preco: 79.9, categoria: "camisas", desconto: 0.15 },
  { nome: "Moletom Canguru", preco: 129.9, categoria: "moletons", desconto: 0.2 },
  { nome: "Boné Aba Curva", preco: 39.9, categoria: "acessorios", desconto: 0.05 },
  { nome: "Jaqueta Corta-Vento", preco: 189.9, categoria: "jaquetas", desconto: 0.1 }
];

const rotulos = { essencial: "Essencial", intermediario: "Intermediário", premium: "Premium" };

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

// Processamento
const processados = produtos.map(function (p) {
  const precoPromocional = calcularPrecoPromocional(p.preco, p.desconto);
  return { ...p, precoPromocional, faixa: classificarFaixa(precoPromocional) };
});

const essenciais = processados.filter((p) => p.faixa === "essencial");
const total = processados.reduce((soma, p) => soma + p.precoPromocional, 0);
const media = total / processados.length;

// Renderização
const resultado = document.querySelector("#resultado");

if (resultado) {
  resultado.innerHTML = `
    <table class="tabela-produtos">
        <thead>
            <tr>
                <th>Produto</th>
                <th>Preço Original</th>
                <th>Preço Promocional</th>
            </tr>
        </thead>
        <tbody id="resultado-tabela"></tbody>
    </table>
    <div id="resumo-catalogo"></div>
  `;

  const tbody = document.querySelector("#resultado-tabela");

  processados.forEach((item) => {
    const tr = document.createElement("tr");
    tr.classList.add(`faixa-${item.faixa}`);
    tr.innerHTML = `
      <td><strong>${item.nome}</strong></td>
      <td class="preco-antigo">${formatarPreco(item.preco)}</td>
      <td class="preco-destaque"><strong>${formatarPreco(item.precoPromocional)}</strong></td>
    `;
    tbody.append(tr);
  });

  const divResumo = document.querySelector("#resumo-catalogo");
  const resumo = document.createElement("p");
  resumo.classList.add("resumo");
  resumo.textContent = `${processados.length} produtos | preço médio: ${formatarPreco(media)} | essenciais: ${essenciais.length}`;
  divResumo.append(resumo);
}