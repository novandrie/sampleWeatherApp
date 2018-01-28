var cidades;
var cidadeSelecionada;

var APIKEY = '3b0a9658ef734e098ee14917182801';

$.getJSON("resources/cidades-bahia.json", function(data){
    // Carrega lista de cidades de arquivo jSON para menu dropdown 
    $.each(data.cidades, function(){
        cidades = data.cidades;
        $("#menuCidades").append("<option class='select-option'>"+this+"</option>");
    });
    // Carrega dados para primeiro elemento(sendo mostrado já na lista)
    selectCity(cidades[0])

});

function selectCity(cidade){
    $(".spinner").show()
    cidadeSelecionada = cidade;
    // Busca de informação meteorologica via API apixu
    $.getJSON('https://api.apixu.com/v1/forecast.json?key='+APIKEY+'&q='+cidadeSelecionada+'&days=4')
        // Caso sucesso na chamada da API, chamar função para estruturar e exibir dados
        .done(function(data){
            $('.error-message').hide();
            parseWeatherData(data);
            $(".spinner").hide()
        })
        // Caso contrário, exibir mensagem de que a cidade escolhida não se encontra na lista
        .fail(function(data){
            clearWeatherData();
            $('.error-message').show()
            $(".spinner").hide()
        });

}
