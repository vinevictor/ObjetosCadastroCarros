const carForm = document.getElementById("cadastro") as HTMLFormElement;

interface Carro {
  marca: string;
  modelo: string;
  ano: number;
  valor: number;
  cor: string;
  automatico: boolean;
}

let carros: Carro[] = [];
let carrosLocal: Carro[] = [];

carForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const marca = (document.getElementById("marca") as HTMLInputElement).value;
  const modelo = (document.getElementById("modelo") as HTMLInputElement).value;
  const ano = parseInt(
    (document.getElementById("ano") as HTMLInputElement).value
  );
  const valor = parseFloat(
    (document.getElementById("valor") as HTMLInputElement).value
  );
  const cor = (document.getElementById("cor") as HTMLInputElement).value;
  const automatico =
    (
      document.querySelector(
        'input[name="Automatico"]:checked'
      ) as HTMLInputElement
    ).value === "true";

  const Carro: Carro = {
    marca,
    modelo,
    ano,
    valor,
    cor,
    automatico,
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
  carrosLocal.forEach((x: Carro) => console.log(x));
}

document.addEventListener("DOMContentLoaded", getCarros);

function pesquisaPorMarca(carros: Carro[], marca: string): Carro[] {
  let carrosMarca = carros.filter((carro) => carro.marca === marca);
  return carrosMarca;
}

function marcasDisponiveis(carros: Carro[]): string[] {
  let marcas: string[] = [];
  carros.forEach((carro) => {
    if (!marcas.find((marca) => marca === carro.marca)) {
      marcas.push(carro.marca);
    }
  });
  return marcas;
}

let propriedades: (keyof Carro)[] = ["modelo", "ano", "cor"];

function buscarPorPropriedades(
  carros: Carro[],
  propriedades: (keyof Carro)[]
): Partial<Carro>[] {
  const carrosFiltrados = carros.map((carro) => {
    const carroFiltrado: Partial<Carro> = {};
    propriedades.forEach((propriedade) => {
      carroFiltrado[propriedade] = carro[propriedade];
    });
    return carroFiltrado;
  });
  return carrosFiltrados;
}
