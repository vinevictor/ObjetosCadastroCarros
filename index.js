const carForm = document.getElementById("cadastro");

let carros = [];
let carrosLocal = [];

carForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;
  const ano = document.getElementById("ano").value;
  const valor = document.getElementById("valor").value;
  const cor = document.getElementById("cor").value;
  const automatico = document.querySelector(
    'input[name="Automatico"]:checked'
  ).value;

  const Carro = {
    marca,
    modelo,
    ano,
    valor,
    cor,
    automatico: automatico === "true" ? true : false,
  };

  const carrosJson = localStorage.getItem("carros");
  if (carrosJson) {
    carros = JSON.parse(carrosJson);
  }

  carros.push(Carro);

  localStorage.setItem("carros", JSON.stringify(carros));
});

function getCarros() {
  const carrosJson = localStorage.getItem("carros");

  if (carrosJson) {
    carrosLocal = JSON.parse(carrosJson);
  }
  carrosLocal.forEach((x) => console.log(x));
}

document.addEventListener("DOMContentLoaded", getCarros());

function pesquisaPorMarca(carros, marca) {
  let carrosMarca = carros.filter((carro) => carro.marca === marca);
  return carrosMarca;
}

function marcasDisponiveis(carros) {
  let marcas = [];
  carros.forEach((carro) => {
    if (!marcas.find((marca) => marca === carro.marca)) {
      marcas.push(carro.marca);
    }
  });
  return marcas;
}

let propriedades = ["modelo", "ano", "cor"];

function buscarPorPropriedades(carros, propriedades) {
  const carrosFiltrados = carros.map((carro) => {
    const carroFiltrado = {};
    propriedades.forEach((propriedade) => {
      carroFiltrado[propriedade] = carro[propriedade];
    });
    return carroFiltrado;
  });
  return carrosFiltrados;
}
