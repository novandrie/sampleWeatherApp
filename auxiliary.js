// Obter objeto representativo do estado selecionado
function getState(state, array){
    // Busca simples com chave = sigla do estado
    for (var i=0; i<array.length; i++){
        if (array[i].sigla == state){
            return array[i];
        };
    };
};

// Parsing de dados obtidos da API
function parseWeatherData(data){
    var forecast = data.forecast.forecastday;
    // Selectors jQuery para cada seção de dados a ser preenchida
    var days = ($(".week-day"));
    var maxTemps = ($(".max-temp"));
    var minTemps = ($(".min-temp"));
    var condition = ($(".weather-condition"));
    // Dicionário para decodificação de dias da semana segundo a API (0-6)
    var weekDays = {
        0:'SEG',
        1:'TER',
        2:'QUA',
        3:'QUI',
        4:'SEX',
        5:'SAB',
        6:'DOM'
    };
    // Preenchimento de dados para cada um dos quatro dias analisados
    for (var i=0; i<forecast.length; i++){
        // Dia da semana analisado
        var weekday = (new Date(forecast[i].date)).getDay();
        ($(days[i])).html(weekDays[weekday]);
        // Temperatura máxima
        ($(maxTemps[i])).html((forecast[i].day.maxtemp_c).toFixed(1) + '°<br>máx');
        // Temperatura mínima
        ($(minTemps[i])).html((forecast[i].day.mintemp_c).toFixed(1) + '°<br>min');
        // Ícone de representação do tempo
        ($(condition[i])).html("<img class='condition-icon' src=" + forecast[i].day.condition.icon+">");
    }
        
}

// Limpeza de dados sendo mostrados
function clearWeatherData(){
    var days = ($(".week-day"));
    var maxTemps = ($(".max-temp"));
    var minTemps = ($(".min-temp"));
    var condition = ($(".weather-condition"));
    
    for (var i=0; i<days.length; i++){
        ($(days[i])).html("-");
        // Temperatura máxima
        ($(maxTemps[i])).html("-");
        // Temperatura mínima
        ($(minTemps[i])).html("-");
        // Ícone de representação do tempo
        ($(condition[i])).html("");
    }
}