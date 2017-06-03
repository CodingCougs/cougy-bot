var giphy = require('giphy-api')();

var Botkit = require('botkit');

askGiphs = function(response, convo) {
convo.ask("[Search phrase]", function(response, convo) {
        
        getGiph(response, convo);
    });

}

getGiph = function(response,convo){
    giphy.search(response.text.toLowerCase(), function (err, res) {
            // Res contains gif data! 
            // console.log(res);
            var result = res.data[0].images.original.url;
            var reply_with_attachments = {

        'attachments': [
            {
                'fallback':response.text.toLowerCase(),
                'text': response.text.toLowerCase(),
                "image_url":result,
                'color': '#7CD197'
            }
             ]
            }

            convo.say(reply_with_attachments);
            convo.next();
        });
       
}

module.exports = askGiphs;