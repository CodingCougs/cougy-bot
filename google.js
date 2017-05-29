var google = require('google');

var Botkit = require('botkit');

google.resultsPerPage = 25;
var nextCounter = 0;
 
searchGoogle = function(response, convo) {
    convo.ask("What would you like to search: ", function(response, convo) {
        google (response.text.toLowerCase(), function (err, result) {
            if (err) 
                console.error(err);
            for (var i = 0; i < result.links.length; ++i) {
                var link = result.links[i];
                convo.say(link.title + ' - ' + link.href);
                console.log(link.title + ' - ' + link.href)
                convo.say(link.description + "\n");
            }
            if (nextCounter < 4) {
                nextCounter += 1;
                if (result.next) result.next();
            }
        });
        convo.next();
    });
}