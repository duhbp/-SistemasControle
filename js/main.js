var funcao1 = [];
var funcao2 = [];
var entrada = [];
var tempoX = [];
var tempo;
var myChart;

for (var i = 0; i <= 100; i = i + 0.5) {
  tempoX.push(i);
}

var ctx = document.getElementById("myChart");
var labels = tempoX;
var data = {
  labels,
  datasets: [
    {
      data: funcao1,
      label: "Função 1",
      borderColor: "#00BFFF",
    },
    {
      data: funcao2,
      label: "Função 2",
      borderColor: "#DAA520",
    },
    {
      data: entrada,
      label: "Entrada",
      borderColor: "#FF0000",
    },
  ],
};
var config = {
  type: "line",
  data,
  options: {
    responsive: true,
  },
};

myChart = new Chart(ctx, config);

function calcular() {
  funcao1 = [];
  funcao2 = [];
  entrada = [];

  var numerador1 = document.getElementById("numerador1").value;
  var denominador1 = document.getElementById("denominador1").value;

  var numerador2 = document.getElementById("numerador2").value;
  var denominador2 = document.getElementById("denominador2").value;

  //myChart.destroy();

  var sinalSelecionado = document.getElementById("select-sinal").value;

  if (sinalSelecionado == "Rampa") {
    for (var i = 0; i <= 100; i = i + 0.5) {
      funcao1.push(
        i - numerador1 + numerador1 * (1 / Math.pow(Math.E, i / denominador1))
      );
      funcao2.push(
        i - numerador2 + numerador2 * (1 / Math.pow(Math.E, i / denominador2))
      );
      entrada.push(i);
    }
  } else if (sinalSelecionado == "Degrau") {
    for (var i = 0; i <= 100; i = i + 0.5) {
      funcao1.push(numerador1 * (1 - 1 / Math.pow(Math.E, i / denominador1)));
      funcao2.push(numerador2 * (1 - 1 / Math.pow(Math.E, i / denominador2)));
      entrada.push(1);
    }
  } else if (sinalSelecionado == "Impulso") {
    for (var i = 0; i <= 100; i = i + 0.5) {
      funcao1.push(
        (numerador1 / denominador1) * (1 / Math.pow(Math.E, i / denominador1))
      );
      funcao2.push(
        (numerador2 / denominador2) * (1 / Math.pow(Math.E, i / denominador2))
      );
    }

    entrada.push(100);
  }

  myChart.data.datasets[0].data = funcao1;
  myChart.data.datasets[1].data = funcao2;
  myChart.data.datasets[2].data = entrada;
  myChart.update();
}

function habilitarComparacao() {
  var btn = document.getElementById("btn-comparar");
  var funcao = document.getElementById("funcao-2");
  btn.classList.add("d-none");
  funcao.classList.remove("d-none");
}
