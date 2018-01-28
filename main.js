var cidades;
var cidadeSelecionada;

var APIKEY = '3b0a9658ef734e098ee14917182801';

$.getJSON("resources/cidades-bahia.json", function(data){
    // Carrega lista de cidades de arquivo jSON para menu dropdown 
    $.each(data.cidades, function(){
        cidades = data.cidades;
        $("#menuCidades").append("<li><a href='#'>"+this+"</a></li>");
    });

    // Seleção de cidade
    $("#menuCidades li a").click(function(){
        // Coloca nome da cidade selecionada no botão do menu dropdown
        $(this).parents(".dropdown").find(".cidade").html($(this).text());
        cidadeSelecionada = $(this).text();
        // Busca de informação meteorologica via API apixu
        $.getJSON('http://api.apixu.com/v1/forecast.json?key='+APIKEY+'&q='+cidadeSelecionada+'&days=4')
            // Caso sucesso na chamada da API, chamar função para estruturar e exibir dados
            .done(function(data){
                $('.error-message').hide();
                parseWeatherData(data);
            })
            // Caso contrário, exibir mensagem de que a cidade escolhida não se encontra na lista
            .fail(function(data){
                clearWeatherData();
                $('.error-message').show()
            })
    });

});

