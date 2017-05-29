var Botkit = require('botkit');

var finance = require('./finance.js');

var weather = require('./weather.js');

var giphs = require('./giphs.js');

var google = require('./google.js');

var youtube = require('./youtube.js');

var controller = Botkit.slackbot({
    require_delivery: true,
});


controller.hears(
    ["Hello","Hi","Hola","Hey","boo"],["direct_message"], function(bot, message) {

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


controller.hears(
    ['stock','stocks'],['mention','direct_message','direct_mention'], function(bot, message) {
  bot.startConversation(message, askStock);
});


controller.hears(
    ['weather'],['mention','direct_message','direct_mention'], function(bot, message) {
  bot.startConversation(message, askWeather);
});


controller.hears(
    ['giph','giphy','giphs'],['mention','direct_message','direct_mention'], function(bot, message) {
  bot.startConversation(message, askGiphs);
});

controller.hears(
    ['google'],['mention','direct_message','direct_mention'], function(bot, message) {
  bot.startConversation(message, searchGoogle);
});

controller.hears(
    ['youtube'],['mention','direct_message','direct_mention'], function(bot, message) {
  bot.startConversation(message, askYoutube);
});

controller.on('message', function(bot, message) {
    bot.reply(message, 'message: ' + message);
});

controller.on('direct_message', function(bot, message) {
    bot.reply(message, 'Direct message receive: ' + message.text + ' \n From: <@' + message.user + '>');
});

controller.on('direct_mention', function(bot, message) {
    bot.reply(message, 'A direct mention \n From: <@' + message.user + '>');
});

controller.on('mention', function(bot, message){
    bot.reply(message, 'A mention \n From: <@' + message.user + '>');
});
/*
 * Sets the token for the slackbot from config.js
 */
var bot = controller.spawn({
    token:require('./config').token
});

/*
 * Opens a connection to Slack's real-time API.  This will remain open until connection fails or is closed by closeRTM().
 * err: A catcher for any errors that may occur while connecting to Slack
 * bot: The bot object
 * payload: Contains info of the entirety of the bot and the environment it's within such as list of users and channels.
 */
bot.startRTM(function(err, bot, payload) {
 
  if (err) {
    throw new Error('Could not connect to Slack');
  }
 
});