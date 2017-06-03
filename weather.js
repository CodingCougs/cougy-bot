var weather = require('weather-js');

var Botkit = require('botkit');

askWeather = function(response, convo) {
  convo.ask("For which location would you like me to get the weather?", function(response, convo) {
    
    console.log(response);
    // console.log(convo);

    convo.say("Awesome. Let me check...");
    getWeather(response,convo);
    
  });
}

getWeather = function(response,convo){ 
  
  weather.find({search: response.text, degreeType: 'F'}, function(err, result) {

    if(err) console.log(err);
    
    // var jsonContent = JSON.parse(result);
    console.log(result[0].current.imageUrl);
    // convo.say(JSON.stringify(result[0].current, null, 2));
    var reply_with_attachments = {
    'attachments': [
      {
        'fallback':"temperature",
        'title': 'Current temperature is ' +result[0].current.temperature ,
        'text': result[0].location.name,
        "image_url":result[0].current.imageUrl,
        'color': '#7CD197'
      }
    ]
  }
  
    convo.say(reply_with_attachments);
    convo.next();
    });
}

module.exports = askWeather;