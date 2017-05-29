var search = require('youtube-search');
 
var opts = {
  maxResults: 10,
  key: require('./config').youtubeAPPID
};

askYoutube = function(response, convo) {
    convo.ask("[Search phrase]", function(response, convo) {    
        search(response.text.toLowerCase(), opts, function (err, res) {
            if(err) return console.log(err);
            console.log(res);
            convo.say(res);
        });
        convo.next();
    });
}