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

function atualizarValor1() {

  setTimeout(function(){
    document.getElementById("denominador13").value = document.getElementById("numerador1").value;
  }, 300);
  
}

function atualizarValor2() {

  setTimeout(function(){
    document.getElementById("denominador23").value = document.getElementById("numerador2").value;
  }, 300);

}

myChart = new Chart(ctx, config);

function calcular() {
  funcao1 = [];
  funcao2 = [];
  entrada = [];

  var numerador1 = document.getElementById("numerador1").value;
  //var denominador11 = document.getElementById("denominador11").value;
  var denominador12 = document.getElementById("denominador12").value;
  var denominador13 = document.getElementById("denominador13").value;
  var wn1 = Math.sqrt(numerador1);
  var z1 = denominador12 / (wn1 * 2);
  var wd1 = wn1 * Math.sqrt(1 - Math.pow(z1, 2));
  console.log(wn1);
  console.log(z1);

  var numerador2 = document.getElementById("numerador2").value;
  //var denominador21 = document.getElementById("denominador21").value;
  var denominador22 = document.getElementById("denominador22").value;
  var denominador23 = document.getElementById("denominador23").value;
  var wn2 = Math.sqrt(numerador2);
  var z2 = denominador22 / (wn2 * 2);
  var wd2 = wn2 * Math.sqrt(1 - Math.pow(z2, 2));

  //myChart.destroy();
  var sinalSelecionado = document.getElementById("select-sinal").value;

  if (sinalSelecionado == "Rampa") {
    for (var i = 0; i <= 100; i = i + 0.5) {
      funcao1.push(
        1 -
          Math.pow(
            Math.E,
            (-1 * z1 * wn1 * i) / Math.sqrt(1 - Math.pow(z1, 2))
          ) *
            (Math.cos(wd1 * i) +
              (z1 / Math.sqrt(1 - Math.pow(z1, 2))) * Math.sin(wd1 * i))
      );

      funcao2.push(
        1 -
          Math.pow(
            Math.E,
            (-1 * z2 * wn2 * i) / Math.sqrt(1 - Math.pow(z2, 2))
          ) *
            (Math.cos(wd2 * i) +
              (z2 / Math.sqrt(1 - Math.pow(z2, 2))) * Math.sin(wd2 * i))
      );

      entrada.push(i);
    }
  } else if (sinalSelecionado == "Degrau") {
    for (var i = 0; i <= 100; i = i + 0.5) {

      funcao1.push(1 - 
        (1/(Math.sqrt(1 - Math.pow(z1, 2)))) *

        Math.pow(Math.E, -1 * z1 * wn1 * i) *
        
        Math.sin((wd1 * i) + Math.atan((wd1/z1)))
        
        );
      
        funcao2.push(1 - 
          (1/(Math.sqrt(1 - Math.pow(z2, 2)))) *
  
          Math.pow(Math.E, -1 * z2 * wn2 * i) *
          
          Math.sin((wd2 * i) + Math.atan((wd2/z2)))
          
        );

      entrada.push(1);
    }
  } else if (sinalSelecionado == "Impulso") {
    for (var i = 0; i <= 100; i = i + 0.5) {
      funcao1.push(
        (1 / (wn1 * Math.sqrt(1 - Math.pow(z1, 2)))) *
          Math.pow(Math.E, -1 * z1 * wn1 * i) *
          Math.sin(wd1 * i)
      );
      funcao2.push(
        (1 / (wn2 * Math.sqrt(1 - Math.pow(z2, 2)))) *
          Math.pow(Math.E, -1 * z2 * wn2 * i) *
          Math.sin(wd2 * i)
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
