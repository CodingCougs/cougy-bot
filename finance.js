var yahooFinance = require('yahoo-finance');

var Botkit = require('botkit');


askStock = function(response, convo) {
  convo.ask("Which company stock price would you like?", function(response, convo) {
    
    console.log(response);
    convo.say("Let me check");
    
    var askedStock = response.text.toUpperCase();

    yahooFinance.quote({
      symbol: askedStock,
      modules: ['price', 'summaryDetail']       // optional; default modules.
    }, function(err, quote) {
      console.log(quote.price.regularMarketPrice);
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd<10) {
         dd='0'+dd
      } 

      if(mm<10) {
          mm='0'+mm
      } 

      today = mm+'/'+dd+'/'+yyyy;
      console.log(today);
      
      var reply_with_attachments = {
      'attachments': [
        {
          'fallback':"",
          'title': quote.price.shortName, 
          'text': today,
          "fields": [
                {
                    "title": "Current Stock Price",
                    "value": quote.price.regularMarketPrice,
                    "short": false
                },
                {
                    "title": "Market Day High",
                    "value": quote.price.regularMarketDayHigh,
                    "short": true
                },
                {
                    "title": "Market Day Low",
                    "value": quote.price.regularMarketDayLow,
                    "short": true
                }
            ],
          'footer': 'Market State: '+ quote.price.marketState,
          'color': '#7CD197'
        }
      ]
    }
    console.log(reply_with_attachments);
    convo.say(reply_with_attachments);
    });

    convo.next();
  });
}


module.exports = askStock;