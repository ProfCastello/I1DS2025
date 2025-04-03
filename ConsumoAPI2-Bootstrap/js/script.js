const divErro = document.getElementById("div-erro");
divErro.style.display = "none";

// Função para carregar os dados e o volume de negociações
const carregarDados = async () => {
  try {
    const response = await fetch(
      "https://www.mercadobitcoin.net/api/BTC/trades/"
    );
    const dados = await response.json();
    prepararDados(dados); // Prepara e exibe os dados da variação
    prepararVolume(dados); // Prepara e exibe os dados do volume
  } catch (error) {
    divErro.style.display = "block";
    divErro.innerHTML = `<b>Erro ao acessar API:</b> ${error}`;
  }
};

// Função para carregar e exibir o volume de negociações
const carregarVolume = async () => {
  try {
    const response = await fetch(
      "https://www.mercadobitcoin.net/api/BTC/trades/"
    );
    const dados = await response.json();
    prepararVolume(dados);
  } catch (error) {
    divErro.style.display = "block";
    divErro.innerHTML = `<b>Erro ao acessar API:</b> ${error}`;
  }
};

// Função para preparar os dados do gráfico
const prepararDados = (dados) => {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawChart);

  // Criar um array para os dados de cada linha
  let dados_linha = [["Índice", "Preço"]];

  dados.forEach((item) => {
    dados_linha.push([new Date(item.date * 1000), item.price]);
  });

  // Função para desenhar o gráfico
  function drawChart() {
    var data = google.visualization.arrayToDataTable(dados_linha);

    var options = {
      title: "Company Performance",
      curveType: "function",
      legend: { position: "bottom" },
    };

    var chart = new google.visualization.LineChart(
      document.getElementById("grafico-precos")
    );
    chart.draw(data, options);
  }
};

// Função para preparar os dados do volume
const prepararVolume = (dados) => {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawVolumeChart);

  // Criar um array para os dados de volume
  let dados_volume = [["Índice", "Volume"]];

  dados.forEach((item) => {
    dados_volume.push([new Date(item.date * 1000), item.amount]);
  });

  // Função para desenhar o gráfico de volume
  function drawVolumeChart() {
    var data = google.visualization.arrayToDataTable(dados_volume);

    var options = {
      title: "Volume de Negociações",
      curveType: "function",
      legend: { position: "bottom" },
    };

    var chart = new google.visualization.LineChart(
      document.getElementById("grafico-volume")
    );
    chart.draw(data, options);
  }
};
