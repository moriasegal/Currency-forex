    


$(document).ready(function(){
    forexConverter();
});


$('#firstBtn').click(function(){
    $('.titltLabale').each(function(index, element){
        viewData(index, $(element));
    });
    
});

function viewData(index, element){
    var symbols = element.text();
    symbols = symbols.substring(0, 3);
    $.get('https://api.fixer.io/latest?base='+symbols+'&symbols=USD', function(data2){
        $(".time").eq(index).text(data2.date);
        $(".price").eq(index).text(data2.rates.USD);
//        $(".symbol").eq(index).text(element.text());
    });
}

function getForexUrl(from, to, quantity){
     new Promise (function(resolve){
     $.get('https://api.fixer.io/latest?base='+from+'&symbols='+to, function(data){
           resolve(data); 
        });
     }).then(function(data){
         $('.result').val((data.rates.USD)*quantity);
     });   
}





function forexConverter(){ 
    $('form .btn').click(function(){
        var number = $('#quantityInput').val();
        switch($('#selectForex').val()) {
            case 'AUDUSD':
                getForexUrl('AUD', 'USD', number);
                break;
            case "GBPUSD":
                getForexUrl('GBP', 'USD', number);
                break;
            case "JPYUSD":
                getForexUrl('JPY', 'USD', number);
                break;
            default:
        } 
    });
}
