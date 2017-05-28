var Botkit = require('botkit');

var finance = require('./finance.js');

var weather = require('./weather.js');

var giphs = require('./giphs.js');

var controller = Botkit.slackbot({
    require_delivery: true,
});


controller.hears(["Hello","Hi","Hola","Hey","boo"],["direct_message"],function(bot,message) {

    if(message.text.toLowerCase() === "hello"){
        bot.reply(message, 'Hello there <@'+message.user+'>');
    }
    
    else if(message.text.toLowerCase() === "hi"){
        bot.reply(message, 'Hi there <@'+message.user+'>');
    }
    
    else if(message.text.toLowerCase() === "hey"){
        bot.reply(message, 'Hey there <@'+message.user+'>');
    }

    else if(message.text.toLowerCase() === "hola"){
        bot.reply(message, 'Hola <@'+message.user+'>');
    }
    else {
            bot.reply(message, 'Hi there <@'+message.user+'>');
    }
});


controller.hears(['stock','stocks'],['mention','direct_message','direct_mention'],function(bot,message) {
  bot.startConversation(message, askStock);
});


controller.hears(['weather'],['mention','direct_message','direct_mention'],function(bot,message) {
  bot.startConversation(message, askWeather);
});


controller.hears(['giph','giphy','giphs'],['mention','direct_message','direct_mention'],function(bot,message) {
  bot.startConversation(message, askGiphs);
});



var bot = controller.spawn({
    token:require('./config').token
});

bot.startRTM(function(err,bot,payload) {
 
  if (err) {
 
    throw new Error('Could not connect to Slack');
 
  }
 
});